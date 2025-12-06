/**
 * Device Profiling
 * Detects device capabilities and generates profiles for model optimization
 */
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
export declare function detectDeviceCapabilities(): DeviceCapabilities;
/**
 * Generate device profile
 */
export declare function generateDeviceProfile(deviceType?: string): DeviceProfile;
/**
 * Validate device profile for model compatibility
 */
export declare function validateDeviceProfile(profile: DeviceProfile, requirements: Partial<DeviceCapabilities>): boolean;
//# sourceMappingURL=device-profiling.d.ts.map