import { EntradaUser } from './../dto/entrada-user.dto';
import { Pais, PaisSchema } from './pais.domain';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  access_token: string;

  public static converterEntradaUsertoUser(entradaUser: EntradaUser): User {
    const user = new User();
    user.firstName = entradaUser.firstName;
    user.lastName = entradaUser.lastName;
    user.username = entradaUser.username;
    user.password = entradaUser.password;

    return user;
  }
}

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
});
