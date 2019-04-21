import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatDividerModule,
  MatInputModule,
  MatTooltipModule,
  MatSidenavModule
} from '@angular/material';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StockService } from './services/stock.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './pages/login/login.component';
import { FeedComponent } from './pages/feed/feed.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, FeedComponent, RegisterComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSidenavModule,
    FlexLayoutModule,
    OverlayModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatInputModule,
    MatTooltipModule,
    NgxChartsModule
  ],
  providers: [StockService],
  bootstrap: [AppComponent]
})
export class AppModule {}
