import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
	body : string = "Just got some new plants for my garden! Photos taken by me. 📷 🌸";
	
	imageUrls : string [] = [
		"https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg",
		"https://media.istockphoto.com/photos/blue-ridge-parkway-scenic-landscape-appalachian-mountains-ridges-picture-id154232673?b=1&k=20&m=154232673&s=170667a&w=0&h=rHdSC9KKqkG8q-KKWfiqMEalaQkleMZ3zxaCYE8Eck8=",
		"https://www.gardeningknowhow.com/wp-content/uploads/2007/03/flowers-1.jpg",
		"https://www.thespruce.com/thmb/TIUYmTRJ3NOFnY9LJ6FzMd_9oBc=/2571x1928/smart/filters:no_upscale()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg"
	];
	
	currentImageIndex : number = 0;
	
	commentCount : number = 3;
	
	liked : boolean = false;
	likeCount : number = 12;
	
	showComments : boolean = false;
	
	previousImage () : void {
		this.currentImageIndex = Math.max (0, this.currentImageIndex - 1);
	}
	
	nextImage () : void {
		this.currentImageIndex = Math.min (this.imageUrls.length - 1, this.currentImageIndex + 1);
	}
	
	constructor () {}
	
	ngOnInit (): void {}
}
