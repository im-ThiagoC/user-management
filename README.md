# Sistema de Gerenciamento de Usuários e Perfis

Aplicação fullstack para gerenciamento de usuários e perfis, desenvolvida com NestJS (backend) e Next.js (frontend), ambos em TypeScript.

## 🚀 Tecnologias Utilizadas

### Backend

- **NestJS** - Framework Node.js progressivo
- **TypeScript** - Tipagem estática
- **class-validator** - Validação de dados
- **class-transformer** - Transformação de objetos

### Frontend

- **Next.js 16** (App Router) - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Shadcn/ui** - Componentes de UI

## 📁 Estrutura do Projeto

```r
project-root/
├── backend/                 # API NestJS
│   ├── src/
│   │   ├── profiles/       # Módulo de perfis
│   │   ├── users/          # Módulo de usuários
│   │   └── main.ts         # Entry point
│   └── package.json
│
└── frontend/               # Aplicação Next.js
    ├── src/
    │   ├── app/           # App Router
    │   ├── components/    # Componentes React (ShadcnUI)
    │   ├── hooks/         # Hooks
    │   ├── modules/       # My modules
    │   ├── types/         # Types
    │   └── services/      # Serviços de API
    └── package.json
```

## 🛠️ Como Rodar a Aplicação

### Pré-requisitos

- Node.js 22+
- npm

### Backend (Porta 3001)

```bash
cd backend
npm install
npm run start:dev
```

A API estará disponível em: `http://localhost:3001`

### Frontend (Porta 3000)

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em: `http://localhost:3000`

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

- Tela separada para gerenciar perfis
- CRUD completo de perfis
- Validação de exclusão (não permite excluir perfil com usuários)

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
   - Backend: `class-validator` para validar DTOs
   - Frontend: Validação antes de submeter ao backend

3. **Tratamento de Erros**:
   - Status codes HTTP apropriados (200, 201, 400, 404, 409)
   - Mensagens de erro descritivas
   - Feedback visual no frontend

4. **TypeScript Strict Mode**: Garantindo máxima segurança de tipos.

### Dados Mockados

Os dados iniciais incluem:

- 3 perfis: Admin, Developer, User
- 5 usuários de exemplo com diferentes perfis e status

## 🔄 Fluxo de Dados

```r
Frontend (Next.js)
    ↓ HTTP Request
API Service Layer
    ↓ fetch
Backend (NestJS)
    ↓ Controller
Service Layer
    ↓ Business Logic
In-Memory Repository
    ↓ Response
Frontend (UI Update)
```

## ⚠️ Limitações Conhecidas

1. **Persistência**: Dados são perdidos ao reiniciar o servidor (by design).
2. **Concorrência**: Não há controle de concorrência para operações simultâneas.
3. **Autenticação**: Não implementada (fora do escopo).
4. **Paginação**: Lista completa de usuários (adequado para MVP).

## 🚀 Possíveis Melhorias

### Curto Prazo

1. **Testes**:
   - Testes unitários (Jest)
   - Testes de integração (Supertest)
   - Testes E2E no frontend (Cypress/Playwright)

2. **Validação Avançada**:
   - Validação de email único
   - Regras de senha forte
   - Validação de CPF/CNPJ

3. **UX Melhorada**:
   - Loading states
   - Skeleton loaders
   - Animações de transição
   - Toast notifications mais sofisticadas

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

2. **Arquitetura**:
   - Implementação de CQRS
   - Event Sourcing
   - Microservices (se necessário)

3. **DevOps**:
   - Docker/Docker Compose
   - CI/CD pipeline
   - Monitoramento e logging
   - Deploy automatizado

4. **Performance**:
   - Cache (Redis)
   - Rate limiting
   - Compressão de resposta
   - CDN para assets

## 📝 Notas Adicionais

### Por que NestJS?

- Arquitetura modular e escalável
- Decorators e DI (Dependency Injection) nativos
- Excelente suporte a TypeScript
- Documentação robusta

### Por que Next.js?

- Server-side rendering (SSR) e otimizações de performance
- App Router com React Server Components
- Roteamento file-based intuitivo
- Excelente DX (Developer Experience)

### Estrutura de Pastas Backend

A estrutura segue o padrão recomendado pelo NestJS:

- **Controllers**: Lidam com requisições HTTP
- **Services**: Contêm a lógica de negócio
- **DTOs**: Definem contratos e validação
- **Entities**: Modelam os dados

### Estrutura de Pastas Frontend

A estrutura segue o App Router do Next.js 14:

- **app/**: Rotas e layouts
- **components/**: Componentes reutilizáveis
- **services/**: Camada de integração com API

## 🤝 Contato

Para dúvidas ou sugestões sobre a implementação, sinta-se à vontade para entrar em contato.

---
