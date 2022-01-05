import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
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
	
	youTubeVideoUrl : SafeResourceUrl | null = null;
	
	currentImageIndex : number = 0;
	
	liked : boolean = false;
	
	showComments : boolean = false;
	
	postCommentInput : string = "";
	
	constructor (public dataService : DataService, private apiService : ApiService, private sanitizer : DomSanitizer) {}
	
	previousImage = () : void => {
		this.currentImageIndex = Math.max (0, this.currentImageIndex - 1);
	}
	
	nextImage = () : void => {
		this.currentImageIndex = Math.min (this.post.imageUrls.length - 1, this.currentImageIndex + 1);
	}
	
	//todo do this inline in html somehow
	getLikeCount = () : number => Object.keys (this.post.likes).length;
	
	toggleLike = () : void => {
		this.liked = !this.liked;
		
		if (this.liked) {
			this.apiService.createPostLike (this.post.id);
			
			//change this.likes on client-side, set id to -1 to not conflict with other like ids
			this.post.likes [this.dataService.user.id] = -1;
		}
		
		else {
			this.apiService.deletePostLike (this.post.id);
			
			//change this.likes on client-side
			delete this.post.likes [this.dataService.user.id];
		}
	};
	
	postComment = () : void => {
		if (this.postCommentInput === "") {
			return;
		}
		
		this.apiService.createComment (this.post.id, this.postCommentInput, () : void => {
			this.apiService.getPost (this.post.id, (data : any) : void => {
				this.post = data.data;
			});
		});
		
		this.postCommentInput = "";
	};
	
	commentInputKeyDown = (event : KeyboardEvent) : void => {
		if (event.key === "Enter") {
			this.postComment ();
		}
	};
	
	ngOnInit () {
		//todo wait until we get posts in Main/Profile?
		
		if (this.post.likes [this.dataService.user.id] !== undefined) {
			this.liked = true;
		}
		
		const matches = [...this.post.body.matchAll (/(youtube\.com|youtu\.be)\/(watch\?v=)?(\w{11})/g)];
		
		if (matches.length > 0) {
			this.youTubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl ('https://www.youtube-nocookie.com/embed/' + matches [0] [3]);
		}
	}
}