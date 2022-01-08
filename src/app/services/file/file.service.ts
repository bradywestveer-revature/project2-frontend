import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ImageData } from "src/app/models/ImageData";

@Injectable ({
	providedIn: "root"
})
export class FileService {
	constructor (private sanitizer : DomSanitizer) {}
	
	getPreviewUrl = (file : File) : SafeUrl => {
		return this.sanitizer.bypassSecurityTrustUrl (URL.createObjectURL (file));
	};
	
	getImageData = (file : File, callback : Function) : void => {
		//convert image to base64 string
		const fileReader = new FileReader ();
		
		fileReader.onloadend = () => {
			callback ({
				fileName: file.name,
				data: (<string> fileReader.result).split (",") [1]
			});
		};
		
		fileReader.readAsDataURL (file);
	};
}