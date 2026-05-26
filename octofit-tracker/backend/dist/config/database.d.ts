export declare const connectDatabase: () => Promise<void>;
export declare const disconnectDatabase: () => Promise<void>;
export declare const getDatabaseUri: () => string;
export declare const getDatabaseName: () => string;
declare const _default: {
    uri: string;
    name: string;
    connect: () => Promise<void>;
    disconnect: () => Promise<void>;
};
export default _default;
//# sourceMappingURL=database.d.ts.map