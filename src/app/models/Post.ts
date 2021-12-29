import { Comment } from 'src/app/models/Comment';

export interface Post {
	id : number;
	creatorId : number;
	body : string;
	imageUrls : string [];
	likes : number [];
	comments : Comment [];
};