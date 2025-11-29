import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Styles | Natlaupa',
  description: 'Browse luxury hotels by accommodation style. From eco-lodges to historic castles, find your perfect stay.',
};

export default function StylesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
