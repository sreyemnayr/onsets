import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, SettingsDialogComponent } from './app.component';

import { EquipmentModule } from './equipment/equipment.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatSlideToggleModule, MatDialogModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent
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
    DragDropModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SettingsDialogComponent]
})
export class AppModule { }
