import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsModule } from './cards/cards.module';
import { CubesModule } from './cubes/cubes.module';
import { DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardsModule,
    CubesModule,
    DragDropModule,
  ],
  exports: [
    CardsModule,
    CubesModule,
  ]
})
export class EquipmentModule { }
