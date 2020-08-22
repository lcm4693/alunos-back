export class EntradaUser {
    constructor(public readonly firstName: string, public readonly lastName: string, public readonly username: string,public readonly password: string, public readonly timezone: string, public readonly padrao24: boolean, public readonly roles: string[]){
    }
}