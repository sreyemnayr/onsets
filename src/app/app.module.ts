import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { EquipmentModule } from './equipment/equipment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatSlideToggleModule,
  MatInputModule,
  MatDialogModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatProgressBarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { NumbercubeComponent } from './equipment/cubes/numbercube/numbercube.component';
import { OperationcubeComponent } from './equipment/cubes/operationcube/operationcube.component';
import { RelationcubeComponent } from './equipment/cubes/relationcube/relationcube.component';
import { ColorcubeComponent } from './equipment/cubes/colorcube/colorcube.component';

import { DynamicModule } from 'ng-dynamic-component';
import {
  ChallengeDialogComponent,
  GameComponent,
  SettingsDialogComponent
} from './game/game.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent,
    ChallengeDialogComponent,
    GameComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    EquipmentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    DragDropModule,
    DynamicModule.withComponents([
      NumbercubeComponent,
      OperationcubeComponent,
      RelationcubeComponent,
      ColorcubeComponent
    ]),
    StorageServiceModule,
    MatInputModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatProgressBarModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    SettingsDialogComponent,
    ChallengeDialogComponent,
    NumbercubeComponent,
    OperationcubeComponent,
    RelationcubeComponent,
    ColorcubeComponent
  ]
})
export class AppModule {}
