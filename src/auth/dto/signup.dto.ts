export class SignupDTO {
    username: string;
    email: string;
    password: string;
    fullname: string;
  
    constructor(data: {
      username: string;
      email: string;
      password: string;
      fullname: string;
    }) {
      this.username = data.username;
      this.email = data.email;
      this.password = data.password;
      this.fullname = data.fullname;
    }
  }
  