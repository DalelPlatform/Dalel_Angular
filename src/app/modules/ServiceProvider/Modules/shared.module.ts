import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceProviderNavbarComponent } from '../service-provider-navbar/service-provider-navbar.component';

@NgModule({
  declarations: [ServiceProviderNavbarComponent],
  imports: [CommonModule],
  exports: [ServiceProviderNavbarComponent]
})
export class SharedModule {}
