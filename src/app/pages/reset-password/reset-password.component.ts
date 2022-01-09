import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  host: {
    class: "page flexColumn"
  }
})
export class ResetPasswordComponent implements OnInit {

  errorTextClass : string = "errorText white";
  errMessage: string = "Forgot Password";
  emailInput: string = "";

  constructor(private apiServ:ApiService) { }

  ngOnInit(): void {
    this.errMessage = "Forgot Password?";
  }

  isValidEmail = (email : string) : boolean => {
		let success : boolean;

		let regexp = new RegExp ("[\\w-\]+@[\\w-]+\\.[a-zA-z\]+");
		success = regexp.test (email);
		
		return success;
	};

  keyDown = (event : KeyboardEvent) => {
		if (event.key === "Enter") {
			this.resetPassword ();
		}
	};

  resetPassword = () => {
    if (!this.isValidEmail(this.emailInput)) {
      this.errorTextClass = "errorText";
      this.errMessage = "Invalid e-mail address.";
      return;
    }
    this.errorTextClass = "errorText white";
    this.errMessage = "Sending password reset e-mail link, please be patient..."
    this.apiServ.resetPassword(this.emailInput, 
      (data:any) : void => {
        this.errorTextClass = "errorText white";
        this.errMessage = data.message;
      },
      (data:any) : void => {
        this.errorTextClass = "errorText";
        this.errMessage = data.message;
      })
  }

}
