import { AbortController } from 'node-abort-controller';
import { Span } from '../interfaces';
export interface LockManagerOptions {
    lockRenewTime: number;
    lockDuration: number;
    workerId: string;
    workerName?: string;
}
/**
 * Minimal interface that LockManager needs from Worker.
 * This allows LockManager to access worker methods without inheriting from QueueBase.
 */
export interface LockManagerWorkerContext {
    /**
     * Extends locks for multiple jobs.
     */
    extendJobLocks(jobIds: string[], tokens: string[], duration: number): Promise<string[]>;
    /**
     * Emits events to worker listeners.
     */
    emit(event: string | symbol, ...args: any[]): boolean;
    /**
     * Wraps code with telemetry tracing.
     */
    trace<T>(spanKind: any, operation: string, destination: string, callback: (span?: Span) => Promise<T> | T): Promise<T> | T;
    /**
     * Queue name for telemetry.
     */
    name: string;
}
/**
 * Manages lock renewal for BullMQ workers.
 * It periodically extends locks for active jobs to prevent them from being
 * considered stalled by other workers.
 */
export declare class LockManager {
    protected worker: LockManagerWorkerContext;
    protected opts: LockManagerOptions;
    protected lockRenewalTimer?: NodeJS.Timeout;
    protected trackedJobs: Map<string, {
        token: string;
        ts: number;
        abortController?: AbortController;
    }>;
    protected closed: boolean;
    constructor(worker: LockManagerWorkerContext, opts: LockManagerOptions);
    /**
     * Starts the lock manager timers for lock renewal.
     */
    start(): void;
    protected extendLocks(jobIds: string[]): Promise<void>;
    private startLockExtenderTimer;
    /**
     * Stops the lock manager and clears all timers.
     */
    close(): Promise<void>;
    /**
     * Adds a job to be tracked for lock renewal.
     * Returns an AbortController if shouldCreateController is true, undefined otherwise.
     */
    trackJob(jobId: string, token: string, ts: number, shouldCreateController?: boolean): AbortController | undefined;
    /**
     * Removes a job from lock renewal tracking.
     */
    untrackJob(jobId: string): void;
    /**
     * Gets the number of jobs currently being tracked.
     */
    getActiveJobCount(): number;
    /**
     * Checks if the lock manager is running.
     */
    isRunning(): boolean;
    /**
     * Cancels a specific job by aborting its signal.
     * @param jobId - The ID of the job to cancel
     * @param reason - Optional reason for the cancellation
     * @returns true if the job was found and cancelled, false otherwise
     */
    cancelJob(jobId: string, reason?: string): boolean;
    /**
     * Cancels all tracked jobs by aborting their signals.
     * @param reason - Optional reason for the cancellation
     */
    cancelAllJobs(reason?: string): void;
    /**
     * Gets a list of all tracked job IDs.
     * @returns Array of job IDs currently being tracked
     */
    getTrackedJobIds(): string[];
}
