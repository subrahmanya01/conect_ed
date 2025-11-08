import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from '../pages/overview/overview.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddAnswerComponent } from './add-answer/add-answer.component';


@NgModule({
  declarations: [
    OverviewComponent,
    AddAnswerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports:
  [
    OverviewComponent,
    AddAnswerComponent
  ]
})
export class MainModule { }
