import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: { username: string; email: string; password: string }[] = [];

  constructor(private router: Router, private authService: AuthService) {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  register(username: string, email: string, password: string): void {
    this.users.push({ username, email, password });
    this.updateLocalStorage();
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);
    if(user) {
      this.router.navigate([''])
      this. authService.login()
    }
    return !!user;
  }
}

