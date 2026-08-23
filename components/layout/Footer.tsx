import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/visuals/Wordmark";
import { footer } from "@/content/site";

/** Full-width #0B0C0E band: wordmark + four link columns, then the entity strip. */
export function Footer() {
  return (
    <footer className="bg-night text-white">
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div>
            <Wordmark onDark height={44} className="lg:!h-[54px]" />
          </div>

          {/* Reference pitches the four columns ~180px apart, right-aligned. */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-12 sm:grid-cols-4 lg:w-[720px] lg:shrink-0 lg:gap-x-0">
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[15px] font-medium text-white/45">{column.title}</h2>
              <ul className="mt-6 flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-white/90 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 text-[14px] leading-[1.9] text-white/70 sm:grid-cols-2 lg:mt-24">
          {footer.entities.map((e) => (
            <div key={e.region}>
              <p>
                {e.region}: {e.name}
              </p>
              <p>{e.address}</p>
              <p>{e.registration}</p>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}
