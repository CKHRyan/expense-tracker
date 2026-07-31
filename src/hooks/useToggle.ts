import { type Dispatch, type SetStateAction, useState } from "react";

export const useToggle = (
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState(!!defaultValue);

  const toggle = () => setValue((x) => !x);

  return [value, toggle, setValue];
};
