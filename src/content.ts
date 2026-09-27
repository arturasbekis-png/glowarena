export const CONTACT = {
  address: 'Kareivių g. 15A, Vilnius',
  phone: '+370 620 71992',
  email: 'rezervacija@auksma.lt',
};

export const MENU_ITEMS = [
  { number: '01', label: 'Arena', href: '#apie' },
  { number: '02', label: 'Paslaugos', href: '#paslaugos' },
  { number: '03', label: 'Kainos', href: '#kainos' },
  { number: '04', label: 'Renginiai', href: '#renginiai' },
  { number: '05', label: 'Galerija', href: '#galerija' },
  { number: '06', label: 'Kontaktai', href: '#kontaktai' },
  { number: '07', label: 'REZERVUOTI', href: '#kontaktai', cta: true },
];

export const PRICES = [
  {
    title: 'Vaikų gimtadieniai',
    desc: 'Aktyvi šventė smėlyje su žaidimais ir pramogomis.',
    price: 'Kaina pagal užklausą',
  },
  {
    title: 'Įmonių šventės',
    desc: 'Aktyvus įmonės renginys smėlyje su sportu ir pramogomis.',
    price: 'Kaina pagal užklausą',
  },
];

export const EVENTS = [
  {
    number: '01',
    title: 'Vaikų gimtadieniai',
    desc: 'Aktyvi šventė smėlyje su žaidimais ir pramogomis.',
    mood: 'cyan' as const,
  },
  {
    number: '02',
    title: 'Įmonių šventės',
    desc: 'Kitoks įmonės renginys – sportas, smėlis ir gera atmosfera.',
    mood: 'violet' as const,
  },
  {
    number: '03',
    title: 'Turnyrai',
    desc: 'Varžybos ir renginiai smėlyje įvairioms grupėms.',
    mood: 'magenta' as const,
  },
];

/**
 * Gallery slots — realias nuotraukas įdėsime vėliau.
 */
export const GALLERY_ITEMS = [
  { type: 'visual' as const, mood: 'mixed' as const, span: 'lg:col-span-2 lg:row-span-2', label: 'Arena' },
  { type: 'visual' as const, mood: 'cyan' as const, span: '', label: 'Aikštelė' },
  { type: 'visual' as const, mood: 'magenta' as const, span: '', label: 'Šviesa' },
  { type: 'visual' as const, mood: 'violet' as const, span: 'lg:row-span-2', label: 'Tinklas' },
  { type: 'visual' as const, mood: 'cyan' as const, span: '', label: 'Smėlis' },
  { type: 'visual' as const, mood: 'mixed' as const, span: '', label: 'Arena' },
];
