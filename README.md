# Caderneta de Vacinacao Infantil Digital

Plataforma digital para controle de vacinacao infantil, desenvolvida com Ionic Framework e Angular. O sistema substitui o controle analogico de cadernetas fisicas, oferecendo acessibilidade e portabilidade multiplataforma (Mobile, Tablet e Desktop).

## Aplicacao Publicada

**Link de Producao:** [https://vacina-infantil-c0344.web.app](https://vacina-infantil-c0344.web.app)

## Funcionalidades Implementadas

### Cenario 1 — Vacinas Previstas por Faixa Etaria
Historico vacinal dividido em blocos cronologicos (Ao Nascer, 2 Meses, 4 Meses, etc.) com sinalizadores visuais por status: verde (concluida), amarelo (agendada) e laranja (atrasada).

### Cenario 2 — Controle de Pendencias e Atrasos
Calculo automatico de atrasos baseado na idade da crianca e na idade recomendada de cada dose. Banner de alerta exibido quando ha vacinas pendentes.

### Cenario 3 — Campanhas Ativas de Vacinacao
Exibicao de campanhas vigentes no dashboard principal, filtradas pela faixa etaria da crianca selecionada.

### Cenario 4 — Gestao Multi-filhos
Seletor visual de criancas no topo da aplicacao com avatar e nome, utilizando estado reativo compartilhado via RxJS BehaviorSubject. A troca de crianca atualiza instantaneamente todas as telas.

## Tecnologias Utilizadas

- **Ionic Framework v8** — Componentes UI e responsividade multiplataforma
- **Angular 20** — Framework principal com NgModules
- **TypeScript** — Tipagem estrita e Programacao Orientada a Objetos
- **Firebase Cloud Firestore** — Banco de dados NoSQL em tempo real
- **Firebase Hosting** — Deploy e hospedagem em producao
- **RxJS** — Reatividade e gerenciamento de estado
- **SCSS** — Estilizacao com variaveis CSS customizadas

## Arquitetura do Projeto

```
src/app/
├── core/                    # Services singleton e Models POO
│   ├── models/
│   │   ├── child.model.ts
│   │   ├── vaccine.model.ts
│   │   └── campaign.model.ts
│   └── services/
│       ├── child.service.ts
│       ├── vaccine.service.ts
│       └── campaign.service.ts
├── shared/                  # Componentes reutilizaveis
│   └── components/
│       ├── child-selector/
│       ├── vaccine-card/
│       └── campaign-banner/
├── features/                # Paginas principais
│   ├── dashboard/
│   ├── child-profile/
│   ├── vaccine-history/
│   └── campaigns/
└── theme/
    └── variables.scss       # Paleta de cores obrigatoria
```

## Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Verde Oliva | `#ABC270` | Vacinas concluidas |
| Amarelo Pastel | `#FEC868` | Vacinas agendadas |
| Laranja Suave | `#FDA769` | Vacinas atrasadas |
| Marrom Escuro | `#473C33` | Textos e estrutura |

## Como Rodar Localmente

```bash
# Clonar o repositorio
git clone https://github.com/DouglassenG/vacina-infantil.git

# Entrar na pasta do projeto
cd vacina-infantil

# Instalar dependencias
npm install

# Rodar em modo de desenvolvimento
ionic serve
```

O aplicativo sera aberto automaticamente em `http://localhost:8100`.

## Diferenciais Implementados

- Banco de Dados Firebase Cloud Firestore com API modular
- Deploy em producao via Firebase Hosting
- Componentes reutilizaveis com POO e tipagem estrita
- Responsividade para Mobile (320px), Tablet e Desktop
- Menu lateral com navegacao entre todas as telas
- Calculo dinamico de status vacinal em tempo de execucao
- Commits seguindo padrao Conventional Commits

## Autor

**Douglas Michelini Silva Rodrigues**
