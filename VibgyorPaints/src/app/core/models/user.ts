export interface Role {
    id: number;
    role: string;
}
export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: number;
    location: string;
    role: Role;
    approved: boolean;
    deleted: boolean;
}
