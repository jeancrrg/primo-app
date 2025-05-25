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

export function formatarCPF(cpf: string): string {
    let cpfFormatado: string = obterApenasCaracteresNumeros(cpf);

    // Verifica se tem 11 dígitos e se não são todos iguais (ex: 111.111.111-11)
    if (!/^\d{11}$/.test(cpfFormatado) || /^(\d)\1{10}$/.test(cpfFormatado)) {
        return '';
    }

    // const baseCPF = cpfLimpo.slice(0, 9);
    // const digito1 = calcularDigito(baseCPF, 10);
    // const digito2 = calcularDigito(baseCPF + digito1, 11);

    // return cpfLimpo === baseCPF + digito1.toString() + digito2.toString();
    return '';
}

function calcularDigitoCpf(base: string, fator: number): number {
    const soma = base
        .split('')
        .map((num, idx) => parseInt(num) * (fator - idx))
        .reduce((acc, curr) => acc + curr, 0);
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
};