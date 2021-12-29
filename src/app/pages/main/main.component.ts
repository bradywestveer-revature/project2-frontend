import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/Post';
import { DataService } from 'src/app/services/data/data.service';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
	host: {
		class: "page flexColumn"
	}
})
export class MainComponent implements OnInit {
	// posts : Post [] = [];
	//todo
	posts : Post [] = [
		{
			id: 1,
			
			creatorId: 1,
			
			body: "I'm Kevin. I am currently logged in. I already liked this post. Here are some images.",
			
			imageUrls : [
				"https://cdn.britannica.com/42/91642-050-332E5C66/Keukenhof-Gardens-Lisse-Netherlands.jpg",
				"https://media.istockphoto.com/photos/blue-ridge-parkway-scenic-landscape-appalachian-mountains-ridges-picture-id154232673?b=1&k=20&m=154232673&s=170667a&w=0&h=rHdSC9KKqkG8q-KKWfiqMEalaQkleMZ3zxaCYE8Eck8=",
				"https://www.gardeningknowhow.com/wp-content/uploads/2007/03/flowers-1.jpg",
				"https://www.thespruce.com/thmb/TIUYmTRJ3NOFnY9LJ6FzMd_9oBc=/2571x1928/smart/filters:no_upscale()/small-garden-ideas-and-inspiration-4101842-01-5e0462c2365e42de86a4f3ebc2152c1b.jpg"
			],
			
			likes: {
				1: 1
			},
			
			comments: [
				{
					id: 1,
					creatorId: 2,
					body: "I'm David. Nice flowers!"
				}
			]
		},
		
		{
			id: 2,
			
			creatorId: 2,
			
			body: "I am David. Here are some photos. No one has liked this post yet.",
			
			imageUrls : [
				"https://s.abcnews.com/images/International/MChanga_1624536553868_hpMain_4x5_992.jpg",
				"https://d.newsweek.com/en/full/1787915/elephant.jpg?w=1600&h=900&q=88&f=4271739d91dd0207cebe547932c3566f"
			],
			
			likes: {},
			
			comments: [
				{
					id: 2,
					creatorId: 4,
					body: "Nice elephant pictures. - Brady"
				}
			]
		},
		
		{
			id: 3,
			
			creatorId: 3,
			
			body: "Hey guys, it's Jason. I didn't attach any images to this post. Everyone has liked the post already.",
			
			imageUrls: [],
			
			likes: {
				1: 2,
				2: 3,
				3: 4,
				4: 5
			},
			
			comments: [
				{
					id: 3,
					creatorId: 1,
					body: "Roomba"
				},
				
				{
					id: 4,
					creatorId: 2,
					body: "I'm David."
				},
				
				{
					id: 5,
					creatorId: 3,
					body: "I am Jason, commenting on this post that I posted."
				},
				
				{
					id: 6,
					creatorId: 4,
					body: "This is Brady."
				}
			]
		},
		
		{
			id: 4,
			
			creatorId: 4,
			
			body: "This is Brady. I attached an image of my dogs. I liked this post, but no else else has yet.",
			
			imageUrls : [
				"https://lh3.googleusercontent.com/oX5F0zOfeiqsxKrmLiB3xh3th4kDsRtX1mNYFn-vpcGMTANHXu6m8mmbMYPjZwP4Nwx02Ok0t7QQxN_oJFtYOgvywdzs7x8dkbhH6d7Sm0yrvkZ3fqHQz2PJ9X1XjTVx3cMV3pdqhVzra4SS2LP93Di_2wWeUE2CPeVCFY6exA4jMRxfLWV3r4ldUygBwWFsnMlbHAoQ_aRH7WFcAmH6GnPJ42Ds7tF03mrkwzt5IDpZ3udXajq3ZrP7r9fIc4B1xV69MLKpWuZe_74s45uL0FPf8wjESbxpbrdzsU5l2ExWvPLy4FhEgEFC_OCALr1XSSUSd37Szi9tfgl48P5IcCXtN-3lXz-FuVRgeJZ_mmnQX-TRORaW8vn1Mz8rSw3_TSSSS0W7vbXPr5q8S408sv2jta-n95_iV9bB1lKNTNGJLTjI-dsQTTyqylaPZrcX8BT9InZcV09Vzz8_a5SS8FxDElilAeDuelUYKSknfQlp88HGFACGr_ISYQpRSjHYf2wb4wcQPNire9g0FpX84RbDohoNVBz6z3Uo1f7BcCo9LWACN5ccIHkQnu8j3wDNhL-m--XuUYjGYv8I4IJn65_ECX2lXMQvamA7JhWJT1F5yThuxSLvSqlbYqS_ycachWeQpPbJl1K1spNHCfhOzO0Dv29gI6_2Q_7yWrZX2NNiGPM3s_wLgMRjF7_lb_2Nn5QmcqnMQKeFrZO2nM0Bw-eAAg=w727-h969-no?authuser=0"
			],
			
			likes: {
				4: 6
			},
			
			comments: [
				{
					id: 7,
					creatorId: 3,
					body: "This is Jason. Nice dogs."
				}
			]
		}
	];
	
	constructor (public dataService : DataService) {}
	
	ngOnInit () : void {}
}
