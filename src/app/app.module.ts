import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { Routes, RouterModule }   from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import 'hammerjs';
import { ChartsModule } from 'ng2-charts';

import { ProjectService } from './project.service';
import { ConfigService } from './config.service';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditTranslationsComponent } from './edit-translations/edit-translations.component';
import { TermsComponent } from './terms/terms.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { LanguagesComponent } from './languages/languages.component';
import { EditInplaceTextComponent } from './edit-inplace-text/edit-inplace-text.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyBQvSLMssZlQ3VMuEq95rtSaeVgKdIxbm0",
  authDomain: "opentranslate-ec472.firebaseapp.com",
  databaseURL: "https://opentranslate-ec472.firebaseio.com",
  projectId: "opentranslate-ec472",
  storageBucket: "opentranslate-ec472.appspot.com",
  messagingSenderId: "230494882559"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'new-project', component: EditProjectComponent },
    { path: 'edit-project/:projectKey', component: EditProjectComponent },
    { path: 'projects/:projectKey', component: ProjectDetailComponent },
    { path: 'translations/:projectKey/:language', component: EditTranslationsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    EditProjectComponent,
    DashboardComponent,
    EditTranslationsComponent,
    TermsComponent,
    ProjectDetailComponent,
    LanguagesComponent,
    EditInplaceTextComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ChartsModule
  ],
  providers: [ProjectService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
