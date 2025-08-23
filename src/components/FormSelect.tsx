import type { ComponentProps } from "react";
import Select from "react-select";

type Props = {
  label?: string;
} & ComponentProps<typeof Select>;

export const FormSelect = ({
  label,
  className,
  classNames,
  ...selectProps
}: Props) => (
  <div className={className}>
    {label && (
      <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
    )}
    <Select
      classNames={{
        control: () =>
          "py-0.5 !rounded-lg !bg-gray-700 !border-gray-600 focus:ring-blue-500 focus:border-blue-500",
        menu: () => "!bg-gray-700",
        option: () =>
          "!bg-transparent active:!bg-gray-600 hover:!bg-gray-600 focus:!bg-gray-600 !text-sm",
        singleValue: () => "text-sm !text-white",
        placeholder: () => "!text-gray-400 text-sm",
        ...classNames,
      }}
      {...selectProps}
    />
  </div>
);
