export class Settings {
  elementary: boolean;
  fix_rolls: boolean;
  auto_deal_minimum: boolean;
  show_goal: boolean;
  allow_reroll: boolean;
  dev_mode: boolean;
  num_players: number;
  player_names: Array<string>;
  player_colors: Array<string>;
  player_human: Array<boolean>;
  constructor(elementary= true,
              fix_rolls= true,
              auto_deal_minimum= true,
              show_goal= false,
              allow_reroll= false,
              dev_mode= false,
              num_players= 2,
              player_names= ['Player 1', 'Player 2', 'Player 3'],
              player_colors= ['#47F5BC', '#FF874A', '#F848BF'],
              player_human= [true, true, true]
              ) {
    this.elementary = elementary;
    this.fix_rolls = fix_rolls;
    this.auto_deal_minimum = auto_deal_minimum;
    this.show_goal = show_goal;
    this.allow_reroll = allow_reroll;
    this.dev_mode = dev_mode;
    this.num_players = num_players;
    this.player_names = player_names;
    this.player_colors = player_colors;
    this.player_human = player_human;
  }
}
