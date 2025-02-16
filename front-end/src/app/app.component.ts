import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  isMenuOpen = false;

  constructor(private router: Router) {}

  // Função para alternar o estado do menu
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Função para navegar entre as rotas
  navigateTo(route: string) {
    this.router.navigate([route]);
    this.isMenuOpen = false; // Fecha o menu após navegar
  }
}
