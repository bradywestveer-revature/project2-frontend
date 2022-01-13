import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Post } from "src/app/models/Post";
import { ApiService } from "src/app/services/api/api.service";
import { DataService } from "src/app/services/data/data.service";
import { ImageData } from "src/app/models/ImageData";
import { FileService } from "src/app/services/file/file.service";

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
	
	constructor (public dataService : DataService, private apiService : ApiService, private fileService : FileService, private router : Router) {}
	
	uploadImage = (event : any) : void => {
		for (let i = 0; i < event.target.files.length; i++) {
			this.previewImageUrls.push (this.fileService.getPreviewUrl (event.target.files [i]));
			
			this.fileService.getImageData (event.target.files [i], (imageData : ImageData) : void => {
				this.images.push (imageData);
			});
		}
	};
	
	removePreviewImage = (index : number) : void => {
		this.previewImageUrls.splice (index, 1);
		
		this.images.splice (index, 1);
	};
	
	post = () : void => {
		this.apiService.createPost (this.postInput, this.images, async () : Promise <any> => {
			//todo slow
			
			const currentUrl : string = this.router.url;
			
			await this.router.navigateByUrl ("/login", { skipLocationChange: true });
			
			this.router.navigate ([currentUrl]);
		});
		
		this.postInput = "";
		
		this.images = [];
		
		this.previewImageUrls = [];
	};
	
	ngOnInit () {}
}