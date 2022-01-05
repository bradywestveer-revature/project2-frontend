import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Post } from "src/app/models/Post";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";
import { ImageData } from "src/app/models/ImageData";

@Component ({
	selector: "app-create-post",
	templateUrl: "./create-post.component.html",
	styleUrls: ["./create-post.component.css"]
})
export class CreatePostComponent implements OnInit {
	@Input ()
		posts : Post [] = [];
	
	postInput : string = "";
	
	images : ImageData [] = [];
	
	previewImageUrls : SafeUrl [] = [];
	
	constructor (public dataService : DataService, private apiService : ApiService, private sanitizer : DomSanitizer, private router : Router) {}
	
	uploadImage = (event : any) : void => {
		for (let i = 0; i < event.target.files.length; i++) {
			//convert image to base64 string and add to this.images
			const fileReader = new FileReader ();
			
			fileReader.onloadend = () => {
				//split by comma to remove the base64 header
				this.images.push ({
					fileName: event.target.files [i].name,
					data: (<string> fileReader.result).split (",") [1]
				});
			};
			
			fileReader.readAsDataURL (event.target.files [i]);
			
			//add image url to this.previewImageUrls
			this.previewImageUrls.push (this.sanitizer.bypassSecurityTrustUrl (URL.createObjectURL (event.target.files [i])));
		}
	}
	
	removePreviewImage = (index : number) : void => {
		this.previewImageUrls.splice (index, 1);
		
		this.images.splice (index, 1);
	}
	
	post = () : void => {
		this.apiService.createPost (this.postInput, this.images, async () : Promise <any> => {
			this.postInput = "";
			
			this.images = [];

			this.previewImageUrls = [];
			
			//todo slow
			
			await this.router.navigateByUrl ("/login", { skipLocationChange: true });
			
			this.router.navigate (["/"]);
		});
	}
	
	ngOnInit () {}
}