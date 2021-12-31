import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/User";

@Component ({
	selector: "app-user",
	templateUrl: "./user.component.html",
	styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
	@Input ()
		user : User = <User> {};
	
	constructor () {}
	
	ngOnInit () : void {}
}