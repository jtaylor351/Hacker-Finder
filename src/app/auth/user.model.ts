export class User {
    firstName: String;
    lastName: String;
    password: String;
    email: String;
    hackathons?: any;
    school?: String;
    picture?: any;
    skills?: any;



    constructor(firstName: string, lastName: string, password: string, email: string, hackathons?: any, school?: any,
        picture?: any, skills?: any) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.hackathons = hackathons;
        this.school = school;
        this.picture = picture;
        this.skills = skills;
    }
}
