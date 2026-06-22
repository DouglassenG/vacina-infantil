# 💉 Caderneta de Vacinacao Infantil Digital

Plataforma digital para controle de vacinacao infantil, desenvolvida com Ionic Framework e Angular. O sistema substitui o controle analogico de cadernetas fisicas, oferecendo acessibilidade e portabilidade multiplataforma (Mobile, Tablet e Desktop).

## 🌐 Aplicacao Publicada

**Link de Producao:** [https://vacina-infantil-c0344.web.app](https://vacina-infantil-c0344.web.app)

## 📋 Funcionalidades Implementadas

### Cenario 1 — Vacinas Previstas por Faixa Etaria
Historico vacinal dividido em blocos cronologicos (Ao Nascer, 2 Meses, 4 Meses, etc.) com sinalizadores visuais por status: verde (concluida), amarelo (agendada) e laranja (atrasada).

### Cenario 2 — Controle de Pendencias e Atrasos
Calculo automatico de atrasos baseado na idade da crianca e na idade recomendada de cada dose. Banner de alerta exibido quando ha vacinas pendentes.

### Cenario 3 — Campanhas Ativas de Vacinacao
Exibicao de campanhas vigentes no dashboard principal, filtradas pela faixa etaria da crianca selecionada. Listagem completa com indicador de status (ativa/encerrada).

### Cenario 4 — Gestao Multi-filhos
Seletor visual de criancas no topo da aplicacao com avatar e nome, utilizando estado reativo compartilhado via RxJS BehaviorSubject. A troca de crianca atualiza instantaneamente todas as telas.

## ✏️ CRUD Completo

### Cadastro de Crianca (Create)
Formulario acessivel pelo botao + na tela de Perfil, com campos de nome, data de nascimento e genero. Dados salvos diretamente no Firebase Cloud Firestore.

### Visualizacao de Dados (Read)
Leitura reativa de criancas, doses vacinais e campanhas via Observables do Firestore, com atualizacao em tempo real.

### Edicao de Crianca (Update)
Botao "Editar" no perfil da crianca que reabre o formulario preenchido com os dados atuais, permitindo alteracao de nome, data de nascimento e genero.

### Exclusao de Crianca (Delete)
Botao "Excluir" com confirmacao via alerta antes de remover o registro do Firestore.

### Marcar Vacina como Aplicada (Update)
Botao "Aplicar" em cada vaccine-card que registra a data de aplicacao no Firestore, atualizando o status automaticamente para "Concluida".

## ⏳ Loading Skeleton
Esqueletos animados exibidos no dashboard e no historico vacinal enquanto os dados do Firestore carregam, garantindo uma experiencia visual fluida.

## 🧪 Testes Unitarios

19 testes automatizados cobrindo toda a logica de negocio dos 3 models POO:

- **Child Model (6 testes):** criacao de instancia, calculo de idade em meses, formatacao de idade, avatar padrao
- **VaccineDose Model (7 testes):** criacao de instancia, evaluateStatus (CONCLUIDA, ATRASADA, AGENDADA), conversao de datas
- **Campaign Model (6 testes):** criacao de instancia, isActive (ativa, encerrada, futura), isTargetedForChild (dentro e fora da faixa etaria)

```bash
ng test --watch=false
# Resultado: 19 of 19 SUCCESS
```

## 🛠️ Tecnologias Utilizadas

- **Ionic Framework v8** — Componentes UI e responsividade multiplataforma
- **Angular 20** — Framework principal com NgModules
- **TypeScript** — Tipagem estrita e Programacao Orientada a Objetos
- **Firebase Cloud Firestore** — Banco de dados NoSQL em tempo real (API modular)
- **Firebase Hosting** — Deploy e hospedagem em producao
- **RxJS** — Reatividade e gerenciamento de estado
- **SCSS** — Estilizacao com variaveis CSS customizadas
- **Karma + Jasmine** — Framework de testes unitarios

## 🏗️ Arquitetura do Projeto

```
src/app/
├── core/                    # Services singleton e Models POO
│   ├── models/
│   │   ├── child.model.ts
│   │   ├── child.model.spec.ts
│   │   ├── vaccine.model.ts
│   │   ├── vaccine.model.spec.ts
│   │   ├── campaign.model.ts
│   │   └── campaign.model.spec.ts
│   └── services/
│       ├── child.service.ts       # CRUD completo (add, update, delete)
│       ├── vaccine.service.ts     # Read + markAsApplied
│       └── campaign.service.ts    # Read + filtros
├── shared/                  # Componentes reutilizaveis
│   └── components/
│       ├── child-selector/
│       ├── vaccine-card/          # Botao "Aplicar" integrado
│       └── campaign-banner/
├── features/                # Paginas principais
│   ├── dashboard/                 # Loading skeleton + contadores
│   ├── child-profile/             # Formulario CRUD + perfil
│   ├── vaccine-history/           # Historico por faixa etaria
│   └── campaigns/                 # Listagem com status
└── theme/
    └── variables.scss       # Paleta de cores obrigatoria
```

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde Oliva | `#ABC270` | Vacinas concluidas |
| Amarelo Pastel | `#FEC868` | Vacinas agendadas |
| Laranja Suave | `#FDA769` | Vacinas atrasadas |
| Marrom Escuro | `#473C33` | Textos e estrutura |

## 🚀 Como Rodar Localmente

```bash
# Clonar o repositorio
git clone https://github.com/DouglassenG/vacina-infantil.git

# Entrar na pasta do projeto
cd vacina-infantil

# Instalar dependencias
npm install

# Rodar em modo de desenvolvimento
ionic serve

# Rodar testes unitarios
ng test --watch=false
```

O aplicativo sera aberto automaticamente em `http://localhost:8100`.

## ⭐ Diferenciais Implementados

- Firebase Cloud Firestore com API modular (Angular 20 compativel)
- CRUD completo (Create, Read, Update, Delete) com persistencia no Firestore
- Marcar vacina como aplicada com atualizacao em tempo real
- 19 testes unitarios cobrindo toda logica de negocio dos models POO
- Loading skeleton animado durante carregamento de dados
- Deploy em producao via Firebase Hosting
- Componentes reutilizaveis com tipagem estrita
- Responsividade para Mobile (320px), Tablet e Desktop
- Menu lateral com navegacao entre todas as telas
- Calculo dinamico de status vacinal em tempo de execucao (evaluateStatus)
- Confirmacao de exclusao via alerta nativo do Ionic
- Commits seguindo padrao Conventional Commits

## 👨‍💻 Autor

**Douglas Michelini Silva Rodrigues**
