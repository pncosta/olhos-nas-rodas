import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule,
        MatInputModule, MatToolbarModule, MatSidenavModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule } from '@angular/material/';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';




@NgModule({
  imports: [CommonModule, MatButtonModule, MatCheckboxModule,
     MatInputModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatDialogModule,
     MatDividerModule, MatDatepickerModule, MatNativeDateModule, MatStepperModule, MatSelectModule,
     MatProgressSpinnerModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatChipsModule],

  exports: [MatButtonModule, MatCheckboxModule, MatInputModule,
    MatToolbarModule, MatSidenavModule, MatCardModule, MatDialogModule, MatDividerModule, MatDatepickerModule, 
    MatStepperModule, MatSelectModule, MatProgressSpinnerModule, MatIconModule, MatSnackBarModule, MatTooltipModule, MatChipsModule],
  declarations: []
})
export class AngularMaterialModule { }
