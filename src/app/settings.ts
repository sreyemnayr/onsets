export class Settings {
  elementary: boolean;
  fix_rolls: boolean;
  auto_deal_minimum: boolean;
  show_goal: boolean;
  allow_reroll: boolean;
  dev_mode: boolean;
  use_timer: boolean;
  num_players: number;
  player_names: Array<string>;
  player_colors: Array<string>;
  player_human: Array<boolean>;
  constructor(
    elementary = true,
    fix_rolls = true,
    auto_deal_minimum = true,
    show_goal = false,
    allow_reroll = false,
    dev_mode = false,
    num_players = 2,
    use_timer = true,
    player_names = ['Player 1', 'OnSetsBot', 'Player 3'],
    player_colors = ['#47f5bc', '#ff874a', '#f848bf'],
    player_human = [true, false, true]
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
    this.use_timer = use_timer;
  }
}
