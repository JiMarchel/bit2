import { useFieldContext } from "./hooks";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../input-group";
import { FormBase, type FormControlProps } from "./form-base";
import React from "react";

interface FormInputGroupProps extends FormControlProps {
  className?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  leftAddon?: React.ReactNode;
  onValueChange?: (value: string) => string;
  rightAddon?: React.ReactNode;
  placeholder?: string;
  type?: string;
}

export const FormInputGroup = ({
  className,
  disabled,
  inputMode,
  leftAddon,
  onValueChange,
  rightAddon,
  placeholder,
  type,
  ...props
}: FormInputGroupProps) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props} className={className} disabled={disabled}>
      <InputGroup>
        {leftAddon && (
          <InputGroupAddon align="inline-start">{leftAddon}</InputGroupAddon>
        )}
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          disabled={disabled}
          inputMode={inputMode}
          onBlur={field.handleBlur}
          onChange={(e) =>
            field.handleChange(
              onValueChange ? onValueChange(e.target.value) : e.target.value,
            )
          }
          aria-invalid={isInvalid}
          placeholder={placeholder}
          type={type || "text"}
        />
        {rightAddon && (
          <InputGroupAddon align="inline-end">{rightAddon}</InputGroupAddon>
        )}
      </InputGroup>
    </FormBase>
  );
};
