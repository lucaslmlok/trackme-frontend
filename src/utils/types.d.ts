export type Action = {
  id?: string;
  name: string;
  type: "yesNo" | "number";
  target: number;
  unit: string;
  increment: number;
  color: string;
  icon: string;
  startDate: string;
  endDate: string;
  weekdays: Weekday[];
};
