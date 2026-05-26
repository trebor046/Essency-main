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

  // Objeto que guarda os dados do formulário
  novoPerfume: any = {
    nome: '',
    marca: '',
    precoAntigo: 0,
    precoAtual: 0,
    imagem: '',
    categoria: '',
    banner: false
  };

  // Guarda o ID quando estiver editando um perfume
  idEditando: any = null;

  constructor(
    private perfumeService: PerfumeService, // Service responsável pelo CRUD
    private route: ActivatedRoute,          // Pega parâmetros da URL (ex: id)
  ) { }

  ngOnInit() {

    // Pega o ID da URL (caso exista)
    const id = this.route.snapshot.paramMap.get('id');

    // Se existir ID, significa que é edição
    if (id) {

      this.idEditando = id;

      // Busca todos os perfumes para encontrar o que será editado
      this.perfumeService.getPerfumes()
        .subscribe((data: any) => {

          // Procura o perfume pelo ID
          const produto = data.find(
            (p: any) => p.id == id
          );

          // Se encontrar, preenche o formulário
          if (produto) {
            this.novoPerfume = produto;
          }

        });

    }

  }

  // Captura a imagem selecionada no input file
  selecionarImagem(event: any) {

    const arquivo = event.target.files[0];

    if (arquivo) {
      // Salva apenas o nome da imagem
      this.novoPerfume.imagem = '/' + arquivo.name;
    }

  }

  // Função principal: cria ou atualiza perfume
  cadastrarPerfume() {

    // ---------------- EDITAR ----------------
    if (this.idEditando) {

      this.perfumeService
        .atualizarPerfume(this.idEditando, this.novoPerfume)
        .subscribe(() => {

          alert('Produto atualizado com sucesso!');

          // Volta para home após editar
          window.location.href = '/home';


        });

    }

    // ---------------- CRIAR ----------------
    else {

      this.perfumeService
        .adicionarPerfume(this.novoPerfume)
        .subscribe(() => {

          alert('Perfume cadastrado com sucesso!');

          // Vai para home após cadastrar
          window.location.href = '/home';

        });

    }

  }

}