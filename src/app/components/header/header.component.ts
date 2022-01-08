import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";

@Component ({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
	constructor (public dataService : DataService, private apiService : ApiService, private router : Router) {}
	
	navigateToMain = async () : Promise <any> => {
		
		await this.router.navigateByUrl ("/login", { skipLocationChange: true });
		
		this.router.navigate (["/"]);
	}
	
	logout = () : void => {
		this.apiService.deleteSession (() : void => {
			this.dataService.user = <User> {};
			
			localStorage.removeItem ("userId");
		});
	}
	
	ngOnInit () {}
}