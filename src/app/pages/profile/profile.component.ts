import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/models/Post";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";
import { ScrollService } from "src/app/services/scroll/scroll.service";

@Component ({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"],
	host: {
		class: "page listContainer flexColumn",
		"(scroll)": "scrollService.onScrollToBottom ($event, getPosts);"
	}
})
export class ProfileComponent implements OnInit {
	user: User = <User>{};
	
	showEditControls: boolean = false;

	firstNameInput : string = "";

	lastNameInput : string = "";

	emailInput : string = "";

	usernameInput : string = "";

	passwordInput : string = "";
	
	currentPage: number = 0;
	
	waitingForPosts: boolean = false;
	
	posts : Post [] = [];

	constructor (private router: ActivatedRoute, public dataService: DataService, private apiService: ApiService, private scrollService : ScrollService) {}
	
	clearEditInputs = () : void => {
		this.firstNameInput = "";
		this.lastNameInput = "";
		this.emailInput = "";
		this.usernameInput = "";
		this.passwordInput = "";
	}
	
	editProfile = () : void => {
		this.apiService.updateUser (<User> {
			firstName: this.firstNameInput,
			lastName: this.lastNameInput,
			email: this.emailInput,
			username: this.usernameInput,
			password: this.passwordInput
		}, (data : any) : void => {
			this.user = <User> data;
		});
	}
	
	getPosts = () : void => {
		if (!this.waitingForPosts) {
			this.waitingForPosts = true;

			this.apiService.getUserPosts (this.user.id, this.currentPage, (data: any): void => {
				this.posts = this.posts.concat (data.data);

				this.currentPage += 1;

				this.waitingForPosts = false;
			});
		}

		//todo if there's an error, we can never get more posts
	}
	
	ngOnInit () {
		this.dataService.users = {};
		this.dataService.user = <User> {};
		
		this.router.params.subscribe (paramaters => {
			this.apiService.getUsers (async (data: any) : Promise <any> => {
				//set dataService.users based on array of users in data
				for (let i : number = 0; i < data.data.length; i++) {
					this.dataService.users [data.data [i].id] = data.data [i];
				}
				
				this.dataService.user = this.dataService.users [localStorage ["userId"]];
				
				//todo slow
				for (let i = 0; i < Object.keys (this.dataService.users).length; i++) {
					//if user's username matches username from URL
					if (this.dataService.users [Object.keys (this.dataService.users) [i]].username === paramaters ["username"]) {
						this.user = this.dataService.users [Object.keys (this.dataService.users) [i]];

						break;
					}
				}

				this.getPosts ();
			});
		});
	}
}