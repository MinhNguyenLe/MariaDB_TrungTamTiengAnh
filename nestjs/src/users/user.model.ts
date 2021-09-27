export class User {
    constructor(
        public userID: string,
        public userName: string,
        public password: string,
        public phoneNumber: number,
        public email: string,
        public surName: string,
        public name: string,
        public dateOfBirth: Date,
        public placeOfBirth: string,
        public gender:string,
        public ethenicType: string,
        public address: string,
        public roleID: string
    ) { }
}