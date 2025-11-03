import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { SharedDataService } from './services/shared-data.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {
  title = 'linked-in-reva-frontend';
  isLoggedIn: boolean = false;
  routesToHideHeader: string[] = ["/login", "/register"];
  showHeader: boolean = true;

  constructor(private readonly authService: AuthService, 
    private readonly router: Router,
    private readonly sharedDataService: SharedDataService,
    private socketService: SocketService){}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.routesToHideHeader.some((x: string) => event.urlAfterRedirects.includes(x))) {
          this.sharedDataService.displayHeader(false);
        }
        else {
          this.sharedDataService.displayHeader(true);
        }
      }
    });

    this.sharedDataService.showHeader$.subscribe((show: boolean) => {
      this.showHeader = show;
    });
  }

  ngDoCheck(): void {
    if(localStorage[this.authService.JWT_TOKEN]) this.isLoggedIn =true;
    else this.isLoggedIn = false;
  }




}
