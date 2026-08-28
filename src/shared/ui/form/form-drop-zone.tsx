import { ImageDropzone } from "../image-dropzone";
import { FormBase, type FormControlProps } from "./form-base";
import { useFieldContext } from "./hooks";

interface FormDropZoneProps extends FormControlProps {
  imageUrl?: string;
  onValueChange?: (file: File | null) => void;
}

export const FormDropZone = ({
  imageUrl,
  onValueChange,
  ...props
}: FormDropZoneProps) => {
  const field = useFieldContext<File | null>();
  const isInvalid =
    field.state.meta.errors.length > 0 ||
    (field.state.meta.isTouched && !field.state.meta.isValid);

  return (
    <FormBase {...props}>
      <ImageDropzone
        defaultPreview={imageUrl}
        onChange={(value) => {
          field.handleChange(value);
          onValueChange?.(value);
        }}
        className={isInvalid ? "border-red-500 bg-red-50/50" : ""}
      />
    </FormBase>
  );
};
