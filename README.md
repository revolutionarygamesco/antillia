<br /><br /><br /><br />
<div align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/title.dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/title.light.png">
  <img alt="The Dark Caribbean Wave Crawl" src="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/title.light.png">
</picture>
<br /><br />
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/pirate-borg-compatible.dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/pirate-borg-compatible.light.png">
  <img alt="Compatible with Pirate Borg" src="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/pirate-borg-compatible.light.png" width="20%">
</picture>
</div>
<br /><br /><br /><br />

![Latest Release](https://img.shields.io/github/v/release/revolutionarygamesco/antillia?label=Latest+release&style=for-the-badge)
![Foundry Version](https://img.shields.io/badge/Foundry-v13-informational?label=Foundry+version&style=for-the-badge)
![Test Status](https://img.shields.io/github/actions/workflow/status/revolutionarygamesco/antillia/test.yml?label=Test+status&style=for-the-badge)
![License](https://img.shields.io/github/license/revolutionarygamesco/antillia?style=for-the-badge)



A wave crawl adventure for
_[Pirate Borg](https://www.limithron.com/pirateborg)_
and [Foundry VTT](https://foundryvtt.com/).

* Hundreds of random tables change your fortunes when
  you prowl established trade routes, stay close to land,
  venture out over open waters, explore the Devil’s Triangle
  or the Sargasso Sea, get lost in the Doldrums in summer,
  or dare the ever-growing Abyss.
* Build your legend as a fearsome pirate crew, so trembling
  merchants surrender as soon as they see your black flag
  with a leveling and reputation system
  [inspired by Mindstorm](https://www.mindstormpress.com/ringing-the-bell)
  and [CGP Grey](https://youtu.be/3YFeE1eDlD0?si=8N4pv6rpoewCfAyt).
* Use as a campaign framework for your piratical career
  and set any other adventures you care to include on
  the map.
* As you sail the haunted seas, your ship will become
  more and more haunted itself — by the spirits of those
  you’ve wronged or just the lost souls you encounter along
  the way. You’ll have to manage them carefully or risk
  becoming a ghost ship.
* Will you prowl the established trade routes, where
  merchant ships are more common, but risk running
  across naval patrols or rival pirates? Most merchants
  are laden with sugar, tobacco, and ash, but some
  may carry other prizes, from ancient artifacts to
  sensitive intelligence reports.

**Note:** This is in no way, shape, or form an
official release. We at [Revolutionary Games](https://revolutionarygames.co/)
are fans and supporters of [Limithron’s](https://www.limithron.com/),
but this is [a third-party adventure](https://www.limithron.com/license).
We try to make it look nice because that’s how we roll,
not to trick anybody.

### Requirements

* _[Pirate Borg](https://foundryvtt.com/packages/pirateborg)_
* [Foundry VTT](https://foundryvtt.com/)
* [Limithron’s Dark Caribbean Map & Cartography Kit](https://www.limithron.com/dark-caribbean-map)
* [Limithron’s Landing Page Kit](https://www.limithron.com/landing-page-kit)
* Pirate Borg Watch Manager (In development)
* [Pirate Borg Ship Generator](https://github.com/revolutionarygamesco/pb-ship-generator)
* [Pirate Name Generator](https://github.com/revolutionarygamesco/pirate-names)
* [Pirate Insult Generator](https://github.com/revolutionarygamesco/pirate-insult-generator)

#### Not stricly required but strongly recommended

* [Pirate Borg Premium](https://foundryvtt.com/packages/pirate-borg-premium)
* [Become a patron of Limithron’s at the Admiral tier](https://www.patreon.com/posts/limithrons-table-41712155)
  to get more content modules than we can list here. This module will
  give you lots of random encounters, but Limithron’s modules
  will make it easy to turn those into top-tier VTT experiences
  quickly and easily.

### Roadmap

<br />
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0100.dark.png" />
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0100.light.png" />
  <img alt="v1.0: A Pyrate's Life" src="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0100.light.png" />
</picture>
<br />
<br />

* The **Antillia** scene, showing a hex map of the
  region and other information about the status of the
  adventure.
* The **Sail** macro, which takes into account the ship’s
  rotation, speed, and barnacle growth to move one hex in
  the right direction, advances the game world time to
  match that speed, and then considers the regions that the
  ship is sailing through to choose which random table to
  roll on — as well as all of the random tables required
  to make that work with enough variation to not get
  repetitive.
* The **Ledger** macro, which brings up the protagonist
  ship’s ledgers, listing the silver, food, fresh water,
  and grog that the ship is carrying, along with estimates
  of when those provisions will run out and options to
  increase or decrease them.
* A GM control panel to adjust the chapter, winds, and
  ghosts.

<br />
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0101.dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0101.light.png">
  <img alt="v1.1: The Empires Strike Back" src="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0101.light.png">
</picture>
<br />
<br />

* Add an enmity system for each of the imperial powers.
  The more money you cost any given power (the Spanish, the
  English, the French, or the Dutch), the more they’ll be
  set against you, eventually even dispatching navy ships
  to hunt you down. Spread out your attacks or bribe officials
  to manage the tempers of the Old World’s empires, or
  embrace their ire and prepare for war.

<br />
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0102.dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0102.light.png">
  <img alt="v1.2: Sails &amp; Storms" src="https://raw.githubusercontent.com/revolutionarygamesco/antillia/refs/heads/main/static/v0102.light.png">
</picture>
<br />
<br />

* You’re not the only thing out there roaming the
  cursed sea. This update will be all about adding other
  things moving and operating according to their own agendas.
    * **Storms:** They follow _fairly_ predictable patterns,
      but now that they’re things moving across the map you
      can spot them, avoid them, or even use them to your
      advantage.
    * **Hurricanes:** Hurricanes form and intensify as
      hurricane season develops — but the fell powers of
      the Caribbean can make these more than just naural
      storms.
    * **Unique Sea Monsters:** There are several legendary
      beasts roaming the depths of the sea. These aren’t
      just random events, but actual entities on the map,
      so when you encounter the wreckage of a ship recently
      devoured by the Kraken, you know it might not by far
      away. Each beast has its own agenda, but be careful:
      if you cross it, its new agenda could become hunting
      _you_. Our first batch of unique sea monsters will
      include:
        * The Kraken
        * Davy Jones
        * The Leviathan
        * The Black Whale
        * The Mouth of a Thousand Corpses
* Stumble across the path of mayhem and destruction that
  other pirate crews have left in their wake. Will you
  try to avoid them, or will you try to chase them? Each
  NPC crew has its own priorities and activities that it
  will be up to, just like you. Our first batch of other
  pirate crews will include:
    * The _Queen Anne’s Revenge_, captained by Blackbeard
    * The _William_, captained by “Calico Jack” Rackham
    * The _Royal Fortune_, captained by “Black Bart” Roberts
    * The _Buzzard_, captained by Olivier “La Buse” Levasseur

### Credits

* [Lunar phase icons](https://thenounproject.com/icon/moon-phases-1129569/) by [Andrew Doane](https://thenounproject.com/creator/andydoane/) from the [Noun Project](https://thenounproject.com/).
* [Gothicus](https://fonts.adobe.com/fonts/gothicus) by Aerotype
* [Leander](https://www.dafont.com/leander.font) by Tension Type
