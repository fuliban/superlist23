import { Component,OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../models/section.model';
import { User } from '../models/user.model';

import { AuthService } from '../services/auth.service';
import { ConfigUIService } from '../services/config-ui.service';
import { ProductService } from '../services/product.service';
import { TranslateService } from '../services/translate.service';
import { Location } from '@angular/common';
import { CreateSectionService } from '../aplication/create-section.service';
import { RenameSectionService } from '../aplication/rename-section.service';

declare var M:any;

@Component({
  selector: 'app-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.css']
})

export class SectionDetailComponent {
  @Input() section: Section = <Section>{};	

  globals:  ConfigUIService=<ConfigUIService>{};
  bEditMode: boolean=false;	
  currentUser:User=<User>{};
  stOriginalName: string="";

  constructor(private route: ActivatedRoute,
	private location: Location,
	globals: ConfigUIService,
	public translateService:TranslateService,
	public authService:AuthService,
	private productService:ProductService,
	private createSectionService:CreateSectionService,
	private renameSectionService:RenameSectionService
  ) { 
    this.globals=globals;
  }  


	ngOnInit(): void {
		this.authService.user$.subscribe(user=>{
			this.currentUser=user;
			this.getSection(user);
		})
	  }

	getSection(user:User) {
    
		const name = this.route.snapshot.paramMap.get('sectionName');
		console.log('getSection.init code:'+name);

		if (!name) {
			this.bEditMode=false;

			//CREATE NEW SECTION						
			var s:Section = {name:'', order:0};        
			this.section=s;
		}		
		else {
			//EDIT SECTION
			this.stOriginalName=name;			

			this.productService.getSectionByName(name,user).then(sec => {
				if (!sec) {
					console.log('getSection: cant find section');                               
				}
				else {
					console.log('getSection.edit '+sec.name + ' id'+sec.id);
					this.section= sec;   

					this.bEditMode=true;
				}
			},
			err => console.log('getSection:'+err)
			);

		}
		
	}
		
	async save() {
		
		console.log('save.Init EditMode: '+ this.bEditMode);
		
		if (!this.section.name || this.section.name=='')
		{            
			M.toast({html: `${this.translateService.translate('SECNONAME')}`});		
		}
		else {
			if (this.bEditMode==true) {                							
				if (this.section.name != this.stOriginalName) {
					this.renameSectionService.usecaseRenameSection(this.currentUser,this.stOriginalName,this.section).then(()=>{
						this.stOriginalName=this.section.name;
						M.toast({html: `${this.translateService.translate('UPDSEC')}`});		
					});
				}											
			}
			else {				
				this.createSectionService.usecaseCreateSection(this.currentUser,this.section).then(()=>{
					M.toast({html: `${this.translateService.translate('ADDSEC')}`});
				}).catch((error:any)=>{
					M.toast({html: `${error}`});
				});		
																					
			}
		}                  
	}	


	onNameChange(value:string) {
		if (this.bEditMode==false) {
			value=value.toUpperCase().slice(0,20);			
			this.section.name=this.validLetters(this.removeAccents(value));						
		}
	}
	
	goBack(): void {
		this.location.back();
	}

	removeAccents(st: string):string{
    /*todo
		const accents:string[] = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U'};
		return st.split('').map( letter => accents[letter] || letter).join('').toString();	
    */
   		return st;
	}
	
	validLetters(st:string):string {
		return st.replace(/[^a-zA-Z ]/g, "");
	}  
}
