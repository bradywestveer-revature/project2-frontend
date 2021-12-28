import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
	@Input ()
	// user : User = <User> {};
	public user : User = <User> {
		firstName: "Kevin",
		lastName: "Childs",
		username: "kchilds",
		profileImageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	};
	
	constructor () {}
	
	ngOnInit(): void {}
}