
export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: string;
    roles:    string[];
    token:    string;
}
