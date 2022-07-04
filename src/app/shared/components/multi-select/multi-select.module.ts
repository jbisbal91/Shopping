import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from '../../shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MultiSelectComponent } from './multi-select.component';

const components = [MultiSelectComponent];

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
  exports: [components],
})
export class MultiSelectModule { }
