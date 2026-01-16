-- Seed Data for Tormenta RPG (Comprehensive)

-- ==========================================
-- HABILIDADES DE CLASSE (CLASS FEATURES)
-- ==========================================

-- Bárbaro
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('barb-001', 'feature', 'Fúria', 'Ganha bônus de combate mas fica estafado.', 'Você pode invocar uma fúria primal.', 'Tormenta RPG', 46);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-barb-001', 'barb-001', 'Classe', 'Bárbaro 1', '+2 ataque e dano corpo-a-corpo, RD 1, -2 CA. Dura 5 + mod Con rodadas.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('barb-002', 'feature', 'Movimento Rápido', 'Aumenta deslocamento.', 'Você se move mais rápido que o normal.', 'Tormenta RPG', 46);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-barb-002', 'barb-002', 'Classe', 'Bárbaro 1', '+3m de deslocamento se usar armadura média, leve ou nenhuma.', NULL, NULL);

-- Bardo
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('bard-001', 'feature', 'Conhecimento de Bardo', 'Sabe de tudo um pouco.', 'Você ouviu muitas lendas e histórias.', 'Tormenta RPG', 49);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-bard-001', 'bard-001', 'Classe', 'Bardo 1', 'Adiciona nível de bardo aos testes de Conhecimento (pode fazer treinados).', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('bard-002', 'feature', 'Música de Bardo', 'Usa música para efeitos mágicos.', 'Você pode usar sua arte para produzir efeitos mágicos.', 'Tormenta RPG', 49);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-bard-002', 'bard-002', 'Classe', 'Bardo 1', 'Pode usar músicas de bardo um número de vezes por dia igual a Nível + Car.', NULL, NULL);

-- Clérigo
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('cler-001', 'feature', 'Canalizar Energia', 'Libera onda de energia.', 'Você libera uma onda de energia divina.', 'Tormenta RPG', 54);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-cler-001', 'cler-001', 'Classe', 'Clérigo 1', 'Cura vivos ou fere mortos-vivos (Positiva) ou vice-versa (Negativa). 1d6 a cada 2 níveis. Explosão 9m.', NULL, NULL);

-- Druida
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('druid-001', 'feature', 'Companheiro Animal', 'Animal leal.', 'Você tem um animal leal que luta ao seu lado.', 'Tormenta RPG', 58);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-druid-001', 'druid-001', 'Classe', 'Druida 1', 'Ganha um companheiro animal (veja pag 58).', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('druid-002', 'feature', 'Senso da Natureza', 'Bônus em perícias.', 'Você entende o mundo natural.', 'Tormenta RPG', 58);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-druid-002', 'druid-002', 'Classe', 'Druida 1', '+2 em Conhecimento (natureza) e Sobrevivência.', NULL, NULL);

-- Guerreiro
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('fight-001', 'feature', 'Técnica de Luta', 'Ganha talentos de combate.', 'Você treina incessantemente.', 'Tormenta RPG', 63);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-fight-001', 'fight-001', 'Classe', 'Guerreiro 1', 'Ganha um talento de combate adicional no nível 1 e a cada nível par.', NULL, NULL);

-- Ladino
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('rogue-001', 'feature', 'Ataque Furtivo', 'Dano extra em alvos vulneráveis.', 'Você sabe onde atingir para causar mais dor.', 'Tormenta RPG', 66);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-rogue-001', 'rogue-001', 'Classe', 'Ladino 1', '+1d6 dano se o alvo estiver desprevenido ou flanqueado. Aumenta 1d6 a cada 2 níveis ímpares.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('rogue-002', 'feature', 'Encontrar Armadilhas', 'Acha armadilhas mágicas.', 'Você tem olhos treinados para o perigo.', 'Tormenta RPG', 66);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-rogue-002', 'rogue-002', 'Classe', 'Ladino 1', 'Pode usar Percepção para encontrar armadilhas com CD maior que 20.', NULL, NULL);

-- Mago/Feiticeiro
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('wiz-001', 'feature', 'Vínculo Arcano', 'Item ou animal mágico.', 'Você tem uma ligação sobrenatural com um objeto ou criatura.', 'Tormenta RPG', 72);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-wiz-001', 'wiz-001', 'Classe', 'Mago 1', 'Escolha entre um item de poder ou um familiar.', NULL, NULL);

-- Monge
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('monk-001', 'feature', 'Dano Desarmado', 'Seus punhos são armas.', 'Você treinou para lutar sem armas.', 'Tormenta RPG', 76);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-monk-001', 'monk-001', 'Classe', 'Monge 1', '1d6 dano (Médio). Considerado armado.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('monk-002', 'feature', 'Sexto Sentido', 'Soma Sab na CA.', 'Sua intuição o protege.', 'Tormenta RPG', 76);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-monk-002', 'monk-002', 'Classe', 'Monge 1', 'Adiciona modificador de Sabedoria na CA.', NULL, NULL);

-- Paladino
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('pal-001', 'feature', 'Detectar o Mal', 'Sente presença maligna.', 'Você pode sentir a mácula do mal.', 'Tormenta RPG', 80);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-pal-001', 'pal-001', 'Classe', 'Paladino 1', 'Pode usar Detectar o Mal à vontade.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('pal-002', 'feature', 'Graça Divina', 'Soma Car na resistência.', 'Os deuses o protegem.', 'Tormenta RPG', 80);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-pal-002', 'pal-002', 'Classe', 'Paladino 2', 'Adiciona modificador de Carisma em todos os testes de resistência.', NULL, NULL);

-- Ranger
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('rang-001', 'feature', 'Inimigo Predileto', 'Bônus contra tipos de criatura.', 'Você estudou um tipo de criatura.', 'Tormenta RPG', 84);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('feat-rang-001', 'rang-001', 'Classe', 'Ranger 1', '+2  dano e perícias contra o tipo escolhido.', NULL, NULL);


-- ==========================================
-- TALENTOS (FEATS)
-- ==========================================

-- Combate
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-combat-001', 'feature', 'Ataque Poderoso', 'Troque precisão por dano.', 'Golpes pesados.', 'Tormenta RPG', 115);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-c-001', 'feat-combat-001', 'Combate', 'For 13', '-2 ataque, +4 dano.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-combat-002', 'feature', 'Esquiva', '+1 na CA.', 'Você é ágil.', 'Tormenta RPG', 121);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-c-002', 'feat-combat-002', 'Combate', 'Des 13', '+1 CA.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-combat-003', 'feature', 'Foco em Arma', '+1 ataque com arma.', 'Mestre em uma arma.', 'Tormenta RPG', 123);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-c-003', 'feat-combat-003', 'Combate', 'Usar Arma, BBA +1', '+1 ataque com a arma escolhida.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-combat-004', 'feature', 'Saque Rápido', 'Saca arma como ação livre.', 'Rápido no gatilho.', 'Tormenta RPG', 127);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-c-004', 'feat-combat-004', 'Combate', 'BBA+1', 'Sacar arma é ação livre.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-combat-005', 'feature', 'Tiro Preciso', 'Sem penalidade atirando em combate.', 'Mira firme.', 'Tormenta RPG', 128);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-c-005', 'feat-combat-005', 'Combate', 'Tiro Certeiro', 'Não sofre -4 por atirar em inimigo engajado em combate.', NULL, NULL);

-- Magia
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-magic-001', 'feature', 'Magia em Combate', 'Não leva ADO conjurando.', 'Conjura defensivamente.', 'Tormenta RPG', 124);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-m-001', 'feat-magic-001', 'Magia', 'Nenhum', '+4 em testes de Identificar Magia para conjurar defensivamente.', NULL, NULL);

INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-magic-002', 'feature', 'Potencializar Magia', 'Aumenta efeitos variáveis.', 'Sua magia é mais forte.', 'Tormenta RPG', 126);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-m-002', 'feat-magic-002', 'Magia', 'Nenhum', 'Efeitos numéricos variáveis aumentados em 50%. Custo: +2 níveis.', NULL, NULL);

-- Perícia
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-skill-001', 'feature', 'Foco em Perícia', '+4 em uma perícia.', 'Especialista.', 'Tormenta RPG', 123);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-s-001', 'feat-skill-001', 'Perícia', 'Nenhum', '+4 na perícia escolhida.', NULL, NULL);

-- Geral
INSERT INTO card (id, type, name, resume, description, book, page) VALUES 
('feat-gen-001', 'feature', 'Vitalidade', 'PV Extra.', 'Duro de matar.', 'Tormenta RPG', 129);
INSERT INTO feature (id, card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
('f-g-001', 'feat-gen-001', 'Geral', 'Con 13', '+3 PV, +1 por nível.', NULL, NULL);

-- ==========================================
-- MAGIAS (SPELLS)
-- ==========================================

-- Nível 0
INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-001', 'magic', 'Detectar Magia', 'Detecta auras mágicas.', 'Você percebe emanações de magia.', 'Tormenta RPG', 169);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-001', 'spell-001', 'Arcana/Divina', 'Adivinhação', '0', 'V, G', '1 ação', '18m', 'Cone', 'Conc. até 1 min', 'Não', 'Não', 'Detecta auras mágicas.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-002', 'magic', 'Luz', 'Objeto brilha.', 'Cria luz.', 'Tormenta RPG', 182);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-002', 'spell-002', 'Arcana/Divina', 'Evocação', '0', 'V, G', '1 ação', 'Toque', 'Objeto', '10 min/nível', 'Não', 'Não', 'Objeto brilha como tocha.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-003', 'magic', 'Ler Magias', 'Lê pergaminhos.', 'Decifra escritas mágicas.', 'Tormenta RPG', 181);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-003', 'spell-003', 'Arcana/Divina', 'Adivinhação', '0', 'V, G', '1 ação', 'Pessoal', 'Você', '10 min/nível', 'Não', 'Não', 'Permite ler escritas mágicas.');

-- Nível 1
INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-101', 'magic', 'Mísseis Mágicos', 'Dano infalível.', 'Dardos de energia.', 'Tormenta RPG', 185);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-101', 'spell-101', 'Arcana', 'Evocação', '1', 'V, G', '1 ação', '30m', 'Até 5 alvos', 'Instant', 'Não', 'Sim', '1d4+1 x setas.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-102', 'magic', 'Armadura Arcana', '+4 CA.', 'Campo de força.', 'Tormenta RPG', 157);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-102', 'spell-102', 'Arcana', 'Abjuração', '1', 'V, G', '1 ação', 'Toque', 'Criatura', '1 h/nível', 'Vontade', 'Sim', '+4 CA.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-103', 'magic', 'Curar Ferimentos Leves', 'Cura 1d8+1.', 'Energia positiva.', 'Tormenta RPG', 167);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-103', 'spell-103', 'Divina', 'Invocação', '1', 'V, G', '1 ação', 'Toque', 'Criatura', 'Instant', 'Vontade', 'Sim', 'Cura 1d8+1/nível (max +5).');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-104', 'magic', 'Escudo Arcano', '+4 CA e imune a mísseis.', 'Disco invisível.', 'Tormenta RPG', 172);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-104', 'spell-104', 'Arcana', 'Abjuração', '1', 'V, G', '1 ação', 'Pessoal', 'Você', '1 min/nível', 'Não', 'Não', '+4 CA e imune a mísseis mágicos.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-105', 'magic', 'Sono', 'Põe inimigos para dormir.', 'Sono mágico.', 'Tormenta RPG', 200);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-105', 'spell-105', 'Arcana', 'Encantamento', '1', 'V, G, M', '1 rodada', '30m', '4m raio', '1 min/nível', 'Vontade', 'Sim', '4d4 DV de criaturas dormem.');

-- Nível 2
INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-201', 'magic', 'Invisibilidade', 'Fica invisível.', 'Desaparece da visão.', 'Tormenta RPG', 181);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-201', 'spell-201', 'Arcana', 'Ilusão', '2', 'V, G', '1 ação', 'Toque', 'Criatura', '1 min/nível', 'Vontade', 'Sim', 'Invisível até atacar.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-202', 'magic', 'Teia', 'Prende inimigos.', 'Teia pegajosa.', 'Tormenta RPG', 203);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-202', 'spell-202', 'Arcana', 'Invocação', '2', 'V, G, M', '1 ação', '30m', '6m raio', '10 min/nível', 'Reflexos', 'Sim', 'Enreda criaturas.');

-- Nível 3
INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-301', 'magic', 'Bola de Fogo', 'Explosão de fogo.', 'Dano em área.', 'Tormenta RPG', 160);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-301', 'spell-301', 'Arcana', 'Evocação', '3', 'V, G, M', '1 ação', '120m', '6m raio', 'Instant', 'Reflexos', 'Sim', '1d6/nível (max 10d6) de fogo.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-302', 'magic', 'Voo', 'Permite voar.', 'Você voa.', 'Tormenta RPG', 208);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-302', 'spell-302', 'Arcana', 'Transmutação', '3', 'V, G', '1 ação', 'Toque', 'Criatura', '1 min/nível', 'Vontade', 'Sim', 'Ganha deslocamento de voo 18m.');

INSERT INTO card (id, type, name, resume, description, book, page) VALUES ('spell-303', 'magic', 'Relâmpago', 'Linha elétrica.', 'Raio de eletricidade.', 'Tormenta RPG', 194);
INSERT INTO magic (id, card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
('m-303', 'spell-303', 'Arcana', 'Evocação', '3', 'V, G, M', '1 ação', '36m', 'Linha', 'Instant', 'Reflexos', 'Sim', '1d6/nível (max 10d6) elétrico.');
