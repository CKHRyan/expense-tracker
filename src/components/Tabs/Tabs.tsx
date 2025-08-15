import { useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import "./style.css";

export type TabItem<T> = {
  value: T;
  title: string;
};

type Props<T extends string | number> = {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

export const Tabs = <T extends string | number>({
  items,
  value: currenValue,
  onChange,
  className,
}: Props<T>) => {
  const tabRefs = useRef<Record<T, HTMLButtonElement | null>>(
    {} as Record<T, HTMLButtonElement | null>
  );
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const tabsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const activeTab = tabRefs.current[currenValue];
    if (activeTab && indicatorRef.current && tabsContainerRef.current) {
      const containerRect = tabsContainerRef.current.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      const scrollLeft = tabsContainerRef.current.scrollLeft;

      indicatorRef.current.style.width = `${tabRect.width}px`;
      indicatorRef.current.style.left = `${
        tabRect.left - containerRect.left + scrollLeft
      }px`;
    }
  }, [currenValue]);

  const Tab = ({ value, title }: TabItem<T>) => {
    const tabRef = useRef(null);
    const isSelected = currenValue === value;

    useEffect(() => {
      tabRefs.current[value] = tabRef.current;
    }, [value]);

    return (
      <button
        ref={tabRef}
        className={twMerge(
          "relative px-4 py-2 font-semibold transition-colors duration-200 ease-in-out whitespace-nowrap",
          isSelected ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
        )}
        onClick={() => onChange(value)}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`tabpanel-${value}`}
        id={`tab-${value}`}
      >
        {title}
      </button>
    );
  };

  return (
    <div className={className}>
      <div
        ref={tabsContainerRef}
        className="flex relative overflow-x-auto no-scrollbar"
      >
        {items.map((item) => (
          <Tab key={`tab-${item.value}`} {...item} />
        ))}
        <div
          ref={indicatorRef}
          className="tab-indicator absolute bottom-0 h-[2px] bg-blue-500 transition-all duration-300 ease-in-out"
        />
      </div>
    </div>
  );
};
