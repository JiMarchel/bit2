import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../input-otp";
import { FormBase, type FormControlProps } from "./form-base";
import { useFieldContext } from "./hooks";

interface FormOtpProps extends Omit<FormControlProps, "label"> {
  label?: FormControlProps["label"];
  maxLength?: number;
  autoFocus?: boolean;
  lockWhenFull?: boolean;
}

export const FormOtp = ({
  maxLength = 6,
  autoFocus,
  lockWhenFull,
  ...props
}: FormOtpProps) => {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const handleChange = (value: string) => {
    const currentValue = field.state.value;

    if (
      lockWhenFull &&
      currentValue.length >= maxLength &&
      value.length >= currentValue.length
    ) {
      return;
    }

    field.handleChange(value.slice(0, maxLength));
  };

  return (
    <FormBase {...props} label={props.label ?? ""}>
      <InputOTP
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={handleChange}
        maxLength={maxLength}
        pattern={REGEXP_ONLY_DIGITS}
        inputMode="numeric"
        autoComplete="one-time-code"
        aria-invalid={isInvalid}
        autoFocus={autoFocus}
        containerClassName="justify-center"
      >
        <InputOTPGroup>
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className="size-11 text-base"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </FormBase>
  );
};
