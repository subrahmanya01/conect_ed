import { Component, DoCheck, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { globalConstants } from 'src/app/constants/global-constant';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { NotificationComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';
import { LOCALSTORAGE_CONSTANTS } from 'src/app/constants/localstorage-constant';

@Component({
    selector: 'app-header',
    imports: [NotificationComponent, CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true
})
export class HeaderComponent implements OnInit, DoCheck {
  public constants : any = {};

  constructor(public userService : UserService, private router: Router, private authService: AuthService){}
 
  ngDoCheck(): void {
    this.setUserInfo();
  }

  ngOnInit(): void {
    this.constants = globalConstants;
  }

  navigateToChat() {
    this.router.navigateByUrl("/chat")
  }

  navigateToAddQuestion() {
    this.router.navigateByUrl("/ask-question")
  }

  setUserInfo(){
    if(!localStorage[LOCALSTORAGE_CONSTANTS.LOGGED_IN_USER]) return;
    let user = JSON.parse(localStorage[LOCALSTORAGE_CONSTANTS.LOGGED_IN_USER])
    this.userService.userId = user._id;
    this.userService.userName = user.firstName+ " "+ user.lastName;
    this.userService.email = user.email;
  }

  navigateToProfile() {
    this.router.navigateByUrl(`/profile/${this.userService.getUserId()}`)
  }

  logout() {
    let res = confirm("Do you really want to logout?");
    if(res) this.authService.logout();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
