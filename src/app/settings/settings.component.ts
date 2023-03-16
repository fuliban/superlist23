import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigUIService } from '../services/config-ui.service';
import { TranslateService } from '../services/translate.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(
    private router: Router,
    public auth:AuthService,
    public translateService: TranslateService,
    public globals: ConfigUIService
  ) { }


	onCreateSection() {
    this.router.navigate(['/createSection']);
  }
  
	onChangeLanguage() {
		if (this.globals.stLanguage=='EN') this.globals.stLanguage='ES'; else this.globals.stLanguage='EN';
  }

  onAdminSections() {
    this.router.navigate(['/adminSections']);
  }
  
  onGoHome() {
    this.router.navigate(['/']);
  }

	language():string {
		return this.globals.stLanguage;
	}  
}
