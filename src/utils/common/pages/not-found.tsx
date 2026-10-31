import { ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { H1, P } from '@/components/ui/typography';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-dvh items-center justify-center p-4">
      <div className="flex max-w-[70ch] flex-col gap-4">
        <div className="flex flex-col gap-1">
          <H1>We can’t find that page</H1>
          <P>That page does not exist, or it was moved.</P>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <ArrowLeft />
            Go back
          </Button>
          <Button asChild>
            <Link to="/">Go home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
