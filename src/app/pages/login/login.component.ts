import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    class: "page flex"
  }
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
