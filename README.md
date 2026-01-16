# Estrutura de JSON para Magias(Magics) e Talentos(Features)

Este documento explica detalhadamente os campos utilizados nas estruturas JSON para representar **magias** e **features** em sistemas de RPG, como D&D.

---

## Estrutura de JSON para Magias

### Explicação Campo a Campo

#### `card`
É uma subestrutura que descreve informações documentais sobre a magia:

- **`name`**: Nome da magia (ex.: *Bola de Fogo*, *Invisibilidade*).
- **`resume`**: Resumo curto sobre o propósito da magia (ex.: "Explosão que causa dano em área").
- **`description`**: Explicação completa do efeito da magia, incluindo detalhes narrativos.
- **`book`**: Nome do livro que contém a descrição oficial da magia (ex.: *Livro do Jogador*).
- **`page`**: Página no livro onde a magia pode ser encontrada.

---

### Campos Descritivos de Regras

- **`type`**: Indica a escola de magia. Exemplos incluem:
    - **Evocação**: Magias que criam energia ou invocam forças elementais.
    - **Abjuração**: Magias que protegem ou negam efeitos mágicos.
    - **Ilusão**: Magias que enganam os sentidos.

- **`level`**: Define o nível da magia, que indica:
    - O poder ou a complexidade da magia.
    - As classes que podem usá-la (ex.: magias de nível 3 são conjuradas por magos de 5º nível ou superior).

- **`components`**: Lista os componentes necessários para conjuração:
    - **Verbal (V)**: Necessita de palavras mágicas.
    - **Somático (S)**: Requer gestos com as mãos.
    - **Material (M)**: Exige itens ou reagentes específicos.

- **`castTime`**: Tempo necessário para conjurar a magia:
    - Ex.: "1 ação", "1 minuto", "1 reação".

- **`range`**: Distância ou área onde a magia pode ser usada:
    - Ex.: "Pessoal", "Toque", "30 metros".

- **`targetArea`**: O alvo ou área afetada pela magia:
    - Ex.: "Uma criatura", "Cone de 15 metros", "Esfera de 6 metros".

- **`duration`**: Tempo de duração da magia:
    - Ex.: "Instantâneo", "1 minuto", "8 horas".

- **`savingThrow`**: Tipo de teste de resistência que o alvo deve fazer:
    - Ex.: "Reflexos metade" (reduz o dano à metade).

- **`spellResistance`**: Indica se a magia pode ser anulada por resistência mágica:
    - Ex.: "Sim", "Não".

---

### Campos Específicos da Magia

- **`effect`**: Explicação do impacto da magia:
    - Ex.: "Causa 6d6 de dano de fogo a todas as criaturas na área."

- **`prerequisites`**: Condições para aprender ou usar a magia:
    - Ex.: "Capacidade de lançar magias de nível 3."

- **`benefit`**: Vantagens adicionais proporcionadas pela magia:
    - Ex.: "Aumenta o dano em +1d6 para cada nível acima do 3º."

- **`normal`**: Explica o funcionamento padrão da magia, sem modificações:
    - Ex.: "Apenas invisibilidade básica."

- **`special`**: Regras especiais ou efeitos únicos:
    - Ex.: "Pode ser moldada para poupar aliados na área."

---

## Estrutura de JSON para Features

### Explicação Campo a Campo

#### `card`
Assim como na magia, o **`card`** é uma subestrutura que descreve informações documentais sobre a feature:

- **`name`**: Nome da feature (ex.: *Ataque Poderoso*, *Reflexos Rápidos*).
- **`resume`**: Resumo curto sobre o propósito ou efeito da feature (ex.: "Permite trocar bônus de ataque por dano extra").
- **`description`**: Explicação completa sobre a feature, incluindo detalhes de sua aplicação e efeito no jogo.
- **`book`**: Nome do livro que contém a descrição oficial da feature (ex.: *Livro do Jogador*).
- **`page`**: Página no livro onde a feature pode ser encontrada.

---

### Campos Descritivos de Regras

- **`type`**: A categoria ou tipo da feature (ex.: *Talento*, *Habilidade de Classe*, *Poder Mágico*).

- **`level`**: O nível de poder da feature, que pode se referir ao nível do personagem ou da classe que pode adquirir a feature.

- **`components`**: Lista de componentes ou condições necessárias para usar a feature, se houver. Em features de D&D, geralmente esse campo é usado para descrever condições ou exigências de classe.

- **`usageTime`**: Tempo ou condições necessárias para ativar a feature (ex.: "1 ação", "passivo", "reação").

- **`range`**: O alcance ou área de efeito da feature (se aplicável):
    - Ex.: "Toque", "Pessoal", "30 metros".

- **`targetArea`**: O alvo ou área afetada pela feature:
    - Ex.: "Uma criatura", "Área de 10 metros".

- **`duration`**: A duração da feature, ou seja, por quanto tempo seu efeito se mantém:
    - Ex.: "Instantâneo", "1 rodada", "1 minuto".

- **`savingThrow`**: Tipo de resistência ou teste que um alvo pode fazer para reduzir ou evitar o efeito da feature:
    - Ex.: "Vontade" (para resistir a efeitos mentais).

- **`specialEffect`**: Qualquer efeito ou benefício especial relacionado à feature, que pode não ser abordado em outros campos.

---

### Campos Específicos da Feature

- **`effect`**: Descrição detalhada do impacto da feature no jogo:
    - Ex.: "Permite trocar um número do bônus de ataque por bônus de dano."

- **`prerequisites`**: Condições ou pré-requisitos necessários para adquirir a feature:
    - Ex.: "Força 13", "Talento 'Foco em Arma'".

- **`benefit`**: Vantagens ou melhorias específicas oferecidas pela feature:
    - Ex.: "Aumenta o dano de ataque em +2."

- **`normal`**: Explica o funcionamento básico da feature, sem modificações:
    - Ex.: "Sem a feature, o personagem não pode trocar bônus de ataque por dano."

- **`special`**: Regras especiais ou efeitos adicionais quando a feature é usada em situações específicas:
    - Ex.: "Ao usar um ponto de magia adicional, o efeito dura o dobro do tempo."

---

Este formato pode ser utilizado para estruturar dados de magias e features em sistemas de gerenciamento de RPG, APIs ou bancos de dados, oferecendo uma representação clara e detalhada de cada elemento do jogo.
