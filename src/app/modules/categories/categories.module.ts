import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesRouting } from './categories-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CategoriesRouting
    ],
    declarations: [
        CategoriesComponent
    ],
    exports: [
        CommonModule
    ],
})
export class CategoriesModule { }
