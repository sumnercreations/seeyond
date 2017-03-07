export class User {
  uid: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;

  public getFullname() {
    return this.firstname + ' ' + this.lastname;
  }
}
