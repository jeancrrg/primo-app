export enum ErroFirebaseEnum {
    CREDENCIAIS_LOGIN_INVALIDAS = 'auth/invalid-login-credentials',
    CREDENCIAIS_INVALIDAS = 'auth/invalid-credentials',
    USUARIO_NAO_ENCONTRADO = 'auth/user-not-found',
    MUITAS_REQUISICOES = 'auth/too-many-requests',
    EMAIL_JA_CADASTRADO = 'auth/email-already-in-use'
}