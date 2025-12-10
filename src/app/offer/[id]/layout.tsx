import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await fetch(`${API_URL}/hotels/${id}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return {
        title: 'Offer Not Found',
        description: 'The requested offer could not be found.',
      };
    }

    const data = await response.json();
    const hotel = data.data;

    if (!hotel) {
      return {
        title: 'Offer Not Found',
        description: 'The requested offer could not be found.',
      };
    }

    return {
      title: hotel.name,
      description: hotel.description || `Experience luxury at ${hotel.name} in ${hotel.location || hotel.address}. Book your exclusive stay with Natlaupa.`,
      openGraph: {
        title: `${hotel.name} | Natlaupa`,
        description: hotel.description || `Experience luxury at ${hotel.name} in ${hotel.location || hotel.address}.`,
        url: `https://www.natlaupa.com/offer/${id}`,
        images: hotel.imageUrl || hotel.mainImage ? [{ url: hotel.imageUrl || hotel.mainImage, alt: hotel.name }] : [],
      },
      alternates: {
        canonical: `https://www.natlaupa.com/offer/${id}`,
      },
    };
  } catch (error) {
    console.error('Error fetching hotel for metadata:', error);
    return {
      title: 'Offer Not Found',
      description: 'The requested offer could not be found.',
    };
  }
}

export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
