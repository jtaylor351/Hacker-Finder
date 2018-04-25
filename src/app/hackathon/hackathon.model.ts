export class Hackathon {
    title: string;
    location: string;
    description: string;
    startDay: Date;
    length: Number;
    universityHost: String;
    universityPicture: String;
    hackathonUrl: String;
    users?: string[];


    constructor(
    title: string,
    location: string,
    description: string,
    startDay: Date,
    endDate: Date,
    universityHost: String,
    universityPicture: String,
    hackathonUrl: string,
    users?: string[]) {

        this.title = title;
        this.location = location;
        this.description = description;
        this.startDay = startDay;
        this.length = length;
        this.universityHost = universityHost;
        this.universityPicture = universityPicture;
        this.hackathonUrl = hackathonUrl;
        this.users = users;
    }
}
