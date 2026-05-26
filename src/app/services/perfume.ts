import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PerfumeService {

  private apiUrl = 'http://localhost:3000/perfumes';

  constructor(private http: HttpClient) { }

  // READ
  getPerfumes() {
    return this.http.get(this.apiUrl);
  }

  // CREATE
  adicionarPerfume(perfume: any) {
    return this.http.post(this.apiUrl, perfume);
  }

  // UPDATE
  atualizarPerfume(id: number, perfume: any) {
    return this.http.put(`${this.apiUrl}/${id}`, perfume);
  }

  // DELETE
  deletarPerfume(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

adicionarCarrinho(produto: any) {

  const carrinho =
    JSON.parse(localStorage.getItem('carrinho') || '[]');

  carrinho.push(produto);

  localStorage.setItem(
    'carrinho',
    JSON.stringify(carrinho)
  );

}

}