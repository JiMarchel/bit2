import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";



export function ReferralPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground"> Share your referrals
        </CardTitle>
        <CardDescription>Invite friends to join using your referral code or link.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <FieldGroup className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
          <Field>
            <FieldLabel htmlFor="referralCode">Referral Code</FieldLabel>
            <Input id="referralCode" name="referralCode" defaultValue={"23423423423"} />
          </Field>

          <Field className="col-span-2">
            <FieldLabel htmlFor="referralLink">Referral Link</FieldLabel>
            <Input
              id="referralLink"
              name="referralLink"
              defaultValue={"https://bit2.com"}
            />
          </Field>
        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" size="lg">Update Password</Button>
        </div>
      </CardContent>
    </Card>
  );
}
