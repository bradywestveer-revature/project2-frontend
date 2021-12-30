import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  @Input()
  user : User = <User> {};
  

  hidden: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showFields() {
    this.hidden = !this.hidden;
  }

}
