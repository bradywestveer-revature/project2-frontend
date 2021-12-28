import { Injectable } from '@angular/core';
import { User } from "src/app/models/User";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	public user : User = <User> {
		firstName: "Kevin",
		lastName: "Childs",
		username: "kchilds",
		profileImageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	};
	
	constructor () {}
}