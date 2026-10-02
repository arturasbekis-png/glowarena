import { supabase } from './lib/supabase';

type CmsRow = { key: string; value: string | null };
type JsonRecord = Record<string, unknown>;

const localizedTargets: Record<string, string[]> = {
  hero_description: ['.hero-lead'],
  arena_heading: ['#aboutTitle'],
  arena_lead: ['.about-text .lead'],
  arena_body: ['.about-text > p:not(.lead)'],
  arena_pillar_sand_title: ['.pillars > li:nth-child(1) h3'],
  arena_pillar_sand_description: ['.pillars > li:nth-child(1) p'],
  arena_pillar_light_title: ['.pillars > li:nth-child(2) h3'],
  arena_pillar_light_description: ['.pillars > li:nth-child(2) p'],
  arena_pillar_energy_title: ['.pillars > li:nth-child(3) h3'],
  arena_pillar_energy_description: ['.pillars > li:nth-child(3) p'],
  arena_pillar_events_title: ['.pillars > li:nth-child(4) h3'],
  arena_pillar_events_description: ['.pillars > li:nth-child(4) p'],
  children_title: ['#tab-kids > span', '.price-list .price-row:nth-child(1) h3'],
  children_description: ['#panel-kids .panel-desc'],
  prices_children_description: ['.price-list .price-row:nth-child(1) p'],
  events_heading: ['#formatsTitle'],
  events_intro: ['.formats .section-sub'],
  company_event_title: ['#tab-corp > span', '.price-list .price-row:nth-child(2) h3'],
  company_event_description: ['#panel-corp .panel-desc'],
  prices_company_description: ['.price-list .price-row:nth-child(2) p'],
  tournament_title: ['#tab-tour > span'],
  tournament_description: ['#panel-tour .panel-desc'],
  prices_heading: ['#pricesTitle'],
  prices_note: ['.prices-note'],
  price_label: ['.price-chip > span[data-i18n="price.label"]'],
  price_value_on_request: ['.price-chip strong'],
  price_on_request: ['.price-tag'],
  prices_cta: ['.prices-grid a.btn'],
  gallery_heading: ['#galleryTitle'],
  gallery_intro: ['.gallery .section-sub'],
  gallery_note: ['.gallery-note'],
  gallery_arena_label: ['.gallery-grid > li:nth-child(1) figcaption'],
  gallery_court_label: ['.gallery-grid > li:nth-child(2) figcaption'],
  gallery_light_label: ['.gallery-grid > li:nth-child(3) figcaption'],
  gallery_net_label: ['.gallery-grid > li:nth-child(4) figcaption'],
  gallery_sand_label: ['.gallery-grid > li:nth-child(5) figcaption'],
};

const faqBaseKeys = [
  'faq_reservation',
  'faq_court_price',
  'faq_kids_birthday',
  'faq_company_event',
  'faq_tournaments',
  'faq_location',
];

const localizedHeadFields = [
  ['seo_title', 'title'],
  ['seo_description', 'meta[name="description"]'],
  ['seo_og_title', 'meta[property="og:title"]'],
  ['seo_og_description', 'meta[property="og:description"]'],
  ['seo_twitter_title', 'meta[name="twitter:title"]'],
  ['seo_twitter_description', 'meta[name="twitter:description"]'],
] as const;

const rowsByKey = new Map<string, string>();
const originalHeadValues = new Map<string, string>();
const originalFaqFallbacks: Array<{ question: string; answer: string }> = [];
let originalSiteSchema: JsonRecord | null = null;
let cmsLoaded = false;

function isNonEmpty(value: string | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function currentLocale(): 'lt' | 'en' {
  return document.documentElement.lang.toLowerCase().startsWith('en') ? 'en' : 'lt';
}

function localizedValue(baseKey: string): string | undefined {
  return rowsByKey.get(baseKey + '_' + currentLocale());
}

function setSafeText(element: Element, value: string): void {
  const fragment = document.createDocumentFragment();
  const lines = value.split(/\r\n|\r|\n/);
  lines.forEach((line, index) => {
    if (index > 0) fragment.append(document.createElement('br'));
    fragment.append(document.createTextNode(line));
  });
  element.replaceChildren(fragment);
}

function setTrailingText(element: Element | null, value: string, prefix = ''): void {
  if (!element) return;
  const textNodes = Array.from(element.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
  const textNode = textNodes[textNodes.length - 1];
  if (!textNode) {
    element.append(document.createTextNode(prefix + value));
    return;
  }
  const previous = textNode.textContent ?? '';
  const leadingWhitespace = previous.match(/^\s*/)?.[0] ?? '';
  const trailingWhitespace = previous.match(/\s*$/)?.[0] ?? '';
  textNode.textContent = leadingWhitespace + prefix + value + trailingWhitespace;
}

function nonLocalizedValue(key: string): string | undefined {
  const value = rowsByKey.get(key);
  return isNonEmpty(value) ? value : undefined;
}

function normalizedPhone(value: string): string | null {
  if (!/^\+?[\d\s().-]+$/.test(value.trim())) return null;
  const normalized = value.trim().replace(/[^\d+]/g, '');
  return /^\+?\d+$/.test(normalized) ? normalized : null;
}

function normalizedEmail(value: string): string | null {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

function parseJsonLd(script: HTMLScriptElement | null): JsonRecord | null {
  if (!script) return null;
  try {
    const parsed: unknown = JSON.parse(script.textContent ?? '');
    return parsed && typeof parsed === 'object' ? (parsed as JsonRecord) : null;
  } catch {
    return null;
  }
}

function writeJsonLd(script: HTMLScriptElement | null, value: JsonRecord): void {
  if (!script) return;
  script.textContent = JSON.stringify(value).replace(/</g, '\\u003c');
}

function applyLocalizedText(): void {
  for (const [baseKey, selectors] of Object.entries(localizedTargets)) {
    const value = localizedValue(baseKey);
    if (!isNonEmpty(value)) continue;
    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach((element) => setSafeText(element, value));
    }
  }

  const faqItems = Array.from(document.querySelectorAll<HTMLElement>('.faq-list > .faq-item'));
  faqItems.forEach((item, index) => {
    const base = faqBaseKeys[index];
    if (!base) return;
    const summary = item.querySelector('summary');
    const answer = item.querySelector('.faq-answer');
    const questionValue = localizedValue(base + '_question');
    const answerValue = localizedValue(base + '_answer');
    if (summary && isNonEmpty(questionValue)) setSafeText(summary, questionValue);
    else if (summary && !isNonEmpty(questionValue)) setSafeText(summary, originalFaqFallbacks[index]?.question ?? '');
    if (answer && isNonEmpty(answerValue)) setSafeText(answer, answerValue);
    else if (answer && !isNonEmpty(answerValue)) setSafeText(answer, originalFaqFallbacks[index]?.answer ?? '');
  });
}

function applyHeadMetadata(): void {
  for (const [baseKey, selector] of localizedHeadFields) {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) continue;
    const value = localizedValue(baseKey);
    const fallback = originalHeadValues.get(selector) ?? '';
    if (element instanceof HTMLTitleElement) element.textContent = isNonEmpty(value) ? value : fallback;
    else element.setAttribute('content', isNonEmpty(value) ? value : fallback);
  }
}

function applyContactValues(): void {
  const phone = nonLocalizedValue('contact_phone');
  const email = nonLocalizedValue('contact_email');
  const street = nonLocalizedValue('contact_address_street');
  const locality = nonLocalizedValue('contact_address_locality');
  const address = [street, locality].filter(isNonEmpty).join(', ');
  const phoneLink = phone ? normalizedPhone(phone) : null;
  const emailLink = email ? normalizedEmail(email) : null;

  if (phone) {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="tel:"]').forEach((link) => {
      if (phoneLink) link.href = 'tel:' + phoneLink;
    });
    setTrailingText(document.querySelector('.hero-ctas a[href^="tel:"]'), phone);
    document.querySelectorAll('.contact-list a[href^="tel:"] .cr-value').forEach((element) => setSafeText(element, phone));

    const legalPhone = document.querySelector('.rekvizitai p:nth-of-type(6)');
    if (legalPhone) setSafeText(legalPhone, '📞 ' + phone);
  }
  if (email) {
    document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((link) => {
      if (emailLink) link.href = 'mailto:' + emailLink;
    });
    document.querySelectorAll('.contact-list a[href^="mailto:"] .cr-value').forEach((element) => setSafeText(element, email));
    const legalEmail = document.querySelector('.rekvizitai p:nth-of-type(7)');
    if (legalEmail) setSafeText(legalEmail, '✉️ ' + email);
  }
  if (address) {
    const addressLink = document.querySelector<HTMLAnchorElement>('.contact-list a[href^="https://www.google.com/maps"]');
    if (addressLink) addressLink.href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
    const visibleAddress = document.querySelector('.contact-list .cr-value');
    if (visibleAddress) setSafeText(visibleAddress, address);
    setSafeText(document.querySelector('.site-footer .footer-inner > p:first-of-type') ?? document.createElement('span'), address);
    setTrailingText(document.querySelector('.hero-kicker'), address);
  }

  const legalName = nonLocalizedValue('contact_legal_name');
  const companyCode = nonLocalizedValue('contact_company_code');
  const bankName = nonLocalizedValue('contact_bank_name');
  const bankAccount = nonLocalizedValue('contact_bank_account');
  if (legalName) setSafeText(document.querySelector('.rekvizitai p:nth-of-type(1) strong') ?? document.createElement('span'), legalName);
  if (companyCode) setTrailingText(document.querySelector('.rekvizitai p:nth-of-type(2)'), companyCode);
  if (bankName) setSafeText(document.querySelector('.rekvizitai p:nth-of-type(3)') ?? document.createElement('span'), bankName);
  if (bankAccount) setTrailingText(document.querySelector('.rekvizitai p:nth-of-type(4)'), bankAccount);

  const siteSchema = originalSiteSchema ? structuredClone(originalSiteSchema) : null;
  if (siteSchema && Array.isArray(siteSchema['@graph'])) {
    for (const item of siteSchema['@graph']) {
      if (!item || typeof item !== 'object') continue;
      const entity = item as JsonRecord;
      if ((entity['@type'] === 'SportsActivityLocation' || entity['@type'] === 'Organization') && phone) entity.telephone = phone;
      if ((entity['@type'] === 'SportsActivityLocation' || entity['@type'] === 'Organization') && email) entity.email = email;
      if (entity['@type'] === 'SportsActivityLocation') {
        const description = localizedValue('seo_description');
        if (isNonEmpty(description)) entity.description = description;
        const entityAddress = entity.address as JsonRecord | undefined;
        if (entityAddress) {
          if (street) entityAddress.streetAddress = street;
          if (locality) entityAddress.addressLocality = locality;
        }
      }
    }
    writeJsonLd(document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]:not(#faq-schema)'), siteSchema);
  }
}

function applyFaqSchema(): void {
  const entities = Array.from(document.querySelectorAll<HTMLElement>('.faq-list > .faq-item')).map((item) => ({
    '@type': 'Question',
    name: item.querySelector('summary')?.textContent?.trim() ?? '',
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.querySelector('.faq-answer')?.textContent?.trim() ?? '',
    },
  }));
  const faqSchema: JsonRecord = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entities,
  };
  writeJsonLd(document.querySelector<HTMLScriptElement>('#faq-schema'), faqSchema);
}

function applyCmsContent(): void {
  if (!cmsLoaded) return;
  applyLocalizedText();
  applyHeadMetadata();
  applyContactValues();
  applyFaqSchema();
}

async function loadCmsContent(): Promise<void> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('key,value')
      .abortSignal(controller.signal);
    if (error || !data) return;
    for (const row of data as CmsRow[]) {
      if (typeof row.key === 'string' && typeof row.value === 'string') rowsByKey.set(row.key, row.value);
    }
    cmsLoaded = true;
    applyCmsContent();
  } catch {
    // Keep the static page visible and usable when the public CMS cannot be reached.
  } finally {
    window.clearTimeout(timeout);
  }
}

const faqItemsAtBoot = Array.from(document.querySelectorAll<HTMLElement>('.faq-list > .faq-item'));
faqItemsAtBoot.forEach((item) => {
  originalFaqFallbacks.push({
    question: item.querySelector('summary')?.textContent ?? '',
    answer: item.querySelector('.faq-answer')?.textContent ?? '',
  });
});
for (const [, selector] of localizedHeadFields) {
  const element = document.querySelector<HTMLElement>(selector);
  if (!element) continue;
  originalHeadValues.set(selector, element instanceof HTMLTitleElement ? element.textContent ?? '' : element.getAttribute('content') ?? '');
}
originalSiteSchema = parseJsonLd(document.querySelector<HTMLScriptElement>('script[type="application/ld+json"]:not(#faq-schema)'));

const languageObserver = new MutationObserver(() => applyCmsContent());
languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
void loadCmsContent();