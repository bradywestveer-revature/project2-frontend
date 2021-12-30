import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	host: {
		class: "page flex"
	}
})
export class ProfileComponent implements OnInit {
	constructor (private router : ActivatedRoute) {}
	
	username : string = "";
	
	email : string = "me@example.com";

	hidden: boolean = false;
	
	ngOnInit () : void {
		this.router.params.subscribe (paramaters => {
			this.username = paramaters ["username"];
		});
	}

}
