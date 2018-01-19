// core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// angular material
import { MaterialModule } from '@angular/material';

// routing
import {routing} from './app.routes';

// components
import { AppComponent } from './app.component';
import { SeeyondComponent } from './seeyond/seeyond.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OptionsComponent } from './seeyond/options/options.component';
import { HeaderComponent } from './seeyond/header/header.component';
import { VisualizationComponent } from './seeyond/visualization/visualization.component';
import { ActionsComponent } from './seeyond/actions/actions.component';
import { NavigationComponent } from './seeyond/navigation/navigation.component';
import { DimensionsComponent } from './seeyond/dimensions/dimensions.component';
import { DesignComponent } from './seeyond/design/design.component';
import { QuoteDialogComponent } from './seeyond/quote-dialog/quote-dialog.component';
import { LoginDialogComponent } from './seeyond/login-dialog/login-dialog.component';
import { AlertComponent } from './seeyond/alert/alert.component';

// services
import { SeeyondService } from './seeyond/_services/seeyond.service';
import { LoginService } from './seeyond/_services/login.service';
import { AlertService } from './seeyond/_services/alert.service';

// classes
import { Feature } from './seeyond/feature';
import { KeysPipe } from './seeyond/keys.pipe';
import { User } from './seeyond/_models/user';
import { LoadSeeyondsDialogComponent } from "./seeyond/load-seeyonds-dialog/load-seeyonds-dialog.component";
import { SaveSeeyondDialogComponent } from './seeyond/save-seeyond-dialog/save-seeyond-dialog.component';
import { ConfirmDeleteDialogComponent } from './seeyond/confirm-delete-dialog/confirm-delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    SeeyondComponent,
    PageNotFoundComponent,
    OptionsComponent,
    HeaderComponent,
    VisualizationComponent,
    ActionsComponent,
    NavigationComponent,
    DimensionsComponent,
    DesignComponent,
    KeysPipe,
    QuoteDialogComponent,
    LoginDialogComponent,
    LoadSeeyondsDialogComponent,
    AlertComponent,
    SaveSeeyondDialogComponent,
    ConfirmDeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [
    Feature,
    SeeyondService,
    LoginService,
    AlertService,
    User
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    QuoteDialogComponent,
    LoginDialogComponent,
    AlertComponent,
    LoadSeeyondsDialogComponent,
    SaveSeeyondDialogComponent,
    ConfirmDeleteDialogComponent
  ],
})
export class AppModule { }
