import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRouting } from './dashboard-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRouting
    ],
    declarations: [
        DashboardComponent
    ],
    exports: [
        CommonModule
    ],
})
export class DashboardModule { }
