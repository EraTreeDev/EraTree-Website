import { Reveal } from "@/components/ui/Reveal";

export type ListItem = { title: string; body: string };

/** Right-hand column of the dark sticky sections: items split by thin dividers. */
export function DarkList({ items }: { items: readonly ListItem[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => (
        <Reveal as="li" key={item.title} delay={i * 0.06}>
          <div className="border-b border-white/12 py-6 first:pt-0">
            <h3 className="text-[19px] font-medium tracking-[-0.01em] text-white">{item.title}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-white/60">{item.body}</p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
