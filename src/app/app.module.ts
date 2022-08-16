import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductsContainerComponent } from './products/products-container/products-container.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './ui-components/modal/modal.component';
import { SearchComponent } from './ui-components/search/search.component';
import { ViewProductModalComponent } from './products/view-product-modal/view-product-modal.component';
import { BasketComponent } from './basket/basket.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductModalComponent } from './products/edit-product-modal/edit-product-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ProductsContainerComponent,
    ModalComponent,
    ViewProductModalComponent,
    BasketComponent,
    SearchComponent,
    EditProductModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
