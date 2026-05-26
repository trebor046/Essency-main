import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css'
})

export class Favorites implements OnInit {

  favoritos: any[] = [];

  ngOnInit(): void {

    this.carregarFavoritos();

  }

  carregarFavoritos() {

    this.favoritos =
      JSON.parse(localStorage.getItem('favoritos') || '[]');

  }

  removerFavorito(index: number) {

    this.favoritos.splice(index, 1);

    localStorage.setItem(
      'favoritos',
      JSON.stringify(this.favoritos)
    );

  }

}