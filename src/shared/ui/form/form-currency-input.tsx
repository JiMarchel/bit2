import React, { useState } from "react";
import { useFieldContext } from "./hooks";
import { Input } from "../input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../input-group";
import { FormBase, type FormControlProps } from "./form-base";

export const idrCurrencyFormatter = new Intl.NumberFormat("id-ID", {
  currency: "IDR",
  maximumFractionDigits: 0,
  style: "currency",
});

export const usdCurrencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: "currency",
});

export function formatIdrInput(value: string | number) {
  if (!value && value !== 0) return "";
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "";
  return idrCurrencyFormatter.format(num);
}

export function formatUsdInput(value: string | number) {
  if (!value && value !== 0) return "";
  const num = typeof value === "number" ? value : Number(value);
  if (isNaN(num)) return "";
  return usdCurrencyFormatter.format(num);
}

export interface CurrencyInputProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
  formatter?: (value: string) => string;
  currency?: "IDR" | "USD";
  sanitize?: (raw: string) => string;
  asInputGroupControl?: boolean;
}

export function CurrencyInput({
  value = "",
  onValueChange,
  formatter,
  currency = "IDR",
  sanitize,
  asInputGroupControl,
  className,
  onFocus,
  onBlur,
  ...props
}: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const defaultFormatter =
    formatter ?? (currency === "USD" ? formatUsdInput : formatIdrInput);

  const defaultSanitize =
    sanitize ??
    (currency === "USD"
      ? (raw: string) => raw.replace(/[^\d.]/g, "")
      : (raw: string) => raw.replace(/\D/g, ""));

  const InputComponent = asInputGroupControl ? InputGroupInput : Input;

  return (
    <InputComponent
      {...props}
      value={isFocused ? value : defaultFormatter(value)}
      onChange={(event) => onValueChange?.(defaultSanitize(event.target.value))}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      className={className}
    />
  );
}

export interface FormCurrencyInputProps
  extends FormControlProps,
    Omit<CurrencyInputProps, "value"> {
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
}

export function FormCurrencyInput({
  currency = "IDR",
  formatter,
  sanitize,
  placeholder,
  className,
  disabled,
  leftAddon,
  rightAddon,
  onValueChange,
  ...props
}: FormCurrencyInputProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const defaultPlaceholder =
    placeholder ?? (currency === "USD" ? "$ 0.00" : "Rp 0");

  const hasAddon = Boolean(leftAddon || rightAddon);

  const handleValueChange = (val: string) => {
    field.handleChange(val);
    onValueChange?.(val);
  };

  const inputElement = (
    <CurrencyInput
      id={field.name}
      name={field.name}
      value={field.state.value}
      onValueChange={handleValueChange}
      onBlur={field.handleBlur}
      aria-invalid={isInvalid}
      currency={currency}
      formatter={formatter}
      sanitize={sanitize}
      placeholder={defaultPlaceholder}
      className={className}
      disabled={disabled}
      asInputGroupControl={hasAddon}
    />
  );

  return (
    <FormBase {...props} disabled={disabled}>
      {hasAddon ? (
        <InputGroup>
          {leftAddon && (
            <InputGroupAddon align="inline-start">{leftAddon}</InputGroupAddon>
          )}
          {inputElement}
          {rightAddon && (
            <InputGroupAddon align="inline-end">{rightAddon}</InputGroupAddon>
          )}
        </InputGroup>
      ) : (
        inputElement
      )}
    </FormBase>
  );
}
