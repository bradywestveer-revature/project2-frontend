import { Component, Input, OnInit } from "@angular/core";
import { User } from "src/app/models/User";

@Component ({
	selector: "app-comment",
	templateUrl: "./comment.component.html",
	styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
	@Input ()
		user : User = <User> {};
	
	@Input ()
		body : string = "";
	
	constructor () {}
	
	ngOnInit = () : void => {}
}