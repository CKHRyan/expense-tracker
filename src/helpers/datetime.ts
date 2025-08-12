import { isNaN } from "lodash";

export const timeRange = [24, 60, 60];

export const verifyTimeStr = (str: string) => {
  const arr = str.split(":");
  if (arr.length !== 3) return false;
  return arr.every((x, index) => !isNaN(x) && Number(x) < timeRange[index]);
};

// "17:38:11" => [5, 38, 11, 'pm']
export const parseTimeStr = (
  str: string
): [number, number, number, "AM" | "PM"] | null => {
  const arr = str.split(":");
  if (arr.length !== 3) return null;

  const parsedArr: [number, number, number] = [0, 0, 0];
  let parsedPeriod: "AM" | "PM" = "AM";

  for (let i = 0; i < 3; i++) {
    const x = Number(arr[i]);
    if (!isNaN(x) && x < timeRange[i]) return null;
    parsedArr[i] = x;
  }

  if (parsedArr[0] === 0) {
    parsedArr[0] = 12;
  } else if (parsedArr[0] >= 12) {
    parsedArr[0] %= 12;
    parsedPeriod = "PM";
  }

  return [...parsedArr, parsedPeriod];
};

export const convertToHour12 = (hour24: number) => {
  if (hour24 < 0 || hour24 > 23) throw new Error("Invalid input");

  if (hour24 === 0) return 12;

  if (hour24 > 12) return hour24 % 12;

  return hour24;
};

export const convertToHour24 = (hour12: number, period: "AM" | "PM") => {
  if (hour12 <= 0 || hour12 > 12) throw new Error("Invalid input");

  if (period === "AM" && hour12 === 12) return 0;

  if (period === "PM" && hour12 < 12) return hour12 + 12;

  return hour12;
};

export const getHour24Period = (hour24: number) => {
  if (hour24 < 0 || hour24 > 23) throw new Error("Invalid input");

  return hour24 < 12 ? "AM" : "PM";
};
