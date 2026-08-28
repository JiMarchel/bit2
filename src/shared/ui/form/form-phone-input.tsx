import { useFieldContext } from "./hooks";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "../input-group";
import { FormBase, type FormControlProps } from "./form-base";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";

interface FormPhoneInputProps extends FormControlProps {
  placeholder?: string;
}

const COUNTRIES = [
  { value: "ID", label: "Indonesia", phoneCode: "+62" },
  { value: "US", label: "United States", phoneCode: "+1" },
  { value: "GB", label: "United Kingdom", phoneCode: "+44" },
  { value: "SG", label: "Singapore", phoneCode: "+65" },
  { value: "AU", label: "Australia", phoneCode: "+61" },
  { value: "IN", label: "India", phoneCode: "+91" },
];

export const FormPhoneInput = ({
  placeholder = "Phone Number",
  ...props
}: FormPhoneInputProps) => {
  const field = useFieldContext<{ phoneCode: string; phoneNumber: string }>();
  const selectedCountry = COUNTRIES.find(
    (country) => country.phoneCode === field.state.value.phoneCode,
  );
  const selectedValue = selectedCountry?.value ?? "";

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <FormBase {...props}>
      <InputGroup>
        <InputGroupAddon align="inline-start" className="p-0">
          <Select
            value={selectedValue}
            disabled={props.disabled}
            onValueChange={(value) => {
              const country = COUNTRIES.find((c) => c.value === value);
              if (country) {
                field.handleChange({
                  ...field.state.value,
                  phoneCode: country.phoneCode,
                });
              }
            }}
          >
            <SelectTrigger className="h-full min-w-20 rounded-none rounded-l-[calc(var(--radius)-2px)] border-0 border-r bg-transparent shadow-none ring-0 focus:ring-0 focus-visible:ring-0">
              <SelectValue
                placeholder={field.state.value.phoneCode || "Code"}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {COUNTRIES.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.phoneCode} {country.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </InputGroupAddon>
        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value.phoneNumber}
          onBlur={field.handleBlur}
          onChange={(e) => {
            field.handleChange({
              ...field.state.value,
              phoneNumber: e.target.value.replace(/\D/g, ""),
            });
          }}
          aria-invalid={isInvalid}
          placeholder={placeholder}
          type="tel"
          inputMode="numeric"
          maxLength={15}
          disabled={props.disabled}
        />
      </InputGroup>
    </FormBase>
  );
};
