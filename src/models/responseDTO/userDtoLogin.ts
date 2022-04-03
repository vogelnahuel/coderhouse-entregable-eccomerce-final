import { User } from "../../interfaces/usersInterfaces";
export class UserDtoLogin {
    _id:string;
    email: string;
    name: string;
    password:string
    constructor(user:User){
        this._id=user._id;
        this.email=user.email;
        this.name=user.name;
        this.password=user.password;
    }
}