export class EntradaUser {
    constructor(public readonly firstName: string, public readonly lastName: string, public readonly username: string,public readonly password: string, public readonly roles: string[]){
    }
}