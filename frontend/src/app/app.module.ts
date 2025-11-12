import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileModule } from './profile/profile.module';
import { ChatModule } from './chat/chat.module';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { RouterModule } from '@angular/router';

@NgModule({ declarations: [
        LandingPageComponent,
        AddQuestionComponent,
    ],
    bootstrap: [AppComponent], 
    imports: [BrowserModule,
        AppComponent,
        AppRoutingModule,
        ProfileModule,
        ChatModule,
        AppRoutingModule,
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        CKEditorModule,
        FormsModule], providers: [
        {
            provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
