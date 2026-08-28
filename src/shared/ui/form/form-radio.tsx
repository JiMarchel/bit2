import { useFieldContext } from "./hooks";
import { FormBase, type FormControlProps } from "./form-base";
import { RadioGroup } from "../radio-group";
import type { ReactNode } from "react";

export function FormRadio({
  children,
  ...props
}: FormControlProps & { children: ReactNode }) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <RadioGroup
        id={field.name}
        name={field.name}
        className="mt-0.5"
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
        value={field.state.value}
        onValueChange={field.handleChange}
      >
        {children}
      </RadioGroup>
    </FormBase>
  );
}
