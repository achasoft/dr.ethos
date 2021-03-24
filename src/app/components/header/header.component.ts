import { Component, OnInit } from '@angular/core';
import {IdentityService} from '../../services/auth/identity.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    readonly identity: IdentityService,
    readonly router: Router,
  ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.identity.logout();
    this.router.navigateByUrl('/login');
  }
}
