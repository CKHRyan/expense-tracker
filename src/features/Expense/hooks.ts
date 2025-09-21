import { categoryGroupOptions } from "@features/ExpenseInput/TxnInputPad/TxnCategoryPad/constants";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CATEGORY, CATEGORY_GROUP } from "src/constants/expense";
import type { Category, CategoryGroup } from "@features/Expense/types";

export const useCategoryAttributes = (): Record<
  Category,
  { title: string; icon: string }
> => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      [CATEGORY.Other]: {
        title: t("expense.category.other"),
        icon: "icon-[emojione--shopping-cart]",
      },
      [CATEGORY.OtherShopping]: {
        title: t("expense.category.other"),
        icon: "icon-[emojione--shopping-bags]",
      },
      [CATEGORY.OtherDining]: {
        title: t("expense.category.other"),
        icon: "icon-[twemoji--fork-and-knife-with-plate]",
      },
      [CATEGORY.OtherLife]: {
        title: t("expense.category.other"),
        icon: "icon-[flat-color-icons--home]",
      },
      [CATEGORY.OtherEntertainment]: {
        title: t("expense.category.other"),
        icon: "icon-[token-branded--joy]",
      },
      [CATEGORY.OtherVacation]: {
        title: t("expense.category.other"),
        icon: "icon-[fxemoji--beachumbrella]",
      },
      [CATEGORY.Lunch]: {
        title: t("expense.category.lunch"),
        icon: "icon-[noto--bento-box]",
      },
      [CATEGORY.Dinner]: {
        title: t("expense.category.dinner"),
        icon: "icon-[emojione-v1--pot-of-food]",
      },
      [CATEGORY.Breakfast]: {
        title: t("expense.category.breakfast"),
        icon: "icon-[noto--bagel]",
      },
      [CATEGORY.Dessert]: {
        title: t("expense.category.dessert"),
        icon: "icon-[emojione--shortcake]",
      },
      [CATEGORY.Bread]: {
        title: t("expense.category.bread"),
        icon: "icon-[noto-v1--bread]",
      },
      [CATEGORY.Snack]: {
        title: t("expense.category.snack"),
        icon: "icon-[noto--candy]",
      },
      [CATEGORY.Drink]: {
        title: t("expense.category.drink"),
        icon: "icon-[fluent-emoji-flat--bubble-tea]",
      },
      [CATEGORY.Clothes]: {
        title: t("expense.category.clothes"),
        icon: "icon-[noto--t-shirt]",
      },
      [CATEGORY.Shoes]: {
        title: t("expense.category.shoes"),
        icon: "icon-[fluent-emoji-flat--running-shoe]",
      },
      [CATEGORY.Gift]: {
        title: t("expense.category.gift"),
        icon: "icon-[twemoji--wrapped-gift]",
      },
      [CATEGORY.Cook]: {
        title: t("expense.category.cook"),
        icon: "icon-[twemoji--carrot]",
      },
      [CATEGORY.Utensil]: {
        title: t("expense.category.utensil"),
        icon: "icon-[streamline-ultimate-color--kitchenware-spatula-1]",
      },
      [CATEGORY.Fruit]: {
        title: t("expense.category.fruit"),
        icon: "icon-[noto--red-apple]",
      },
      [CATEGORY.Electron]: {
        title: t("expense.category.electron"),
        icon: "icon-[twemoji--laptop-computer]",
      },
      [CATEGORY.Daily]: {
        title: t("expense.category.daily"),
        icon: "icon-[fluent-emoji-flat--toothbrush]",
      },
      [CATEGORY.SkinCare]: {
        title: t("expense.category.skinCare"),
        icon: "icon-[streamline-ultimate-color--body-care-cream]",
      },
      [CATEGORY.Transport]: {
        title: t("expense.category.transport"),
        icon: "icon-[emojione-v1--train]",
      },
      [CATEGORY.Party]: {
        title: t("expense.category.party"),
        icon: "icon-[noto--party-popper]",
      },
      [CATEGORY.Movie]: {
        title: t("expense.category.movie"),
        icon: "icon-[streamline-ultimate-color--movie-cinema-watch]",
      },
      [CATEGORY.Game]: {
        title: t("expense.category.game"),
        icon: "icon-[noto--video-game]",
      },
      [CATEGORY.Sport]: {
        title: t("expense.category.sport"),
        icon: "icon-[noto--badminton]",
      },
      [CATEGORY.Medic]: {
        title: t("expense.category.medic"),
        icon: "icon-[fxemoji--hospital]",
      },
      [CATEGORY.Travel]: {
        title: t("expense.category.travel"),
        icon: "icon-[noto--world-map]",
      },
      [CATEGORY.Hostel]: {
        title: t("expense.category.hostel"),
        icon: "icon-[fxemoji--hotel]",
      },
      [CATEGORY.Equipment]: {
        title: t("expense.category.equipment"),
        icon: "icon-[solar--dumbbell-large-minimalistic-bold-duotone]",
      },
      [CATEGORY.Lifestyle]: {
        title: t("expense.category.lifestyle"),
        icon: "icon-[openmoji--roasted-coffee-bean]",
      },
    }),
    [t]
  );
};

export const useCategoryGroupAttributes = (): Record<
  CategoryGroup,
  { title: string; icon: string }
> => {
  const { t } = useTranslation();

  return useMemo(
    () => ({
      [CATEGORY_GROUP.Shopping]: {
        title: t("expense.categoryGroup.shopping"),
        icon: "icon-[emojione--shopping-bags]",
      },
      [CATEGORY_GROUP.Dining]: {
        title: t("expense.categoryGroup.dining"),
        icon: "icon-[twemoji--fork-and-knife-with-plate]",
      },
      [CATEGORY_GROUP.Life]: {
        title: t("expense.categoryGroup.life"),
        icon: "icon-[noto--man-light-skin-tone-curly-hair]",
      },
      [CATEGORY_GROUP.Entertainment]: {
        title: t("expense.categoryGroup.entertainment"),
        icon: "icon-[token-branded--joy]",
      },
      [CATEGORY_GROUP.Vacation]: {
        title: t("expense.categoryGroup.vacation"),
        icon: "icon-[fxemoji--beachumbrella]",
      },
      [CATEGORY_GROUP.Other]: {
        title: t("expense.categoryGroup.other"),
        icon: "icon-[emojione--shopping-cart]",
      },
    }),
    [t]
  );
};

export const useCategoryGroupOptionItems = () => {
  const { t } = useTranslation();
  const categoryGroupAttributes = useCategoryGroupAttributes();

  return useMemo(
    () =>
      categoryGroupOptions.map((option) =>
        option === "All"
          ? ({ title: t("expense.categoryGroup.all"), value: "All" } as const)
          : {
              title: categoryGroupAttributes[option].title,
              value: option,
            }
      ),
    [categoryGroupAttributes, t]
  );
};
