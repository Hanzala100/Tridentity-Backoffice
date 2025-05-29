import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { DataItem } from 'src/app/interfaces/DataItem.model';
import { dummyData } from 'src/assets/dummdata';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {

  dummyData = dummyData;
  data: DataItem[] = [];
  filteredData: DataItem[] = [];
  paginatedData: DataItem[] = [];


  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;


  searchTerm: string = '';
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';


  isLoading: boolean = false;

  ngOnInit() {
    this.loadDummyData();
  }

  loadDummyData() {
    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      this.data = this.dummyData

      this.filteredData = [...this.data];
      this.totalItems = this.filteredData.length;
      this.calculateTotalPages();
      this.updatePaginatedData();
      this.isLoading = false;
    }, 1000);
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredData = [...this.data];
    } else {
      this.filteredData = this.data.filter(item =>
        item.customer.customerName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.membershipId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.totalItems = this.filteredData.length;
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedData();
  }

  onSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredData.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (column) {
        case 'customerName':
          aValue = a.customer.customerName;
          bValue = b.customer.customerName;
          break;
        case 'membershipId':
          aValue = a.membershipId;
          bValue = b.membershipId;
          break;
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.updatePaginatedData();
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedData();
    }
  }

  onItemsPerPageChange() {
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updatePaginatedData();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getTypeColor(type: string): string {
    switch (type) {
      case 'fastest':
        return 'bg-blue-100 text-blue-800';
      case 'grand':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  refreshData() {
    this.loadDummyData();
  }

  exportData() {
    console.log('Exporting data...');
  }
}


