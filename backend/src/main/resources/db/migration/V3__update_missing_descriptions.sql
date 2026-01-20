-- Update Ladino (Rogue) Abilities
UPDATE public.class_abilities 
SET description = 'Quando você atinge um alvo desprevenido ou flanqueado com um ataque corpo-a-corpo (ou à distância até 9m), você causa +1d6 pontos de dano adicional. A cada dois níveis seguintes, esse dano aumenta em +1d6 (2d6 no 3º, 3d6 no 5º etc.). Criaturas imunes a acertos críticos são imunes a ataques furtivos.'
WHERE name = 'Ataque Furtivo' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você pode usar a perícia Percepção para encontrar armadilhas com CD superior a 20. Você recebe +4 em testes de Percepção para encontrar armadilhas e testes de Ladinagem para desativá-las.'
WHERE name = 'Encontrar Armadilhas' AND description = '';

UPDATE public.class_abilities 
SET description = 'Quando você sofre um ataque que permite um teste de Reflexos para reduzir o dano à metade, você não sofre nenhum dano se for bem-sucedido. Você ainda sofre dano normal se falhar. Você deve estar usando armadura leve ou nenhuma.'
WHERE name = 'Evasão' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você recebe +1 na CA e testes de Reflexos contra armadilhas. A cada três níveis, esse bônus aumenta em +1.'
WHERE name = 'Sentir Armadilhas' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você nunca fica desprevenido.'
WHERE name = 'Esquiva Sobrenatural' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você não pode ser flanqueado.'
WHERE name = 'Esquiva Sobrenatural Aprimorada' AND description = '';

UPDATE public.class_abilities 
SET description = 'Quando você sofre um ataque que permite um teste de Reflexos para reduzir o dano à metade, você não sofre nenhum dano se for bem-sucedido e apenas metade do dano se falhar.'
WHERE name = 'Evasão Aprimorada' AND description = '';

-- Update Monge (Monk) Abilities
UPDATE public.class_abilities 
SET description = 'Você soma seu modificador de Sabedoria à CA. A cada cinco níveis, recebe +1 na CA.'
WHERE name = 'Sexto Sentido' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você recebe um talento de combate adicional.'
WHERE name = 'Técnica de Luta' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você recebe +3m de deslocamento. A cada três níveis, esse bônus aumenta em +3m.'
WHERE name = 'Movimento Rápido' AND description = '';

UPDATE public.class_abilities 
SET description = 'Seus ataques desarmados contam como armas mágicas para vencer redução de dano. No 10º nível, contam como ordem e, no 16º, como adamante.'
WHERE name = 'Ataque Chi' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você recebe +5 em testes de Acrobacia e Atletismo. No 9º nível, o bônus aumenta para +10 e no 14º nível para +15.'
WHERE name = 'Movimento Ágil' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você pode curar a si mesmo um número de PV igual a seu nível x 2 por dia.'
WHERE name = 'Integridade Corporal' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você se torna imune a venenos.'
WHERE name = 'Corpo de Diamante' AND description = '';

UPDATE public.class_abilities 
SET description = 'Uma vez por dia, pode fazer um ataque que obriga o alvo a um teste de Fortitude (CD 10 + 1/2 nível + Sab) ou morrer.'
WHERE name = 'Mão Vibrante' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você não sofre penalidades por envelhecimento e é imune a envelhecimento mágico.'
WHERE name = 'Corpo Atemporal' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você pode falar com qualquer criatura viva.'
WHERE name = 'Idiomas do Sol e da Lua' AND description = '';

UPDATE public.class_abilities 
SET description = 'Você pode se tornar etéreo por 1 minuto por nível por dia.'
WHERE name = 'Corpo Vazio' AND description = '';

-- Also fix Dano Desarmado and Rajada de Golpes for Monge if empty
UPDATE public.class_abilities 
SET description = 'Você causa mais dano com seus ataques desarmados (1d6 no 1º nível, aumentando progressivamente).'
WHERE name = 'Dano Desarmado' AND description = '';

UPDATE public.class_abilities 
SET description = 'Quando faz um ataque desarmado ou com armas de monge, voê pode fazer um ataque adicional com seu maior bônus de ataque, mas sofre -2 em todas as jogadas de ataque da rodada.'
WHERE name = 'Rajada de Golpes' AND description = '';
