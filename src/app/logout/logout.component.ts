import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  public user:User=<User>{};

  constructor(
    public authService:AuthService,
    public translateService: TranslateService
  ) {
      
  }

   ngOnInit(): void {
    this.authService.user$.subscribe((user)=>{      
      this.user=user
    })
   }
}
