import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class HomePage implements OnInit {

  characters: any[] = [];
  page = 1;
  loading = false;
  searchTerm = '';
  filteredCharacters: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters(event?: any) {
    if (this.loading) return;
    this.loading = true;

    this.http.get<any>(`https://rickandmortyapi.com/api/character?page=${this.page}`).subscribe((res) => {
      this.characters = [...this.characters, ...res.results];
      this.filteredCharacters = this.characters;
      this.page++;
      this.loading = false;

      if (event) {
        event.target.complete();
      }

      if (!res.info.next && event) {
        event.target.disabled = true;
      }
    });
  }

  searchCharacter() {
    const term = this.searchTerm.trim().toLowerCase();
    if (term.length === 0) {
      this.filteredCharacters = this.characters;
      return;
    }

    this.filteredCharacters = this.characters.filter(c =>
      c.name.toLowerCase().includes(term)
    );
  }

  goToDetails(character: any) {
    this.router.navigate(['/character', character.id]);
  }

}
