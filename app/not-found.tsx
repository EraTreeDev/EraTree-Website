import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container>
      <div className="mx-auto max-w-[560px] py-28 text-center lg:py-40">
        <p className="text-eyebrow font-semibold uppercase text-emerald">404</p>
        <h1 className="mt-4 text-[clamp(2rem,4.2vw,3rem)] font-medium leading-[1.1] tracking-[-0.02em] text-ink">
          That page isn&apos;t here
        </h1>
        <p className="mt-4 text-[16px] leading-[1.6] text-muted">
          The link may be out of date. Head back to the homepage, or speak to our trading team.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Back to home</Button>
          <Button href="/contact" variant="outline">
            Contact us
          </Button>
        </div>
      </div>
    </Container>
  );
}
