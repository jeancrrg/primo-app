export function formatarTelefone(telefone: string): string {
    let telefoneFormatado: string = obterApenasCaracteresNumeros(telefone);
    if (telefoneFormatado.length <= 10) {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }
    return telefoneFormatado;
}

export function formatarCNPJ(cnpj: string): string {
    let cnpjFormatado: string = obterApenasCaracteresNumeros(cnpj);
    if (cnpjFormatado.length === 14) {
        cnpjFormatado = cnpjFormatado.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    }
    return cnpjFormatado;
}

function obterApenasCaracteresNumeros(valor: string): string {
    return valor.replace(/\D/g, "");
}