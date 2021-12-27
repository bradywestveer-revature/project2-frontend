import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
	selector: 'app-create-post',
	templateUrl: './create-post.component.html',
	styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
	constructor (private sanitizer : DomSanitizer) {}
	
	previewImageUrls : SafeUrl [] = [];
	
	uploadImage (event : any) : void {
		for (let i = 0; i < event.srcElement.files.length; i++) {
			this.previewImageUrls.push (this.sanitizer.bypassSecurityTrustUrl (URL.createObjectURL (event.srcElement.files [i])));
		}
	}
	
	ngOnInit (): void {
		
	}
}
