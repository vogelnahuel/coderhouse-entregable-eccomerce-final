import { User } from "../../interfaces/usersInterfaces";

export class UserDto {
    _id:string;
    email: string;
    name: string;

    constructor(user:User){
        this._id=user._id;
        this.email=user.email;
        this.name=user.name;

    }
}