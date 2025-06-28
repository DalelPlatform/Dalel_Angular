import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderNavbarComponent } from '../service-provider-navbar/service-provider-navbar.component';
import { SharedModule } from '../../../shared/shared.module';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ServiceProviderNavbarComponent],
  imports: [CommonModule, SharedModule,RouterModule],
  exports: [ServiceProviderNavbarComponent],
})
export class ServiceProviderSharedModule {}
