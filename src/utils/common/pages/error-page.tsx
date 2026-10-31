import { H1, P } from '@/components/ui/typography';

export default function ErrorPage() {
  return (
    <div id="error-page" className="flex flex-col gap-1 p-4">
      <H1>Oops!</H1>
      <P>Sorry, an unexpected error has occurred.</P>
    </div>
  );
}
