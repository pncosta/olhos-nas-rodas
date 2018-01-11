import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card'

import {MatButtonModule, MatCheckboxModule, 
        MatInputModule, MatToolbarModule, MatSidenavModule} from '@angular/material';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatCheckboxModule,
     MatInputModule, MatToolbarModule, MatSidenavModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatInputModule, 
    MatToolbarModule, MatSidenavModule, MatCardModule],
  declarations: []
})
export class AngularMaterialModule { }
