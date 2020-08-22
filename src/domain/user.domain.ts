import { Timezone } from './timezone.domain';
import { EntradaUser } from './../dto/entrada-user.dto';
import { Pais, PaisSchema } from './pais.domain';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { TimeoutError } from 'rxjs';
export class User {
  id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  padrao24: boolean;
  locale: Timezone;
  roles: string[];

  //Dados de sessão
  access_token: string;

  public static converterUserSchematoUser(userSchema): User {
    if(!userSchema){
      return undefined;
    }
    const user = new User();
    user.id = userSchema._id;
    user.firstName = userSchema.firstName;
    user.lastName = userSchema.lastName;
    user.username = userSchema.username;
    // user.password = userSchema.password;
    // user.locale = userSchema.locale;
    user.padrao24 = userSchema.padrao24;

    user.roles = userSchema.roles;
    return user;
  }

  public static converterUserSchemaToUsers(value: User[]): User[] {
    let retorno: User[] = [];
    for (const user of value) {
      retorno.push(User.converterUserSchematoUser(user));
    }
    return retorno;
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
    // user.locale = entradaUser.timezone;
    user.padrao24 = entradaUser.padrao24;
    user.roles = entradaUser.roles;

    return user;
  }
}

export const UserSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  padrao24: Boolean,
  locale: { type: mongoose.Schema.ObjectId, ref: Timezone.name },
  roles: [String],
});
