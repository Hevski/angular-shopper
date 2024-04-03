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
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditProductModalComponent } from './products/add-edit-product-modal/add-edit-product-modal.component';
import { CreateAccountFormComponent } from './create-account-form/create-account-form.component';
import { FormatPhonePipe } from './format-phone.pipe';
import { MessageSenderComponent } from './message-sender/message-sender.component';
import { MessageContainerComponent } from './message-container/message-container.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

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
    AddEditProductModalComponent,
    CreateAccountFormComponent,
    FormatPhonePipe,
    MessageSenderComponent,
    MessageContainerComponent,
    MessageModalComponent
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
