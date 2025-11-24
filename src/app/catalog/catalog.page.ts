// src/app/catalog/catalog.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgForOf } from '@angular/common';
import {
  IonContent,
  IonSearchbar,
  IonButton
} from '@ionic/angular/standalone';

import { CatalogService, WineDto, CheeseDto } from '../services/catalog.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  imports: [
    CommonModule,
    NgIf,
    NgForOf,
    IonContent,
    IonSearchbar,
    IonButton
  ]
})
export class CatalogPage implements OnInit {

  // Datos del backend
  wines: WineDto[] = [];
  cheeses: CheeseDto[] = [];

  // Estado UI
  selectedType: 'wines' | 'cheeses' = 'wines';
  searchTerm: string = '';

  // Paginación
  pageSize = 6;
  currentPage = 1;

  constructor(private catalogService: CatalogService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.catalogService.getWines().subscribe({
      next: data => this.wines = data
    });

    this.catalogService.getCheeses().subscribe({
      next: data => this.cheeses = data
    });
  }

  // Lista base según tipo
  get baseList() {
    return this.selectedType === 'wines' ? this.wines : this.cheeses;
  }

  // Lista filtrada por texto
  get filteredList() {
    const text = this.searchTerm.toLowerCase().trim();
    if (!text) return this.baseList;

    return this.baseList.filter(item =>
      item.nameEn.toLowerCase().includes(text) ||
      item.origin.toLowerCase().includes(text)
    );
  }

  // Lista paginada (6 elementos por página)
  get paginatedList() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end   = start + this.pageSize;
    return this.filteredList.slice(start, end);
  }

  // Total de páginas
  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredList.length / this.pageSize));
  }

  // Navegación de páginas
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  private resetPage() {
    this.currentPage = 1;
  }

  // Eventos de UI
  onSelect(type: 'wines' | 'cheeses') {
    this.selectedType = type;
    this.resetPage();
  }

  onSearch(event: any) {
    this.searchTerm = event.detail.value || '';
    this.resetPage();
  }
}
