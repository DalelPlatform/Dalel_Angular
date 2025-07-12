import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../../../../Services/TravelAgency/agency.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Packages',
  templateUrl: './Packages.component.html',
  styleUrls: ['./Packages.component.css'],
  standalone:false
})
export class PackagesComponent implements OnInit {
 packages: any[] = [];
  totalCount: number = 0;

  filters = {
    searchText: '',
    Name: '',
    Price: '',
    pageSize: 4,
    pageIndex: 1,
    OrderBy: 'Id',
    IsAscending: true
  };
  constructor(private  router: Router,private agencyPackageService: AgencyService) { }

  ngOnInit() {
       this.getPackages();
  }
  getPackages() {
    this.agencyPackageService.searchPackages(this.filters).subscribe({
      next: (res: any) => {
        this.packages = res.Data.Data || res;
        this.totalCount = res.total || res.length || 0;
        console.log(res.Data.Data)
      },
      error: (err) => {
        console.error('Error while fetching packages', err);
      }
    });
  }
 onSearch() {
    this.filters.pageIndex = 1;
    this.getPackages();
  }
  
  resetFilters() {
    this.filters = {
      searchText: '',
      Name: '',
      Price: '',
      pageSize: 4,
      pageIndex: 1,
      OrderBy: 'Id',
      IsAscending: true
    };
    this.getPackages();
  }
    nextPage() {
      
    this.filters.pageIndex++;
    this.getPackages();
  }

  prevPage() {
    if (this.filters.pageIndex > 1) {
      this.filters.pageIndex--;
      this.getPackages();
    }
  }
    viewPackages(id: number) {
      console.log(id)
  this.router.navigateByUrl(`/agancy/client/packageDetails/${id}`);
}
}