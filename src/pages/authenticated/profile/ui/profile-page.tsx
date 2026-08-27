import {
  Button,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

const countryCodes = [
  { code: "+93", label: "+93" },
  { code: "+1", label: "+1" },
  { code: "+44", label: "+44" },
  { code: "+61", label: "+61" },
  { code: "+65", label: "+65" },
  { code: "+91", label: "+91" },
];

export function ProfilePage() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="border-b border-border pb-4">
        <h1 className="text-lg font-semibold text-card-foreground">
          Profile information
        </h1>
      </div>

      <form className="pt-6">
        <FieldGroup className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="fullName">Full name</FieldLabel>
            <Input id="fullName" name="fullName" defaultValue="tumini" />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue="tumini@yopmail.com"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">
              Phone <span className="text-destructive">*</span>
            </FieldLabel>
            <div className="flex gap-2">
              <Select defaultValue="+93">
                <SelectTrigger id="phone-code" className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countryCodes.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+65544123123"
                className="flex-1"
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="avatar">Upload profile image</FieldLabel>
            <Input id="avatar" name="avatar" type="file" accept="image/png,image/jpeg" />
            <FieldDescription>
              Accepted formats: png, jpg. Max file size 5Mb
            </FieldDescription>
          </Field>
        </FieldGroup>

        <div className="mt-8 flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </div>
  );
}
