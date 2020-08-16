import { Document } from "mongoose";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export class Pais {
    public _id: string;
    public nome: string;
    public nameEnglish: string;
    public nameFrench: string;
    public flag: string;

    constructor(nomePais: string, readonly _nameEnglish: string, _nameFrench: string, _flag: string){
        this.nome = nomePais;
        this.nameEnglish = _nameEnglish;
        this.nameFrench = _nameFrench;
        this.flag = _flag;
    }
}
export const PaisSchema = new mongoose.Schema({
    codigo: Number,
    nome: String,
    nameEnglish: String,
    nameFrench: String,
    flag: String,
});