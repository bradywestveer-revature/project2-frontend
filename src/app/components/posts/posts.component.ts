import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { DataService } from 'src/app/services/data/data.service';

@Component ({
	selector: 'app-posts',
	templateUrl: './posts.component.html',
	styleUrls: ['./posts.component.css'],
	host: {
		class: "listContainer flexColumn",
		"(scroll)": "scroll ($event);"
	}
})
export class PostsComponent implements OnInit {
	@Input ()
	posts : Post [] = [];
	
	@Output ()
	scrollBottom : EventEmitter <string> = new EventEmitter ();
	
	constructor (public dataService : DataService) {}
	
	scroll (event : Event) : void {
		const element : HTMLElement = <HTMLElement> event.target;
		
		//if we are scrolled to the bottom
		if (element.scrollHeight - element.offsetHeight === element.scrollTop) {
			this.scrollBottom.emit ();
		}
	}
	
	ngOnInit (): void {}
}