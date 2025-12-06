"use strict";
/**
 * Runtime Selector
 * Automatically selects optimal runtime based on device capabilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectOptimalRuntime = selectOptimalRuntime;
exports.getAvailableRuntimes = getAvailableRuntimes;
/**
 * Select optimal runtime for device
 */
function selectOptimalRuntime(profile) {
    const capabilities = profile.capabilities;
    const candidates = [];
    // TensorRT (highest priority if available)
    if (capabilities.tensorrt) {
        candidates.push({ runtime: "tensorrt", available: true, priority: 10 });
    }
    // ONNX Runtime (good general purpose)
    if (capabilities.onnx_runtime) {
        candidates.push({ runtime: "onnx", available: true, priority: 8 });
    }
    // ExecuTorch (mobile/embedded)
    if (capabilities.executorch) {
        candidates.push({ runtime: "executorch", available: true, priority: 7 });
    }
    // WebGPU (browser)
    if (capabilities.webgpu) {
        candidates.push({ runtime: "webgpu", available: true, priority: 6 });
    }
    // WASM (fallback)
    if (capabilities.wasm) {
        candidates.push({ runtime: "wasm", available: true, priority: 5 });
    }
    // CPU (always available, lowest priority)
    candidates.push({ runtime: "cpu", available: true, priority: 1 });
    // Sort by priority and return highest
    candidates.sort((a, b) => b.priority - a.priority);
    return candidates[0]?.runtime || "cpu";
}
/**
 * Get all available runtimes for device
 */
function getAvailableRuntimes(profile) {
    const capabilities = profile.capabilities;
    const runtimes = [];
    if (capabilities.tensorrt)
        runtimes.push("tensorrt");
    if (capabilities.onnx_runtime)
        runtimes.push("onnx");
    if (capabilities.executorch)
        runtimes.push("executorch");
    if (capabilities.webgpu)
        runtimes.push("webgpu");
    if (capabilities.wasm)
        runtimes.push("wasm");
    runtimes.push("cpu"); // Always available
    return runtimes;
}
//# sourceMappingURL=runtime-selector.js.map