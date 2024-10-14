import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  model = {
    username: '',
    email: '',
    password: '',
    password2: '',
  };

  constructor(private http: HttpClient, private router: Router) {} // Inject Router

  register() {
    const url = 'http://localhost/api/v1/breeders/register/';
    this.http.post(url, this.model).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        console.error('Registration error:', error);
        // Handle error (e.g., displaying a message to the user)
      }
    );
  }
}
