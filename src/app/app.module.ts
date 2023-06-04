import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResultComponent } from './result/result.component';
import {MainFormModule} from "@app/main-form/main-form.module";

@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    MainFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
