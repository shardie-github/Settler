/**
 * Runtime Selector
 * Automatically selects optimal runtime based on device capabilities
 */
import { DeviceProfile } from './device-profiling';
export type RuntimeType = 'onnx' | 'tensorrt' | 'executorch' | 'webgpu' | 'wasm' | 'cpu';
export interface RuntimeCapability {
    runtime: RuntimeType;
    available: boolean;
    priority: number;
}
/**
 * Select optimal runtime for device
 */
export declare function selectOptimalRuntime(profile: DeviceProfile): RuntimeType;
/**
 * Get all available runtimes for device
 */
export declare function getAvailableRuntimes(profile: DeviceProfile): RuntimeType[];
//# sourceMappingURL=runtime-selector.d.ts.map