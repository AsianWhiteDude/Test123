import { Component } from '@angular/core';
import { AuthService } from '../auth.service'; // Adjust path as needed
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public auth: AuthService) { } // Inject AuthService

  logout() {
    this.auth.logout();
    // Optionally handle redirection after logout here
  }
}
