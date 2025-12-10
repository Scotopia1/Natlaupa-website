// Map destinations for the About page interactive globe
export interface MapDestination {
  id: number;
  name: string;
  country: string;
  lat: number;
  lng: number;
  story: string;
}

export const MAP_DESTINATIONS: MapDestination[] = [
  { id: 1, name: 'Santorini', country: 'Greece', lat: 36.3932, lng: 25.4615, story: 'Where whitewashed villas meet endless azure horizons.' },
  { id: 2, name: 'Kyoto', country: 'Japan', lat: 35.0116, lng: 135.7681, story: 'Ancient temples whisper stories of timeless elegance.' },
  { id: 3, name: 'Maldives', country: 'Indian Ocean', lat: 3.2028, lng: 73.2207, story: 'Overwater sanctuaries floating on crystalline dreams.' },
  { id: 4, name: 'Tuscany', country: 'Italy', lat: 43.7696, lng: 11.2558, story: 'Rolling vineyards and Renaissance grandeur intertwined.' },
  { id: 5, name: 'Bora Bora', country: 'French Polynesia', lat: -16.5004, lng: -151.7415, story: 'Paradise perfected in turquoise lagoons.' },
  { id: 6, name: 'Swiss Alps', country: 'Switzerland', lat: 46.8182, lng: 8.2275, story: 'Majestic peaks where luxury meets adventure.' },
  { id: 7, name: 'Marrakech', country: 'Morocco', lat: 31.6295, lng: -7.9811, story: 'Exotic riads hidden within ancient medina walls.' },
  { id: 8, name: 'Patagonia', country: 'Argentina', lat: -50.0, lng: -72.0, story: 'Untamed wilderness at the edge of the world.' },
  { id: 9, name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lng: -21.9426, story: 'Where fire and ice create otherworldly beauty.' },
  { id: 10, name: 'Cape Town', country: 'South Africa', lat: -33.9249, lng: 18.4241, story: 'Where mountains embrace the meeting of two oceans.' },
];

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const FOOTER_LINKS = {
  explore: [
    { name: 'All Offers', path: '/offers' },
    { name: 'Countries', path: '/countries' },
    { name: 'Styles', path: '/styles' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ],
  programs: [
    { name: 'For Hotels', path: '/for-hotels' },
    { name: 'Become an Angel', path: '/become-angel' },
  ],
};
