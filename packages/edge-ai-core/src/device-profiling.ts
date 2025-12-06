/**
 * Device Profiling
 * Detects device capabilities and generates profiles for model optimization
 */

import * as os from "os";

export interface DeviceCapabilities {
  cpu: boolean;
  gpu: boolean;
  npu: boolean;
  tpu: boolean;
  onnx_runtime: boolean;
  tensorrt: boolean;
  executorch: boolean;
  webgpu: boolean;
  wasm: boolean;
}

export interface DeviceProfile {
  deviceType: string;
  os: string;
  arch: string;
  capabilities: DeviceCapabilities;
  specs?: {
    cpuModel?: string;
    ramGb?: number;
    gpuModel?: string;
  };
}

/**
 * Detect device capabilities automatically
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  // Basic detection - can be enhanced with actual hardware detection
  return {
    cpu: true, // Always available
    gpu: false, // Would need actual detection
    npu: false, // Would need actual detection
    tpu: false, // Would need actual detection
    onnx_runtime: checkRuntimeAvailable("onnx"),
    tensorrt: checkRuntimeAvailable("tensorrt"),
    executorch: checkRuntimeAvailable("executorch"),
    webgpu: checkRuntimeAvailable("webgpu"),
    wasm: checkRuntimeAvailable("wasm"),
  };
}

/**
 * Generate device profile
 */
export function generateDeviceProfile(deviceType?: string): DeviceProfile {
  const platform = os.platform();
  const arch = os.arch();
  const capabilities = detectDeviceCapabilities();

  const cpuModel = os.cpus()[0]?.model;
  const specs: DeviceProfile["specs"] = {
    ramGb: Math.round(os.totalmem() / 1024 / 1024 / 1024),
  };
  if (cpuModel) {
    specs.cpuModel = cpuModel;
  }

  return {
    deviceType: deviceType || inferDeviceType(platform),
    os: platform,
    arch: arch,
    capabilities,
    specs,
  };
}

/**
 * Infer device type from platform
 */
function inferDeviceType(platform: string): string {
  switch (platform) {
    case "linux":
      return "server";
    case "darwin":
      return "server";
    case "win32":
      return "server";
    case "android":
      return "mobile";
    default:
      return "embedded";
  }
}

/**
 * Check if a runtime is available
 */
function checkRuntimeAvailable(_runtime: string): boolean {
  // Placeholder - would check actual runtime availability
  // This would involve checking for installed libraries, environment variables, etc.
  try {
    // In production, this would check for actual runtime availability
    return false;
  } catch {
    return false;
  }
}

/**
 * Validate device profile for model compatibility
 */
export function validateDeviceProfile(
  profile: DeviceProfile,
  requirements: Partial<DeviceCapabilities>
): boolean {
  for (const [key, required] of Object.entries(requirements)) {
    if (required && !profile.capabilities[key as keyof DeviceCapabilities]) {
      return false;
    }
  }
  return true;
}
