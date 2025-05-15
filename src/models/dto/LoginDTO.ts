export class LoginDTO {
    codigoPessoa: number;
    token: string;

    constructor(codigoPessoa: number, token: string) {
        this.codigoPessoa = codigoPessoa;
        this.token = token;
    }
}