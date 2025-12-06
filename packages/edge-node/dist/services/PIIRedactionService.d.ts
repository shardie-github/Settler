/**
 * PII Redaction Service
 * Redacts or tokenizes PII data before sending to cloud
 */
export declare class PIIRedactionService {
    private tokenMap;
    redact(value: string, piiType: string): string;
    restore(token: string): string | null;
    clear(): void;
}
//# sourceMappingURL=PIIRedactionService.d.ts.map