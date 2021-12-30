import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable ({
	providedIn: 'root'
})
export class ApiService {
	baseUrl : string = "http://localhost/";
	
	constructor (private httpClient : HttpClient, private router : Router) {}
	
	async handleResponse (response : Observable <any>, callback? : Function) : Promise <any> {
		const data : any = await firstValueFrom (response);
		
		if (data.success) {
			if (typeof callback !== "undefined") {
				await callback (data);
			}
		}
		
		else {
			alert (data.message);
		}
		
		if (data.redirect !== null) {
			console.log("about to navigate to " + data.redirect);
			//this.router.navigate (data.redirect);
			this.router.navigate([data.redirect]);
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
	
	//session
	checkSession(callback? : Function) {
		this.handleResponse(this.get("session"), callback);
	}

	login (user: User, callback? : Function) {
		this.handleResponse(this.post("session", user), callback);
	}

	logout (callback? : Function) {
		this.handleResponse (this.delete ("session"), callback);
	}
	
	//user
	registerUser (user: User, callback? : Function) : void {
		this.handleResponse(this.post("user", user), callback);
	}
	
	//post
	
	getPost (postId : number, callback? : Function) : void {
		this.handleResponse (this.get ("post/" + postId.toString ()), callback);
	}
	
	//comment
	
	postComment (postId : number, body : string, callback? : Function) : void {
		this.handleResponse (this.post ("comment", {
			id: postId,
			body: body
		}), callback);
	}
	
	//like
	
	likePost (postId : number, callback? : Function) : void {
		this.handleResponse (this.post ("like/", {
			postId: postId
		}), callback);
	}
	
	unlikePost (likeId : number, callback? : Function) {
		this.handleResponse (this.delete ("like/" + likeId), callback);
	}
}