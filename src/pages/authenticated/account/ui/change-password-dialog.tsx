import { useState } from "react";
import { z } from "zod";
import { KeyRound } from "lucide-react";
import { Button } from "@/shared/ui";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useAppForm } from "@/shared/ui/form";
import { toast } from "@/shared/ui/toast";

const schema = z
  .object({
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmNewPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export function ChangePasswordDialog({ login }: { login: string }) {
  const [open, setOpen] = useState(false);

  const form = useAppForm({
    defaultValues: { newPassword: "", confirmNewPassword: "" },
    validators: { onChange: schema },
    onSubmit: () => {
      // TODO: wire to the MT5 change-password API.
      toast.add({
        title: "Password updated",
        description: `Password changed for account ${login}`,
      });
      setOpen(false);
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={<Button variant="outline" size="lg" className="justify-start" />}
      >
        <KeyRound className="size-4" />
        Change Password Meta
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Set a new password for account {login}.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.AppField name="newPassword">
            {(field) => (
              <field.Input
                type="password"
                label="New Password"
                placeholder="Enter new password"
                required
              />
            )}
          </form.AppField>

          <form.AppField name="confirmNewPassword">
            {(field) => (
              <field.Input
                type="password"
                label="Confirm New Password"
                placeholder="Re-enter new password"
                required
              />
            )}
          </form.AppField>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
              {([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  Update Password
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
