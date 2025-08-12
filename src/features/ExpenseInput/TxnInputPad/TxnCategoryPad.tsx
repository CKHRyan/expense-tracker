import { Tabs } from "@components";
import { CategoryPadButtonCard } from "@features/ExpenseInput/PadButtonCard/CategoryPadButtonCard";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

const categories: Record<"title" | "icon" | "group", string>[] = [
  { title: "Lunch", icon: "icon-[emojione--hamburger]", group: "Dining" },
  { title: "Dinner", icon: "icon-[twemoji--cooked-rice]", group: "Dining" },
  { title: "Breakfast", icon: "icon-[noto--egg]", group: "Dining" },
  { title: "Dessert", icon: "icon-[emojione--shortcake]", group: "Dining" },
  { title: "Bread", icon: "icon-[noto-v1--bread]", group: "Dining" },
  {
    title: "Drink",
    icon: "icon-[fluent-emoji-flat--bubble-tea]",
    group: "Dining",
  },
  {
    title: "Coffee",
    icon: "icon-[openmoji--roasted-coffee-bean]",
    group: "Dining",
  },
  { title: "Clothes", icon: "icon-[noto--t-shirt]", group: "Shopping" },
  { title: "Gift", icon: "icon-[twemoji--wrapped-gift]", group: "Shopping" },
  { title: "Cook", icon: "icon-[twemoji--carrot]", group: "Life" },
  {
    title: "Electron",
    icon: "icon-[twemoji--laptop-computer]",
    group: "Shopping",
  },
  {
    title: "Daily",
    icon: "icon-[fluent-emoji-flat--toothbrush]",
    group: "Life",
  },
  { title: "Transport", icon: "icon-[emojione-v1--train]", group: "Life" },
  { title: "Entertain", icon: "icon-[noto--video-game]", group: "Life" },
  {
    title: "Medic",
    icon: "icon-[streamline-ultimate-color--medical-notes]",
    group: "Life",
  },
  { title: "Travel", icon: "icon-[noto--world-map]", group: "Entertainment" },
  { title: "Hostel", icon: "icon-[fxemoji--hotel]", group: "Entertainment" },
  { title: "Other", icon: "icon-[noto--shopping-cart]", group: "Other" },
];

type CategoryGroup =
  | "All"
  | "Dining"
  | "Life"
  | "Shopping"
  | "Entertainment"
  | "Other";

const categoryGroups: CategoryGroup[] = [
  "All",
  "Dining",
  "Life",
  "Shopping",
  "Entertainment",
  "Other",
];

type Props = {
  className?: string;
  tabbarClassName?: string;
  categoryListClassName?: string;
};

export const TxnCategoryPad = ({
  className,
  tabbarClassName,
  categoryListClassName,
}: Props) => {
  const [currentTab, setCurrentTab] = useState<CategoryGroup>("All");

  const filteredCategories = useMemo(
    () =>
      currentTab === "All"
        ? categories
        : categories.filter(({ group }) => group === currentTab),
    [currentTab]
  );

  return (
    <div className={twMerge("flex flex-col overflow-hidden", className)}>
      <Tabs
        items={categoryGroups.map((group) => ({
          title: group,
          value: group,
        }))}
        value={currentTab}
        onChange={setCurrentTab}
        className={twMerge("px-4", tabbarClassName)}
      />

      <div className={twMerge("shrink", categoryListClassName)}>
        <div className={"grid grid-cols-4 gap-4 p-4"}>
          {filteredCategories.map(({ title, icon }) => (
            <CategoryPadButtonCard key={`category-${title}`} icon={icon}>
              {title}
            </CategoryPadButtonCard>
          ))}
        </div>
      </div>
    </div>
  );
};
