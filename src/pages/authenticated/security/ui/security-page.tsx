import { z } from "zod";
import { Button } from "@/shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { useAppForm } from "@/shared/ui/form";

const schema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function SecurityPage() {
  const form = useAppForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: { onChange: schema },
    onSubmit: ({ value }) => {
      // TODO: wire to the change-password API.
      console.log("update password", value);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Account Settings
        </CardTitle>
        <CardDescription>Manage your account security settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 gap-4">
            <form.AppField name="currentPassword">
              {(field) => (
                <field.Input
                  type="password"
                  label="Current password"
                  placeholder="Enter current password"
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="newPassword">
              {(field) => (
                <field.Input
                  type="password"
                  label="New password"
                  placeholder="Enter new password"
                  required
                />
              )}
            </form.AppField>

            <form.AppField name="confirmPassword">
              {(field) => (
                <field.Input
                  type="password"
                  label="Confirm password"
                  placeholder="Enter confirm password"
                  required
                />
              )}
            </form.AppField>
          </div>

          <div className="flex justify-end">
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" size="lg" disabled={!canSubmit || isSubmitting}>
                  Update Password
                </Button>
              )}
            </form.Subscribe>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
