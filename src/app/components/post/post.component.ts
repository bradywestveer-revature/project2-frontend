import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	// user : User = <User> {};
	//todo
	user : User = <User> {
		firstName: "Kevin",
		lastName: "Childs",
		username: "kchilds",
		profileImageUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	};
	
	// post : Post = <Post> {};
	//todo
	post : Post = {
		id: 1,
		
		creatorId: 1,
		
		body: "Just got some new plants for my garden! Photos taken by me. 📷 🌸",
		
		imageUrls : [
			"https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg",
			"https://media.istockphoto.com/photos/blue-ridge-parkway-scenic-landscape-appalachian-mountains-ridges-picture-id154232673?b=1&k=20&m=154232673&s=170667a&w=0&h=rHdSC9KKqkG8q-KKWfiqMEalaQkleMZ3zxaCYE8Eck8=",
			"https://www.gardeningknowhow.com/wp-content/uploads/2007/03/flowers-1.jpg",
			"https://www.thespruce.com/thmb/TIUYmTRJ3NOFnY9LJ6FzMd_9oBc=/2571x1928/smart/filters:no_upscale()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg"
		],
		
		likes: {
			1: 1,
			2: 2,
			3: 3
		},
		
		comments: [
			{
				id: 1,
				creatorId: 1,
				body: "Nice flowers!"
			},
			
			{
				id: 2,
				creatorId: 1,
				body: "Wow, looks good."
			},
			
			{
				id: 3,
				creatorId: 1,
				body: "098409823704958723490587234905872309829074183413712980123828327691798"
			}
		]
	};
	
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
	getLikeCount () : number {
		return Object.keys (this.post.likes).length;
	}
	
	toggleLike () : void {
		this.liked = !this.liked;
		
		if (this.liked) {
			this.apiService.createLike (this.post.id);
			
			//change this.likes on client-side, set id to 0 to not conflict with other like ids
			this.post.likes [this.dataService.user.id] = 0;
		}
		
		else {
			this.apiService.deleteLike (this.post.likes [this.dataService.user.id]);
			
			//change this.likes on client-side
			delete this.post.likes [this.dataService.user.id];
		}
	}
	
	postComment () : void {
		this.apiService.postComment (this.post.id, this.postCommentInput, () : void => {
			this.apiService.getPost (this.post.id, (data : any) : void => {
				this.post = data.data.post;
			});
		});
	}
	
	ngOnInit () : void {
		if (this.post.likes [this.dataService.user.id] !== undefined) {
			this.liked = true;
		}
	}
}
