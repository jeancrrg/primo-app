export function isNotEmpty(valor: any): boolean {
    return !isEmpty(valor);
}

export function isEmpty(valor: any): boolean {
    if (objectEmpty(valor)) {
        return true;
    }
    if (isString(valor)) {
        return stringEmpty(valor + "");
    }
    if (isArray(valor)) {
        return arrayEmpty(valor);
    }
    return false;
}

export function objectEmpty(value: any): boolean {
    return (
        !value ||
        value == null ||
        value == undefined ||
        value == "null" ||
        value == "undefined"
    );
}

export function isString(valor: any): boolean {
    return typeof valor === "string" || valor instanceof String;
}

export function stringEmpty(valor: string): boolean {
    return valor.trim() == "" || valor.trim().length == 0;
}

export function isArray(valor: any): boolean {
    return Array.isArray(valor);
}

export function arrayEmpty(valor: any[]): boolean {
    return valor.length == 0;
}
