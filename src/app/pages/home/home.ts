import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PerfumeService } from '../../services/perfume';

// home pronto
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {

  perfumes: any[] = [];
  heroIndex = 0;
  heroSlides = Array(6).fill(0);
  private autoSlide: any;

  constructor(private router: Router, private perfumeService: PerfumeService) {}

  ngOnInit(): void {
    this.perfumeService.getPerfumes().subscribe((dados: any) => {
      this.perfumes = dados;
    });
    this.autoSlide = setInterval(() => {
      this.heroIndex = (this.heroIndex + 1) % this.heroSlides.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlide);
  }

  heroAvancar() {
    this.heroIndex = (this.heroIndex + 1) % this.heroSlides.length;
    this.resetTimer();
  }

  heroVoltar() {
    this.heroIndex = (this.heroIndex - 1 + this.heroSlides.length) % this.heroSlides.length;
    this.resetTimer();
  }

  private resetTimer() {
    clearInterval(this.autoSlide);
    this.autoSlide = setInterval(() => {
      this.heroIndex = (this.heroIndex + 1) % this.heroSlides.length;
    }, 4000);
  }

  irParaProdutos() {
    const el = document.getElementById('male');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  adicionarFavorito() {
    this.router.navigate(['/favorites']);
  }
}
