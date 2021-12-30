import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { DataService } from 'src/app/services/data/data.service';

@Component ({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css'],
	host: {
		class: "postsContainer flexColumn"
	}
})
export class PostsComponent implements OnInit {
	@Input ()
	posts : Post [] = [];
	
	constructor (public dataService : DataService) {}
	
	ngOnInit (): void {}
}