import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionRoutingModule } from './instruction-routing.module';
import { InstructionComponent } from './instruction.component';


@NgModule({
  declarations: [
    InstructionComponent
  ],
  imports: [
    CommonModule,
    InstructionRoutingModule
  ]
})
export class InstructionModule { }
