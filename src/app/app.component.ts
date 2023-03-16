import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ConfigUIService } from './services/config-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "Superlist '23";
  configUI: ConfigUIService;

  constructor(        
		globals: ConfigUIService,
		private router:Router,
		public auth:AuthService
    ) { 		
		this.configUI=globals;			
	}

  onViewSettings() {    
    
		if (this.configUI.bSettingsMode) this.router.navigate(['/']); else this.router.navigate(['/settings']);
		this.configUI.bSettingsMode=!this.configUI.bSettingsMode;
    
	}
}
