import { Component } from '@angular/core';
import { globalConstants } from 'src/app/constants/global-constant';
import { settings } from 'src/assets/appsettings';

@Component({
    selector: 'app-empty-header',
    templateUrl: './empty-header.component.html',
    styleUrls: ['./empty-header.component.css'],
    standalone: false
})
export class EmptyHeaderComponent {
 constants: any =globalConstants;
 navLinks = [
    { label: 'Features', route: '/features' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Log In', route: '/login' }
  ];
}
