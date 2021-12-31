import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Post } from "src/app/models/Post";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";

@Component ({
	selector: "app-create-post",
	templateUrl: "./create-post.component.html",
	styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
	@Input ()
		posts : Post [] = [];
	
	postInput : string = "";
	
	images : string [] = [];
	
	previewImageUrls : SafeUrl [] = [];
	
	constructor (public dataService : DataService, private apiService : ApiService, private sanitizer : DomSanitizer) {}
	
	uploadImage (event : any) : void {
		for (let i = 0; i < event.target.files.length; i++) {
			//convert image to base64 string and add to this.images
			const fileReader = new FileReader ();
			
			fileReader.onloadend = () => {
				this.images.push (<string> fileReader.result);
			};
			
			fileReader.readAsDataURL (event.target.files [i]);
			
			//add image url to this.previewImageUrls
			this.previewImageUrls.push (this.sanitizer.bypassSecurityTrustUrl (URL.createObjectURL (event.target.files [i])));
		}
	}
	
	removePreviewImage (index : number) : void {
		this.previewImageUrls.splice (index, 1);
		
		this.images.splice (index, 1);
	}
	
	post () : void {
		this.apiService.createPost (this.postInput, this.images, () : void => {
			this.postInput = "";
			
			this.images = [];

			this.previewImageUrls = [];
			
			this.apiService.getNewPosts (this.posts [0].id, (data : any) : void => {
				//this.posts references the passed value from the parent component
				this.posts = data.data.concat (this.posts);
			});
		});
	}
	
	ngOnInit () : void {}
}