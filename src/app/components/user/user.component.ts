import { Component, Input, OnInit } from '@angular/core';





@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  firstName: string = "David"; //equal to database GET value

  lastName: string = "Helfer"
  @Input()
  username: string = "PinHead";//equal to database GET value

  img: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  constructor() { }


  ngOnInit(): void {

  }



}
