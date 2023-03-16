import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { ConfigUIService } from '../services/config-ui.service';
import { TranslateService } from '../services/translate.service';

import { User } from '../models/user.model';
import { Section } from '../models/section.model';

import { map,concatMap, Observer } from 'rxjs';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  	sections: Section[]=[];	
	
	expandedSection:Section=<Section>{};
	currentUser:User=<User>{};
	bLoading:boolean;
	bLoadDatabase:boolean=false;

	numberOfProducts:number=0;	

  constructor (
    public authService:AuthService,
	private productService: ProductService,
	public configUIService: ConfigUIService,
	public translateService: TranslateService
	) {
		this.bLoading=true;
	}

	ngOnInit(): void {    	
		const observer:Observer<User> = {
			next: (user: User) => { 
				this.bLoading=false;
				this.currentUser=user;
				this.productService.getUserSections(user).subscribe(
					(data:Section[])=> {						
						if (data.length==0) {
							console.log(`load sections `+this.currentUser.displayName);
							//todo this.productService.loadDatabaseSections(this.currentUser);
							console.log(`load products `+this.currentUser.displayName);
							//todo this.productService.loadDatabaseProducts(this.currentUser);
						}
						else {
							this.sections = data;							
							this.productService.numberOfProductsToBuy(this.currentUser).subscribe(total=>{this.numberOfProducts=total})
						}
					}
				)
			 },
			error:this.onError,
			complete: function (): void {console.log('ngOnInit completed')}
		};
		this.authService.user$.subscribe(observer);
			  
	}

	onError(error:any):void {
		this.bLoading=false;
		console.log(`ngOnInit ${error}`);
	}

	onListMode() {
		this.configUIService.bListViewMode=true;		
	}

	onBuyMode() {
		this.configUIService.bListViewMode=false;
	}

	onSectionExpanded($event: Section) {		
		this.expandedSection=$event;
	} 
}
