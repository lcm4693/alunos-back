import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export class Pais {
    public codigo: number;
    public nome: string;
    public nameEnglish: string;
    public nameFrench: string;

    constructor(nomePais: string, readonly _nameEnglish: string, _nameFrench: string){
        this.nome = nomePais;
        this.nameEnglish = _nameEnglish;
        this.nameFrench = _nameFrench;
    }
}
export const PaisSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    nameEnglish: String,
    nameFrench: String,
});