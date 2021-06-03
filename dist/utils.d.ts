export declare const fromEntries: {
    <T = any>(entries: Iterable<readonly [PropertyKey, T]>): {
        [k: string]: T;
    };
    (entries: Iterable<readonly any[]>): any;
};
export declare function safeKeys<T>(obj: T): Extract<keyof T, string>[];
export declare function safeEntries<T>(obj: T): [keyof T, T[keyof T]][];
