/**
 * Runtime Selector
 * Automatically selects optimal runtime based on device capabilities
 */

import { DeviceProfile, DeviceCapabilities } from './device-profiling';

export type RuntimeType = 'onnx' | 'tensorrt' | 'executorch' | 'webgpu' | 'wasm' | 'cpu';

export interface RuntimeCapability {
  runtime: RuntimeType;
  available: boolean;
  priority: number; // Higher = better for this device
}

/**
 * Select optimal runtime for device
 */
export function selectOptimalRuntime(profile: DeviceProfile): RuntimeType {
  const capabilities = profile.capabilities;
  const candidates: RuntimeCapability[] = [];

  // TensorRT (highest priority if available)
  if (capabilities.tensorrt) {
    candidates.push({ runtime: 'tensorrt', available: true, priority: 10 });
  }

  // ONNX Runtime (good general purpose)
  if (capabilities.onnx_runtime) {
    candidates.push({ runtime: 'onnx', available: true, priority: 8 });
  }

  // ExecuTorch (mobile/embedded)
  if (capabilities.executorch) {
    candidates.push({ runtime: 'executorch', available: true, priority: 7 });
  }

  // WebGPU (browser)
  if (capabilities.webgpu) {
    candidates.push({ runtime: 'webgpu', available: true, priority: 6 });
  }

  // WASM (fallback)
  if (capabilities.wasm) {
    candidates.push({ runtime: 'wasm', available: true, priority: 5 });
  }

  // CPU (always available, lowest priority)
  candidates.push({ runtime: 'cpu', available: true, priority: 1 });

  // Sort by priority and return highest
  candidates.sort((a, b) => b.priority - a.priority);
  return candidates[0]?.runtime || 'cpu';
}

/**
 * Get all available runtimes for device
 */
export function getAvailableRuntimes(profile: DeviceProfile): RuntimeType[] {
  const capabilities = profile.capabilities;
  const runtimes: RuntimeType[] = [];

  if (capabilities.tensorrt) runtimes.push('tensorrt');
  if (capabilities.onnx_runtime) runtimes.push('onnx');
  if (capabilities.executorch) runtimes.push('executorch');
  if (capabilities.webgpu) runtimes.push('webgpu');
  if (capabilities.wasm) runtimes.push('wasm');
  runtimes.push('cpu'); // Always available

  return runtimes;
}
