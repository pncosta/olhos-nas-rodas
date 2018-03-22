import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule, 
        MatInputModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCheckboxModule,
     MatInputModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, 
    MatToolbarModule, MatSidenavModule, MatCardModule, MatDialogModule],
  declarations: []
})
export class AngularMaterialModule { }
