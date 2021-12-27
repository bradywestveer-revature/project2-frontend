import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
	host: {
		class: "page flexColumn"
	}
})
export class MainComponent implements OnInit {
	constructor (private httpService : HttpService, private sanitizer : DomSanitizer) {}
	
	previewImageUrls : SafeUrl [] = [];
	
	uploadImage (event : any) : void {
		for (let i = 0; i < event.srcElement.files.length; i++) {
			this.previewImageUrls.push (this.sanitizer.bypassSecurityTrustUrl (URL.createObjectURL (event.srcElement.files [i])));
		}
		
		console.log (this.previewImageUrls);
	}
	
	ngOnInit () : void {}
}
