export type State = {
    status: string;
    errors: {
        email?: string[];
        name?: string[];
        password?: string[];
    };
    message: string;
};