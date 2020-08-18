export class RolesSystem {
  static readonly ADMIN = 'ADMIN';
  static readonly ALUNO = 'ALUNO';
  static readonly PROFESSOR = 'PROFESSOR';

  static getValores(){
    return [RolesSystem.ADMIN, RolesSystem.ALUNO, RolesSystem.PROFESSOR];
  }
}
