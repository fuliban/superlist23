import { Component,ViewChild,ElementRef } from '@angular/core';
import { Observable,of, switchMap } from 'rxjs';
import { map } from 'rxjs';

import { TranslateService } from 'src/app/services/translate.service';
import { AuthService } from 'src/app/services/auth.service';

import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { ProductService } from 'src/app/services/product.service';
import { AddProductToBuyListService } from 'src/app/aplication/add-product-to-buy-list.service';

declare var M: any;

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent {
  products: Observable<Product[]>=of(<Product[]>[]);
	currentUser:User=<User>{};
	@ViewChild('someInput') someInput: ElementRef = <ElementRef>{};

	constructor(		
		private translateService: TranslateService,
		private authService:AuthService,
		private productService: ProductService	,
		private addProductToBuyListService:AddProductToBuyListService	
	) {		
	}

	ngOnInit(): void {

		this.products=this.authService.user$.pipe(
			map(user=>this.currentUser=user),
			switchMap(user=>this.productService.getAllProducts(user))
		)

		
	}

	ngAfterViewInit() {    		
		this.initAutoComplete();
		this.loadAutoCompleteList();		
	}
	
	initAutoComplete() {
		var _this=this;
		
		var f= function(text:string,p:ProductSearchComponent) {			
			p.addFromAutocomplete(text)	;		
		}
		    
		var options = {			
			minLength: 3,
			onAutocomplete: function(texto:string) {
				f(texto,_this);
				//this.el.value='';
			}
		}		

		var instances = M.Autocomplete.init(this.someInput.nativeElement, options);		
    
  	}
  
	addFromAutocomplete(stText:string) {
		console.log(`addFromAutocomplete ${stText}`);
		this.productService.getProductByDesc(this.currentUser,stText).then(prod=>
			this.addProductToBuyListService.usecaseAddProductToBuyList(this.currentUser,prod).then (
				M.toast({html: `${this.translateService.translate('ADDPROD')}`})
			)
		)		
	}
	
	loadAutoCompleteList() {			
		this.products.subscribe(oProds => {		
		
			let autoC  = this.someInput.nativeElement;
				
			if (autoC) {							
				var instance=M.Autocomplete.getInstance(autoC);
				if(instance) {	
					var productList: string= '';
		
					if (oProds && oProds.length>0) {
						oProds.forEach (
										val=> {											
											if (productList.length>0) productList=productList+',';
											productList=`${productList}"${val.desc}":null`
										} 							
						)			
					}
					
					productList=`{${productList}}`;					

					var data=JSON.parse(productList);	
					instance.updateData(data);	
				} 
			}
				
		})
	}
}
