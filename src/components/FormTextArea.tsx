import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  label?: string;
  textAreaClassname?: string;
} & DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export const FormTextArea = ({
  label,
  className,
  textAreaClassname,
  ...textareaProps
}: Props) => (
  <div className={className}>
    {label && (
      <label className="block mb-2 font-medium text-gray-900 dark:text-white">
        {label}
      </label>
    )}
    <textarea
      className={twMerge(
        "bg-[#2c2c2c] text-white rounded-lg block w-full p-2.5",
        textAreaClassname
      )}
      {...textareaProps}
    />
  </div>
);
