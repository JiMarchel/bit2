import { Button, Field, FieldGroup, FieldLabel, Input } from "@/shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

export function CryptoPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-foreground"> Crypto Information
        </CardTitle>
        <CardDescription>Submit your network and transaction hash below. This can only be done once.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <FieldGroup className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="network">Network</FieldLabel>
            <Input id="network" name="network" placeholder="Enter Network" />
          </Field>

          <Field>
            <FieldLabel htmlFor="transactionHash">Transaction Hash</FieldLabel>
            <Input
              id="transactionHash"
              name="transactionHash"
              placeholder="Enter Transaction Hash"
            />
          </Field>

        </FieldGroup>
        <div className="flex justify-end">
          <Button type="submit" size="lg">Add Bank</Button>
        </div>
      </CardContent>
    </Card>
  );
}
