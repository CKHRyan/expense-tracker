import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const FormInput = ({ label, className, ...inputProps }: Props) => (
  <div className={className}>
    {label && (
      <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>
    )}
    <input
      className="text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
      {...inputProps}
    />
  </div>
);
