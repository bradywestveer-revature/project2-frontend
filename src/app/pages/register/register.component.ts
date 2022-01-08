import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api/api.service";

@Component ({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
	host: {
		class: "page flex"
	}
})
export class RegisterComponent implements OnInit {
	errorTextClass: string = "errorText";

	errMessage: string = "";

	firstNameInput: string = "";

	lastNameInput : string = "";

	emailInput: string = "";

	usernameInput : string = "";

	passwordInput : string = "";

	confirmPasswordInput : string = "";

	constructor (private apiServ: ApiService) {}

	ngOnInit () {}

	isValidEmail = (email : string) : boolean => {
		let success : boolean;

		let regexp = new RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		success = regexp.test (email);
		
		return success;
	};
	
	keyDown = (event : KeyboardEvent) => {
		if (event.key === "Enter") {
			this.registerUser ();
		}
	};
	
	registerUser = () => {
		// field validation, lengths and make sure retyped password matches
		this.errorTextClass = "errorText";
		if (this.firstNameInput.length < 1) {
			// this.firstnameErr = true;
			this.errMessage = "First name can not be blank.";
			return;
		}
		else {
			// this.firstnameErr = false;
			this.errMessage = "";
		}

		if (this.lastNameInput.length < 1) {
			// this.lastnameErr = true;
			this.errMessage = "Last name can not be blank.";
			return;
		}
		else {
			// this.lastnameErr = false;
			this.errMessage = "";
		}

		if (!this.isValidEmail (this.emailInput)) {
			// this.emailErr = true;
			this.errMessage = "Invalid e-mail address.";
			return;
		}
		else {
			// this.emailErr = false;
			this.errMessage = "";
		}

		if (this.usernameInput.trim () === "" || (/^[\w-]+$/).test (this.usernameInput) === false) {
			// this.usernameErr = true;
			this.errMessage = "Invalid username.";
			return;
		}
		else {
			// this.usernameErr = false;
			this.errMessage = "";
		}
		if (this.passwordInput != this.confirmPasswordInput) {
			// this.passErr = true;
			this.errMessage = "Passwords do not match.";
			return;
		}
		else {
			// this.passErr = false;
			this.errMessage = "";
		}

		if (this.passwordInput.trim () === "") {
			// this.passErr = true;
			this.errMessage = "Invalid password.";
			return;
		}
		else {
			// this.passErr = false;
			this.errMessage = "";
		}
	  
		// if we got this far its safe to register our user

		this.apiServ.createUser (<User> {
			firstName: this.firstNameInput,
			lastName: this.lastNameInput,
			email: this.emailInput,
			username: this.usernameInput,
			password: this.passwordInput
		});
	};
}