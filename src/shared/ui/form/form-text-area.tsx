import { useFieldContext } from "./hooks";
import { FormBase, type FormControlProps } from "./form-base";
import { Textarea } from "../textarea";

type FormTextAreaProps = FormControlProps & {
  placeholder?: string;
  formatValue?: (value: string) => string;
};

export const FormTextArea = ({
  placeholder,
  formatValue,
  ...props
}: FormTextAreaProps) => {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  return (
    <FormBase {...props}>
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => {
          const value = formatValue
            ? formatValue(event.target.value)
            : event.target.value;
          field.handleChange(value);
        }}
        aria-invalid={isInvalid}
        placeholder={placeholder}
      />
    </FormBase>
  );
};
