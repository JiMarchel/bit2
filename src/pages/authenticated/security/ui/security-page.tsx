import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export function SecurityPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground"> Account Settings
        </CardTitle>
        <CardDescription>Manage your account security settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <FieldGroup className="grid grid-cols-1 gap-x-8">
          <Field>
            <FieldLabel htmlFor="currentPassword">Current password</FieldLabel>
            <Input id="currentPassword" name="currentPassword" placeholder="Enter current password" />
          </Field>

          <Field>
            <FieldLabel htmlFor="newPassword">New password</FieldLabel>
            <Input
              id="newPassword"
              name="newPassword"
              placeholder="Enter New Password"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
            <Input id="confirmPassword" name="confirmPassword" placeholder="Enter confirm password" />
          </Field>

        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" size="lg">Update Password</Button>
        </div>
      </CardContent>
    </Card>
  );
}
