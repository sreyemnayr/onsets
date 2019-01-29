import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RelationcubeComponent } from './relationcube/relationcube.component';
import { OperationcubeComponent } from './operationcube/operationcube.component';
import { NumbercubeComponent } from './numbercube/numbercube.component';
import { ColorcubeComponent } from './colorcube/colorcube.component';
import { CubeComponent } from './cube.component';
import { DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [RelationcubeComponent, OperationcubeComponent, NumbercubeComponent, ColorcubeComponent, CubeComponent],
  imports: [
    CommonModule, DragDropModule
  ],
  exports: [RelationcubeComponent, OperationcubeComponent, NumbercubeComponent, ColorcubeComponent, CubeComponent]
})
export class CubesModule { }
