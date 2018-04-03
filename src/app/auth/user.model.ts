export class User {
    firstName: String;
    lastName: String;
    password: String;
    email: String;
    hackathons?: any;
    university?: String;
    picture?: any;
    bio?: any;



    constructor(firstName: string, lastName: string, password: string, email: string, hackathons?: any, university?: any,
        picture?: any, bio?: any) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.hackathons = hackathons;
        this.university = university;
        this.picture = picture;
        this.bio = bio;
    }
}
