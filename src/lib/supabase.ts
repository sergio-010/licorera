import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://fmjqovymanzrqpwtqtsi.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtanFvdnltYW56cnFwd3RxdHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDA2MjQsImV4cCI6MjA2Njc3NjYyNH0.DhsT0otw9w07oh93L0J9dcG02p1nrue2gt43xSxrbSs'
);
