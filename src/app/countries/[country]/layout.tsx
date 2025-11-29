import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country } = await params;
  const countryName = decodeURIComponent(country).replace(/-/g, ' ');
  const capitalizedCountry = countryName.charAt(0).toUpperCase() + countryName.slice(1);

  return {
    title: `Hotels in ${capitalizedCountry} | Natlaupa`,
    description: `Discover luxury hotels and exclusive accommodations in ${capitalizedCountry}.`,
  };
}

export default function CountryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
