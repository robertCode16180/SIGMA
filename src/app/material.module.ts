import { NgModule } from '@angular/core';
import { MatInputModule,
         MatFormFieldModule,
         MatButtonModule,
         MatTableModule,
         MatSortModule,
         MatDialogModule,
         MatIconModule,
         MatPaginatorModule,
         MatToolbarModule
         } from '@angular/material';

@NgModule({
  imports: [
             MatInputModule,
             MatFormFieldModule,
             MatButtonModule,
             MatTableModule,
             MatSortModule,
             MatDialogModule,
             MatPaginatorModule,
             MatIconModule,
             MatToolbarModule
           ],
  exports: [
             MatInputModule,
             MatFormFieldModule,
             MatButtonModule,
             MatTableModule,
             MatSortModule,
             MatDialogModule,
             MatPaginatorModule,
             MatIconModule,
             MatToolbarModule
           ]
})
export class MaterialModule { }
