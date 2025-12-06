/**
 * Edge Node Deployment
 * Brand-neutral deployment utilities and templates
 */
export interface DeploymentConfig {
    nodeId: string;
    nodeKey: string;
    cloudApiUrl: string;
    dataDir: string;
    heartbeatInterval?: number;
    syncInterval?: number;
}
export interface DeploymentTemplate {
    dockerfile: string;
    dockerCompose: string;
    kubernetes: string;
    systemd: string;
}
/**
 * Generate Dockerfile template
 */
export declare function generateDockerfile(config: DeploymentConfig): string;
/**
 * Generate docker-compose template
 */
export declare function generateDockerCompose(config: DeploymentConfig): string;
/**
 * Generate Kubernetes deployment template
 */
export declare function generateKubernetesDeployment(config: DeploymentConfig): string;
//# sourceMappingURL=deployment.d.ts.map