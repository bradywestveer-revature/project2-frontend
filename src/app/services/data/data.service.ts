import { Injectable } from '@angular/core';
import { User } from "src/app/models/User";

@Injectable({
	providedIn: 'root'
})
export class DataService {
	public user : User = <User> {
		id: 1,
		firstName: "Kevin",
		lastName: "C",
		username: "kevinc",
		profileImageUrl: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
	};
	
	//todo
	// public users : User [] = [];
	//todo use more descriptive type than just any
	public users : any = {
		1: <User> {
			id: 1,
			firstName: "Kevin",
			lastName: "C",
			username: "kevinc",
			email: "kevin@example.com",
			profileImageUrl: "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
		},
		
		2: <User> {
			firstName: "David",
			lastName: "H",
			username: "davidh",
			email: "david@example.com",
			profileImageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
		},
		
		3: <User> {
			firstName: "Jason",
			lastName: "C",
			username: "jasonc",
			email: "jason@example.com",
			profileImageUrl: "https://i.stack.imgur.com/34AD2.jpg"
		},
		
		4: <User> {
			firstName: "Brady",
			lastName: "W",
			username: "bradyw",
			email: "brady@example.com",
			profileImageUrl: "https://i.pinimg.com/474x/76/94/84/769484dafbe89bf2b8a22379658956c4.jpg"
		}
	};
	
	constructor () {}
}