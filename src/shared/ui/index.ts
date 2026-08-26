// Public API — Shared layer, `ui` segment (FSD §4-2).
// Segmen pada layer sliceless punya public API per segmen, bukan satu index di root shared.
export {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from './avatar';
export { Button, buttonVariants } from './button';
export { Input } from './input';
export { Label } from './label';
export { Separator } from './separator';
export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet';
export { default as Silk, type SilkProps } from './silk';
