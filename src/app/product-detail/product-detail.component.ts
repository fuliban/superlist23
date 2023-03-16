import { Component,AfterViewChecked,ElementRef,ViewChild } from '@angular/core';

import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { ConfigUIService } from '../services/config-ui.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TranslateService } from '../services/translate.service';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { firstValueFrom } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  @ViewChild("sectionSelector") sectionSelector: ElementRef=<ElementRef>{};

  product: Product=<Product>{};
	currentUser:User=<User>{};

  globals:  ConfigUIService=<ConfigUIService>{};
  bEditMode: boolean=false;	
	sections: string[]=[];


	constructor(private route: ActivatedRoute,  
    private productService: ProductService, 
            private location: Location,
            globals: ConfigUIService,
            public translateService:TranslateService,
            private authService:AuthService			
  ) {
    this.globals=globals;
  }


	ngOnInit() {       
		this.authService.user$.subscribe(user=>{
			this.currentUser=user;
			this.getProduct();
		
			this.productService.getSectionsName(user).subscribe(data => {				        
				this.sections = data;			
			});
    
		}) 				
	}
	
	ngAfterViewInit() {		    
		var instance = M.Dropdown.init(this.sectionSelector.nativeElement, '');
		console.log(this.sectionSelector.nativeElement.innerHTML);    
	}

  async save() {              
      if (!this.product.code || this.product.code=='')
      {
        M.toast({html: `${this.translateService.translate('PROWOUTC')}`});
      }
      else {
          if (this.bEditMode==true) {
              console.log('save.Start '+this.product.code);                                                              
              await this.productService.updateProduct(this.product,this.currentUser);
              M.toast({html: `${this.translateService.translate('UPDPROD')}`});
          }
          else {
              console.log('adding '+this.product.code);
              this.productService.createProduct(this.product,this.currentUser);
              M.toast({html: `${this.translateService.translate('CREPROD')}`});		
          }
      }             
  }

  getProduct() {
    
    const code = this.route.snapshot.paramMap.get('productCode');
    console.log('getProduct.init code:'+code);
    
    if (!code) {      
      this.bEditMode=false;
      
      //CREATE NEW PRODUCT
      const section = this.route.snapshot.paramMap.get('section');
      console.log('seccion ' + section);
      var p:Product = {code:'', desc:'', section:section ||'', id:'', status:''};    
                      
      this.product=p;        
    }
    else {
      //EDIT PRODUCT
      console.log('edit code:'+code);      
      
      this.productService.userProductByCode(this.currentUser,code).subscribe(
        {
          next: prod => {
            if (!prod) {
                console.log('getProduct: cant find product');                    
            }
            else {                    
              console.log('getProduct.edit '+prod.code + ' id '+prod.id);
              this.product= prod;          
              this.bEditMode=true;
            }
          },
          error: err => console.log('getProduct:'+err)  
        }
      );
    }
    
  }
  
  
	async onDescChange(value:string) {
    
		if (this.bEditMode==false) {
			var res=value.split(' ');
			var stCode:string;
			if (res[1]) {
				stCode=res[0].slice(0,3)+res[1].slice(0,3);
			}
			else {
				stCode=(res[0].slice(0,6));			
			}
			
			var stNewCode:string=stCode.toUpperCase()+'01';
			
			this.product.code=await this.freeCode(stNewCode);			
		}
	}

  
	async freeCode(stCode:string):Promise <string> {
    
    let prod=await this.productService.userProductByCodePromise(this.currentUser,stCode);
        

    if (!prod || prod==undefined) {
      console.log('code doent exist');
      return stCode;
    }
    else {   

      console.log('code exist '+prod.code + ' id'+prod.id);
                       
      this.product.code='';
      
      var stNewCode:string;
      var iIndex:number;
      var stIndex:string;
                
      iIndex=parseInt(stCode.slice(stCode.length-2,stCode.length))+1;					
      stIndex=('00'+iIndex.toString());
      stIndex=stIndex.slice(stIndex.length-2,stIndex.length);										

      stNewCode=stCode.slice(0,stCode.length-2)+stIndex;

      console.log(`freecode ${stNewCode}`);
      return await this.freeCode(stNewCode);
           
    }
    
    /*
		this.productService.userProductByCode(this.currentUser,stCode).subscribe(
      {
        next:(prod)=>{
          if (!prod) {
            console.log('code doent exist');
            this.product.code=stCode;            
        }
        else {                    
          console.log('code exist '+prod.code + ' id'+prod.id);

          this.product.code='';
          
          var stNewCode:string;
          var iIndex:number;
          var stIndex:string;
                    
          iIndex=parseInt(stCode.slice(stCode.length-2,stCode.length))+1;					
          stIndex=('00'+iIndex.toString());
          stIndex=stIndex.slice(stIndex.length-2,stIndex.length);										

          stNewCode=stCode.slice(0,stCode.length-2)+stIndex;
  
          this.freeCode(stNewCode);
        }
        },
        error: (err)=>{console.log('onDescChange:'+err)}
      }
    )*/
	}

	onChangeFavourite(oProduct:Product): void {
    var bMark: boolean;
    if (oProduct.favourite) {
        bMark=false;
    } else {
        bMark=true;        
    }
    oProduct.favourite=bMark;		
  }

  goBack(): void {				
    this.location.back();
  }

	imgProduct(prod: Product): string {
		if (!prod || !prod.urlImg || prod.urlImg=='') 
			return '';
		else
			return prod.urlImg;		
	}

	favColor(prod:Product): string {
		if (prod && prod.favourite) return '#d50000 red-text text-accent-4'; else return 'grey-text';
    }
    
	setSection(stText:string) {
		console.log(stText);
		if (this.product) this.product.section=stText;
	}  
}
