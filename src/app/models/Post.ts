export interface Post {
	creatorId : number;
	body : string;
	imageUrls : string [];
	likes : number [];
	comments : Comment [];
};