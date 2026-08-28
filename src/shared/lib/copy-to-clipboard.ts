import { toast } from "../ui/toast";

export async function copyToClipboard(textToCopy: string, toastTitle: string, toastDescription: string) {
    try {
        await navigator.clipboard.writeText(textToCopy);
        toast.add({
            title: toastTitle,
            description: toastDescription,
        })
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}