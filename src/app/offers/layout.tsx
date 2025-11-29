import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'All Offers | Natlaupa',
  description: 'Explore our curated collection of luxury hotels and unique accommodations worldwide.',
};

export default function OffersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
