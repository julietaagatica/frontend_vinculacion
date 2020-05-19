import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [StorageService],
})
export class NavbarComponent implements OnInit {
  usuario: User;

  constructor(
    private storageService: StorageService,
    private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.storageService.getCurrentUser();
  }

  logOut() {
    this.authenticationService.logout()
    this.storageService.logout();
    this.usuario = null;
    this.router.navigate(['login']);
  }

  routerTo() {
    this.router.navigate(['app', 'admin', 'usuarios']);
  }

  isActive(input) {
    return this.activatedRoute.snapshot.url.toString().replace(/,/g,'/').includes(input);
  }
}
