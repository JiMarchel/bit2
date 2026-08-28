import type { ReactNode } from "react";
import { useFieldContext } from "./hooks";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "../field";
import { cn } from "@/shared/lib";

export type FormControlProps = {
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  disabled?: boolean;
};

type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
  className?: string;
};

export function FormBase({
  children,
  label,
  description,
  controlFirst,
  horizontal,
  required,
  className,
}: FormBaseProps) {
  const field = useFieldContext();
  const isInvalid =
    field.state.meta.errors.length > 0 ||
    (field.state.meta.isTouched && !field.state.meta.isValid);

  const labelElement = (
    <>
      <FieldLabel htmlFor={field.name} className="text-[16px]">
        {label} {required && <span className="text-red-500">*</span>}
      </FieldLabel>
    </>
  );
  const descriptionElement = description && (
    <FieldDescription>{description}</FieldDescription>
  );
  const errorElem = isInvalid && (
    <FieldError errors={field.state.meta.errors} />
  );

  return (
    <Field
      data-invalid={isInvalid}
      orientation={horizontal ? "horizontal" : undefined}
      className={cn(horizontal && "items-start", className)}
    >
      {controlFirst ? (
        <>
          {children}
          <FieldContent>
            {labelElement}
            {descriptionElement}
            {errorElem}
          </FieldContent>
        </>
      ) : (
        <>
          {label && <FieldContent>{labelElement}</FieldContent>}
          {children}
          <FieldContent>{descriptionElement}</FieldContent>
          {errorElem}
        </>
      )}
    </Field>
  );
}
