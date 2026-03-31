export interface LoginErrors  {
    email?: string;
    password?: string;
};

export interface RegisterErrors {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}