import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PerfumeService } from '../../services/perfume';

@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './product-register.html',
  styleUrl: './product-register.css',
})
export class ProductRegister implements OnInit {

  novoPerfume: any = { nome: '', marca: '', precoAntigo: 0, precoAtual: 0, imagem: '' };
  idEditando: any = null;

  constructor(
    private perfumeService: PerfumeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idEditando = id;
      this.perfumeService.getPerfumes().subscribe((data: any) => {
        const produto = data.find((p: any) => p.id == id);
        if (produto) this.novoPerfume = produto;
      });
    }
  }

  selecionarImagem(event: any) {
    const arquivo = event.target.files[0];
    if (arquivo) this.novoPerfume.imagem = '/' + arquivo.name;
  }

  cadastrarPerfume() {
    if (this.idEditando) {
      this.perfumeService.atualizarPerfume(this.idEditando, this.novoPerfume).subscribe(() => {
        alert('Produto atualizado com sucesso!');
        this.router.navigate(['/product-crud']);
      });
    } else {
      this.perfumeService.adicionarPerfume(this.novoPerfume).subscribe(() => {
        alert('Perfume cadastrado com sucesso!');
        this.novoPerfume = { nome: '', marca: '', precoAntigo: 0, precoAtual: 0, imagem: '' };
      });
    }
  }
}
