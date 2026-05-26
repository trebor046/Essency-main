import { CommonModule } from '@angular/common';
import { afterNextRender, Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  usuario: any = null;
  menuAberto = false;

  constructor(private router: Router) {
    // afterNextRender roda só no navegador, nunca no servidor
    // por isso o localStorage sempre vai existir aqui
    afterNextRender(() => {
      const dados = localStorage.getItem('usuarioLogado');
      if (dados) {
        this.usuario = JSON.parse(dados);
      }
    });
  }

  ngOnInit() {}

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuAberto = !this.menuAberto;
  }

  @HostListener('document:click')
  fecharMenu() {
    this.menuAberto = false;
  }

  sair() {
    localStorage.removeItem('usuarioLogado');
    this.usuario = null;
    this.menuAberto = false;
    this.router.navigate(['/login']);
  }
}
