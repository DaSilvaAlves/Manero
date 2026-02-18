# HANDOFF — Ecossistema Digital UAU: Manuel Manero

**Data:** 2026-02-18
**Status:** ONLINE — Site deployed e funcional
**Repo:** https://github.com/DaSilvaAlves/Manero
**Branch:** `master`
**Último commit:** `7406f8e` — feat: add logo to navbar and social media preview
**URL Produção:** https://manuel-manero.vercel.app

---

## ESTADO ATUAL DO PROJETO

### O que está feito e funcional

| Feature | Status | Notas |
|---------|--------|-------|
| Site React + Vite | ONLINE | Deploy automático via GitHub Actions → Vercel |
| Home page completa | OK | Hero, pilares, quiz AI, programas, testimonials, lead form |
| Página Sobre | OK | Timeline, missão, valores |
| Página Programas | OK | 3 programas + mentorias + lead form |
| Página Comunidade | OK | Community.tsx |
| AI Chat (Gemini) | OK | Chatbot flutuante com contexto de marca |
| AI Quiz (Gemini) | OK | 3 perguntas + diagnóstico AI personalizado |
| Lead Form | OK | Formulário de captura (precisa de backend para funcionar) |
| Menu Mobile | OK | Hamburger animado com navegação completa |
| CI/CD Pipeline | OK | Push to master → auto deploy Vercel (~40s) |
| SEO básico | OK | Meta tags, OpenGraph, favicon |
| Logo customizado | OK | Navbar + favicon + OG image |
| Hero background | OK | Imagem customizada com efeito radial glow |

---

## CI/CD & DEPLOYMENT

### Pipeline
```
git push origin master → GitHub Actions → Vercel CLI (prebuilt) → Production (~40s)
```

### Workflow: `.github/workflows/deploy.yml`
```yaml
Steps: checkout → set git author → setup node → npm ci → vercel pull → vercel build → vercel deploy --prebuilt
```

### IMPORTANTE — Git Author
O deploy Vercel **rejeita** commits cujo author email não seja membro da conta Vercel.
- Git config local já definido: `user.email = euricojsalves@gmail.com`
- Se mudar, o deploy falha com: `"Git author X must have access to the team"`

### GitHub Secrets (4 configurados)

| Secret | Uso |
|--------|-----|
| `VERCEL_TOKEN` | Token de deploy Vercel |
| `VERCEL_ORG_ID` | ID da conta Vercel |
| `VERCEL_PROJECT_ID` | ID do projeto no Vercel |
| `RAILWAY_TOKEN` | Token Railway (backend — não ativo ainda) |

### Vercel Environment Variables

| Variable | Uso |
|----------|-----|
| `GEMINI_API_KEY` | Google Gemini API para AI Chat e Quiz |

---

## ESTRUTURA DO PROJETO

```
manuel-manero---ecossistema-uau/          # C:\Users\XPS\Documents\manuel-manero---ecossistema-uau
├── .github/workflows/
│   └── deploy.yml                        # CI/CD GitHub Actions → Vercel
├── apps/web/
│   ├── public/
│   │   ├── hero-bg.png                   # Background hero customizado
│   │   ├── hero-bg.jpeg                  # Background alternativo
│   │   └── logo.png                      # Logo Manuel Manero
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIChat.tsx                # Chat AI flutuante (Gemini)
│   │   │   ├── AIQuiz.tsx                # Quiz diagnóstico AI (Gemini)
│   │   │   ├── Layout.tsx                # Navbar + Footer + Mobile Menu
│   │   │   └── LeadForm.tsx              # Formulário captura de leads
│   │   ├── pages/
│   │   │   ├── Home.tsx                  # Página principal completa
│   │   │   └── Community.tsx             # Página comunidade
│   │   ├── services/
│   │   │   ├── gemini.ts                 # Serviço Google Gemini AI
│   │   │   └── api.ts                    # Cliente HTTP para backend API
│   │   ├── App.tsx                       # Router + páginas Sobre/Programas inline
│   │   ├── index.tsx                     # Entry point React
│   │   ├── constants.tsx                 # Dados estáticos (programas, testimonials, quiz)
│   │   └── types.ts                      # Interfaces TypeScript
│   ├── index.html                        # HTML: Tailwind CDN, SEO, fonts, importmap
│   ├── vite.config.ts                    # Vite config (aliases, Gemini env inject)
│   ├── tsconfig.json                     # TypeScript config
│   └── package.json                      # React 19, Vite 6, react-router-dom 7
├── src/                                  # DUPLICATAS da raiz (limpeza pendente)
│   ├── services/api.ts
│   └── components/LeadForm.tsx
├── constants.tsx                         # DUPLICATA (limpeza pendente)
├── HANDOFF.md                            # ← ESTE FICHEIRO
└── README.md
```

### Stack Tecnológico

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Frontend | React + TypeScript | 19.2 |
| Build | Vite | 6.2 |
| Styling | TailwindCSS (CDN) | 3.x |
| Routing | react-router-dom (HashRouter) | 7.13 |
| AI | Google Gemini API | @google/genai 1.40 |
| Deploy | Vercel (prebuilt via CLI) | — |
| CI/CD | GitHub Actions | — |

---

## MELHORIAS PENDENTES (por prioridade)

### ALTA PRIORIDADE

**1. Segurança: API Key Gemini exposta no client-side**
- `vite.config.ts` injeta `GEMINI_API_KEY` via `process.env.API_KEY` no bundle JS
- Qualquer utilizador pode ver a key nas DevTools do browser
- **Solução:** Criar backend endpoint que proxy para Gemini, nunca expor key no frontend
- **Ficheiros:** `vite.config.ts`, `services/gemini.ts`

**2. Backend API (não existe ainda)**
- `api.ts` tem cliente HTTP pronto apontando para `localhost:3001`
- `LeadForm` chama `apiClient.submitLead()` → vai falhar sem backend
- **Solução:** Criar servidor Express/Fastify com:
  - `POST /api/leads` — captura de leads
  - `POST /api/ai/chat` — proxy seguro para Gemini
  - `POST /api/ai/diagnosis` — proxy diagnóstico AI
- Deploy no Railway (token já configurado no GitHub)

**3. Tailwind CDN → Instalação local**
- `index.html` usa `<script src="https://cdn.tailwindcss.com">`
- Warning em produção + dependência de CDN externo
- **Solução:** `npm install -D tailwindcss postcss autoprefixer` + config

### MÉDIA PRIORIDADE

**4. Limpeza de ficheiros duplicados**
- `src/services/api.ts` e `src/components/LeadForm.tsx` na raiz — duplicatas
- `constants.tsx` na raiz — duplicata de `apps/web/src/constants.tsx`
- **Ação:** Eliminar duplicatas da raiz

**5. Redes sociais com URLs reais**
- Footer tem links genéricos (`instagram.com/manuelmanero`, etc.)
- Manuel Manero precisa fornecer URLs corretos

**6. Conteúdo real do cliente**
- Testimonials são fictícios (Ana Silva, João Pereira)
- Timeline/biografia precisa de validação com dados reais
- Hero background pode ser substituído por foto profissional

**7. Formulário Lead sem destino funcional**
- Dados submetidos não vão a lado nenhum sem backend
- **Alternativa rápida:** Integrar com Formspree, Google Forms, ou Mailchimp

**8. Páginas adicionais**
- `/escola` — referenciada mas não existe
- `/blog` — não implementado
- `/contacto` — não implementado

### BAIXA PRIORIDADE

**9. Performance**
- Bundle JS: 531KB (acima do limite 500KB do Vite)
- Solução: `React.lazy()` para code-splitting das páginas

**10. Acessibilidade**
- Botões com emojis sem `aria-label`
- Falta roles semânticos no chat

**11. Ficheiros não commitados na raiz**
- `img-capa.png` e `logo.png` — decidir se commitar ou remover

---

## NOTAS TÉCNICAS IMPORTANTES

1. **HashRouter** — Usa `HashRouter` (URLs com `#/`). Para `BrowserRouter` seria preciso config de rewrites no Vercel.

2. **Git Author** — Config local: `euricojsalves@gmail.com`. Mudar = deploy falha.

3. **Import Maps** — `index.html` tem `<script type="importmap">` que resolve React/Gemini via esm.sh. O Vite trata no build, mas novas deps precisam de entrada no importmap.

4. **Gemini Model** — Atualizado para `gemini-2.0-flash`. Verificar compatibilidade se API mudar.

5. **Vercel Git Integration** — Conectado a `DaSilvaAlves/Manero`. Vercel pode tentar deploy automático por si (além do GitHub Actions). Se der conflito, desconectar no dashboard.

---

## PARA RETOMAR NA PRÓXIMA JANELA

Copiar e colar isto na nova conversa:

```
Retomar projeto Manuel Manero — Ecossistema Digital UAU.

Projeto: C:\Users\XPS\Documents\manuel-manero---ecossistema-uau
Repo: https://github.com/DaSilvaAlves/Manero
URL: https://manuel-manero.vercel.app

Estado:
- Site ONLINE e funcional (React + Vite + Vercel)
- CI/CD automático (push → deploy em ~40s)
- AI Chat e Quiz funcionais (Gemini)
- Detalhes completos em HANDOFF.md

Próximos passos por prioridade:
1. Criar backend API (Express) para proteger API key Gemini e receber leads
2. Migrar Tailwind de CDN para instalação local
3. Limpar ficheiros duplicados na raiz do projeto
4. Adicionar conteúdo real (testimonials, URLs redes sociais, fotos)
5. Implementar páginas em falta (/blog, /contacto, /escola)

Ler: HANDOFF.md para contexto completo.
@dev para implementação | @devops para deploy
```

---

## COMANDOS ÚTEIS

```bash
# Dev local
cd "C:\Users\XPS\Documents\manuel-manero---ecossistema-uau\apps\web"
npm run dev          # localhost:3000

# Build
npm run build        # Gera dist/

# Deploy (automático via push)
cd "C:\Users\XPS\Documents\manuel-manero---ecossistema-uau"
git add . && git commit -m "feat: ..." && git push origin master

# Ver logs de deploy
gh run list --limit 5
gh run view <ID> --log
```

---

*Criado: 2026-02-18 | Equipa: @dev (Dex) + @devops (Gage)*
*Sessão: Fix GitHub Actions + Vercel deploy + Site improvements*
