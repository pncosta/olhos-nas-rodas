import { Component, OnInit } from '@angular/core';
import {MatButtonModule, MatMenuModule} from '@angular/material';
import { AuthService } from '..//auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle()
    .then((res) => {
        this.router.navigate(['dashboard'])
      })
    .catch((err) => console.log(err));
  }


}
