import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    public authService:AuthService,
    public translateService:TranslateService
  ) { }

  ngOnInit(): void {
  }
}
