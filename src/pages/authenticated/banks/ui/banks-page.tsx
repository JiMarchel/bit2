import {
  Button,
  type ColumnDef,
  DataTable,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  Input,
} from "@/shared/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { List, MoreHorizontal, Pencil, PlusCircle, Trash2 } from "lucide-react";

type BankAccount = {
  id: string;
  createdDate: string;
  bankName: string;
  accountOwner: string;
  accountNumber: string;
};

const bankAccounts: BankAccount[] = [
  {
    id: "1",
    createdDate: "2026-08-27 11:34:29",
    bankName: "PT BANK DANAMON INDONESIA Tbk",
    accountOwner: "sssssssssssssssssss",
    accountNumber: "222222222",
  },
  {
    id: "2",
    createdDate: "2026-06-30 09:41:45",
    bankName: "PT BANK RAKYAT INDONESIA (PERSERO) Tbk",
    accountOwner: "Nama Pemilik",
    accountNumber: "123123123",
  },
];

const columns: ColumnDef<BankAccount>[] = [
  {
    accessorKey: "createdDate",
    header: "Created Date",
    cell: ({ getValue }) => {
      const [date, time] = (getValue<string>() ?? "").split(" ");
      return (
        <div className="leading-tight">
          <div>{date}</div>
          <div>{time}</div>
        </div>
      );
    },
  },
  { accessorKey: "bankName", header: "Bank Name" },
  { accessorKey: "accountOwner", header: "Account Owner" },
  { accessorKey: "accountNumber", header: "Account Number" },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    enableSorting: false,
    cell: () => (
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Open actions"
                className="text-muted-foreground hover:text-foreground"
              />
            }
          >
            <MoreHorizontal className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pencil />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">
                <Trash2 />
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export function BanksPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-card-foreground"> Add Banks Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <FieldGroup className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="bankName">Bank Name</FieldLabel>
              <Input id="bankName" name="bankName" placeholder="Enter Bank Name" />
              <FieldDescription>Select the bank where your account is located</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="accountOwnerName">Account Owner Name</FieldLabel>
              <Input
                id="accountOwnerName"
                name="accountOwnerName"
                placeholder="Enter Account Owner Name"
              />
              <FieldDescription>Use the name as per your bank account</FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="accountNumber">Account Number</FieldLabel>
              <Input id="accountNumber" name="accountNumber" placeholder="12345678" />
              <FieldDescription>Only numbers, no spaces or other characters</FieldDescription>
            </Field>
          </FieldGroup>
          <div className="flex justify-end">
            <Button type="submit" size="lg"><PlusCircle size={20} />Add Bank</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg font-semibold text-card-foreground"><List size={20} /> List of Bank Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={bankAccounts} />
        </CardContent>
      </Card>
    </>
  );
}
