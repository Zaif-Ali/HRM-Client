import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { H1, P } from '@/components/ui/typography';

export default function ErrorPage() {
  return (
    <section className="flex min-h-dvh items-center justify-center p-4">
      <div className="flex max-w-[70ch] flex-col gap-4">
        <div className="flex flex-col gap-1">
          <H1>Something went wrong</H1>
          <P>This page failed to load. Go home and try again.</P>
        </div>
        <Button asChild>
          <Link to="/">Go home</Link>
        </Button>
      </div>
    </section>
  );
}
