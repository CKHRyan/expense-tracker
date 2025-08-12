import { categoryGroup, category } from "src/constants/expense";
import type { Category } from "src/types/expense";

export const categoryGroupOptions = [
  "All",
  ...Object.values(categoryGroup),
] as const;

export const categoryOptions: {
  category: Category;
  title: string;
  icon: string;
  isOther?: boolean;
  hiddenFromAll?: boolean;
}[] = [
  {
    category: category.Other,
    title: "Other",
    icon: "icon-[emojione--shopping-cart]",
    isOther: true,
  },
  {
    category: category.OtherShopping,
    title: "Other",
    icon: "icon-[emojione--shopping-bags]",
    isOther: true,
    hiddenFromAll: true,
  },
  {
    category: category.OtherDining,
    title: "Other",
    icon: "icon-[twemoji--fork-and-knife-with-plate]",
    isOther: true,
    hiddenFromAll: true,
  },
  {
    category: category.OtherLife,
    title: "Other",
    icon: "icon-[noto--man-light-skin-tone-curly-hair]",
    isOther: true,
    hiddenFromAll: true,
  },
  {
    category: category.OtherEntertainment,
    title: "Other",
    icon: "icon-[token-branded--joy]",
    isOther: true,
    hiddenFromAll: true,
  },
  {
    category: category.OtherVacation,
    title: "Other",
    icon: "icon-[fxemoji--beachumbrella]",
    isOther: true,
    hiddenFromAll: true,
  },
  {
    category: category.Lunch,
    title: "Lunch",
    icon: "icon-[noto--bento-box]",
  },
  {
    category: category.Dinner,
    title: "Dinner",
    icon: "icon-[twemoji--cooked-rice]",
  },
  {
    category: category.Breakfast,
    title: "Breakfast",
    icon: "icon-[noto--bagel]",
  },
  {
    category: category.Dessert,
    title: "Dessert",
    icon: "icon-[emojione--shortcake]",
  },
  { category: category.Bread, title: "Bread", icon: "icon-[noto-v1--bread]" },
  {
    category: category.Snack,
    title: "Snack",
    icon: "icon-[noto--candy]",
  },
  {
    category: category.Drink,
    title: "Drink",
    icon: "icon-[fluent-emoji-flat--bubble-tea]",
  },
  {
    category: category.Clothes,
    title: "Clothes",
    icon: "icon-[noto--t-shirt]",
  },
  {
    category: category.Shoes,
    title: "Shoes",
    icon: "icon-[fluent-emoji-flat--running-shoe]",
  },
  {
    category: category.Gift,
    title: "Gift",
    icon: "icon-[twemoji--wrapped-gift]",
  },
  { category: category.Cook, title: "Cook", icon: "icon-[noto--cut-of-meat]" },
  { category: category.Fruit, title: "Fruit", icon: "icon-[noto--red-apple]" },
  {
    category: category.Electron,
    title: "Electron",
    icon: "icon-[twemoji--laptop-computer]",
  },
  {
    category: category.Daily,
    title: "Daily",
    icon: "icon-[fluent-emoji-flat--toothbrush]",
  },
  {
    category: category.SkinCare,
    title: "Skin",
    icon: "icon-[streamline-ultimate-color--body-care-cream]",
  },
  {
    category: category.Transport,
    title: "Transport",
    icon: "icon-[emojione-v1--train]",
  },
  {
    category: category.Party,
    title: "Party",
    icon: "icon-[noto--party-popper]",
  },
  {
    category: category.Movie,
    title: "Movie",
    icon: "icon-[streamline-ultimate-color--movie-cinema-watch]",
  },
  {
    category: category.Game,
    title: "Game",
    icon: "icon-[noto--video-game]",
  },
  {
    category: category.Sport,
    title: "Sport",
    icon: "icon-[noto--badminton]",
  },
  {
    category: category.Medic,
    title: "Medic",
    icon: "icon-[fxemoji--hospital]",
  },
  {
    category: category.Travel,
    title: "Travel",
    icon: "icon-[noto--world-map]",
  },
  { category: category.Hostel, title: "Hostel", icon: "icon-[fxemoji--hotel]" },
  {
    category: category.Equipment,
    title: "Equip",
    icon: "icon-[solar--dumbbell-large-minimalistic-bold-duotone]",
  },
  {
    category: category.Lifestyle,
    title: "Lifestyle",
    icon: "icon-[openmoji--roasted-coffee-bean]",
  },
] as const;
