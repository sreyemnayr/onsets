import { Component, Input, OnInit} from '@angular/core';
import { Card } from './card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],

})
export class CardComponent implements OnInit {

  @Input() card: Card;
  @Input() flipped: boolean;

  constructor() {
    this.flipped = false;
  }

  flip() {
    this.flipped = true;

  }

  ngOnInit() {
    setTimeout(
      this.flip, 300
    );
  }

}
