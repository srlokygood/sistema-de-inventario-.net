export interface Login {
    username: string;
    password: string;
}

export interface Token {
    token: number;
    expiresAt: string;
    status: boolean;
}