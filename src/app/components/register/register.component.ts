import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../../services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Les mot des passes ne correspondent pas !', 'Fermer', {
        duration: 3000,
      });
      return;
    }

    if (this.password.length < 6) {
      this.snackBar.open('Le mot de passe doit comporter au moins 6 caractères', 'Fermer', {
        duration: 3000,
      });
      return;
    }
    else if(this.username.length < 4 ){
      this.snackBar.open("Le nom d'utilisateur doit comporter au moins 4 caractères", 'Fermer', {
        duration: 3000,
      });
      return;

    }

    this.userService.register(this.username, this.email, this.password);
    this.router.navigate(['/login']);
    return;
  }
}
