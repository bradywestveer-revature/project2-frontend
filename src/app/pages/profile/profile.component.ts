import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	constructor (private router : ActivatedRoute) {}
	
	ngOnInit () : void {
		this.router.params.subscribe (paramaters => {
			// paramaters ["username"]
		});
	}
}
