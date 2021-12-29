import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { DataService } from 'src/app/services/data/data.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
	host: {
		class: "page flex"
	}
})
export class ProfileComponent implements OnInit {
	user : User = <User> {};
	
	// posts : Post [] = [];
	//todo
	posts : Post [] = [
		{
			id: 1,
			
			creatorId: 1,
			
			body: "I'm Kevin. I am currently logged in. I already liked this post. Here are some images.",
			
			imageUrls : [
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
	
	constructor (private router : ActivatedRoute, public dataService : DataService) {}
	
	ngOnInit () : void {
		this.router.params.subscribe (paramaters => {
			//todo slow
			for (let i = 0; i < Object.keys (this.dataService.users).length; i++) {
				//if user's username matches username from URL
				if (this.dataService.users [Object.keys (this.dataService.users) [i]].username === paramaters ["username"]) {
					this.user = this.dataService.users [Object.keys (this.dataService.users) [i]];
					
					break;
				}
			}
		});
	}
}
