import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";

@Component ({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
	host: {
		class: "page flex"
	}
})
export class LoginComponent implements OnInit {
	errorTextClass : string = "errorText login-white";

	errMessage : string = "Please Login";

	identifierInput : string = ""; // it can also be the email

	passwordInput : string = "";

	user : User = <User> {};
  
	constructor (private apiServ: ApiService, private dataServ: DataService) {}

	ngOnInit () {}
	
	keyDown = (event : KeyboardEvent) => {
		if (event.key === "Enter") {
			this.loginUser ();
		}
	};
	
	loginUser = () : void => {
		// validate fields
		this.errorTextClass = "errorText";

		this.errorTextClass = "errorText login-white";

		this.errMessage = "Please Login";
		
		this.apiServ.createSession (this.identifierInput, this.passwordInput, (data : any) : void => {
			localStorage ["userId"] = data.data.id;
		}, (data : any) : void => {
			this.errMessage = data.message;
		});
	}
}