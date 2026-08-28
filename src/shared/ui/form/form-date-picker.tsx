import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/shared/lib/cn";
import { Button } from "../button";
import { Calendar } from "../calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../popover";
import { useFieldContext } from "./hooks";
import { FormBase, type FormControlProps } from "./form-base";

type FormDatePickerProps = FormControlProps & {
  placeholder?: string;
  className?: string;
  minAge?: number;
};

const getStartOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const getLatestDateForAge = (age: number) => {
  const today = getStartOfDay(new Date());

  return new Date(today.getFullYear() - age, today.getMonth(), today.getDate());
};

const parseDateValue = (date?: string) => {
  if (!date) return undefined;

  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
};

export const FormDatePicker = ({ minAge, ...props }: FormDatePickerProps) => {
  const field = useFieldContext<string | undefined>();
  const shouldRestrictByAge =
    typeof minAge === "number" && Number.isFinite(minAge) && minAge > 0;
  const latestAllowedDate = shouldRestrictByAge
    ? getLatestDateForAge(minAge)
    : undefined;

  const value = parseDateValue(field.state.value);
  const isDateUnavailable = (date: Date) =>
    latestAllowedDate
      ? getStartOfDay(date).getTime() > latestAllowedDate.getTime()
      : false;

  return (
    <FormBase {...props}>
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className={cn(
                "h-11 w-full justify-start px-3 text-left font-normal",
                !value && "text-muted-foreground",
                props.className,
              )}
              onBlur={field.handleBlur}
              disabled={props.disabled}
            />
          }
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? (
            format(value, "PPP")
          ) : (
            <span>{props.placeholder ?? "Pilih tanggal"}</span>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            defaultMonth={value ?? latestAllowedDate}
            endMonth={latestAllowedDate}
            disabled={latestAllowedDate ? isDateUnavailable : undefined}
            onSelect={(date) => {
              if (!date || isDateUnavailable(date)) {
                field.handleChange("");
                return;
              }

              field.handleChange(format(date, "yyyy-MM-dd"));
            }}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
    </FormBase>
  );
};
