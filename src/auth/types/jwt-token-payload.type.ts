export type JwtTokenPayload = {
    sub: number
    email: string
}

export interface JwtPayloadWithExp extends JwtTokenPayload {
    iat: number
    exp: number
}
