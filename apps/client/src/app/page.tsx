import Link from 'next/link';
import { Button, buttonVariants } from './components/ui/Button';

export default function Index() {
  return (
    <div>
      <Link
        href={'/market-data'}
        className={buttonVariants({ variant: 'outline' })}
      >
        Market Data
      </Link>
    </div>
  );
}
