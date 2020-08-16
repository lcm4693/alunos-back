import { Pais } from "src/domain/pais.domain";

export class EntradaAluno {

    constructor(public readonly codigoAluno, public readonly nome: string, public readonly pais: Pais){
    }
}