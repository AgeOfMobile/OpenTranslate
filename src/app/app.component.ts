import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {    
  items = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Projects", path: "/projects" }
  ]

  authenticated: boolean = false;
  user: firebase.User;

  constructor(public af: AngularFire) {}

  ngOnInit(): void {
    this.af.auth.subscribe(state => {
      if (state == null) {
        this.af.auth.login();
      } else {
        this.user = state.auth;
        this.authenticated = !state.auth.isAnonymous;
      }
    });
  }

  logout() {
     this.af.auth.logout();
  }
}
