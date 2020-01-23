import { Component, OnInit, AfterViewInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { replace } from 'feather-icons';

import { Menu, Type } from './menu.model';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentLayoutComponent implements AfterViewInit, OnDestroy, OnInit {
  menus: Menu[];
  type = Type;
  scriptElements = [
    document.createElement('script'),
    document.createElement('script')
  ];
  user = { name: '', role: '' };

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.menus = [
      {
        label: 'Video Processing',
        type: Type.LINK,
        icon: 'video',
        state: { to: '/video-processing', params: {} }
      },
      {
        label: 'BIC Code Detection',
        type: Type.LINK,
        icon: 'image',
        state: { to: '/bic', params: {} }
      }
    ];
  }

  ngOnInit() {
    this.user = { name: 'Admin Vision', role: 'Administrator' };
  }

  ngAfterViewInit() {
    this.scriptElements[0].src = './dashforge.js';
    this.scriptElements[1].src = './dashforge.aside.js';
    this.scriptElements.forEach(scriptElement => {
      document.body.appendChild(scriptElement);
    });
    replace();
  }

  ngOnDestroy() {
    this.scriptElements.forEach(scriptElement => {
      scriptElement.parentElement.removeChild(scriptElement);
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
