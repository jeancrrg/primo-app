export class LoginDTO {
    codigoUsuario: number;
    token: string;

    constructor(codigoUsuario: number, token: string) {
        this.codigoUsuario = codigoUsuario;
        this.token = token;
    }
}