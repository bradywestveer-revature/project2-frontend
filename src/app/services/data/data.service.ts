import { Injectable } from "@angular/core";
import { User } from "src/app/models/User";

@Injectable ({
	providedIn: "root"
})
export class DataService {
	public user : User = <User> {};
	
	public users : { [key : string] : User } = {};
	
	constructor () {}
}