import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-product-crud',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './product-crud.html',
  styleUrl: './product-crud.css',
})
export class ProductCrud implements OnInit {

  produtos: any[] = [];

  produtoEditando: any = null;

  constructor(private perfumeService: PerfumeService) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  // READ
  carregarProdutos() {
    this.perfumeService.getPerfumes().subscribe((data: any) => {
      this.produtos = data;
    });
  }

  // DELETE
  deletar(id: number) {
    this.perfumeService.deletarPerfume(id).subscribe(() => {
      this.carregarProdutos();
    });
  }

  // ABRIR EDIÇÃO
  editar(produto: any) {
    this.produtoEditando = { ...produto }; // cópia
  }

  // SALVAR EDIÇÃO
  salvarEdicao() {
    this.perfumeService
      .atualizarPerfume(this.produtoEditando.id, this.produtoEditando)
      .subscribe(() => {

        this.produtoEditando = null;
        this.carregarProdutos();

      });
  }

  // CANCELAR
  cancelar() {
    this.produtoEditando = null;
  }
}