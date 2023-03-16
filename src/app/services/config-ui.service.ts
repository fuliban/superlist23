import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigUIService {
  bListViewMode: boolean
	bSettingsMode: boolean
	stLanguage:string

  constructor() { 
    this.bListViewMode=true;
	  this.bSettingsMode=false;
	  this.stLanguage="ES";
  }
  
}
