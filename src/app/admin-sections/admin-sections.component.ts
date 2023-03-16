import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Section } from '../models/section.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { TranslateService } from '../services/translate.service';
import { ProductService } from '../services/product.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-sections',
  templateUrl: './admin-sections.component.html',
  styleUrls: ['./admin-sections.component.css']
})
export class AdminSectionsComponent {
  sections:Section[]=<Section[]>[];
  currentUser:User=<User>{};

  constructor(  
    private productService: ProductService,  
    private location:Location,
    private router:Router,
    public translateService:TranslateService,
    private authService:AuthService,    
  ) { }

  
  ngOnInit(): void {
    this.authService.user$.subscribe(user=> {
      this.currentUser=user;
      this.productService.getUserSections(user).subscribe((sec:Section[])=>{if(sec) this.sections=sec});
    }
    )   
  }	

  onOrderUp(section: Section) {
    /*todo
		var a=this.sections.filter((currentItem,index,array)=> {
				if (currentItem.order<section.order) return currentItem;
			}
		).sort((a,b)=>{return b.order>a.order?1:-1})				
		
		if (a.length>0) {
			var temp=section.order;
			
			section.order=a[0].order;
			a[0].order=temp;	

		}
		else console.log('first section!!!');
		*/
  }	

	onOrderDown(section: Section) {    
    /*todo            		
    var a=this.sections.filter((currentItem,index,array)=> {
      if (currentItem.order>section.order) return currentItem;
    }
  ).sort((a,b)=>{return a.order>b.order?1:-1})				
  
  if (a.length>0) {
    var temp=section.order;
    console.log(section.name+ ' ' + section.order);
    console.log(a[0].name+ ' ' + a[0].order);
    
    section.order=a[0].order;
    a[0].order=temp;	
  }
  else console.log('last section!!!');
  */
  }	

  onCreateSection() {
    this.router.navigate(['/createSection']);
  }

  saveOrderSections() {
    var iOrder=10;
    if (this.sections) {
      this.sections.sort((a,b)=>{return a.order>b.order?1:-1}).forEach(
        val=> {					
          val.order=iOrder;					
          iOrder=iOrder+10;
          this.productService.updateSection(this.currentUser,val);
        }
      )
    }      
  }    

  save() {
    this.saveOrderSections;
    this.location.back();
  }
}
