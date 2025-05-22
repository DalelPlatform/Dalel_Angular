import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-property-owner-layout',
  templateUrl: './property-owner-layout.component.html',
  styleUrl: './property-owner-layout.component.css',
  standalone:false,
})
export class PropertyOwnerLayoutComponent implements OnInit {
  // Navigation items for the sidebar
  navItems = [
    { path: '/dashboard', title: 'Dashboard', icon: 'icon-dashboard', active: true },
    { path: '/properties', title: 'My Properties', icon: 'icon-properties', active: false },
    { path: '/property/owner/add-property', title: 'Add Property', icon: 'icon-add', active: true },
    { path: '/tenants', title: 'Tenants', icon: 'icon-tenants', active: false },
    { path: '/maintenance', title: 'Maintenance', icon: 'icon-maintenance', active: false },
    { path: '/payments', title: 'Payments', icon: 'icon-payments', active: false },
    { path: '/documents', title: 'Documents', icon: 'icon-documents', active: false },
    { path: '/settings', title: 'Settings', icon: 'icon-settings', active: false }
  ];

  // Flag to track sidebar collapsed state for mobile responsiveness
  isSidebarCollapsed = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to route changes to update active state
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateActiveState(event.url);
    });

    // Initialize active state based on current route
    this.updateActiveState(this.router.url);

    // Check screen size on init
    this.checkScreenSize();

    // Add resize listener for responsive behavior
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  // Method to navigate to the selected route
  navigateTo(path: string): void {
    this.router.navigate([path]);
    this.updateActiveState(path);

    // Auto-collapse sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      this.isSidebarCollapsed = true;
    }
  }

  // Update the active state of navigation items
  private updateActiveState(currentPath: string): void {
    this.navItems.forEach(item => {
      item.active = currentPath.includes(item.path);
    });
  }

  // Method to handle logout
  logout(): void {
    // Add your logout logic here
    // For example: this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Toggle sidebar collapse state for mobile view
  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  // Check screen size and set sidebar state accordingly
  private checkScreenSize(): void {
    this.isSidebarCollapsed = window.innerWidth <= 768;
  }
}
