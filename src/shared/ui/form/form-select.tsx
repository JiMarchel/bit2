import { useMemo, useState, useEffect } from "react";
import { useFieldContext } from "./hooks";
import { FormBase, type FormControlProps } from "./form-base";
import { Button } from "../button";
import { Input } from "../input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../select";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "@/shared/lib/cn";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";

type FormSelectProps = FormControlProps & {
  placeholder?: string;
  data: Array<{ label: string; value: string }>;
  onValueChange?: (value: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  maxSearchResults?: number;
  clearable?: boolean;
};

export function FormSelect({
  onValueChange,
  placeholder,
  data,
  searchable = true,
  searchPlaceholder = "Cari...",
  maxSearchResults,
  clearable = true,
  ...props
}: FormSelectProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const selectedItem = useMemo(() => {
    if (!field.state.value) return undefined;

    const exactMatch = data.find((item) => item.value === field.state.value);
    if (exactMatch) return exactMatch;

    const normalizedValue = String(field.state.value).trim().toLowerCase();
    return data.find((item) => item.label.toLowerCase() === normalizedValue);
  }, [data, field.state.value]);

  useEffect(() => {
    if (selectedItem && selectedItem.value !== field.state.value) {
      field.handleChange(selectedItem.value);
    }
  }, [selectedItem, field]);
  const matchedData = useMemo(() => {
    if (!searchable || !normalizedQuery) return data;

    return data.filter((item) =>
      `${item.label} ${item.value}`.toLowerCase().includes(normalizedQuery),
    );
  }, [data, normalizedQuery, searchable]);
  const visibleData = useMemo(() => {
    const limitedData = searchable && maxSearchResults
      ? matchedData.slice(0, maxSearchResults)
      : matchedData;

    if (
      !searchable ||
      normalizedQuery ||
      !selectedItem ||
      limitedData.some((item) => item.value === selectedItem.value)
    ) {
      return limitedData;
    }

    return [selectedItem, ...limitedData];
  }, [matchedData, maxSearchResults, normalizedQuery, searchable, selectedItem]);
  const hiddenResultCount = Math.max(matchedData.length - visibleData.length, 0);
  const handleValueChange = (value: string) => {
    field.handleChange(value);
    onValueChange?.(value);
  };

  if (searchable) {
    return (
      <FormBase {...props}>
        <Popover
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);
            if (!nextOpen) {
              setQuery("");
              field.handleBlur();
            }
          }}
        >
          <div className="relative">
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  id={field.name}
                  role="combobox"
                  aria-expanded={open}
                  aria-invalid={isInvalid}
                  disabled={props.disabled}
                  className={cn(
                    "h-9 w-full justify-between bg-transparent px-2.5 text-left text-sm font-normal hover:bg-transparent",
                    !selectedItem && "text-muted-foreground",
                    clearable && field.state.value && "pr-10",
                  )}
                />
              }
            >
              <span className="min-w-0 truncate">
                {selectedItem ? selectedItem.label : (field.state.value || placeholder)}
              </span>
              <ChevronDownIcon data-icon="inline-end" />
            </PopoverTrigger>
            {clearable && field.state.value && !props.disabled && (
              <button
                type="button"
                className="absolute top-1/2 right-10 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  field.handleChange("");
                  onValueChange?.("");
                }}
              >
                <XIcon className="size-3.5" />
              </button>
            )}
          </div>
          <PopoverContent
            align="start"
            className="w-(--anchor-width) p-1 overflow-hidden"
            onWheelCapture={(event) => event.stopPropagation()}
            onTouchMoveCapture={(event) => event.stopPropagation()}
          >
            <div className="p-1">
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    setOpen(false);
                    setQuery("");
                    field.handleBlur();
                  }
                }}
                placeholder={searchPlaceholder}
                autoComplete="off"
                autoFocus
                className="h-9 text-sm"
              />
            </div>
            <div
              className="max-h-[min(18rem,calc(100dvh-14rem))] touch-pan-y overflow-y-auto overscroll-contain p-1 space-y-1"
              onWheelCapture={(event) => event.stopPropagation()}
              onTouchMoveCapture={(event) => event.stopPropagation()}
            >
              {visibleData.length > 0 ? (
                visibleData.map((item) => {
                  const isSelected = item.value === field.state.value;

                  return (
                    <button
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      key={item.value}
                      className={cn(
                        "flex min-h-9 w-full items-center justify-between gap-2 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-accent focus-visible:bg-accent [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                        isSelected && "bg-accent",
                      )}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        handleValueChange(item.value);
                        setOpen(false);
                        setQuery("");
                        field.handleBlur();
                      }}
                    >
                      <span className="min-w-0 truncate">{item.label}</span>
                      {isSelected && <CheckIcon className="text-primary" />}
                    </button>
                  );
                })
              ) : (
                <div className="px-2 py-3 text-center text-sm text-muted-foreground">
                  Data tidak ditemukan
                </div>
              )}
              {maxSearchResults && hiddenResultCount > 0 && (
                <div className="px-2 py-2 text-center text-xs text-muted-foreground">
                  {hiddenResultCount} hasil lain. Ketik lebih spesifik.
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </FormBase>
    );
  }

  return (
    <FormBase {...props}>
      <div className="relative">
        <Select
          open={open}
          onOpenChange={(nextOpen) => {
            setOpen(nextOpen);

            if (!nextOpen) {
              setQuery("");
            }
          }}
          onValueChange={(value) => {
            handleValueChange(value as string);
          }}
          value={field.state.value}
          disabled={props.disabled}
        >
          <SelectTrigger
            aria-invalid={isInvalid}
            className={cn("w-full", clearable && field.state.value && "pr-10")}
            id={field.name}
            onBlur={field.handleBlur}
          >
            <span
              data-slot="select-value"
              className={!selectedItem && !field.state.value ? "text-muted-foreground" : ""}
            >
              {selectedItem ? selectedItem.label : (field.state.value || placeholder)}
            </span>
          </SelectTrigger>
          <SelectContent
            align="start"
            className="max-h-[min(18rem,var(--available-height))] w-(--anchor-width) max-w-[calc(100vw-2rem)]"
          >
            <SelectGroup>
              {data.length > 0 ? (
                data.map((item) => (
                  <SelectItem
                    value={item.value}
                    key={item.value}
                    className="min-w-0 [&>span:last-child]:block [&>span:last-child]:min-w-0 [&>span:last-child]:truncate"
                  >
                    {item.label}
                  </SelectItem>
                ))
              ) : (
                <div className="px-2 py-3 text-center text-sm text-muted-foreground">
                  Data tidak ditemukan
                </div>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        {clearable && field.state.value && !props.disabled && (
          <button
            type="button"
            className="absolute top-1/2 right-10 -translate-y-1/2 rounded-sm p-0.5 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              field.handleChange("");
              onValueChange?.("");
            }}
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
    </FormBase>
  );
}
