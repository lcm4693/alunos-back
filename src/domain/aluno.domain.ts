import { Pais } from "./pais.domain";

export class Aluno {

    constructor(public readonly nome: string, public readonly pais: Pais){
    }
}