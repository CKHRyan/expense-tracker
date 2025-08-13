import { Tabs } from "@components";
import { CategoryPadButtonCard } from "@features/ExpenseInput/PadButtonCard/CategoryPadButtonCard";
import { useEffect, useMemo, useState } from "react";
import { categoryOptions, categoryGroupOptions } from "./constants";
import { twMerge } from "tailwind-merge";
import { categoryAttributes, categoryGroupMap } from "src/constants/expense";
import type { TransactionInputInterface } from "@features/ExpenseInput/hooks";

type Props = {
  className?: string;
  tabbarClassName?: string;
  categoryListClassName?: string;
} & Pick<TransactionInputInterface, "category" | "setCategory">;

export const TxnCategoryPad = ({
  category: selectedCategory,
  setCategory,
  className,
  tabbarClassName,
  categoryListClassName,
}: Props) => {
  const [currentTab, setCurrentTab] = useState<
    (typeof categoryGroupOptions)[number]
  >(categoryGroupOptions[0]);

  const filteredcategoryOptions = useMemo(() => {
    switch (currentTab) {
      case "All":
        return categoryOptions.filter(({ hiddenFromAll }) => !hiddenFromAll);
      case "Other":
        return categoryOptions.filter(
          ({ category, isOther }) =>
            isOther || categoryGroupMap[category] === currentTab
        );
      default:
        return categoryOptions.filter(
          ({ category }) => categoryGroupMap[category] === currentTab
        );
    }
  }, [currentTab]);

  useEffect(() => {
    if (!selectedCategory) return;
    if (
      filteredcategoryOptions.every(
        ({ category }) => category !== selectedCategory
      )
    ) {
      setCurrentTab(categoryGroupMap[selectedCategory]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className={twMerge("flex flex-col overflow-hidden", className)}>
      <Tabs
        items={categoryGroupOptions.map((option) => ({
          title: option,
          value: option,
        }))}
        value={currentTab}
        onChange={setCurrentTab}
        className={twMerge("px-4", tabbarClassName)}
      />

      <div className={twMerge("shrink", categoryListClassName)}>
        <div className={"grid grid-cols-4 gap-4 p-4"}>
          {filteredcategoryOptions.map(({ category }) => (
            <CategoryPadButtonCard
              key={`category-${category}`}
              icon={categoryAttributes[category].icon}
              isSelected={selectedCategory === category}
              onClick={() => setCategory(category)}
            >
              {categoryAttributes[category].title}
            </CategoryPadButtonCard>
          ))}
        </div>
      </div>
    </div>
  );
};
