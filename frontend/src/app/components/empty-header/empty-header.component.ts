import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { globalConstants } from 'src/app/constants/global-constant';

@Component({
    selector: 'app-empty-header',
    imports: [RouterModule],
    templateUrl: './empty-header.component.html',
    styleUrls: ['./empty-header.component.css'],
    standalone: true
})
export class EmptyHeaderComponent {
 constants: any =globalConstants;
 navLinks = [
    { label: 'Features', route: '/features' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Log In', route: '/login' }
  ];
}
