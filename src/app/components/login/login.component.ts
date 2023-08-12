import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router,  private snackBar: MatSnackBar) {}

  onSubmit(): void {
    if (this.userService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.snackBar.open('Connexion echouée.', 'Fermer', {
        duration: 3000,
      });
    }
  }
}
