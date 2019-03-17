import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {CdkTableModule} from '@angular/cdk/table';


import { AppComponent } from './app.component';
import { VnComponent } from './vn/vn.component';
import { VmComponent } from './vm/vm.component';
import { RgComponent } from './rg/rg.component';
import { SaComponent } from './sa/sa.component';
import { AzureComponent } from './todo/azure-action.component';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
// import {
//   MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
//   MatTableModule, MatToolbarModule,
// } from '@angular/material';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatOptionModule,
  
} from '@angular/material';
import {DataService} from './services/data.service';
import {SubscriberService} from './services/subscription.service';
import {AddDialogComponent} from './dialogs/add/add.dialog.component';
import {EditDialogComponent} from './dialogs/edit/edit.dialog.component';
import {DeleteDialogComponent} from './dialogs/delete/delete.dialog.component';
import {DeleteRgDialogComponent} from './dialogs/deleteRg/deleterg.dialog.component';
import {DeleteSaDialogComponent} from './dialogs/deleteSa/deletesa.dialog.component';
import {StopDialogComponent} from './dialogs/stop/stop.dialog.component';
import {TestTabsComponent} from './test-tabs/test-tabs.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AddSubscriptionDialogComponent} from './dialogs/add/add.subscription.component';

import {AddPopDialogComponent} from './dialogs/addpop/add.dialog.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { loadingInterceptor } from './interceptor/interceptor';
import { LoaderService } from './interceptor/loader.service';
import { LoaderComponent } from './loader/loader.component';

//const RxJS_Services = [HTTPListener, HTTPStatus];



@NgModule({
  // declarations: [
  //   AppComponent,
  //   AddDialogComponent,
  //   EditDialogComponent,
  //   DeleteDialogComponent,
  //   TestTabsComponent
  // ],
  imports: [
    BrowserModule,
    DynamicFormModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatCardModule, 
    MatDividerModule,
    MatOptionModule,
    MatSelectModule,
  
    
    
  ],
  entryComponents: [TestTabsComponent,AppComponent ,AddDialogComponent,AddSubscriptionDialogComponent,EditDialogComponent,DeleteDialogComponent,AddPopDialogComponent,LoaderComponent,StopDialogComponent,DeleteRgDialogComponent,DeleteSaDialogComponent],
  declarations: [TestTabsComponent,AppComponent,AddDialogComponent,AddSubscriptionDialogComponent,EditDialogComponent,DeleteDialogComponent,VnComponent,VmComponent,RgComponent,SaComponent,AzureComponent,AddPopDialogComponent,LoaderComponent,StopDialogComponent,DeleteRgDialogComponent,DeleteSaDialogComponent],
  bootstrap: [TestTabsComponent],
  providers: [
      SubscriberService,DataService,LoaderService,
      
      // {
      //   provide: HTTP_INTERCEPTORS,
      //   useClass: loadingInterceptor,
      //   multi: true
      // }
     ],
  // entryComponents: [
  //   AddDialogComponent,
  //   EditDialogComponent,
  //   DeleteDialogComponent,
  //   TestTabsComponent
  // ],
  // providers: [
  //   DataService
  // ],
  // bootstrap: [TestTabsComponent],
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatOptionModule,
    AppComponent,
    VnComponent,
    VmComponent,
    RgComponent,
    SaComponent,
    AzureComponent,
    DynamicFormModule,
    LoaderComponent,
    
  ]
})
export class AppModule { }
