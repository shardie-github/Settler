"use strict";
/**
 * Device Profiling
 * Detects device capabilities and generates profiles for model optimization
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectDeviceCapabilities = detectDeviceCapabilities;
exports.generateDeviceProfile = generateDeviceProfile;
exports.validateDeviceProfile = validateDeviceProfile;
const os = __importStar(require("os"));
/**
 * Detect device capabilities automatically
 */
function detectDeviceCapabilities() {
    // Basic detection - can be enhanced with actual hardware detection
    return {
        cpu: true, // Always available
        gpu: false, // Would need actual detection
        npu: false, // Would need actual detection
        tpu: false, // Would need actual detection
        onnx_runtime: checkRuntimeAvailable('onnx'),
        tensorrt: checkRuntimeAvailable('tensorrt'),
        executorch: checkRuntimeAvailable('executorch'),
        webgpu: checkRuntimeAvailable('webgpu'),
        wasm: checkRuntimeAvailable('wasm'),
    };
}
/**
 * Generate device profile
 */
function generateDeviceProfile(deviceType) {
    const platform = os.platform();
    const arch = os.arch();
    const capabilities = detectDeviceCapabilities();
    const cpuModel = os.cpus()[0]?.model;
    return {
        deviceType: deviceType || inferDeviceType(platform),
        os: platform,
        arch: arch,
        capabilities,
        specs: {
            ...(cpuModel !== undefined && { cpuModel }),
            ramGb: Math.round(os.totalmem() / 1024 / 1024 / 1024),
        },
    };
}
/**
 * Infer device type from platform
 */
function inferDeviceType(platform) {
    switch (platform) {
        case 'linux':
            return 'server';
        case 'darwin':
            return 'server';
        case 'win32':
            return 'server';
        case 'android':
            return 'mobile';
        default:
            return 'embedded';
    }
}
/**
 * Check if a runtime is available
 */
function checkRuntimeAvailable(_runtime) {
    // Placeholder - would check actual runtime availability
    // This would involve checking for installed libraries, environment variables, etc.
    try {
        // In production, this would check for actual runtime availability
        return false;
    }
    catch {
        return false;
    }
}
/**
 * Validate device profile for model compatibility
 */
function validateDeviceProfile(profile, requirements) {
    for (const [key, required] of Object.entries(requirements)) {
        if (required && !profile.capabilities[key]) {
            return false;
        }
    }
    return true;
}
//# sourceMappingURL=device-profiling.js.map