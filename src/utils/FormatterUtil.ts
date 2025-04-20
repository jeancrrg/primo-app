export function formatarTelefone(telefone: string): string {
    let telefoneFormatado: string = telefone.replace(/\D/g, "");

    if (telefoneFormatado.length <= 10) {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else {
        telefoneFormatado = telefoneFormatado.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    return telefoneFormatado;
}
