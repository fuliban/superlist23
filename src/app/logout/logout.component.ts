import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    public auth:AuthService,
    public translateService: TranslateService
  ) { }
}
