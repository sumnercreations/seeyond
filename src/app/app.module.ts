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
import { HeaderComponent, SeeyondInfoDialog } from './seeyond/header/header.component';
import { VisualizationComponent } from './seeyond/visualization/visualization.component';
import { ActionsComponent } from './seeyond/actions/actions.component';
import { NavigationComponent } from './seeyond/navigation/navigation.component';
import { DimensionsComponent, RadiusWarningSnackComponent } from './seeyond/dimensions/dimensions.component';
import { DesignComponent } from './seeyond/design/design.component';
import { SeeyondService } from './seeyond/seeyond.service';
import { LoginService } from './seeyond/login.service';

// classes
import { Feature } from './seeyond/feature';
import { KeysPipe } from './seeyond/keys.pipe';
import { QuoteDialogComponent } from './seeyond/quote-dialog/quote-dialog.component';
import { LoginDialogComponent } from './seeyond/login-dialog/login-dialog.component';

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
    SeeyondInfoDialog,
    KeysPipe,
    RadiusWarningSnackComponent,
    QuoteDialogComponent,
    LoginDialogComponent
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
    LoginService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SeeyondInfoDialog,
    RadiusWarningSnackComponent,
    QuoteDialogComponent,
    LoginDialogComponent
  ],
})
export class AppModule { }
