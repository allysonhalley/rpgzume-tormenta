-- Seed Data for Tormenta RPG (Comprehensive)

-- ==========================================
-- HABILIDADES DE CLASSE (CLASS FEATURES)
-- ==========================================

-- Bárbaro
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Fúria', 'Ganha bônus de combate mas fica estafado.', 'Você pode invocar uma fúria primal.', 'Tormenta RPG', 46);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Fúria'), 'Classe', 'Bárbaro 1', '+2 ataque e dano corpo-a-corpo, RD 1, -2 CA. Dura 5 + mod Con rodadas.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Movimento Rápido', 'Aumenta deslocamento.', 'Você se move mais rápido que o normal.', 'Tormenta RPG', 46);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Movimento Rápido'), 'Classe', 'Bárbaro 1', '+3m de deslocamento se usar armadura média, leve ou nenhuma.', NULL, NULL);

-- Bardo
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Conhecimento de Bardo', 'Sabe de tudo um pouco.', 'Você ouviu muitas lendas e histórias.', 'Tormenta RPG', 49);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Conhecimento de Bardo'), 'Classe', 'Bardo 1', 'Adiciona nível de bardo aos testes de Conhecimento (pode fazer treinados).', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Música de Bardo', 'Usa música para efeitos mágicos.', 'Você pode usar sua arte para produzir efeitos mágicos.', 'Tormenta RPG', 49);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Música de Bardo'), 'Classe', 'Bardo 1', 'Pode usar músicas de bardo um número de vezes por dia igual a Nível + Car.', NULL, NULL);

-- Clérigo
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Canalizar Energia', 'Libera onda de energia.', 'Você libera uma onda de energia divina.', 'Tormenta RPG', 54);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Canalizar Energia'), 'Classe', 'Clérigo 1', 'Cura vivos ou fere mortos-vivos (Positiva) ou vice-versa (Negativa). 1d6 a cada 2 níveis. Explosão 9m.', NULL, NULL);

-- Druida
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Companheiro Animal', 'Animal leal.', 'Você tem um animal leal que luta ao seu lado.', 'Tormenta RPG', 58);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Companheiro Animal'), 'Classe', 'Druida 1', 'Ganha um companheiro animal (veja pag 58).', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Senso da Natureza', 'Bônus em perícias.', 'Você entende o mundo natural.', 'Tormenta RPG', 58);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Senso da Natureza'), 'Classe', 'Druida 1', '+2 em Conhecimento (natureza) e Sobrevivência.', NULL, NULL);

-- Guerreiro
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Técnica de Luta', 'Ganha talentos de combate.', 'Você treina incessantemente.', 'Tormenta RPG', 63);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Técnica de Luta'), 'Classe', 'Guerreiro 1', 'Ganha um talento de combate adicional no nível 1 e a cada nível par.', NULL, NULL);

-- Ladino
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Ataque Furtivo', 'Dano extra em alvos vulneráveis.', 'Você sabe onde atingir para causar mais dor.', 'Tormenta RPG', 66);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Ataque Furtivo'), 'Classe', 'Ladino 1', '+1d6 dano se o alvo estiver desprevenido ou flanqueado. Aumenta 1d6 a cada 2 níveis ímpares.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Encontrar Armadilhas', 'Acha armadilhas mágicas.', 'Você tem olhos treinados para o perigo.', 'Tormenta RPG', 66);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Encontrar Armadilhas'), 'Classe', 'Ladino 1', 'Pode usar Percepção para encontrar armadilhas com CD maior que 20.', NULL, NULL);

-- Mago/Feiticeiro
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Vínculo Arcano', 'Item ou animal mágico.', 'Você tem uma ligação sobrenatural com um objeto ou criatura.', 'Tormenta RPG', 72);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Vínculo Arcano'), 'Classe', 'Mago 1', 'Escolha entre um item de poder ou um familiar.', NULL, NULL);

-- Monge
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Dano Desarmado', 'Seus punhos são armas.', 'Você treinou para lutar sem armas.', 'Tormenta RPG', 76);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Dano Desarmado'), 'Classe', 'Monge 1', '1d6 dano (Médio). Considerado armado.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Sexto Sentido', 'Soma Sab na CA.', 'Sua intuição o protege.', 'Tormenta RPG', 76);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Sexto Sentido'), 'Classe', 'Monge 1', 'Adiciona modificador de Sabedoria na CA.', NULL, NULL);

-- Paladino
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Detectar o Mal', 'Sente presença maligna.', 'Você pode sentir a mácula do mal.', 'Tormenta RPG', 80);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Detectar o Mal'), 'Classe', 'Paladino 1', 'Pode usar Detectar o Mal à vontade.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Graça Divina', 'Soma Car na resistência.', 'Os deuses o protegem.', 'Tormenta RPG', 80);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Graça Divina'), 'Classe', 'Paladino 2', 'Adiciona modificador de Carisma em todos os testes de resistência.', NULL, NULL);

-- Ranger
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Inimigo Predileto', 'Bônus contra tipos de criatura.', 'Você estudou um tipo de criatura.', 'Tormenta RPG', 84);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Inimigo Predileto'), 'Classe', 'Ranger 1', '+2  dano e perícias contra o tipo escolhido.', NULL, NULL);


-- ==========================================
-- TALENTOS (FEATS)
-- ==========================================

-- Combate
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Ataque Poderoso', 'Troque precisão por dano.', 'Golpes pesados.', 'Tormenta RPG', 115);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Ataque Poderoso'), 'Combate', 'For 13', '-2 ataque, +4 dano.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Esquiva', '+1 na CA.', 'Você é ágil.', 'Tormenta RPG', 121);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Esquiva'), 'Combate', 'Des 13', '+1 CA.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Foco em Arma', '+1 ataque com arma.', 'Mestre em uma arma.', 'Tormenta RPG', 123);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Foco em Arma'), 'Combate', 'Usar Arma, BBA +1', '+1 ataque com a arma escolhida.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Saque Rápido', 'Saca arma como ação livre.', 'Rápido no gatilho.', 'Tormenta RPG', 127);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Saque Rápido'), 'Combate', 'BBA+1', 'Sacar arma é ação livre.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Tiro Preciso', 'Sem penalidade atirando em combate.', 'Mira firme.', 'Tormenta RPG', 128);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Tiro Preciso'), 'Combate', 'Tiro Certeiro', 'Não sofre -4 por atirar em inimigo engajado em combate.', NULL, NULL);

-- Magia
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Magia em Combate', 'Não leva ADO conjurando.', 'Conjura defensivamente.', 'Tormenta RPG', 124);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Magia em Combate'), 'Magia', 'Nenhum', '+4 em testes de Identificar Magia para conjurar defensivamente.', NULL, NULL);

INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Potencializar Magia', 'Aumenta efeitos variáveis.', 'Sua magia é mais forte.', 'Tormenta RPG', 126);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Potencializar Magia'), 'Magia', 'Nenhum', 'Efeitos numéricos variáveis aumentados em 50%. Custo: +2 níveis.', NULL, NULL);

-- Perícia
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Foco em Perícia', '+4 em uma perícia.', 'Especialista.', 'Tormenta RPG', 123);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Foco em Perícia'), 'Perícia', 'Nenhum', '+4 na perícia escolhida.', NULL, NULL);

-- Geral
INSERT INTO card (type, name, resume, description, book, page) VALUES 
('feature', 'Vitalidade', 'PV Extra.', 'Duro de matar.', 'Tormenta RPG', 129);

INSERT INTO feature (card_id, feature_type, prerequisites, benefit, normal, special) VALUES 
((SELECT id FROM card WHERE name = 'Vitalidade'), 'Geral', 'Con 13', '+3 PV, +1 por nível.', NULL, NULL);

-- ==========================================
-- MAGIAS (SPELLS)
-- ==========================================

-- Nível 0
INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Detectar Magia', 'Detecta auras mágicas.', 'Você percebe emanações de magia.', 'Tormenta RPG', 169);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Detectar Magia'), 'Arcana/Divina', 'Adivinhação', '0', 'V, G', '1 ação', '18m', 'Cone', 'Conc. até 1 min', 'Não', 'Não', 'Detecta auras mágicas.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Luz', 'Objeto brilha.', 'Cria luz.', 'Tormenta RPG', 182);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Luz'), 'Arcana/Divina', 'Evocação', '0', 'V, G', '1 ação', 'Toque', 'Objeto', '10 min/nível', 'Não', 'Não', 'Objeto brilha como tocha.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Ler Magias', 'Lê pergaminhos.', 'Decifra escritas mágicas.', 'Tormenta RPG', 181);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Ler Magias'), 'Arcana/Divina', 'Adivinhação', '0', 'V, G', '1 ação', 'Pessoal', 'Você', '10 min/nível', 'Não', 'Não', 'Permite ler escritas mágicas.');

-- Nível 1
INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Mísseis Mágicos', 'Dano infalível.', 'Dardos de energia.', 'Tormenta RPG', 185);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Mísseis Mágicos'), 'Arcana', 'Evocação', '1', 'V, G', '1 ação', '30m', 'Até 5 alvos', 'Instant', 'Não', 'Sim', '1d4+1 x setas.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Armadura Arcana', '+4 CA.', 'Campo de força.', 'Tormenta RPG', 157);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Armadura Arcana'), 'Arcana', 'Abjuração', '1', 'V, G', '1 ação', 'Toque', 'Criatura', '1 h/nível', 'Vontade', 'Sim', '+4 CA.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Curar Ferimentos Leves', 'Cura 1d8+1.', 'Energia positiva.', 'Tormenta RPG', 167);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Curar Ferimentos Leves'), 'Divina', 'Invocação', '1', 'V, G', '1 ação', 'Toque', 'Criatura', 'Instant', 'Vontade', 'Sim', 'Cura 1d8+1/nível (max +5).');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Escudo Arcano', '+4 CA e imune a mísseis.', 'Disco invisível.', 'Tormenta RPG', 172);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Escudo Arcano'), 'Arcana', 'Abjuração', '1', 'V, G', '1 ação', 'Pessoal', 'Você', '1 min/nível', 'Não', 'Não', '+4 CA e imune a mísseis mágicos.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Sono', 'Põe inimigos para dormir.', 'Sono mágico.', 'Tormenta RPG', 200);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Sono'), 'Arcana', 'Encantamento', '1', 'V, G, M', '1 rodada', '30m', '4m raio', '1 min/nível', 'Vontade', 'Sim', '4d4 DV de criaturas dormem.');

-- Nível 2
INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Invisibilidade', 'Fica invisível.', 'Desaparece da visão.', 'Tormenta RPG', 181);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Invisibilidade'), 'Arcana', 'Ilusão', '2', 'V, G', '1 ação', 'Toque', 'Criatura', '1 min/nível', 'Vontade', 'Sim', 'Invisível até atacar.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Teia', 'Prende inimigos.', 'Teia pegajosa.', 'Tormenta RPG', 203);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Teia'), 'Arcana', 'Invocação', '2', 'V, G, M', '1 ação', '30m', '6m raio', '10 min/nível', 'Reflexos', 'Sim', 'Enreda criaturas.');

-- Nível 3
INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Bola de Fogo', 'Explosão de fogo.', 'Dano em área.', 'Tormenta RPG', 160);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Bola de Fogo'), 'Arcana', 'Evocação', '3', 'V, G, M', '1 ação', '120m', '6m raio', 'Instant', 'Reflexos', 'Sim', '1d6/nível (max 10d6) de fogo.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Voo', 'Permite voar.', 'Você voa.', 'Tormenta RPG', 208);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Voo'), 'Arcana', 'Transmutação', '3', 'V, G', '1 ação', 'Toque', 'Criatura', '1 min/nível', 'Vontade', 'Sim', 'Ganha deslocamento de voo 18m.');

INSERT INTO card (type, name, resume, description, book, page) VALUES ('magic', 'Relâmpago', 'Linha elétrica.', 'Raio de eletricidade.', 'Tormenta RPG', 194);

INSERT INTO magic (card_id, type, school, level, components, cast_time, range, target_area, duration, saving_throw, spell_resistance, effect) VALUES 
((SELECT id FROM card WHERE name = 'Relâmpago'), 'Arcana', 'Evocação', '3', 'V, G, M', '1 ação', '36m', 'Linha', 'Instant', 'Reflexos', 'Sim', '1d6/nível (max 10d6) elétrico.');
