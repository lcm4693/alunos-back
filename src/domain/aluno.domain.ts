import { User } from './user.domain';
import { Pais, PaisSchema } from "./pais.domain";
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
export class Aluno {
    
    public _id: string;
    public nome: string;
    public pais: Pais;
    public professor: User;
    public observacoes: string[];
    public interesses: string[];

    // public links: Link[];
    
    constructor(nome: string, pais: Pais, professor: User){
        this.nome = nome;
        this.pais = pais;
        this.professor = professor;
    }
}

export const AlunoSchema = new mongoose.Schema({
    nome: String,
    pais: { type: mongoose.Schema.ObjectId, ref: Pais.name },
    professor: { type: mongoose.Schema.ObjectId, ref: User.name },
    observacoes: [String],
    interesses: [String]
});