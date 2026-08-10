export interface LoginResponse {
	access_token: string;
}

export interface RegisterResponse {
	access_token: string;
}

export interface AuthRegisterPayload {
	email: string;
	name: string;
	password: string;
}