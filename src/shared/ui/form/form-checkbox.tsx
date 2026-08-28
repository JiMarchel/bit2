import { useFieldContext } from "./hooks";
import { FormBase, type FormControlProps } from "./form-base";
import { Checkbox } from "../checkbox";

export function FormCheckbox(props: FormControlProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props} controlFirst horizontal>
      <Checkbox
        id={field.name}
        name={field.name}
        className="mt-0.5 mb-5"
        checked={field.state.value}
        disabled={props.disabled}
        onBlur={field.handleBlur}
        onCheckedChange={(e) => field.handleChange(e === true)}
        aria-invalid={isInvalid}
      />
    </FormBase>
  );
}
