import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { FormInput } from "./form-input";
import { FormTextArea } from "./form-text-area";
import { FormSelect } from "./form-select";
import { FormCheckbox } from "./form-checkbox";
import { FormInputGroup } from "./form-input-group";
import { FormPhoneInput } from "./form-phone-input";
import { FormRadio } from "./form-radio";
import { FormOtp } from "./form-otp";
import { FormDropZone } from "./form-drop-zone";
import { FormDatePicker } from "./form-date-picker";
import { FormCurrencyInput } from "./form-currency-input";

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    TextArea: FormTextArea,
    Select: FormSelect,
    CheckBox: FormCheckbox,
    InputGroup: FormInputGroup,
    PhoneInput: FormPhoneInput,
    Radio: FormRadio,
    DatePicker: FormDatePicker,
    Otp: FormOtp,
    DropZone: FormDropZone,
    CurrencyInput: FormCurrencyInput,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };
