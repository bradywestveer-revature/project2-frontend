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
	
	// posts : Post [] = [];
	//todo
	posts : Post [] = [
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
		},
		
		{
			id: 2,
			
			creatorId: 2,
			
			body: "I am David. Here are some photos. No one has liked this post yet.",
			
			imageUrls: [
				"https://s.abcnews.com/images/International/MChanga_1624536553868_hpMain_4x5_992.jpg",
				"https://d.newsweek.com/en/full/1787915/elephant.jpg?w=1600&h=900&q=88&f=4271739d91dd0207cebe547932c3566f"
			],
			
			likes: {},
			
			comments: [
				{
					id: 2,
					creatorId: 4,
					body: "Nice elephant pictures. - Brady"
				}
			]
		},
		
		{
			id: 3,
			
			creatorId: 3,
			
			body: "Hey guys, it's Jason. I didn't attach any images to this post. Everyone has liked the post already.",
			
			imageUrls: [],
			
			likes: {
				1: 2,
				2: 3,
				3: 4,
				4: 5
			},
			
			comments: [
				{
					id: 3,
					creatorId: 1,
					body: "Roomba"
				},
				
				{
					id: 4,
					creatorId: 2,
					body: "I'm David."
				},
				
				{
					id: 5,
					creatorId: 3,
					body: "I am Jason, commenting on this post that I posted."
				},
				
				{
					id: 6,
					creatorId: 4,
					body: "This is Brady."
				}
			]
		},
		
		{
			id: 4,
			
			creatorId: 4,
			
			body: "This is Brady. I attached an image of my dogs. I liked this post, but no else else has yet.",
			
			imageUrls: [
				"https://cdn.discordapp.com/attachments/796812457188130816/925867939679318158/dogs.jpg"
			],
			
			likes: {
				4: 6
			},
			
			comments: [
				{
					id: 7,
					creatorId: 3,
					body: "This is Jason. Nice dogs."
				}
			]
		}
	];
	
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