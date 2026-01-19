export interface Card {
  id?: string;
  type: string;
  name: string;
  resume: string;
  description: string;
  book: string;
  page: number;
}

export interface Feature {
  id?: string;
  type: string;
  name: string;
  resume: string;
  description: string;
  book: string;
  page: number;
  prerequisites: string;
  benefit: string;
  normal: string;
  special: string;
  featureType?: string;
  school?: string; // Optional as it is null in example
}

export interface Magic {
  id?: string;
  name: string;
  level: string;
  book: string;
  page: number;
  magicType: string;
  components: string;
  castTime: string;
  range: string;
  targetArea: string;
  duration: string;
  savingThrow: string;
  spellResistance: string;
  effect: string;
  resume: string;
  description: string;
  school?: string;
  featureType?: string; // Optional as it is null in example
}

export interface RacialTraits {
  id?: string;
  name: string;
  description: string;
  book: string;
  page: number;
  traits: string;
}

export interface ClassAbility {
  id?: string;
  name: string; // Class Name
  resume: string; // Ability Name
  description: string;
  book: string;
  page: number;
  abilities: string;
  playerClassName?: string;
}

export interface PlayerClass {
  id?: string;
  name: string;
  resume: string;
  description: string;
  book: string;
  page: number;
  traitClass?: string;
  type: string;
}

export interface Character {
  id?: string;
  userId: number; // Use number for Long
  name: string;
  raceId: string;
  raceName?: string;
  principalClassId: string;
  principalClassName?: string;
  featureIds: string[];
  magicIds: string[];
}
