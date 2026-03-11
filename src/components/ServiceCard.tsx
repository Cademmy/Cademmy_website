import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  summary: string;
};

export function ServiceCard({ slug, name, summary }: Props) {
  return (
    <article className="card service-card">
      <h3>{name}</h3>
      <p>{summary}</p>
      <Link href={`/servicios/${slug}`} className="text-link">
        Ver servicio
      </Link>
    </article>
  );
}
