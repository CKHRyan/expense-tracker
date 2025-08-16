import type { Category, CategoryGroup } from "src/types/expense";

export const CATEGORY_GROUP = {
  Shopping: "Shopping",
  Dining: "Dining",
  Life: "Life",
  Entertainment: "Entertainment",
  Vacation: "Vacation",
  Other: "Other",
} as const;

export const CATEGORY = {
  Lunch: "Lunch",
  Dinner: "Dinner",
  Breakfast: "Breakfast",
  Dessert: "Dessert",
  Bread: "Bread",
  Drink: "Drink",
  Lifestyle: "Coffee",
  Clothes: "Clothes",
  Shoes: "Shoes",
  Gift: "Gift",
  Cook: "Cook",
  Fruit: "Fruit",
  Electron: "Electron",
  Daily: "Daily",
  Transport: "Transport",
  Party: "Party",
  Movie: "Movie",
  Game: "Game",
  Medic: "Medic",
  Travel: "Travel",
  Hostel: "Hostel",
  Snack: "Snack",
  SkinCare: "SkinCare",
  Sport: "Sport",
  Equipment: "Equipment",
  Other: "Other",
  OtherShopping: "OtherShopping",
  OtherDining: "OtherDining",
  OtherLife: "OtherLife",
  OtherEntertainment: "OtherEntertainment",
  OtherVacation: "OtherVacation",
} as const;

export const categoryGroupMap: Record<Category, CategoryGroup> = {
  Lunch: CATEGORY_GROUP.Dining,
  Dinner: CATEGORY_GROUP.Dining,
  Breakfast: CATEGORY_GROUP.Dining,
  Dessert: CATEGORY_GROUP.Dining,
  Bread: CATEGORY_GROUP.Dining,
  Drink: CATEGORY_GROUP.Dining,
  Coffee: CATEGORY_GROUP.Shopping,
  Clothes: CATEGORY_GROUP.Shopping,
  Shoes: CATEGORY_GROUP.Shopping,
  Gift: CATEGORY_GROUP.Shopping,
  Cook: CATEGORY_GROUP.Life,
  Fruit: CATEGORY_GROUP.Life,
  Electron: CATEGORY_GROUP.Shopping,
  Daily: CATEGORY_GROUP.Life,
  Transport: CATEGORY_GROUP.Life,
  Party: CATEGORY_GROUP.Entertainment,
  Movie: CATEGORY_GROUP.Entertainment,
  Game: CATEGORY_GROUP.Entertainment,
  Medic: CATEGORY_GROUP.Life,
  Travel: CATEGORY_GROUP.Vacation,
  Hostel: CATEGORY_GROUP.Vacation,
  Snack: CATEGORY_GROUP.Life,
  SkinCare: CATEGORY_GROUP.Life,
  Sport: CATEGORY_GROUP.Entertainment,
  Equipment: CATEGORY_GROUP.Shopping,
  Other: CATEGORY_GROUP.Other,
  OtherDining: CATEGORY_GROUP.Dining,
  OtherLife: CATEGORY_GROUP.Life,
  OtherShopping: CATEGORY_GROUP.Shopping,
  OtherEntertainment: CATEGORY_GROUP.Entertainment,
  OtherVacation: CATEGORY_GROUP.Vacation,
} as const;

export const categoryAttributes: Record<
  Category,
  { title: string; icon: string }
> = {
  [CATEGORY.Other]: {
    title: "Other",
    icon: "icon-[emojione--shopping-cart]",
  },
  [CATEGORY.OtherShopping]: {
    title: "Other",
    icon: "icon-[emojione--shopping-bags]",
  },
  [CATEGORY.OtherDining]: {
    title: "Other",
    icon: "icon-[twemoji--fork-and-knife-with-plate]",
  },
  [CATEGORY.OtherLife]: {
    title: "Other",
    icon: "icon-[noto--man-light-skin-tone-curly-hair]",
  },
  [CATEGORY.OtherEntertainment]: {
    title: "Other",
    icon: "icon-[token-branded--joy]",
  },
  [CATEGORY.OtherVacation]: {
    title: "Other",
    icon: "icon-[fxemoji--beachumbrella]",
  },
  [CATEGORY.Lunch]: { title: "Lunch", icon: "icon-[noto--bento-box]" },
  [CATEGORY.Dinner]: {
    title: "Dinner",
    icon: "icon-[emojione-v1--pot-of-food]",
  },
  [CATEGORY.Breakfast]: { title: "Breakfast", icon: "icon-[noto--bagel]" },
  [CATEGORY.Dessert]: {
    title: "Dessert",
    icon: "icon-[emojione--shortcake]",
  },
  [CATEGORY.Bread]: { title: "Bread", icon: "icon-[noto-v1--bread]" },
  [CATEGORY.Snack]: { title: "Snack", icon: "icon-[noto--candy]" },
  [CATEGORY.Drink]: {
    title: "Drink",
    icon: "icon-[fluent-emoji-flat--bubble-tea]",
  },
  [CATEGORY.Clothes]: { title: "Clothes", icon: "icon-[noto--t-shirt]" },
  [CATEGORY.Shoes]: {
    title: "Shoes",
    icon: "icon-[fluent-emoji-flat--running-shoe]",
  },
  [CATEGORY.Gift]: { title: "Gift", icon: "icon-[twemoji--wrapped-gift]" },
  [CATEGORY.Cook]: { title: "Cook", icon: "icon-[noto--cut-of-meat]" },
  [CATEGORY.Fruit]: { title: "Fruit", icon: "icon-[noto--red-apple]" },
  [CATEGORY.Electron]: {
    title: "Electron",
    icon: "icon-[twemoji--laptop-computer]",
  },
  [CATEGORY.Daily]: {
    title: "Daily",
    icon: "icon-[fluent-emoji-flat--toothbrush]",
  },
  [CATEGORY.SkinCare]: {
    title: "Skin",
    icon: "icon-[streamline-ultimate-color--body-care-cream]",
  },
  [CATEGORY.Transport]: {
    title: "Transport",
    icon: "icon-[emojione-v1--train]",
  },
  [CATEGORY.Party]: { title: "Party", icon: "icon-[noto--party-popper]" },
  [CATEGORY.Movie]: {
    title: "Movie",
    icon: "icon-[streamline-ultimate-color--movie-cinema-watch]",
  },
  [CATEGORY.Game]: { title: "Game", icon: "icon-[noto--video-game]" },
  [CATEGORY.Sport]: { title: "Sport", icon: "icon-[noto--badminton]" },
  [CATEGORY.Medic]: { title: "Medic", icon: "icon-[fxemoji--hospital]" },
  [CATEGORY.Travel]: { title: "Travel", icon: "icon-[noto--world-map]" },
  [CATEGORY.Hostel]: { title: "Hostel", icon: "icon-[fxemoji--hotel]" },
  [CATEGORY.Equipment]: {
    title: "Equip",
    icon: "icon-[solar--dumbbell-large-minimalistic-bold-duotone]",
  },
  [CATEGORY.Lifestyle]: {
    title: "Lifestyle",
    icon: "icon-[openmoji--roasted-coffee-bean]",
  },
};

export const categoryGroupAttributes: Record<
  CategoryGroup,
  { title: string; icon: string }
> = {
  [CATEGORY_GROUP.Shopping]: {
    title: "Shopping",
    icon: "icon-[emojione--shopping-bags]",
  },
  [CATEGORY_GROUP.Dining]: {
    title: "Dining",
    icon: "icon-[twemoji--fork-and-knife-with-plate]",
  },
  [CATEGORY_GROUP.Life]: {
    title: "Life",
    icon: "icon-[noto--man-light-skin-tone-curly-hair]",
  },
  [CATEGORY_GROUP.Entertainment]: {
    title: "Entertainment",
    icon: "icon-[token-branded--joy]",
  },
  [CATEGORY_GROUP.Vacation]: {
    title: "Vacation",
    icon: "icon-[fxemoji--beachumbrella]",
  },
  [CATEGORY_GROUP.Other]: {
    title: "Other",
    icon: "icon-[emojione--shopping-cart]",
  },
};
