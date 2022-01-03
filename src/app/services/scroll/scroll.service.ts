import { Injectable } from "@angular/core";

@Injectable ({
	providedIn: "root"
})
export class ScrollService {
	constructor () {}
	
	onScrollToBottom = (event : Event, callback : Function) : void => {
		const element : HTMLElement = <HTMLElement> event.target;
		
		//if we are scrolled to the bottom
		if (element.scrollHeight - element.offsetHeight === element.scrollTop) {
			callback ();
		}
	}
}