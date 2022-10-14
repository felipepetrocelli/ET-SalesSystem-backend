
export interface IUserToken {
    userId: string,
    token: string,
    expiresIn?: Date
}

export interface IUserTokenResponse {
    email: string,
    token: string,
    id: string
}
export interface IUserLogin {
    email: string,
    password: string
}