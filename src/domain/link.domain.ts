import { Pais } from "./pais.domain";

export class Link {

    constructor(public readonly codigo: number, public readonly titulo: string, public imagemCapa: string , public readonly endereco: string){
    }
}