import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminSectionsComponent } from './admin-sections/admin-sections.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SectionDetailComponent } from './section-detail/section-detail.component';
import { AuthGuard } from './services/auth.guard';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  //todo
  { path: '', component: ProductListComponent},
  { path: 'product/:productCode', component: ProductDetailComponent, canActivate:[AuthGuard]},
  { path: 'createProduct/:section', component: ProductDetailComponent, canActivate:[AuthGuard]},
  { path: 'section/:sectionName', component: SectionDetailComponent, canActivate:[AuthGuard]},
  { path: 'createSection', component: SectionDetailComponent, canActivate:[AuthGuard]},
  { path: 'adminSections', component: AdminSectionsComponent, canActivate:[AuthGuard]},
  { path:'settings',component:SettingsComponent, canActivate:[AuthGuard]},

//{ path: 'test', component: SectionListComponent, canActivate:[AuthGuard]},
{ path: 'testlogin', component: LoginComponent, canActivate:[AuthGuard]},
//{ path: 'testbox', component:SectionBoxComponent, canActivate:[AuthGuard]},
//{ path: 'testpurchased',component:PurchasedListComponent, canActivate:[AuthGuard]},
//{ path: 'testsearch',component:ProductSearchComponent, canActivate:[AuthGuard]},
//{ path: 'testsection', component:SectionListComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
