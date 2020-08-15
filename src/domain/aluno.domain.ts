import { Pais, PaisSchema } from "./pais.domain";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
export class Aluno {
    
    public codigoAluno: number;
    public nome: string;
    public pais: Pais;
    public observacoes: string[];
    public interesses: string[];

    // public links: Link[];
    
    constructor(nome: string, pais: Pais){
        this.nome = nome;
        this.pais = pais;
    }
}

export const AlunoSchema = new mongoose.Schema({
    codigoAluno: Number,
    nome: String,
    pais: { type: mongoose.Schema.ObjectId, ref: Pais.name },
    observacoes: [String],
    interesses: [String]
});