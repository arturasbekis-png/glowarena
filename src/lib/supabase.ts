import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://stqmsfdywbtjmbllwquq.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_RzaIrQYAkoKPblpjDjs2qA_BmguTy_6';

export const supabase = createClient(supabaseUrl, supabaseKey);
