import { isEmpty } from "./ValidationUtil";

export function formatarNome(nome: string | undefined): string {
    if (isEmpty(nome)) {
        return '';
    }
    return nome!
            .toLowerCase()
            .split(' ')
            .map(palavra =>
                palavra.charAt(0).toUpperCase() + palavra.slice(1)
            )
            .join(' ');;
}

export function formatarTelefone(telefone: string | undefined): string {
    if (isEmpty(telefone)) {
        return '';
    }
    let telefoneFormatado: string = obterApenasCaracteresNumeros(telefone!);
    if (telefoneFormatado.length <= 10) {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    return telefoneFormatado;
}

export function formatarCNPJ(cnpj: string | undefined): string {
    if (isEmpty(cnpj)) {
        return '';
    }
    let cnpjFormatado: string = obterApenasCaracteresNumeros(cnpj!);
    if (cnpjFormatado.length === 14) {
        cnpjFormatado = cnpjFormatado.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }
    return cnpjFormatado;
}

export function formatarCPF(cpf: string | undefined): string {
    if (isEmpty(cpf)) {
        return '';
    }
    let cpfFormatado: string = obterApenasCaracteresNumeros(cpf!);
    if (cpfFormatado.length === 11) {
        cpfFormatado = cpfFormatado.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
    }
    return cpfFormatado;
}

function obterApenasCaracteresNumeros(valor: string): string {
    return valor.replace(/\D/g, "");
}
