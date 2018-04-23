export class Hackathon {
    title: string;
    location: string;
    description: string;
    startDay: Date;
    length: Number;
    universityHost: String;
    universityPicture: String;
    hackathonUrl: String;


    constructor(
    title: string,
    location: string,
    description: string,
    startDay: Date,
    length: Number,
    universityHost: String,
    universityPicture: String,
    hackathonUrl: String) {

        this.title = title;
        this.location = location;
        this.description = description;
        this.startDay = startDay;
        this.length = length;
        this.universityHost = universityHost;
        this.universityPicture = universityPicture;
        this.hackathonUrl = hackathonUrl;
    }
}
