import { createClient, type Session } from '@supabase/supabase-js';

const ADMIN_USER_ID = '70bd204a-3dcd-4153-adfb-b04f2bf2d6a6';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const loginPanel = document.querySelector<HTMLElement>('#login-panel')!;
const loginForm = document.querySelector<HTMLFormElement>('#login-form')!;
const emailInput = document.querySelector<HTMLInputElement>('#email')!;
const passwordInput = document.querySelector<HTMLInputElement>('#password')!;
const loginButton = document.querySelector<HTMLButtonElement>('#login-button')!;
const loginStatus = document.querySelector<HTMLElement>('#login-status')!;
const accessDenied = document.querySelector<HTMLElement>('#access-denied')!;
const editor = document.querySelector<HTMLElement>('#editor')!;
const entries = document.querySelector<HTMLElement>('#entries')!;
const saveButton = document.querySelector<HTMLButtonElement>('#save-button')!;
const status = document.querySelector<HTMLElement>('#status')!;
const logoutButton = document.querySelector<HTMLButtonElement>('#logout-button')!;

type ContentRow = { id: number | string; key: string; value: string | null };
type PairDefinition = { root: string; label: string; multiline?: boolean };
type SharedFieldDefinition = {
  key: string;
  label: string;
  multiline?: boolean;
  inputType?: 'text' | 'tel' | 'email';
};
type CmsGroup = { title: string; pairs?: PairDefinition[]; fields?: SharedFieldDefinition[]; faq?: boolean };
type CmsSection = { title: string; groups: CmsGroup[] };

const pair = (root: string, label: string, multiline = false): PairDefinition => ({
  root,
  label,
  multiline,
});

const cmsSections: CmsSection[] = [
  { title: 'HERO', groups: [{ title: 'Pagrindinis tekstas', pairs: [pair('hero_description', 'Hero tekstas', true)] }] },
  {
    title: 'ARENA',
    groups: [
      { title: 'Aprašymas', pairs: [pair('arena_heading', 'Antraštė', true), pair('arena_lead', 'Pagrindinis aprašymas', true), pair('arena_body', 'Papildomas aprašymas', true)] },
      { title: 'Pillar: Smėlis', pairs: [pair('arena_pillar_sand_title', 'Pavadinimas'), pair('arena_pillar_sand_description', 'Aprašymas')] },
      { title: 'Pillar: Šviesa', pairs: [pair('arena_pillar_light_title', 'Pavadinimas'), pair('arena_pillar_light_description', 'Aprašymas')] },
      { title: 'Pillar: Energija', pairs: [pair('arena_pillar_energy_title', 'Pavadinimas'), pair('arena_pillar_energy_description', 'Aprašymas')] },
      { title: 'Pillar: Renginiai', pairs: [pair('arena_pillar_events_title', 'Pavadinimas'), pair('arena_pillar_events_description', 'Aprašymas')] },
    ],
  },
  {
    title: 'VAIKŲ GIMTADIENIAI',
    groups: [{ title: 'Aprašymas', pairs: [pair('children_title', 'Antraštė'), pair('children_description', 'Aprašymas', true), pair('prices_children_description', 'Aprašymas kainų skiltyje', true)] }],
  },
  {
    title: 'RENGINIAI',
    groups: [
      { title: 'Renginių aprašymas', pairs: [pair('events_heading', 'Antraštė', true), pair('events_intro', 'Įžanginis tekstas', true)] },
      { title: 'Įmonių renginiai', pairs: [pair('company_event_title', 'Antraštė'), pair('company_event_description', 'Aprašymas', true), pair('prices_company_description', 'Aprašymas kainų skiltyje', true)] },
    ],
  },
  {
    title: 'TURNYRAI',
    groups: [{ title: 'Aprašymas', pairs: [pair('tournament_title', 'Antraštė'), pair('tournament_description', 'Aprašymas', true)] }],
  },
  {
    title: 'KAINOS',
    groups: [{ title: 'Tekstai ir kainų žymos', pairs: [pair('prices_heading', 'Antraštė'), pair('prices_note', 'Pastaba', true), pair('price_label', 'Kainos žyma'), pair('price_value_on_request', 'Reikšmė „pagal užklausą“'), pair('price_on_request', 'Visas tekstas „kaina pagal užklausą“'), pair('prices_cta', 'Mygtuko tekstas')] }],
  },
  {
    title: 'GALERIJA',
    groups: [
      { title: 'Galerijos tekstai', pairs: [pair('gallery_heading', 'Antraštė', true), pair('gallery_intro', 'Įžanginis tekstas', true), pair('gallery_note', 'Pastaba', true)] },
      { title: 'Kortelių pavadinimai', pairs: [pair('gallery_arena_label', 'Arena'), pair('gallery_court_label', 'Aikštelė'), pair('gallery_light_label', 'Šviesa'), pair('gallery_net_label', 'Tinklas'), pair('gallery_sand_label', 'Smėlis')] },
    ],
  },
  {
    title: 'DUK',
    groups: [
      { title: '1. Rezervacija', faq: true, pairs: [pair('faq_reservation_question', 'Klausimas'), pair('faq_reservation_answer', 'Atsakymas', true)] },
      { title: '2. Aikštelės kaina', faq: true, pairs: [pair('faq_court_price_question', 'Klausimas'), pair('faq_court_price_answer', 'Atsakymas', true)] },
      { title: '3. Vaikų gimtadienis', faq: true, pairs: [pair('faq_kids_birthday_question', 'Klausimas'), pair('faq_kids_birthday_answer', 'Atsakymas', true)] },
      { title: '4. Įmonės renginys', faq: true, pairs: [pair('faq_company_event_question', 'Klausimas'), pair('faq_company_event_answer', 'Atsakymas', true)] },
      { title: '5. Turnyrai', faq: true, pairs: [pair('faq_tournaments_question', 'Klausimas'), pair('faq_tournaments_answer', 'Atsakymas', true)] },
      { title: '6. Vieta', faq: true, pairs: [pair('faq_location_question', 'Klausimas'), pair('faq_location_answer', 'Atsakymas', true)] },
    ],
  },
  {
    title: 'KONTAKTAI',
    groups: [
      { title: 'Kontaktinė informacija', fields: [{ key: 'contact_phone', label: 'Telefonas', inputType: 'tel' }, { key: 'contact_email', label: 'El. paštas', inputType: 'email' }, { key: 'contact_address_street', label: 'Gatvė ir numeris' }, { key: 'contact_address_locality', label: 'Miestas' }] },
      { title: 'Juridiniai duomenys', fields: [{ key: 'contact_legal_name', label: 'Juridinio asmens pavadinimas', multiline: true }, { key: 'contact_company_code', label: 'Įmonės kodas' }] },
      { title: 'Banko duomenys', fields: [{ key: 'contact_bank_name', label: 'Bankas' }, { key: 'contact_bank_account', label: 'Banko sąskaita (IBAN)' }] },
    ],
  },
  {
    title: 'SEO',
    groups: [
      { title: 'Puslapio meta duomenys', pairs: [pair('seo_title', 'Puslapio pavadinimas'), pair('seo_description', 'Meta aprašymas', true)] },
      { title: 'Open Graph', pairs: [pair('seo_og_title', 'OG pavadinimas'), pair('seo_og_description', 'OG aprašymas', true)] },
      { title: 'Twitter / X', pairs: [pair('seo_twitter_title', 'Twitter / X pavadinimas'), pair('seo_twitter_description', 'Twitter / X aprašymas', true)] },
    ],
  },
];

if (!supabaseUrl || !supabaseKey || !supabaseKey.startsWith('sb_publishable_')) {
  loginStatus.textContent = 'Administratoriaus Supabase konfigūracija nepasiekiama.';
  loginButton.disabled = true;
  throw new Error('Missing Supabase URL or publishable key.');
}

const supabase = createClient(supabaseUrl, supabaseKey);
let rows: ContentRow[] = [];
let activeAdminId: string | null = null;
let loadSequence = 0;
let bindings: Array<{ row: ContentRow; control: HTMLInputElement | HTMLTextAreaElement }> = [];

function getExpectedKeys(): string[] {
  return cmsSections.flatMap((section) =>
    section.groups.flatMap((group) => [
      ...(group.pairs ?? []).flatMap(({ root }) => [root + '_lt', root + '_en']),
      ...(group.fields ?? []).map(({ key }) => key),
    ]),
  );
}

function showSignedOut(message = '') {
  activeAdminId = null;
  rows = [];
  bindings = [];
  entries.replaceChildren();
  loginPanel.hidden = false;
  accessDenied.hidden = true;
  editor.hidden = true;
  logoutButton.hidden = true;
  loginStatus.textContent = message;
  status.textContent = '';
}

function getUniqueRow(key: string): ContentRow | undefined {
  const matches = rows.filter((row) => row.key === key);
  return matches.length === 1 ? matches[0] : undefined;
}

function createField(
  key: string,
  labelText: string,
  multiline: boolean,
  row: ContentRow | undefined,
  inputType: SharedFieldDefinition['inputType'] = 'text',
): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'language-field';
  const control: HTMLInputElement | HTMLTextAreaElement = multiline
    ? document.createElement('textarea')
    : document.createElement('input');
  const label = document.createElement('label');
  const fieldId = 'content-' + bindings.length + '-' + key;

  label.htmlFor = fieldId;
  label.textContent = labelText;
  control.id = fieldId;
  control.value = row?.value ?? '';

  if (control instanceof HTMLInputElement) control.type = inputType ?? 'text';

  if (row) {
    bindings.push({ row, control });
  } else {
    control.disabled = true;
    control.classList.add('field--unavailable');
    const hint = document.createElement('small');
    hint.className = 'field-hint';
    hint.append(document.createTextNode('Nepasiekiama — DB eilutės nėra arba rastas pasikartojantis raktas: '));
    const code = document.createElement('code');
    code.textContent = key;
    hint.append(code);
    wrapper.append(label, control, hint);
    return wrapper;
  }

  wrapper.append(label, control);
  return wrapper;
}

function createPair(definition: PairDefinition): HTMLElement {
  const pairElement = document.createElement('div');
  pairElement.className = 'language-pair';
  const ltKey = definition.root + '_lt';
  const enKey = definition.root + '_en';
  pairElement.append(
    createField(ltKey, definition.label + ' — Lietuvių (LT)', definition.multiline ?? false, getUniqueRow(ltKey)),
    createField(enKey, definition.label + ' — English (EN)', definition.multiline ?? false, getUniqueRow(enKey)),
  );
  return pairElement;
}

function renderGroup(group: CmsGroup): HTMLElement {
  const fieldset = document.createElement('fieldset');
  fieldset.className = group.faq ? 'cms-group faq-item' : 'cms-group';
  const legend = document.createElement('legend');
  legend.textContent = group.title;
  fieldset.append(legend);

  for (const definition of group.pairs ?? []) fieldset.append(createPair(definition));

  if (group.fields?.length) {
    const fieldGrid = document.createElement('div');
    fieldGrid.className = 'shared-fields';
    for (const field of group.fields) {
      fieldGrid.append(createField(field.key, field.label, field.multiline ?? false, getUniqueRow(field.key), field.inputType));
    }
    fieldset.append(fieldGrid);
  }
  return fieldset;
}

function renderRows(): number {
  bindings = [];
  const fragment = document.createDocumentFragment();
  const expectedKeys = getExpectedKeys();
  const expectedSet = new Set(expectedKeys);

  for (const definition of cmsSections) {
    const section = document.createElement('section');
    section.className = 'cms-section';
    const heading = document.createElement('h3');
    heading.textContent = definition.title;
    section.append(heading);
    for (const group of definition.groups) section.append(renderGroup(group));
    fragment.append(section);
  }

  const legacyRows = rows.filter((row) => !expectedSet.has(row.key));
  const legacyDetails = document.createElement('details');
  const legacySummary = document.createElement('summary');
  legacySummary.textContent = 'LEGACY / TEST — seni arba CMS struktūrai nepriskirti įrašai (' + legacyRows.length + ')';
  legacyDetails.append(legacySummary);

  const legacyNote = document.createElement('p');
  legacyNote.className = 'legacy-note';
  legacyNote.textContent = 'Šie įrašai nėra naujo CMS turinio laukai. Jie palikti atskirai ir neįtraukiami į aukščiau esančias CMS skiltis.';
  legacyDetails.append(legacyNote);

  for (const row of legacyRows) {
    const control = createField(row.key, 'LEGACY / TEST — ' + row.key, (row.value ?? '').length > 120, row);
    control.classList.add('row');
    legacyDetails.append(control);
  }

  const legacySection = document.createElement('section');
  legacySection.className = 'cms-section';
  legacySection.append(legacyDetails);
  fragment.append(legacySection);
  entries.replaceChildren(fragment);
  return expectedKeys.filter((key) => !getUniqueRow(key)).length;
}

async function loadRows() {
  const sequence = ++loadSequence;
  status.textContent = 'Kraunami duomenys...';
  const { data, error } = await supabase
    .from('site_content')
    .select('id,key,value')
    .order('id', { ascending: true });

  if (sequence !== loadSequence) return;
  if (error) {
    status.textContent = 'Nepavyko užkrauti duomenų: ' + error.message;
    return;
  }

  rows = (data ?? []) as ContentRow[];
  const missingCount = renderRows();
  status.textContent = missingCount
    ? 'Duomenys užkrauti. CMS laukų dar nėra: ' + missingCount + '. Trūkstami laukai rodomi kaip nepasiekiami.'
    : 'Duomenys užkrauti.';
}

async function handleSession(session: Session | null) {
  const user = session?.user;
  if (!user) {
    loadSequence++;
    showSignedOut();
    return;
  }

  loginPanel.hidden = true;
  logoutButton.hidden = false;
  if (user.id !== ADMIN_USER_ID) {
    loadSequence++;
    activeAdminId = null;
    rows = [];
    bindings = [];
    entries.replaceChildren();
    editor.hidden = true;
    accessDenied.hidden = false;
    status.textContent = '';
    loginStatus.textContent = '';
    return;
  }

  accessDenied.hidden = true;
  editor.hidden = false;
  loginStatus.textContent = '';
  if (activeAdminId !== user.id) {
    activeAdminId = user.id;
    await loadRows();
  }
}

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginButton.disabled = true;
  loginStatus.textContent = 'Jungiamasi...';
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput.value.trim(),
      password: passwordInput.value,
    });
    if (error) {
      loginStatus.textContent = 'Prisijungti nepavyko: ' + error.message;
      return;
    }
    passwordInput.value = '';
    await handleSession(data.session);
  } catch {
    loginStatus.textContent = 'Prisijungti nepavyko. Patikrinkite ryšį ir bandykite dar kartą.';
  } finally {
    loginButton.disabled = false;
  }
});

saveButton.addEventListener('click', async () => {
  if (!activeAdminId) return;
  const current = await supabase.auth.getUser();
  if (current.error || current.data.user?.id !== ADMIN_USER_ID) {
    await handleSession(null);
    return;
  }

  const edits = bindings.flatMap(({ row, control }) => {
    const value = control.value;
    return value !== (row.value ?? '') ? [{ row, value }] : [];
  });
  if (!edits.length) {
    status.textContent = 'Pakeitimų nėra.';
    return;
  }

  if (
    edits.some(({ row }) => row.key === 'contact_bank_account') &&
    !window.confirm('Keičiate banko sąskaitą. Ar tikrai norite išsaugoti naują IBAN?')
  ) {
    status.textContent = 'Banko sąskaitos pakeitimas neišsaugotas.';
    return;
  }

  saveButton.disabled = true;
  status.textContent = 'Saugoma...';
  try {
    for (const edit of edits) {
      const { error } = await supabase
        .from('site_content')
        .update({ value: edit.value })
        .eq('id', edit.row.id);
      if (error) {
        status.textContent = 'Klaida saugant „' + edit.row.key + '“: ' + error.message;
        return;
      }
      edit.row.value = edit.value;
    }
    status.textContent = 'Išsaugota. Pakeista įrašų: ' + edits.length + '.';
  } catch {
    status.textContent = 'Išsaugoti nepavyko. Patikrinkite ryšį ir bandykite dar kartą.';
  } finally {
    saveButton.disabled = false;
  }
});

logoutButton.addEventListener('click', async () => {
  logoutButton.disabled = true;
  const { error } = await supabase.auth.signOut();
  if (error) {
    status.textContent = 'Atsijungti nepavyko: ' + error.message;
  } else {
    showSignedOut('Atsijungta.');
  }
  logoutButton.disabled = false;
});

supabase.auth.onAuthStateChange((_event, session) => {
  window.setTimeout(() => void handleSession(session), 0);
});

async function initializeAdmin() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
  if (sessionError) {
    showSignedOut('Nepavyko patikrinti sesijos: ' + sessionError.message);
  } else {
    await handleSession(sessionData.session);
  }
}

void initializeAdmin();