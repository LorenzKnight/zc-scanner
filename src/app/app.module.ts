import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';


import { AddDeviceComponent, DialogInvalidBarcodeComponent } from './components/add-device/add-device.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { ManualEntryDialog, DeviceListComponent } from './components/device-list/device-list.component';
import { DevicesAddedComponent } from './components/devices-added/devices-added.component';
import { CookieService } from "ngx-cookie-service";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

//export const options: Partial<IConfig> | (() => Partial<IConfig>);

@NgModule({
  declarations: [
    AppComponent,
    AddDeviceComponent,
    HomeComponent,
    DialogInvalidBarcodeComponent,
    BarcodeScannerComponent,
    DeviceListComponent,
    DevicesAddedComponent,
    ManualEntryDialog,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', /*canActivate: [AuthenticationGuard]*/ },
      { path: 'add', component: AddDeviceComponent, /*canActivate: [AuthenticationGuard]*/ },
      { path: 'scanner', component: BarcodeScannerComponent, /*canActivate: [AuthenticationGuard]*/ },
      { path: 'devices', component: DeviceListComponent, /*canActivate: [AuthenticationGuard]*/ },
      { path: 'devicesadded', component: DevicesAddedComponent, /*canActivate: [AuthenticationGuard]*/ },
    ]),
    MsAdalAngular6Module.forRoot({
      tenant: 'geelyeu.onmicrosoft.com',
      clientId: '98e8f4e6-37f9-44a7-a1c2-7f0e66b88a3f',
      redirectUri: window.location.origin,
      endpoints: {},
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    }),
    NgbModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    MatListModule,
    HttpClientModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],

  providers: [CookieService, AuthenticationGuard],
  entryComponents: [DialogInvalidBarcodeComponent, ManualEntryDialog],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
