import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { User } from "src/app/models/User";

@Injectable ({
	providedIn: "root"
})
export class ApiService {
	baseUrl : string = "http://localhost:81/";
	
	constructor (private httpClient : HttpClient, private router : Router) {}
	
	handleResponse = async (response : Observable <any>, callback? : Function) : Promise <any> => {
		const handler = async (body : any) : Promise <any> => {
			//todo debug
			console.log (body);
			
			if (body.success) {
				if (typeof callback !== "undefined") {
					await callback (body);
				}
			}
			
			else {
				alert (body.message);
			}
			
			if (body.redirect !== undefined && body.redirect !== null) {
				this.router.navigate ([body.redirect]);
			}
		};
		
		//send body from response to handler (HttpErrorResponses keep body in error.error)
		response.subscribe ({
			next: handler,
			
			error: (error : HttpErrorResponse) : void => {
				handler (error.error);
			}
		});
	}
	
	get = (path : string) : Observable <any> => {
		return this.httpClient.get (this.baseUrl + path, {
			withCredentials: true
		});
	}
	
	post = (path : string, body : any) : Observable <any> => {
		return this.httpClient.post (this.baseUrl + path, body, {
			withCredentials: true
		});
	}
	
	put = (path : string, body : any) : Observable <any> => {
		return this.httpClient.put (this.baseUrl + path, body, {
			withCredentials: true
		});
	}
	
	delete = (path : string) : Observable <any> => {
		return this.httpClient.delete (this.baseUrl + path, {
			withCredentials: true
		});
	}
	
	//session
	
	createSession = (identifier : string, password : string, callback? : Function) => {
		this.handleResponse (this.post ("session", {
			identifier: identifier,
			password: password
		}), callback);
	}
	
	deleteSession = (callback? : Function) => {
		this.handleResponse (this.delete ("session"), callback);
	}
	
	//user
	
	createUser = (user : User, callback? : Function) => {
		this.handleResponse (this.post ("user", user), callback);
	}
	
	getUsers = (callback? : Function) : void => {
		this.handleResponse (this.get ("user"), callback);
	}
	
	updateUser = (user : User, callback? : Function) : void => {
		this.handleResponse (this.put ("user/" + user.id.toString (), user), callback);
	}
	
	//post
	
	createPost = (body : string, images : string [], callback? : Function) : void => {
		this.handleResponse (this.post ("post", {
			body: body,
			images: images
		}), callback);
	}
	
	getPost = (postId : number, callback? : Function) : void => {
		this.handleResponse (this.get ("post/" + postId.toString ()), callback);
	}
	
	getPosts = (page : number, callback? : Function) : void => {
		this.handleResponse (this.get ("post?page=" + page.toString ()), callback);
	}
	
	getUserPosts = (userId : number, page : number, callback? : Function) : void => {
		this.handleResponse (this.get ("post?userId=" + userId.toString () + "&page=" + page.toString ()), callback);
	}
	
	//comment
	
	createComment = (postId : number, body : string, callback? : Function) : void => {
		this.handleResponse (this.post ("comment", {
			postId: postId,
			body: body
		}), callback);
	}
	
	//like
	
	createLike = (postId : number, callback? : Function) : void => {
		this.handleResponse (this.post ("like/", {
			postId: postId
		}), callback);
	}
	
	deleteLike = (likeId : number, callback? : Function) => {
		this.handleResponse (this.delete ("like/" + likeId.toString ()), callback);
	}
}