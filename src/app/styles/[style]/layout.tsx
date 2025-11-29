import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ style: string }> }): Promise<Metadata> {
  const { style } = await params;
  const styleName = decodeURIComponent(style).replace(/-/g, ' ');
  const capitalizedStyle = styleName.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  return {
    title: `${capitalizedStyle} | Natlaupa`,
    description: `Explore our collection of ${capitalizedStyle}. Luxury accommodations curated for discerning travelers.`,
  };
}

export default function StyleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
