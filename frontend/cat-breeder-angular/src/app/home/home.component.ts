import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';

interface Cat {
  id: number;  // or string
  name: string;
  age: number;
  breed: string;
  fur_length: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})


export class HomeComponent implements OnInit {
  cats: Cat[] = []; // Use the Cat interface here
  selectedCat: Cat | null = null; // Use the Cat interface here
  private baseUrl = 'http://localhost:8000/api/v1/breeders/breeder/cats/';

  constructor(private http: HttpClient, private router: Router) {}

  private getHeaders() {
    const token = localStorage.getItem('accessToken');

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  ngOnInit(): void {
    this.loadCats();
  }
  createCat(): void {
     // Set up a new cat object with default values
     this.selectedCat = { id: 0, name: '', age: 0, breed: '', fur_length: '' };
  }
  loadCats(): void {
    const servHeaders = this.getHeaders();
    if (servHeaders) {

      this.http.get<Cat[]>(this.baseUrl, {headers: servHeaders.headers}).subscribe((data) => {
        this.cats = data;
      });
    }
  }

  editCat(cat: Cat): void { // Explicitly define the type of 'cat'
    this.selectedCat = { ...cat }; // Clone the cat object
  }

  deleteCat(id: number): void {
    const servHeaders = this.getHeaders();

    if (servHeaders) {

      this.http.delete(`${this.baseUrl}${id}/`, {headers: servHeaders.headers}).subscribe(() => {
        this.loadCats();
      });
    }
  }

  saveCat(): void {
    const servHeaders = this.getHeaders();

    if (servHeaders) {
        if (this.selectedCat && this.selectedCat.id) {
            // Update existing cat
            this.http.put(`${this.baseUrl}${this.selectedCat.id}/`, this.selectedCat, servHeaders)
                .subscribe(() => {
                    this.cancelEdit();  // Clear the selectedCat after saving
                    this.loadCats();    // Reload the list of cats to reflect changes
                });
        } else if (this.selectedCat) {
            // Create a new cat
            this.http.post(this.baseUrl, this.selectedCat, servHeaders)
                .subscribe(() => {
                    this.cancelEdit();  // Clear the selectedCat after saving
                    this.loadCats();    // Reload the list of cats
                });
        }
    }
  }


  cancelEdit(): void {
    this.selectedCat = null;
  }
}
