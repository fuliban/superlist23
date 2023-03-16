import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Section } from 'src/app/models/section.model';
import { Product } from 'src/app/models/product.model';

import { Router } from '@angular/router';

import { TranslateService } from 'src/app/services/translate.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent {
	@Input() section: Section=<Section>{};

	currentUser:User=<User>{};

	bExpandedFav:boolean=false;
	bExpandedAll: boolean=false;
	expandedProduct:Product=<Product>{};

	@Input()
	set expandedSection(value:Section) {
		if (value!==null && value.name!==this.section.name) {
			//Another section is expanded
			this.bExpandedFav=false;
			this.bExpandedAll=false;
			this.expandedProduct=<Product>{}
    };
	}		

	productsInList:Product[]=[];	
	productsFavNotInList:Product[]=<Product[]>[];
	productsNoFavNotInList:Product[]=<Product[]>[];
  
	@Output() expandSectionEvent = new EventEmitter<Section>();


	constructor(		
		private productService:ProductService,
		public translateService:TranslateService,
		private router:Router,
		private authService:AuthService
	) {		
	}

	
	ngOnInit(): void {		
		this.authService.user$.subscribe(user=> {
			this.currentUser=user;
			if (this.section) this.productService.getUserSectionProducts(user,this.section,).subscribe(prod=> {
				if (prod) {					
					this.productsInList=this.productsSortedByDesc(prod.filter(prod=>(prod.status=='P')));
					this.productsFavNotInList=this.productsSortedByDesc(prod.filter(prod=>(prod.status!='P' && prod.favourite)));
					this.productsNoFavNotInList=this.productsSortedByDesc(prod.filter(prod=>(prod.status!='P' && !prod.favourite)));
				}				
			})
		})
		
	}

	onSectionExpandFav(): void {
		if (this.section) {
			if (this.bExpandedFav) {                														
				this.bExpandedFav=false;	
				this.bExpandedAll=false;

				this.expandSectionEvent.emit(<Section>{});
			}
			else {              						
				this.bExpandedFav=true;
				if (this.productsFavNotInList.length==0) this.bExpandedAll=true;

				this.expandSectionEvent.emit(this.section);
			}   
			
			this.expandedProduct=<Product>{};
		}
	}

	productInList(oProd:Product): boolean {
		return (oProd.status==='P')
	}

	productInFav(oProd:Product): boolean {
		if (oProd.favourite==null) return false;
		return oProd.favourite;
	}  	

	onSectionExpandAll(): void {
		if (this.section && this.productsInList && this.productInList.length>0) {  
			if (this.bExpandedAll) {				
				this.bExpandedAll=false;				
			}
			else {				
				this.bExpandedAll=true;				
			}
		} 
		else{
			alert(this.translateService.translate('NOMOREPROD'));
		}

		this.expandedProduct=<Product>{};
	}

/*
	productsSortedByOrderAndStatus(prod:Product[]) {
		return prod?.sort((a, b) => a['order'] < b['order'] ? -1 : a['order'] === b['order'] ? (a['status'] > b['status'] ? -1 : a['status'] === b['status'] ? 0 : 1) : 1);		
	}
*/

	productsSortedByStatus(prod:Product[]) {
		return prod?.sort((a, b) => (a['status'] || '') > (b['status']  || '') ? 1 : a['status'] === b['status'] ? 0 : -1);
	}

	productsSortedByDesc(prod:Product[]) {
		return prod?.sort((a, b) => a['desc'] > b['desc'] ? 1 : a['desc'] === b['desc'] ? 0 : -1);
  	}  

  	//CSS

	expandAllSectionCaption(): string {
		if (this.bExpandedAll) return this.translateService.translate('ONLYFAV'); else return this.translateService.translate('MOREPRODUCTS');
	}

	expandAllSectionIcon(): string {
		if (this.bExpandedAll) return 'expand_less'; else return 'expand_more';
	}

	productListStatusIcon(oProd:Product): string {
		if (oProd) {
			if (oProd.status=='P') {
				return 'add_circle_outline'
			}
			else {		
				if (this.bExpandedFav) {
				if (oProd.favourite) return 'favorite'; else return 'favorite_border';		
				}        
			}
		}
		return '';
	}  

	expandSectionIcon(): string {
		if (this.bExpandedFav) return 'expand_less'; else return 'expand_more';
	}
  

	sectionExpanded():boolean {
		return this.bExpandedFav
	}

	onProductExpanded($event: Product) {		
		this.expandedProduct=$event;
	}

	onCreateProduct(): void {
        this.router.navigate(['/createProduct/'+this.section.name ]);        
	}
}

