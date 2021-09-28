import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.model";

@Injectable()
export class UsersService {
    private users: User[] = [];
    insertUser(
        userName: string,
        password: string,
        phoneNumber: number,
        email: string,
        surName: string,
        name: string,
        dateOfBirth: Date,
        placeOfBirth: string,
        gender: string,
        ethenicType: string,
        address: string,
        roleID: string
    ) {
        const userID = Math.random().toString();
        const newUser = new User(
            userID,
            userName,
            password,
            phoneNumber,
            email,
            surName,
            name,
            dateOfBirth,
            placeOfBirth,
            gender,
            ethenicType,
            address,
            roleID
        );
        this.users.push(newUser);
        return userID;
    }
    getUsers() {
        return [...this.users];
    }
    getUserByID(userID: string) {
        const user = this.findUser(userID)[0];
        return { ...user };
    }
    updateProduct(
        userID: string,
        userName: string,
        password: string,
        phoneNumber: number,
        email: string,
        surName: string,
        name: string,
        dateOfBirth: Date,
        placeOfBirth: string,
        gender: string,
        ethenicType: string,
        address: string,
        roleID: string
    ) {
        const [user, index] = this.findUser(userID);
        const updateUser = { ...user };
        if (userName) {
            updateUser.userName = userName;
        }
        if (password) {
            updateUser.password = password;
        }
        if (phoneNumber) {
            updateUser.phoneNumber = phoneNumber;
        }
        if (email) {
            updateUser.email = email;
        }
        if (surName) {
            updateUser.surName = surName;
        }
        if (name) {
            updateUser.name = name;
        }
        if (dateOfBirth) {
            updateUser.dateOfBirth = dateOfBirth;
        }
        if (placeOfBirth) {
            updateUser.placeOfBirth = placeOfBirth;
        }
        if (gender) {
            updateUser.gender = gender;
        }
        if (ethenicType) {
            updateUser.ethenicType = ethenicType;
        }
        if (address) {
            updateUser.address = address;
        }
        if (roleID) {
            updateUser.roleID = roleID;
        }
        
        this.users[index] = updateUser;
    }


    private findUser(id: string): [User, number] {
        const userIndex = this.users.findIndex(user => user.userID = id)
        const user = this.users[userIndex];
        if (user == null) {
            throw new NotFoundException('Could not find product.');
        }
        return [user, userIndex];
    }
}