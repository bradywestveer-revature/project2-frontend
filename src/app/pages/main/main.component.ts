import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/models/Post";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";
import { ScrollService } from "src/app/services/scroll/scroll.service";

@Component ({
	selector: "app-main",
	templateUrl: "./main.component.html",
	styleUrls: ["./main.component.css"],
	host: {
		class: "page listContainer flexColumn",
		"(scroll)": "scrollService.onScrollToBottom ($event, getPosts);"
	}
})
export class MainComponent implements OnInit {
	currentPage : number = 0;
	
	waitingForPosts : boolean = false;
	
	posts : Post [] = [];
	
	constructor (public dataService : DataService, private apiService : ApiService, private scrollService : ScrollService) {}
	
	getPosts = () : void => {
		if (!this.waitingForPosts) {
			this.waitingForPosts = true;
			
			this.apiService.getPosts (this.currentPage, (data : any) : void => {
				this.posts = data.data.concat (this.posts);
				
				this.currentPage += 1;
				
				this.waitingForPosts = false;
			});
		}
		
		//todo if there's an error, we can never get more posts
	}
	
	ngOnInit () : void {
		this.dataService.users = {};
		
		//todo clear users
		//todo do we need to clear user?
		console.log (this.dataService.user);
		
		this.apiService.getUsers ((data : any) : void => {
			//set dataService.users based on array of users in data
			for (let i : number = 0; i < data.data.length; i++) {
				this.dataService.users [data.data [i].id] = data.data [i];
			}
			
			this.dataService.user = this.dataService.users [localStorage ["userId"]];
			
			this.getPosts ();
		});
	}
}