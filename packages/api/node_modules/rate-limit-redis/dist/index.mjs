const scripts = {
  increment: `
	      local windowMs = tonumber(ARGV[2])
	      local resetOnChange = ARGV[1] == "1"

	      local timeToExpire = redis.call("PTTL", KEYS[1])

	      if timeToExpire <= 0 then
	        redis.call("SET", KEYS[1], 1, "PX", windowMs)
	        return { 1, windowMs }
	      end

	      local totalHits = redis.call("INCR", KEYS[1])

	      if resetOnChange then
	        redis.call("PEXPIRE", KEYS[1], windowMs)
	        timeToExpire = windowMs
	      end
        
	      return { totalHits, timeToExpire }
		`.replaceAll(/^\s+/gm, "").trim(),
  get: `
      local totalHits = redis.call("GET", KEYS[1])
      local timeToExpire = redis.call("PTTL", KEYS[1])

      return { totalHits, timeToExpire }
		`.replaceAll(/^\s+/gm, "").trim()
};

const toInt = (input) => {
  if (typeof input === "number") return input;
  return Number.parseInt((input ?? "").toString(), 10);
};
const parseScriptResponse = (results) => {
  if (!Array.isArray(results))
    throw new TypeError("Expected result to be array of values");
  if (results.length !== 2)
    throw new Error(`Expected 2 replies, got ${results.length}`);
  const totalHits = results[0] === false ? 0 : toInt(results[0]);
  const timeToExpire = toInt(results[1]);
  const resetTime = new Date(Date.now() + timeToExpire);
  return { totalHits, resetTime };
};
class RedisStore {
  /**
   * The function used to send raw commands to Redis.
   *
   * When a non-cluster SendCommandFn is provided, a wrapper function is used to convert between the two
   */
  sendCommand;
  /**
   * The text to prepend to the key in Redis.
   */
  prefix;
  /**
   * Whether to reset the expiry for a particular key whenever its hit count
   * changes.
   */
  resetExpiryOnChange;
  /**
   * Stores the loaded SHA1s of the LUA scripts used for executing the increment
   * and get key operations.
   */
  incrementScriptSha;
  getScriptSha;
  /**
   * The number of milliseconds to remember that user's requests.
   */
  windowMs;
  /**
   * @constructor for `RedisStore`.
   *
   * @param options {Options} - The configuration options for the store.
   */
  constructor(options) {
    if (typeof options !== "object") {
      throw new TypeError("rate-limit-redis: Error: options object is required");
    }
    if ("sendCommand" in options && !("sendCommandCluster" in options)) {
      const sendCommandFn = options.sendCommand.bind(this);
      this.sendCommand = async ({ command }) => sendCommandFn(...command);
    } else if (!("sendCommand" in options) && "sendCommandCluster" in options) {
      this.sendCommand = options.sendCommandCluster.bind(this);
    } else {
      throw new Error(
        "rate-limit-redis: Error: options must include either sendCommand or sendCommandCluster (but not both)"
      );
    }
    this.prefix = options.prefix ?? "rl:";
    this.resetExpiryOnChange = options.resetExpiryOnChange ?? false;
    this.incrementScriptSha = this.loadIncrementScript();
    this.getScriptSha = this.loadGetScript();
  }
  /**
   * Loads the script used to increment a client's hit count.
   */
  async loadIncrementScript(key) {
    const result = await this.sendCommand({
      key,
      isReadOnly: false,
      command: ["SCRIPT", "LOAD", scripts.increment]
    });
    if (typeof result !== "string") {
      throw new TypeError("unexpected reply from redis client");
    }
    return result;
  }
  /**
   * Loads the script used to fetch a client's hit count and expiry time.
   */
  async loadGetScript(key) {
    const result = await this.sendCommand({
      key,
      isReadOnly: false,
      command: ["SCRIPT", "LOAD", scripts.get]
    });
    if (typeof result !== "string") {
      throw new TypeError("unexpected reply from redis client");
    }
    return result;
  }
  /**
   * Runs the increment command, and retries it if the script is not loaded.
   */
  async retryableIncrement(_key) {
    const key = this.prefixKey(_key);
    const evalCommand = async () => this.sendCommand({
      key,
      isReadOnly: false,
      command: [
        "EVALSHA",
        await this.incrementScriptSha,
        "1",
        key,
        this.resetExpiryOnChange ? "1" : "0",
        this.windowMs.toString()
      ]
    });
    try {
      const result = await evalCommand();
      return result;
    } catch {
      this.incrementScriptSha = this.loadIncrementScript(key);
      return evalCommand();
    }
  }
  /**
   * Method to prefix the keys with the given text.
   *
   * @param key {string} - The key.
   *
   * @returns {string} - The text + the key.
   */
  prefixKey(key) {
    return `${this.prefix}${key}`;
  }
  /**
   * Method that actually initializes the store.
   *
   * @param options {RateLimitConfiguration} - The options used to setup the middleware.
   */
  init(options) {
    this.windowMs = options.windowMs;
  }
  /**
   * Method to fetch a client's hit count and reset time.
   *
   * @param key {string} - The identifier for a client.
   *
   * @returns {ClientRateLimitInfo | undefined} - The number of hits and reset time for that client.
   */
  async get(_key) {
    const key = this.prefixKey(_key);
    let results;
    const evalCommand = async () => this.sendCommand({
      key,
      isReadOnly: true,
      command: ["EVALSHA", await this.getScriptSha, "1", key]
    });
    try {
      results = await evalCommand();
    } catch {
      this.getScriptSha = this.loadGetScript(key);
      results = await evalCommand();
    }
    return parseScriptResponse(results);
  }
  /**
   * Method to increment a client's hit counter.
   *
   * @param key {string} - The identifier for a client
   *
   * @returns {IncrementResponse} - The number of hits and reset time for that client
   */
  async increment(key) {
    const results = await this.retryableIncrement(key);
    return parseScriptResponse(results);
  }
  /**
   * Method to decrement a client's hit counter.
   *
   * @param key {string} - The identifier for a client
   */
  async decrement(_key) {
    const key = this.prefixKey(_key);
    await this.sendCommand({ key, isReadOnly: false, command: ["DECR", key] });
  }
  /**
   * Method to reset a client's hit counter.
   *
   * @param key {string} - The identifier for a client
   */
  async resetKey(_key) {
    const key = this.prefixKey(_key);
    await this.sendCommand({ key, isReadOnly: false, command: ["DEL", key] });
  }
}

export { RedisStore, RedisStore as default };
