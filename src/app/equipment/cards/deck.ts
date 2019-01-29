import { Card } from './card/card';

export class Deck {
  cards: Array<Card>;
  constructor() {
    // All colors
    this.cards = [];
    this.cards.push(new Card({blue: true, green: true, red: true, yellow: true}));

    // No colors
    this.cards.push(new Card({}));

    // 1 color
    this.cards.push(new Card({blue: true}));
    this.cards.push(new Card({green: true}));
    this.cards.push(new Card({red: true}));
    this.cards.push(new Card({yellow: true}));

    // Two colors
    this.cards.push(new Card({blue: true, green: true}));
    this.cards.push(new Card({blue: true, red: true}));
    this.cards.push(new Card({blue: true, yellow: true}));
    this.cards.push(new Card({green: true, red: true}));
    this.cards.push(new Card({green: true, yellow: true}));
    this.cards.push(new Card({red: true, yellow: true}));

    // Three colors
    this.cards.push(new Card({blue: true, red: true, green: true}));
    this.cards.push(new Card({blue: true, red: true, yellow: true}));
    this.cards.push(new Card({blue: true, green: true, yellow: true}));
    this.cards.push(new Card({red: true, green: true, yellow: true}));

  }

  shuffle() {
    let currentIndex = this.cards.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }

  }


}
