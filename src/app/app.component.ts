import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'todoApp';
  pageTitle = 'Mis Tareas';
  constructor(
    private auth: AuthService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
  ) {
    this.matIconRegistry.addSvgIcon(
      'icon-check',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/check-circle-svgrepo-com.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'icon-delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon_delete.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'icon-moon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-moon.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'icon-sun',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/icon-sun.svg',
      ),
    );
  }

  ngOnInit() {
    this.auth.initialise();
  }

  changePageHeader() {
    this.pageTitle = this.router.url === '/login' ? 'Login' : 'Mis Tareas';
  }
}
