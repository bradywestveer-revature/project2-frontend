import { Component, OnInit } from '@angular/core';

@Component ({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
	body : string = "Nice flowers! :)";
	
	constructor () {}
	
	ngOnInit () : void {}
}
