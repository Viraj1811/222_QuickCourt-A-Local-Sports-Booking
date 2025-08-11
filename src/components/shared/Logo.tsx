import Link from 'next/link';
import { Gamepad2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 text-2xl font-bold text-primary", className)}>
      <Gamepad2 className="h-8 w-8" />
      <span className="font-headline">CourtLink</span>
    </Link>
  );
}
