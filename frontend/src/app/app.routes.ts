import { OverviewComponent } from './pages/overview/overview.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileOverviewComponent } from './profile/profile-overview/profile-overview.component';
import { AnswersComponent } from './pages/answers/answers.component';
import { ChatWindowComponent } from './chat/chat-window/chat-window.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthGuard } from './guards/auth.guard';
import { DActivateLoginGuard } from './guards/d-activate-login.guard';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { AddQuestionComponent } from './pages/add-question/add-question.component';
import { ChatComponent } from './pages/chat/chat.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { CareersComponent } from './pages/careers/careers.component';
import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path:"",
    component:LandingPageComponent,
  },
  {
    path:'home',
    component: OverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"login",
    component:LoginComponent,
    canActivate: [DActivateLoginGuard]
  },
  {
    path:"register",
    component:RegisterComponent,
    canActivate: [DActivateLoginGuard]
  },
  {
    path:"ask-question",
    component: AddQuestionComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"answer/:id",
    component:AnswersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"profile/:id",
    component:ProfileOverviewComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"chat",
    component: ChatComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"chat/:id",
    component:ChatWindowComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"careers",
    component:CareersComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"about-us",
    component:AboutUsComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"privacy-policy",
    component: PrivacyPolicyComponent,
    canActivate: [AuthGuard]
  },
];
