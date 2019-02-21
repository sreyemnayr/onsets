export class Settings {
  elementary: boolean;
  fix_rolls: boolean;
  auto_deal_minimum: boolean;
  show_goal: boolean;
  allow_reroll: boolean;
  dev_mode: boolean;
  constructor(elementary= true, fix_rolls= true, auto_deal_minimum= true, show_goal= false, allow_reroll= false, dev_mode= true) {
    this.elementary = elementary;
    this.fix_rolls = fix_rolls;
    this.auto_deal_minimum = auto_deal_minimum;
    this.show_goal = show_goal;
    this.allow_reroll = allow_reroll;
    this.dev_mode = dev_mode;
  }
}
