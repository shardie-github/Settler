/**
 * Edge Node Service
 * Main service orchestrating local reconciliation, AI inference, and cloud sync
 */
export interface EdgeNodeConfig {
    nodeKey: string;
    cloudApiUrl: string;
    dataDir: string;
}
export interface EnrollmentRequest {
    enrollmentKey: string;
    name: string;
    deviceType: string;
}
export interface EnrollmentResult {
    nodeId: string;
    nodeKey: string;
}
export interface NodeStatus {
    nodeId?: string;
    status: string;
    lastHeartbeat?: string;
    jobsProcessed?: number;
    localStorageUsed?: number;
}
export declare class EdgeNodeService {
    private nodeKey;
    private cloudApi;
    private db;
    private dataDir;
    private nodeId?;
    private isRunning;
    private ingestionService;
    private matchingService;
    private anomalyDetectionService;
    private syncService;
    private modelManager;
    private piiRedactionService;
    private heartbeatInterval?;
    private syncInterval?;
    constructor(config: EdgeNodeConfig);
    private initializeDatabase;
    enroll(request: EnrollmentRequest): Promise<EnrollmentResult>;
    start(): Promise<void>;
    stop(): Promise<void>;
    private startHeartbeat;
    private sendHeartbeat;
    private startSync;
    processIngestion(data: unknown[], schemaHints?: Record<string, string>): Promise<string>;
    processMatching(sourceData: unknown[], targetData: unknown[]): Promise<string[]>;
    detectAnomalies(data: unknown[]): Promise<string[]>;
    getStatus(): Promise<NodeStatus>;
    private getStorageSize;
    private getDeviceInfo;
    saveNodeKey(nodeKey: string): Promise<void>;
}
//# sourceMappingURL=EdgeNodeService.d.ts.map