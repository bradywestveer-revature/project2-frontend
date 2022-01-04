import { Component, Input, OnInit } from "@angular/core";
import { Post } from "src/app/models/Post";
import { User } from "src/app/models/User";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";

@Component ({
	selector: "app-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
	@Input ()
		user : User = <User> {};
	
	@Input ()
		post : Post = <Post> {};
	
	currentImageIndex : number = 0;
	
	liked : boolean = false;
	
	showComments : boolean = false;
	
	postCommentInput : string = "";
	
	constructor (public dataService : DataService, private apiService : ApiService) {}
	
	previousImage () : void {
		this.currentImageIndex = Math.max (0, this.currentImageIndex - 1);
	}
	
	nextImage () : void {
		this.currentImageIndex = Math.min (this.post.imageUrls.length - 1, this.currentImageIndex + 1);
	}
	
	//todo do this inline in html somehow
	getLikeCount = () : number => {
		return Object.keys (this.post.likes).length;
	}
	
	toggleLike = () : void => {
		this.liked = !this.liked;
		
		if (this.liked) {
			this.apiService.createLike (this.post.id);
			
			//change this.likes on client-side, set id to -1 to not conflict with other like ids
			this.post.likes [this.dataService.user.id] = -1;
		}
		
		else {
			this.apiService.deleteLike (this.post.likes [this.dataService.user.id]);
			
			//change this.likes on client-side
			delete this.post.likes [this.dataService.user.id];
		}
	}
	
	postComment = () : void => {
		this.apiService.createComment (this.post.id, this.postCommentInput, () : void => {
			this.apiService.getPost (this.post.id, (data : any) : void => {
				this.post = data.data;
			});
		});
	}
	
	ngOnInit () {
		//todo wait until we get posts in Main/Profile
		
		if (this.post.likes [this.dataService.user.id] !== undefined) {
			this.liked = true;
		}
	}
}