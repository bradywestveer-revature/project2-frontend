import { Comment } from 'src/app/models/Comment';

export interface Post {
	id : number;
	creatorId : number;
	body : string;
	imageUrls : string [];
	
	//todo use more descriptive type than just any
	likes : any;
	
	comments : Comment [];
};