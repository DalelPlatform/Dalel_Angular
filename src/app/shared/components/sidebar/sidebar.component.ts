import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  // imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: '../profile/profile.component.css',
  standalone:false
})
export class SidebarComponent {
@Input() links: { label: string, icon: string, route: string }[] = [];
}