import { Component, Input, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { MatProgressBar } from '@angular/material';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  private _seconds = 60;
  private _playerClass = 'player1';

  @Input() playerName: string = 'Player 1';

  @Input()
  set playerClass(playerClass: string) {
    this._playerClass = playerClass;
    this.startTimer();
  }
  @Input()
  set seconds(seconds: number) {
    this._seconds = seconds;
    this.startTimer();
  }

  get playerClass(): string {
    return this._playerClass;
  }
  get seconds(): number {
    return this._seconds;
  }

  progressbarValue = 100;
  curSec: number = 0;
  sub: Subscription;

  startTimer() {
    this.progressbarValue = 100;
    const time = this.seconds;
    this.curSec = 0;
    const timer$ = interval(1000);
    if(this.sub) { this.sub.unsubscribe(); }

    this.sub = timer$.subscribe((sec) => {
      this.progressbarValue = 100 - sec * 100 / this.seconds;
      this.curSec = sec;

      if (this.curSec === this.seconds) {
        this.sub.unsubscribe();
      }
    });
  }

  constructor() { }

  ngOnInit() {
    this.startTimer();
  }

}
