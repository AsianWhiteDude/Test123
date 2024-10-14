import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  model = { // Define the model property
    email: '',
    password: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const url = 'http://localhost/api/v1/breeders/login/';
    this.http.post(url, this.model).subscribe(
      (response: any) => {

        // Store tokens in local storage
        localStorage.setItem('accessToken', response.access_token);
        localStorage.setItem('refreshToken', response.refresh_token);

        console.log('Login successful:', response);

        // Redirect to home page
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
        // Handle error (e.g., displaying a message to the user)
      }
    );
  }
}
