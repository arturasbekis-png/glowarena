export const CONTACT = {
  address: 'Kareivių g. 15A, Vilnius',
  phone: '+370 620 71992',
  email: 'rezervacija@auksma.lt',
};

export const MENU_ITEMS = [
  { number: '01', label: 'Apie areną', href: '#apie' },
  { number: '02', label: 'Kainos', href: '#kainos' },
  { number: '03', label: 'Renginiai', href: '#renginiai' },
  { number: '04', label: 'Galerija', href: '#galerija' },
  { number: '05', label: 'Kontaktai', href: '#kontaktai' },
  { number: '06', label: 'REZERVUOTI', href: '#kontaktai', cta: true },
];

export const PRICES = [
  {
    title: 'Aikštelės nuoma',
    desc: 'Beach tinklinio aikštelės rezervacija žaidimams ir treniruotėms.',
    price: 'Kaina pagal užklausą',
  },
  {
    title: 'Vaikų gimtadieniai',
    desc: 'Nepamirštami gimtadieniai smėlyje su žaidimais ir animatoriais.',
    price: 'Kaina pagal užklausą',
  },
  {
    title: 'Komandų renginiai',
    desc: 'Įmonių komandų sutelkimo dienos su turnyrais ir prizais.',
    price: 'Kaina pagal užklausą',
  },
  {
    title: 'Privatūs renginiai',
    desc: 'Uždaros šventės, gimtadieniai ir specialūs vakarai arenos atmosferoje.',
    price: 'Kaina pagal užklausą',
  },
];

export const EVENTS = [
  {
    number: '01',
    title: 'Vaikų gimtadieniai',
    desc: 'Šventė smėlyje su žaidimais, muzika ir neon šviesa — gimtadienis, kurio vaikai nepamirš.',
    mood: 'cyan' as const,
  },
  {
    number: '02',
    title: 'Komandų renginiai',
    desc: 'Komandos sutelkimas kitokiu formatu — smėlis, varžybos ir bendra energija vienoje vietoje.',
    mood: 'violet' as const,
  },
  {
    number: '03',
    title: 'Turnyrai',
    desc: 'Reguliarūs mėgėjų ir komandų turnyrai su prizais, žiūrovais ir arena atmosfera.',
    mood: 'magenta' as const,
  },
  {
    number: '04',
    title: 'Privatūs renginiai',
    desc: 'Uždaros šventės po neon šviesa — nuo korporatyvų iki specialių vakarų.',
    mood: 'mixed' as const,
  },
];

/**
 * Gallery slots — each uses the custom ArenaVisual with a different mood.
 * To add real arena photos later, replace the `type: 'visual'` entries with
 * `type: 'image', src: '/path/to/photo.jpg', alt: 'Description'`.
 */
export const GALLERY_ITEMS = [
  { type: 'visual' as const, mood: 'mixed' as const, span: 'lg:col-span-2 lg:row-span-2', label: 'Arena' },
  { type: 'visual' as const, mood: 'cyan' as const, span: '', label: 'Aikštelė' },
  { type: 'visual' as const, mood: 'magenta' as const, span: '', label: 'Šviesa' },
  { type: 'visual' as const, mood: 'violet' as const, span: 'lg:row-span-2', label: 'Tinklas' },
  { type: 'visual' as const, mood: 'cyan' as const, span: '', label: 'Smėlis' },
  { type: 'visual' as const, mood: 'mixed' as const, span: '', label: 'Energija' },
];
