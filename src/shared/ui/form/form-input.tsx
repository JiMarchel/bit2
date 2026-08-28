import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFieldContext } from "./hooks";
import { Input } from "../input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../input-group";
import { FormBase, type FormControlProps } from "./form-base";

interface FormInputProps extends FormControlProps {
  placeholder?: string;
  type?: string;
  className?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
  numericOnly?: boolean;
  formatValue?: (value: string) => string;
}

export const FormInput = ({
  autoComplete,
  inputMode,
  maxLength,
  numericOnly,
  placeholder,
  type,
  className,
  formatValue,
  disabled,
  ...props
}: FormInputProps) => {
  const field = useFieldContext<string>();
  const [visible, setVisible] = useState(false);

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const isPassword = type === "password";
  const effectiveType = isPassword ? (visible ? "text" : "password") : type || "text";

  const handleChange = (value: string) => {
    const nextValue = numericOnly ? value.replace(/\D/g, "") : value;
    const limitedValue =
      typeof maxLength === "number" ? nextValue.slice(0, maxLength) : nextValue;

    field.handleChange(formatValue ? formatValue(limitedValue) : limitedValue);
  };

  const commonProps = {
    id: field.name,
    name: field.name,
    value: field.state.value,
    onBlur: field.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(e.target.value),
    "aria-invalid": isInvalid,
    placeholder,
    type: effectiveType,
    autoComplete,
    inputMode: inputMode ?? (numericOnly ? "numeric" : undefined),
    maxLength,
    pattern: numericOnly ? "[0-9]*" : undefined,
    disabled,
  };

  return (
    <FormBase {...props} disabled={disabled}>
      {isPassword ? (
        <InputGroup>
          <InputGroupInput className={className} {...commonProps} />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label={visible ? "Hide password" : "Show password"}
              onClick={() => setVisible((prev) => !prev)}
              disabled={disabled}
            >
              {visible ? <EyeOff /> : <Eye />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      ) : (
        <Input className={className} {...commonProps} />
      )}
    </FormBase>
  );
};
