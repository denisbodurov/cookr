export interface User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    image: string;
}

export interface UpdateUser {
    firstName: string;
    lastName: string;
    image: string;
}