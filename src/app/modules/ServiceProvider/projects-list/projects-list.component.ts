import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiceProviderProjectService } from '../Services/serviceproviderprojects.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceProvider } from '../Models/serviceprovider.model';
import { ServiceProviderService } from '../Services/provider.service';
import { Subject, takeUntil, finalize } from 'rxjs';
interface Project {
  Id: number;
  Name: string;
  Description: string;
  ApproximatePrice: number;
  PriceUnit: string;
  ServiceProviderId: string;
  Image: string;
}
@Component({
  selector: 'app-projects-list',
  standalone: false,
  templateUrl: './projects-list.component.html',
  styleUrl: './projects-list.component.css'
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  // Data properties
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedProject: Project | null = null;
  providerProfile!: ServiceProvider;
  providerId!: string;
  imagePreview: string = '';


  // UI State
  isLoading = false;
  isInitializing = true;
  showDetailsModal = false;
  showDeleteModal = false;
  showEditModal = false;
  isDeleting = false;

  // Pagination & Filtering
  currentPage = 1;
  pageSize = 6;
  totalPages = 1;
  totalItems = 0;
  searchTerm = '';
  sortDirection: 'asc' | 'desc' = 'desc';
  sortBy: 'name' | 'price' | 'date' = 'date';

  constructor(
    private projectService: ServiceProviderProjectService,
    private toastr: ToastrService,
    private service: ServiceProviderService,
  ) { }

  ngOnInit(): void {
    this.initializeComponent();
    this.loadProviderProfile();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeComponent(): void {
    this.isInitializing = true;
    this.loadProviderProfile();
  }

  loadProviderProfile(): void {
    this.service.getOwnProfile().subscribe({
      next: (res) => {
        if (!res.Success) {
          this.toastr.error(res.Message || 'Failed to load profile');
          return;
        }
        this.isInitializing = false;
        this.providerProfile = res.Data;
        this.providerId = this.providerProfile.UserId;
        console.log(this.providerProfile);
        console.log(this.providerId);
        this.getProjects();
      },
      error: err => {
        this.isInitializing = false;
        console.error('Profile load failed', err);
        this.toastr.error('Failed to load profile');
      }
    });
  }
  trackByProjectId(index: number, project: Project): number {
    return project.Id;
  }

  getProjects(): void {
    if (!this.providerId) {
      this.toastr.error('Provider ID not available');
      return;
    }
    this.isLoading = true;
    this.projectService.getProjectsByProvider(this.providerId, 1000, 1)
      .subscribe({
        next: (res) => {

          this.projects = res.Data.Data || [];
          console.log("Projects: ", this.projects);
          this.applyFilters();
          this.toastr.success(`Loaded ${this.projects.length} projects`);
        }
        ,
        error: (err) => {
          console.error('Projects load failed', err);
          this.toastr.error('Failed to fetch projects');
        }
      });
  }

  applyFilters(): void {
    let filtered = [...this.projects];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.Name.toLowerCase().includes(searchLower) ||
        p.Description.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (this.sortBy) {
        case 'name':
          comparison = a.Name.localeCompare(b.Name);
          break;
        case 'price':
          comparison = a.ApproximatePrice - b.ApproximatePrice;
          break;
        case 'date':
        default:
          comparison = a.Id - b.Id;
          break;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.totalItems = filtered.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);

    // Reset to first page if current page is out of bounds
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }

    // Apply pagination
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.filteredProjects = filtered.slice(start, end);
    console.log("filterd projects: ", this.filteredProjects);

  }


  onSearchChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyFilters();
    }
  }

  changeSort(sortBy: 'name' | 'price' | 'date'): void {
    if (this.sortBy === sortBy) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = sortBy;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(sortBy: 'name' | 'price' | 'date'): string {
    if (this.sortBy !== sortBy) return 'bi-arrow-down-up';
    return this.sortDirection === 'asc' ? 'bi-arrow-up' : 'bi-arrow-down';
  }

  openDetails(project: Project): void {
    this.selectedProject = project;
    this.showDetailsModal = true;
  }

  openEdit(project: Project): void {
    this.selectedProject = project;
    this.showEditModal = true;
  }


  submitEdit(): void {
    if (!this.selectedProject) return;

    const formData = new FormData();
    formData.append('Name', this.selectedProject.Name);
    formData.append('Description', this.selectedProject.Description);
    formData.append('ApproximatePrice', this.selectedProject.ApproximatePrice.toString());
    formData.append('PriceUnit', this.selectedProject.PriceUnit);
    formData.append('ServiceProviderId', this.selectedProject.ServiceProviderId); // لو مطلوب من الباك



    this.projectService.updateProject(this.selectedProject.Id, formData).subscribe({
      next: (res) => {
        if (res.Success) {
          this.toastr.success('Project updated successfully');
          this.closeModals();
          this.getProjects();
        } else {
          this.toastr.error(res.Message || 'Failed to update project');
        }
      },
      error: (err) => {
        console.error('Update failed', err);
        this.toastr.error('Update request failed');
      }
    });
  }


  openDelete(project: Project): void {
    this.selectedProject = project;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (!this.selectedProject) return;

    this.isDeleting = true;
    this.projectService.deleteProject(this.selectedProject.Id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isDeleting = false)
      )
      .subscribe({
        next: (res) => {
          if (res.Success) {
            this.toastr.success('Project deleted successfully');
            this.closeModals();
            this.getProjects();
          } else {
            this.toastr.error(res.Message || 'Failed to delete project');
          }
        },
        error: (err) => {
          console.error('Delete failed', err);
          this.toastr.error('Failed to delete project');
        }
      });
  }

  closeModals(): void {
    this.showDetailsModal = false;
    this.showDeleteModal = false;
    this.showEditModal = false;
    this.selectedProject = null;
  }

  refreshProjects(): void {
    this.getProjects();
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, this.currentPage - 2);
      const end = Math.min(this.totalPages, start + maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  }
}