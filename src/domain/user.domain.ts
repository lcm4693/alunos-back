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
  roles: string[];

  public static converterUserSchematoUser(userSchema): User {
    if(!userSchema){
      return undefined;
    }
    const user = new User();
    user.id = userSchema.id;
    user.firstName = userSchema.firstName;
    user.lastName = userSchema.lastName;
    user.username = userSchema.username;
    // user.password = userSchema.password;
    user.roles = userSchema.roles;

    return user;
  }

  public static converterEntradaUsertoUser(entradaUser: EntradaUser): User {
    if(!entradaUser){
      return undefined;
    }
    const user = new User();
    user.firstName = entradaUser.firstName;
    user.lastName = entradaUser.lastName;
    user.username = entradaUser.username;
    user.password = entradaUser.password;
    user.roles = entradaUser.roles;

    return user;
  }
}

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  roles: [String],
});
