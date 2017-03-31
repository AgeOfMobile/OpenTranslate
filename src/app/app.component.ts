import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  items = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Projects", path: "/projects" }
  ]
  
  menuOpen = false;

  openSideMenu = () => { this.menuOpen = true };
}
