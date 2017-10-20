import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollectionsRouting } from './collections-routing.module';
import { CollectionsListComponent } from './collections-list/collections-list.component';
import { CollectionEditComponent } from './collection-edit/collection-edit.component';

@NgModule({
    imports: [
        CommonModule,
        CollectionsRouting
    ],
    declarations: [
        CollectionsListComponent,
        CollectionEditComponent
    ],
    exports: [
        CommonModule
    ],
})
export class CollectionsModule { }
