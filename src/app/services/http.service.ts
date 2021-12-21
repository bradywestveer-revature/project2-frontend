import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	options : any = {
		observe: "body"
	}
	
	constructor (private httpClient : HttpClient, private router : Router) {}
	
	get (url : string, callback : Function) : any {
		this.httpClient.get (url, this.options).subscribe (data => {
			callback (data);
		});
	}
	
	post (url: string, body: any, callback : Function) : any {
		this.httpClient.post (url, body, this.options).subscribe (data => {
			callback (data);
		});
	}
}
