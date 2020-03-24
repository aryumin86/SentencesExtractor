import { RouterModule, Routes } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AboutComponent } from '../components/about/about.component';
import { SentencesAppComponent } from '../components/sentences-app/sentences-app.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import {MatTabsModule} from '@angular/material/tabs/';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { FileSaverModule } from 'ngx-filesaver';

// import { DomSanitizer } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon';
import { OtherProjectsComponent } from 'src/components/OtherProjects/OtherProjects.component';
import { TextsTabComponent } from 'src/components/texts-tab/texts-tab.component';
import { FragmentsTabComponent } from 'src/components/fragments-tab/fragments-tab.component';
import { StatTabComponent } from 'src/components/stat-tab/stat-tab.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullTextModalComponent } from 'src/components/FullTextModal/FullTextModal.component';
import { SendEmailComponent } from 'src/components/sendEmail/sendEmail.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TermTextTabComponent } from 'src/components/term-text-tab/term-text-tab.component';

const appRoutes: Routes = [
  { path: 'sentencesapp', component: SentencesAppComponent },
  { path: 'about',      component: AboutComponent },
  /* { path: 'contacts',      component: ContactsComponent }, */
  { path: 'otherprojects', component: OtherProjectsComponent},
  { path: '', redirectTo: '/sentencesapp', pathMatch: 'full'}
  /* { path: '**', component: PageNotFoundComponent } */
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SentencesAppComponent,
    AboutComponent,
    OtherProjectsComponent,
    TextsTabComponent,
    FragmentsTabComponent,
    StatTabComponent,
    FullTextModalComponent,
    SendEmailComponent,
    TermTextTabComponent,
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    RouterModule,
    MatTabsModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FileSaverModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})

export class AppModule { }
