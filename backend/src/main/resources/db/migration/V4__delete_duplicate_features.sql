DELETE FROM public.feature f1
USING public.feature f2
WHERE f1.name = f2.name 
AND f1.id != f2.id
AND (f1.description IS NULL OR f1.description = '')
AND (f2.description IS NOT NULL AND f2.description != '');
