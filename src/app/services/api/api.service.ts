import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable ({
	providedIn: 'root'
})
export class ApiService {
	baseUrl : string = "localhost/";
	
	constructor (private httpClient : HttpClient, private router : Router) {}
	
	async handleResponse (response : Observable <any>, callback : Function) : Promise <any> {
		const data : any = await firstValueFrom (response);
		
		if (data.success) {
			await callback (data);
		}
		
		else {
			alert (data.message);
		}
		
		if (data.redirect !== null) {
			this.router.navigate (data.redirect);
		}
	}
	
	get (path : string) : Observable <any> {
		return this.httpClient.get (this.baseUrl + path, {
			withCredentials: true
		});
	}
	
	post (path : string, body : any) : Observable <any> {
		return this.httpClient.post (this.baseUrl + path, body, {
			withCredentials: true
		});
	}
	
	put (path : string, body : any) : Observable <any> {
		return this.httpClient.put (this.baseUrl + path, body, {
			withCredentials: true
		});
	}
	
	delete (path : string) : Observable <any> {
		return this.httpClient.delete (this.baseUrl + path, {
			withCredentials: true
		});
	}
	
	//user
	
	
	
	//post
	
	getPost (postId : number, callback : Function) : void {
		this.handleResponse (this.get ("post/" + postId.toString ()), callback);
	}
	
	//comment
	
	postComment (postId : number, body : string, callback : Function) : void {
		this.handleResponse (this.post ("comment", {
			id: postId,
			body: body
		}), callback);
	}
}