import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  host: {
    class: "page flexColumn"
  }
})
export class ChangePasswordComponent implements OnInit {

  errorTextClass : string = "errorText white";
  errMessage : string = "Password Reset";
  passwordInput : string = "";
  confirmPasswordInput : string = "";

  token: string = "";
  
  constructor(private apiServ: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.token = params['token'];
        console.log(this.token); // price
      }
    );
  }

  keyDown = (event : KeyboardEvent) => {
		if (event.key === "Enter") {
			this.changePassword ();
		}
	};

  changePassword = ():void => {
    this.errorTextClass = "errorText";
    if (this.passwordInput != this.confirmPasswordInput) {
			// this.passErr = true;      
			this.errMessage = "Passwords do not match.";
			return;
		}
		else {
			// this.passErr = false;
			this.errMessage = "";
		}

		if (this.passwordInput.length < 1) {
			// this.passErr = true;
			this.errMessage = "Invalid password.";
			return;
		}
		else {
			// this.passErr = false;
			this.errMessage = "";
		}    
    this.apiServ.changePassword(this.token, this.passwordInput, 
      (data:any) : void => {
      this.errMessage = data.message;
    },
    (data:any) : void => {
      this.errMessage = data.message;
    });
  }

}
