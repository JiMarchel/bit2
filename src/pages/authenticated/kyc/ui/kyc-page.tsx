import { useState } from "react";
import { Badge, ImageDropzone, Label } from "@/shared/ui";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export function KycPage() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-lg font-semibold text-card-foreground">
          Document
        </CardTitle>
        <CardAction>
          <Badge
            className={
              file
                ? "bg-emerald-600 text-white hover:bg-emerald-600"
                : "bg-muted text-muted-foreground hover:bg-muted"
            }
          >
            {file ? "Document Accepted" : "Document Pending"}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-2">
        <Label htmlFor="ktp">
          Upload KTP <span className="text-destructive">*</span>
        </Label>
        <ImageDropzone onChange={setFile} />
        <p className="text-xs text-muted-foreground">Format: JPG, JPEG, PNG.</p>
      </CardContent>
    </Card>
  );
}
