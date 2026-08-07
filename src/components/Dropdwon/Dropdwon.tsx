import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  type JSX,
  Fragment,
} from "react";
import { createPortal } from "react-dom";
import { Text } from "../Text";
import { twMerge } from "tailwind-merge";
import { Divider } from "../Divider";

export interface DropdownOption {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  danger?: boolean;
}

export interface DropdownProps {
  buttonComponent: JSX.Element;
  options?: DropdownOption[];
  align?: "left" | "right";
  /** Preferred placement before overflow checking */
  placement?: "bottom" | "top" | "left" | "right";
  /** Spacing distance between trigger button and menu (px) */
  offset?: number;
}

const DEFAULT_OPTIONS: DropdownOption[] = [
  { label: "Edit", onClick: () => console.log("Edit clicked") },
  { label: "Duplicate", onClick: () => console.log("Duplicate clicked") },
  { label: "Archive", onClick: () => console.log("Archive clicked") },
  {
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
    danger: true,
  },
];

export const Dropdown = ({
  buttonComponent,
  options = DEFAULT_OPTIONS,
  align = "right",
  placement = "bottom",
  offset = 4,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Recalculate portal position relative to the viewport with border overflow detection
  const updatePosition = () => {
    if (!buttonRef.current) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();

    // Get actual menu dimensions if mounted, fallback to standard defaults
    const menuWidth = menuRef.current?.offsetWidth ?? 192; // 12rem / w-48 default
    const menuHeight = menuRef.current?.offsetHeight ?? options.length * 36 + 8;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let computedPlacement = placement;

    // --- 1. OVERFLOW CHECKS & PLACEMENT FLIPPING ---
    if (
      computedPlacement === "bottom" &&
      buttonRect.bottom + offset + menuHeight > viewportHeight
    ) {
      if (buttonRect.top - offset - menuHeight >= 0) {
        computedPlacement = "top";
      }
    } else if (
      computedPlacement === "top" &&
      buttonRect.top - offset - menuHeight < 0
    ) {
      if (buttonRect.bottom + offset + menuHeight <= viewportHeight) {
        computedPlacement = "bottom";
      }
    } else if (
      computedPlacement === "right" &&
      buttonRect.right + offset + menuWidth > viewportWidth
    ) {
      if (buttonRect.left - offset - menuWidth >= 0) {
        computedPlacement = "left";
      }
    } else if (
      computedPlacement === "left" &&
      buttonRect.left - offset - menuWidth < 0
    ) {
      if (buttonRect.right + offset + menuWidth <= viewportWidth) {
        computedPlacement = "right";
      }
    }

    // --- 2. COORDINATE CALCULATION BASED ON FINAL PLACEMENT ---
    let top = 0;
    let left = 0;

    switch (computedPlacement) {
      case "top":
        top = buttonRect.top + window.scrollY - menuHeight - offset;
        left =
          align === "right"
            ? buttonRect.right + window.scrollX - menuWidth
            : buttonRect.left + window.scrollX;
        break;

      case "bottom":
        top = buttonRect.bottom + window.scrollY + offset;
        left =
          align === "right"
            ? buttonRect.right + window.scrollX - menuWidth
            : buttonRect.left + window.scrollX;
        break;

      case "left":
        top = buttonRect.top + window.scrollY;
        left = buttonRect.left + window.scrollX - menuWidth - offset;
        break;

      case "right":
        top = buttonRect.top + window.scrollY;
        left = buttonRect.right + window.scrollX + offset;
        break;
    }

    // --- 3. CLAMPING / SAFETY SHIFTS (Prevent off-screen spillover) ---
    // Horizontal clamping
    const minLeft = window.scrollX + 8;
    const maxLeft = window.scrollX + viewportWidth - menuWidth - 8;
    left = Math.max(minLeft, Math.min(left, maxLeft));

    // Vertical clamping
    const minTop = window.scrollY + 8;
    const maxTop = window.scrollY + viewportHeight - menuHeight - 8;
    top = Math.max(minTop, Math.min(top, maxTop));

    setCoords({ top, left });
  };

  // Toggle open state
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Measure exact rendered DOM dimensions immediately when opened
  useLayoutEffect(() => {
    if (isOpen) {
      updatePosition();
    }
  }, [isOpen]);

  // Close when clicking outside both button and portal menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (
        buttonRef.current &&
        !buttonRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape & recalculate position on window scroll or resize
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = (): void => {
      if (isOpen) {
        updatePosition();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [isOpen]);

  return (
    <>
      {/* 3-Dots Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="More options"
        className="cursor-pointer inline-flex items-center"
      >
        {buttonComponent}
      </button>

      {/* Portaled Menu Panel */}
      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-orientation="vertical"
            style={{
              position: "absolute",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
            }}
            className="bg-[#242424] rounded-lg shadow-lg/2 shadow-white focus:outline-none z-5"
          >
            <div className="py-1" role="none">
              {options.map((action, index) => (
                <Fragment key={`dropdown-option-${index}-${action.label}`}>
                  {index > 0 && <Divider className="bg-zinc-700" />}
                  <button
                    key={index}
                    role="menuitem"
                    onClick={() => {
                      action.onClick();
                      setIsOpen(false);
                    }}
                    className={twMerge(
                      "w-full text-left px-4 py-2 text-right flex items-center space-x-2 transition-colors duration-100 hover:bg-zinc-700 cursor-pointer",
                      action.danger ? "text-red-300" : "text-white",
                    )}
                  >
                    {action.icon && (
                      <span className="shrink-0 text-inherit">
                        {action.icon}
                      </span>
                    )}
                    <Text className="text-inherit">{action.label}</Text>
                  </button>
                </Fragment>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
