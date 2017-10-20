import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsRouting } from './settings-routing.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SettingsRouting
    ],
    declarations: [SettingsComponent],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class SettingsModule { }
