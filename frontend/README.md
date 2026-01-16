# RPGZume Frontend

Este é o frontend do projeto **RPGZume**, uma aplicação Angular que interage com um backend baseado em Spring Boot para gerenciar **cards, features e magias** de um sistema de RPG.

## 🚀 Tecnologias Utilizadas

- **Angular 17+** (Standalone Components)
- **TypeScript**
- **Angular Router** (para gerenciamento de rotas)
- **Angular Services** (para consumo de API)
- **SCSS** (para estilização)

## 📂 Estrutura do Projeto

```
src/app/
├── app.component.ts       # Componente principal da aplicação
├── app.routes.ts          # Definição das rotas do projeto
├── app.config.ts          # Configuração da aplicação
├── core/                  # Serviços e modelos do projeto
│   ├── models/            # Modelos de dados
│   ├── services/          # Serviços para requisições HTTP
├── cards/                 # Módulo de gerenciamento de Cards
│   ├── card-list/         # Lista de Cards
│   ├── card-detail/       # Detalhes de um Card
├── features/              # Módulo de gerenciamento de Features
│   ├── feature-list/      # Lista de Features
│   ├── feature-detail/    # Detalhes de uma Feature
├── magics/                # Módulo de gerenciamento de Magias
│   ├── magic-list/        # Lista de Magias
│   ├── magic-detail/      # Detalhes de uma Magia
├── shared/                # Módulo compartilhado (componentes reutilizáveis)
```

## 📦 Instalação e Configuração

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/seu-usuario/rpgzume-api-front.git
   cd rpgzume-api-front
   ```

2. **Instale as dependências:**
   ```sh
   npm install
   ```

3. **Configure o Proxy (opcional, para evitar CORS)**
   Caso o backend esteja rodando em `http://localhost:8081`, crie o arquivo `proxy.conf.json`:
   ```json
   {
     "/api": {
       "target": "http://localhost:8081",
       "secure": false,
       "changeOrigin": true
     }
   }
   ```
   E edite `angular.json` para incluir:
   ```json
   "options": {
     "proxyConfig": "src/proxy.conf.json"
   }
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```sh
   ng serve --open
   ```

## 🔄 Endpoints Consumidos

A aplicação se comunica com os seguintes endpoints do backend:

- **Cards:** `GET /cards`, `POST /cards`, `GET /cards/{id}`
- **Features:** `GET /features`, `POST /features`, `GET /features/{id}`
- **Magias:** `GET /magics`, `POST /magics`, `GET /magics/{id}`

## 🎯 Funcionalidades Principais

✅ Listagem de Cards, Features e Magias
✅ Visualização de detalhes individuais
✅ Integração com API RESTful
✅ Roteamento modular com Lazy Loading

## 🔧 Possíveis Problemas e Soluções

1. **Erro de CORS ao chamar a API**
  - Habilite CORS no backend (`CorsFilter` no Spring Boot)
  - Utilize `proxy.conf.json` no Angular

2. **Erro de Rotas (`Cannot match any routes`)**
  - Certifique-se de que `app.routes.ts` contém:
    ```typescript
    import { Routes } from '@angular/router';
    export const appRoutes: Routes = [
      { path: '', redirectTo: 'cards', pathMatch: 'full' },
      { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
      { path: 'features', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
      { path: 'magics', loadChildren: () => import('./magics/magics.module').then(m => m.MagicsModule) }
    ];
    ```

## 📜 Licença

Este projeto está licenciado sob a **MIT License**. Sinta-se à vontade para contribuir e modificar! 🎲🔥

