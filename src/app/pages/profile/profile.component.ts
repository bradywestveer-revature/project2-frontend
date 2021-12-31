import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Post } from "src/app/models/Post";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";

@Component ({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.css"],
	host: {
		class: "page flex"
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
	
	currentPage: number = 1;
	
	waitingForPosts: boolean = false;
	
	// posts : Post [] = [];
	//todo
	posts: Post[] = [
		{
			id: 1,

			creatorId: 1,

			body: "I'm Kevin. I am currently logged in. I already liked this post. Here are some images.",

			imageUrls: [
				"https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg",
				"https://media.istockphoto.com/photos/blue-ridge-parkway-scenic-landscape-appalachian-mountains-ridges-picture-id154232673?b=1&k=20&m=154232673&s=170667a&w=0&h=rHdSC9KKqkG8q-KKWfiqMEalaQkleMZ3zxaCYE8Eck8=",
				"https://www.gardeningknowhow.com/wp-content/uploads/2007/03/flowers-1.jpg",
				"https://www.thespruce.com/thmb/TIUYmTRJ3NOFnY9LJ6FzMd_9oBc=/2571x1928/smart/filters:no_upscale()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg"
			],

			likes: {
				1: 1
			},

			comments: [
				{
					id: 1,
					creatorId: 2,
					body: "I'm David. Nice flowers!"
				}
			]
		}
	];

	constructor (private router: ActivatedRoute, public dataService: DataService, private apiService: ApiService) { }
	
	clearEditInputs () : void {
		this.firstNameInput = "";
		this.lastNameInput = "";
		this.emailInput = "";
		this.usernameInput = "";
		this.passwordInput = "";
	}
	
	updateUser () : void {
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
	
	getPosts () : void {
		if (!this.waitingForPosts) {
			this.waitingForPosts = true;

			this.apiService.getPosts (this.currentPage, (data: any): void => {
				this.posts = data.data.concat (this.posts);

				this.currentPage += 1;

				this.waitingForPosts = false;
			});
		}

		//todo if there's an error, we can never get more posts
	}
	
	//todo remove async, it's for testing
	async ngOnInit (): Promise<any> {
		this.router.params.subscribe (paramaters => {
			//todo testing
			for (let i = 0; i < Object.keys (this.dataService.users).length; i++) {
				if (this.dataService.users [Object.keys (this.dataService.users) [i]].username === paramaters ["username"]) {
					this.user = this.dataService.users [Object.keys (this.dataService.users) [i]];

					break;
				}
			}
			//end testing

			this.apiService.getUsers (async (data: any) : Promise <any> => {
				this.dataService.users = data.data;

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