import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListComponent } from './product-list/product-list.component';
import { SectionListComponent } from './product-list/section-list/section-list.component';
import { ProductInComponent } from './product-list/section-list/product-in/product-in.component';
import { ChangefavouritePipe } from './pipes/changefavourite.pipe';
import { QuantityPipe } from './pipes/quantity.pipe';
import { VisibleproductsPipe } from './pipes/visibleproducts.pipe';
import { TwolinesdescPipe } from './pipes/twolinesdesc.pipe';
import { TimeagoPipe } from './pipes/timeago.pipe';

import { ProductOutComponent } from './product-list/section-list/product-out/product-out.component';
import { SectionBoxComponent } from './product-list/section-box/section-box.component';
import { ProductBoxComponent } from './product-list/section-box/product-box/product-box.component';
import { PurchasedListComponent } from './product-list/purchased-list/purchased-list.component';
import { ProductSearchComponent } from './product-list/product-search/product-search.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { AdminSectionsComponent } from './admin-sections/admin-sections.component';
import { SettingsComponent } from './settings/settings.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SectionListComponent,
    ProductInComponent,
    ChangefavouritePipe,
    QuantityPipe,
    TwolinesdescPipe,
    VisibleproductsPipe,
    TimeagoPipe,
    ProductOutComponent,
    SectionBoxComponent,    
    ProductBoxComponent, PurchasedListComponent, TimeagoPipe, ProductSearchComponent, LoginComponent, ProductDetailComponent, SectionDetailComponent, AdminSectionsComponent, SettingsComponent, LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
