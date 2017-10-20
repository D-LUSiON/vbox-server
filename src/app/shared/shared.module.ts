import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainMenuComponent } from './main-menu/main-menu.component';

import { DropdownModule } from 'ngx-dropdown';

import { ToastyModule } from 'ng2-toasty';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterModule,
        DropdownModule,
        ToastyModule.forRoot()
    ],
    declarations: [
        MainMenuComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ToastyModule,
        MainMenuComponent,
        // Directives and Pipes
    ],
})
export class SharedModule { }
