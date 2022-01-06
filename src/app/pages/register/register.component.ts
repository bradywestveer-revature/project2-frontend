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

	// firstnameErr: boolean = false;

	// lastnameErr: boolean = false;

	// emailErr: boolean = false;

	// usernameErr: boolean = false;

	// passErr: boolean = false;
	
	// user : User = <User> {
	// firstName: "",
	// lastName: "",
	// email: "",
	// username: "",
	// profileImageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	// };

	constructor (private apiServ: ApiService) {}

	ngOnInit () {}

	isValidEmail = (email : string) : boolean => {
		let success : boolean;

		let regexp = new RegExp (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
		success = regexp.test (email);
		
		return success;
	};
	// "[\\w-]+@[\\w-]+\\.[a-zA-z]+"
	// registerUserCallback (data: any) {
	// 	console.log ("registerUserCallback()");
	// 	console.log (data.message);
	// 	this.errorTextClass = "errorText reg-green";
	// 	this.errMessage = String (data.message);
	// 	//console.log(this.errMessage);
	// 	alert (data.message);
	// 	//this.router.navigate(data.redirect);
	// }
	
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
		// this.user.firstName = this.firstNameInput;
		// this.user.lastName = this.lastNameInput;
		// this.user.email = this.emailInput;
		// this.user.username = this.usernameInput;
		// this.user.password = this.passwordInput;
		// this.apiServ.createUser (this.user, (data : any) : void => {
		this.apiServ.createUser (<User> {
			firstName: this.firstNameInput,
			lastName: this.lastNameInput,
			email: this.emailInput,
			username: this.usernameInput,
			password: this.passwordInput
		});
		// }, (data : any) : void => {
		// this.errorTextClass = "errorText reg-green";
		// this.errMessage = String (data.message);
		// alert (data.message);
		// });
	};
}