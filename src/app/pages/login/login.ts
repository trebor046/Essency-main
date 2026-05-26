import { Component, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  tela = 'login';

  loginEmail = '';
  loginSenha = '';
  loginMsg   = '';
  loginErro  = false;

  regNome      = '';
  regEmail     = '';
  regTelefone  = '';
  regSenha     = '';
  regMsg       = '';
  regErro      = false;

  recEmail = '';
  recMsg   = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // só verifica localStorage no navegador, nunca no servidor
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('usuarioLogado')) {
        this.router.navigate(['/home']);
      }
    }
  }

  mostrar(tela: string) {
    this.tela     = tela;
    this.loginMsg = '';
    this.regMsg   = '';
    this.recMsg   = '';
  }

  entrar() {
    this.loginMsg = '';
    if (!this.loginEmail || !this.loginSenha) {
      this.loginErro = true;
      this.loginMsg  = '❌ Preencha email e senha.';
      return;
    }

    // Login ADM fixo
    if (this.loginEmail === 'admin@essency.com' && this.loginSenha === 'admin123') {
      const admin = { nome: 'Administrador', email: this.loginEmail, isAdmin: true };
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('usuarioLogado', JSON.stringify(admin));
      }
      this.loginErro = false;
      this.loginMsg  = '✓ Bem-vindo, Administrador!';
      setTimeout(() => this.router.navigate(['/home']), 800);
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/users?email=${this.loginEmail}`)
      .subscribe(users => {

        if (users.length === 0) {
          this.loginErro = true;
          this.loginMsg  = '❌ Conta não encontrada. Verifique o email ou crie uma conta.';
          this.cdr.detectChanges();
          return;
        }

        if (users[0].senha !== this.loginSenha) {
          this.loginErro = true;
          this.loginMsg  = '❌ Senha incorreta.';
          this.cdr.detectChanges();
          return;
        }

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('usuarioLogado', JSON.stringify(users[0]));
        }

        this.loginErro = false;
        this.loginMsg  = `✓ Bem-vindo, ${users[0].nome}!`;
        this.cdr.detectChanges();
        setTimeout(() => this.router.navigate(['/home']), 800);
      });
  }

  registrar() {
    this.regMsg = '';
    if (!this.regNome || !this.regEmail || !this.regTelefone || !this.regSenha) {
      this.regErro = true;
      this.regMsg  = '❌ Preencha todos os campos.';
      return;
    }

    this.http.get<any[]>(`http://localhost:3000/users?email=${this.regEmail}`)
      .subscribe(users => {
        if (users.length > 0) {
          this.regErro = true;
          this.regMsg  = '❌ Este email já está cadastrado.';
          this.cdr.detectChanges();
          return;
        }

        this.http.post('http://localhost:3000/users', {
          email: this.regEmail, senha: this.regSenha, nome: this.regNome,
          telefone: this.regTelefone, isAdmin: false
        }).subscribe(() => {
          this.regErro = false;
          this.regMsg  = '✓ Conta criada! Entrando...';
          setTimeout(() => {
            this.loginEmail = this.regEmail;
            this.loginSenha = this.regSenha;
            this.entrar();
          }, 900);
        });
      });
  }

  recuperar() {
    this.recMsg = '';
    if (!this.recEmail) {
      this.recMsg = '❌ Digite seu email.';
      return;
    }
    this.http.get<any[]>(`http://localhost:3000/users?email=${this.recEmail}`)
      .subscribe(users => {
        if (users.length === 0) {
          this.recMsg = '❌ Email não encontrado.';
        } else {
          this.recMsg = `✓ Senha de "${users[0].nome}": ${users[0].senha}`;
        }
        this.cdr.detectChanges();
      });
  }
}
