import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidebar',
  // imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: '../profile/profile.component.css',
  standalone:false
})
export class SidebarComponent implements OnInit{
   img: string = '';
   isLoggedIn: boolean = false;
@Input() links: { label: string, icon: string, route: string }[] = [];
constructor( private cookieService: CookieService, private router: Router,){

}
  ngOnInit(): void {
     const Image= this.cookieService.get('Image')
      const Token= this.cookieService.get('Token')
           if (Token) {
    this.isLoggedIn = true;
    
  }
this.img = Image || 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
  }
logout() {
  console.log("g")
this.cookieService.deleteAll();
  this.router.navigate(['/login']);   
  this.isLoggedIn = false;           
}
}