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
  MatSelectModule,
  MatDialogModule,
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatProgressBarModule,
  MatChipsModule,
  MatBadgeModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { StorageServiceModule } from 'ngx-webstorage-service';

import { NumbercubeComponent } from './equipment/cubes/numbercube/numbercube.component';
import { OperationcubeComponent } from './equipment/cubes/operationcube/operationcube.component';
import { RelationcubeComponent } from './equipment/cubes/relationcube/relationcube.component';
import { ColorcubeComponent } from './equipment/cubes/colorcube/colorcube.component';

import { GreencubeComponent } from './equipment/cubes/greencube/greencube.component';
import { RedcubeComponent } from './equipment/cubes/redcube/redcube.component';
import { BlackcubeComponent } from './equipment/cubes/blackcube/blackcube.component';
import { BluecubeComponent } from './equipment/cubes/bluecube/bluecube.component';

import { DynamicModule } from 'ng-dynamic-component';
import {GameComponent} from './game/game.component';
import {DefaultGameComponent} from './game/defaultgame.component';
import {EquationsGameComponent} from './game/equationsgame.component';
import {ChallengeDialogComponent} from './game/challengedialog.component';
import {SettingsDialogComponent} from './game/settingsdialog.component';

import { TimerComponent } from './timer/timer.component';

import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DefaultGameComponent
  },
  {
    path: 'onsets',
    component: GameComponent
  },
  {
    path: 'equations',
    component: EquationsGameComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent,
    ChallengeDialogComponent,
    GameComponent,
    DefaultGameComponent,
    EquationsGameComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    EquipmentModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatBadgeModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    DragDropModule,
    DynamicModule.withComponents([
      NumbercubeComponent,
      OperationcubeComponent,
      RelationcubeComponent,
      ColorcubeComponent,
      RedcubeComponent,
      BluecubeComponent,
      BlackcubeComponent,
      GreencubeComponent
    ]),
    StorageServiceModule,
    MatInputModule,
    MatProgressBarModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatChipsModule,
    MatBadgeModule
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
    ColorcubeComponent,
    RedcubeComponent,
    GreencubeComponent,
    BlackcubeComponent,
    BluecubeComponent
  ]
})
export class AppModule {}
