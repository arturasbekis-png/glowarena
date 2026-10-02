-- Idempotently populate the existing English FAQ CMS fields.
UPDATE public.site_content
SET value = CASE key
    WHEN 'faq_reservation_question_en' THEN 'How do I book a court?'
    WHEN 'faq_reservation_answer_en' THEN 'Email rezervacija@auksma.lt or call +370 620 71992. We will arrange the booking based on the date, duration, and number of people.'
    WHEN 'faq_court_price_question_en' THEN 'How much does court rental cost?'
    WHEN 'faq_court_price_answer_en' THEN 'The price depends on the date, duration, format, and number of people. Contact the arena for an exact quote.'
    WHEN 'faq_kids_birthday_question_en' THEN 'Can we organize a children’s birthday party?'
    WHEN 'faq_kids_birthday_answer_en' THEN 'Yes. The arena is suited to active children’s birthday parties on the sand, with games and activities.'
    WHEN 'faq_company_event_question_en' THEN 'Can we organize a company event?'
    WHEN 'faq_company_event_answer_en' THEN 'Yes. You can organize an active company event with beach volleyball, team activities, and time on the sand.'
    WHEN 'faq_tournaments_question_en' THEN 'Are tournaments held?'
    WHEN 'faq_tournaments_answer_en' THEN 'Yes. GLOW BEACH ARENA is suited to tournaments and other competitions on the sand. Contact us to discuss the format and date.'
    WHEN 'faq_location_question_en' THEN 'Where is GLOW BEACH ARENA?'
    WHEN 'faq_location_answer_en' THEN 'Kareivių g. 15A, Vilnius. The address link in the Contact section opens the location in Google Maps.'
    ELSE value
END
WHERE key IN (
    'faq_reservation_question_en',
    'faq_reservation_answer_en',
    'faq_court_price_question_en',
    'faq_court_price_answer_en',
    'faq_kids_birthday_question_en',
    'faq_kids_birthday_answer_en',
    'faq_company_event_question_en',
    'faq_company_event_answer_en',
    'faq_tournaments_question_en',
    'faq_tournaments_answer_en',
    'faq_location_question_en',
    'faq_location_answer_en'
);
