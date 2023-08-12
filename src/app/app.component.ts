import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projet_test';
  constructor(private router : Router){}
  isLoginPage(): boolean {
    if (this.router.url === '/login' || this.router.url === '/register') {
      return false;
    } else {
      return true;
    }
  }

}
