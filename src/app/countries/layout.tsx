import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Countries | Natlaupa',
  description: 'Browse luxury hotels and accommodations by country. Find your perfect destination.',
};

export default function CountriesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
