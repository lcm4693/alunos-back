import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export class Pais {
    public codigo: number;
    public nome: string;

    constructor(nomePais: string){
        this.nome = nomePais;
    }
}
export const PaisSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
});