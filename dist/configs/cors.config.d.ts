export declare const corsConfig: {
    origin: (origin: string | undefined, callback: (err: Error | null, ok?: boolean) => void) => void;
    credentials: boolean;
    methods: string[];
    optionsSuccessStatus: number;
};
