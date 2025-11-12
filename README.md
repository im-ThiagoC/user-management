# Sistema de Gerenciamento de Usuários e Perfis

Aplicação fullstack para gerenciamento de usuários e perfis, desenvolvida com NestJS (backend) e Next.js (frontend), ambos em TypeScript.

## 🚀 Tecnologias Utilizadas

### Backend

- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Tipagem estática
- **Swagger/OpenAPI** - Documentação automática da API
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de objetos

### Frontend

- **Next.js 16** (App Router) - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização moderna
- **Shadcn/ui** - Componentes de UI acessíveis
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **TanStack Query** - Gerenciamento de estado servidor
- **Sonner** - Toast notifications
- **next-themes** - Suporte a dark mode

## 📁 Estrutura do Projeto

```py
user-management/
├── back-end/                  # API NestJS
│   ├── common/
│   │   ├── filters/           # Exception filters globais
│   │   └── interceptors/      # Response interceptors
│   ├── src/
│   │   ├── profiles/          # Módulo de perfis
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── entities/      # Entidades de domínio
│   │   │   └── *.ts           # Controller, Service, Tests
│   │   ├── users/             # Módulo de usuários
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── entities/      # Entidades de domínio
│   │   │   └── *.ts           # Controller, Service, Tests, Mocks
│   │   ├── app.module.ts      # Módulo raiz
│   │   └── main.ts            # Entry point
│   ├── test/                  # Testes E2E
│   └── package.json
│
└── front-end/                 # Aplicação Next.js
    ├── src/
    │   ├── app/               # App Router (rotas)
    │   ├── components/        # Componentes React
    │   │   ├── hooks/         # Custom hooks (useUsers, useProfiles)
    │   │   ├── providers/     # Context providers
    │   │   ├── ui/            # Componentes Shadcn/ui
    │   │   └── *.tsx          # Componentes de features
    │   ├── lib/               # Utilitários
    │   ├── schemas/           # Schemas Zod para validação
    │   ├── services/          # API service layer
    │   └── types/             # TypeScript types
    └── package.json
```

## 🛠️ Como Rodar a Aplicação

### Pré-requisitos

- Node.js 22+
- npm

### Backend (Porta 3001)

```bash
cd back-end
npm install
cp .env.example .env
npm run start:dev
```

A API estará disponível em: `http://localhost:3001`  
Documentação Swagger: `http://localhost:3001/api-docs`

### Frontend (Porta 3000)

```bash
cd front-end
npm install
cp .env.example .env.local
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

## 🧪 Scripts Disponíveis

### Scripts do Backend

```bash
npm run start:dev    # Modo desenvolvimento com watch
npm run build        # Build para produção
npm run start:prod   # Executar build de produção
npm run test         # Executar testes unitários
npm run test:cov     # Testes com cobertura
npm run test:e2e     # Testes end-to-end
npm run lint         # Verificar código (ESLint)
npm run format       # Formatar código (Prettier)
```

### Scripts do Frontend

```bash
npm run dev          # Modo desenvolvimento
npm run build        # Build para produção
npm run start        # Executar build de produção
npm run lint         # Verificar código (ESLint)
```

## 📚 Documentação da API

A API possui documentação interativa Swagger disponível em:  
**`http://localhost:3001/api-docs`**

### Formato de Resposta Padronizado

Todas as respostas da API seguem o formato:

```typescript
{
  "success": boolean,
  "data": T,  // Dados retornados
  "timestamp": string  // ISO 8601
}
```

Em caso de erro:

```typescript
{
  "success": false,
  "statusCode": number,
  "message": string,
  "timestamp": string
}
```

## 📋 Funcionalidades Implementadas

### Backend (API RESTful)

#### Perfis (Profiles)

- `GET /profiles` - Listar todos os perfis
- `GET /profiles/:id` - Buscar perfil por ID
- `POST /profiles` - Criar novo perfil
- `PUT /profiles/:id` - Atualizar perfil
- `DELETE /profiles/:id` - Remover perfil

#### Usuários (Users)

- `GET /users` - Listar todos os usuários
- `GET /users/:id` - Buscar usuário por ID
- `GET /users/profile/:profileId` - Filtrar usuários por perfil
- `POST /users` - Criar novo usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Remover usuário
- `PATCH /users/:id/toggle-status` - Ativar/desativar usuário

### Frontend (Interface)

#### Tela Principal

- Listagem de usuários com informações do perfil
- Indicador visual de status (ativo/inativo)
- Filtro por perfil
- Busca por ID

#### Operações CRUD

- **Criar**: Modal com formulário de criação
- **Editar**: Modal com formulário de edição (carrega dados existentes)
- **Excluir**: Confirmação antes da exclusão
- **Ativar/Desativar**: Toggle de status com um clique

#### Gerenciamento de Perfis

- Visualização de perfis no filtro
- Integração com sistema de usuários (relacionamento)

## 🎯 Decisões Técnicas

### Arquitetura

1. **Separação de Responsabilidades**: Backend e frontend completamente desacoplados, comunicando-se via API REST.

2. **Módulos NestJS**: Estrutura modular com `UsersModule` e `ProfilesModule`, facilitando manutenção e escalabilidade.

3. **DTOs (Data Transfer Objects)**: Utilizados para validação e documentação clara dos contratos da API.

4. **Relacionamento entre Entidades**: User referencia Profile via `profileId`, mantendo integridade mesmo em memória.

### Padrões e Boas Práticas

1. **Clean Code**:
   - Nomes descritivos de variáveis e funções
   - Funções pequenas com responsabilidade única
   - Comentários apenas onde necessário

2. **Validação de Dados**:
   - Backend: `class-validator` para validar DTOs automaticamente
   - Frontend: Zod schemas + React Hook Form para validação client-side
   - Feedback instantâneo ao usuário

3. **Tratamento de Erros**:
   - Status codes HTTP apropriados (200, 201, 204, 400, 404, 409)
   - Exception filters globais (`HttpExceptionFilter`)
   - Response interceptors (`TransformInterceptor`) para padronizar respostas
   - Mensagens de erro descritivas
   - Feedback visual no frontend com toast notifications (Sonner)

4. **TypeScript Strict Mode**: Garantindo máxima segurança de tipos.

5. **Gerenciamento de Estado**:
   - TanStack Query (React Query) para cache e sincronização de dados do servidor
   - Invalidação automática de cache após mutations
   - Loading e error states gerenciados automaticamente

6. **Documentação Automática**:
   - Swagger/OpenAPI integrado no backend
   - Decorators `@ApiTags`, `@ApiOperation`, `@ApiParam`, `@ApiBody`, `@ApiResponse`
   - Interface interativa em `/api-docs`

### Dados Mockados

Os dados iniciais incluem:

- 3 perfis: Admin, Developer, User
- 5 usuários de exemplo com diferentes perfis e status

## 🔄 Fluxo de Dados

```text
Frontend (Next.js)
    ↓ User Action
React Hook Form + Zod Validation
    ↓ Valid Data
TanStack Query (Mutation/Query)
    ↓ HTTP Request
API Service Layer (fetch)
    ↓ REST API Call
Backend (NestJS)
    ↓ Controller (@ApiOperation)
ValidationPipe (class-validator)
    ↓ Valid DTO
Service Layer (Business Logic)
    ↓ Data Manipulation
In-Memory Repository
    ↓ Response Data
TransformInterceptor (format response)
    ↓ { success, data, timestamp }
Frontend (Cache Update + UI Refresh)
```

## ⚠️ Limitações Conhecidas

1. **Persistência**: Dados são perdidos ao reiniciar o servidor (by design).
2. **Concorrência**: Não há controle de concorrência para operações simultâneas.
3. **Autenticação**: Não implementada (fora do escopo).
4. **Paginação**: Lista completa de usuários (adequado para MVP).

## 🚀 Possíveis Melhorias

### Curto Prazo

1. **Testes**:
   - ✅ Testes unitários implementados (Jest) para services e controllers
   - ✅ Testes de validação de DTOs
   - ⏳ Expandir cobertura de testes para ProfilesService
   - ⏳ Testes E2E completos (Supertest)
   - ⏳ Testes no frontend (Vitest/Testing Library)

2. **UX Melhorada**:
   - ✅ Loading states com Skeleton loaders
   - ✅ Toast notifications (Sonner)
   - ✅ Dark mode (next-themes)
   - ⏳ Animações de transição
   - ⏳ Confirmação antes de deletar

### Médio Prazo

1. **Persistência**:
   - Integração com banco de dados (PostgreSQL/MongoDB)
   - Migrations
   - Seeders

2. **Paginação e Filtros**:
   - Paginação server-side
   - Ordenação por colunas
   - Filtros avançados (busca por nome, email, etc.)

3. **Autenticação e Autorização**:
   - JWT tokens
   - Roles e permissões
   - Middleware de autenticação

### Longo Prazo

1. **Recursos Avançados**:
   - Upload de avatar
   - Histórico de alterações
   - Logs de auditoria
   - Export para CSV/PDF

2. **DevOps**:
   - Docker/Docker Compose
   - CI/CD pipeline
   - Monitoramento e logging
   - Deploy automatizado

3. **Performance**:
   - Cache (Redis)
   - Rate limiting
   - Compressão de resposta

## 📝 Notas Adicionais

### Por que NestJS?

- Arquitetura modular e escalável
- Decorators e DI (Dependency Injection) nativos
- Excelente suporte a TypeScript
- Documentação robusta

### Por que Next.js?

- App Router com React Server Components
- Roteamento file-based intuitivo
- Excelente DX (Developer Experience)

### Estrutura de Pastas Backend

A estrutura segue o padrão recomendado pelo NestJS:

- **Controllers**: Lidam com requisições HTTP e documentação Swagger
- **Services**: Contêm a lógica de negócio e manipulação de dados
- **DTOs**: Definem contratos, validação e documentação API
- **Entities**: Modelam os dados de domínio
- **common/**: Recursos compartilhados
  - **filters/**: Exception filters globais
  - **interceptors/**: Response transformers

### Estrutura de Pastas Frontend

A estrutura segue o App Router do Next.js 16:

- **app/**: Rotas e layouts (file-based routing)
- **components/**: Componentes reutilizáveis e de feature
  - **hooks/**: Custom hooks (useUsers, useProfiles, mutations)
  - **providers/**: Context providers (QueryClient, Theme)
  - **ui/**: Componentes base do Shadcn/ui
- **schemas/**: Schemas Zod para validação de formulários
- **services/**: Camada de integração com API (api.service.ts)
- **types/**: Definições de tipos TypeScript compartilhados
