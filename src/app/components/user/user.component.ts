import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";

@Component ({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
	@Input ()
		user : User = <User> {};
	
	constructor (private router : Router) {}
	
	navigate = async () : Promise <any> => {
		//todo slow
		
		await this.router.navigateByUrl ("/", { skipLocationChange: true });

		this.router.navigate (["@" + this.user.username]);
	}
	
	ngOnInit () {}
}