export class LoginDTO {
    login: string;
    senha: string;

    constructor(login: string, senha: string) {
        this.login = login;
        this.senha = senha;
    }
}