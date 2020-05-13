import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import {MsAdalAngular6Service} from "microsoft-adal-angular6";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService) {
    this.auth.getUsers().subscribe(data => this.users = data);
 }

  showUsers = false;
  users: User[];

  ngOnInit() {
  }
}
