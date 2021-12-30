import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input ()
	// user : User = <User> {};
	public user : User = <User> {
		firstName: "Kevin",
		lastName: "Childs",
		username: "kchilds",
    email: "me@example.com",
		profileImageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	};

  hidden: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
