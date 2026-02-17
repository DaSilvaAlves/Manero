# 🚨 HANDOFF - Deployment Issues & Solutions

**Data:** 2026-02-17 19:35 UTC
**Status:** ⚠️ BLOCKED - Multiple GitHub Actions failures
**Context:** 10% remaining - handoff para debugar deployment

---

## 📊 RESUMO EXECUTIVO

**O que tentamos:**
- ✅ Setup GitHub Actions workflow com Vercel + Railway
- ✅ Configurado 4 secrets no GitHub (Vercel tokens, Railway token)
- ❌ GitHub Actions falhou 4 vezes consecutivas

**Problemas identificados:**
1. npm scripts inexistentes (lint, typecheck)
2. Ações do GitHub não encontradas (vercel/action, railway-app/cli-action)
3. Workflow YAML teve múltiplas correções mas continua falhando

**Próximo:** @dev debugar workflow real + testar locally

---

## 🎯 ESTADO DO PROJETO

### Repositório
- **URL**: https://github.com/DaSilvaAlves/Manero
- **Branch**: master
- **Último commit**: `440c6d6` (fix: simplify github actions workflow)
- **Status**: ✅ Build local passa | ❌ GitHub Actions falha

### Estrutura (Verificada)
```
apps/web/
├── src/
│   ├── components/       ✅ LeadForm.tsx, Layout.tsx, AIChat.tsx, AIQuiz.tsx
│   ├── pages/           ✅ Home.tsx, Community.tsx
│   ├── services/        ✅ api.ts, gemini.ts
│   ├── constants.tsx    ✅ Duplicado em raiz (limpeza pendente)
│   └── types.ts         ✅ Existe
├── package.json         ✅ Existe
├── package-lock.json    ✅ Existe
├── vite.config.ts       ✅ Existe
├── tsconfig.json        ✅ Existe
└── index.html           ✅ Existe (script correto: /src/index.tsx)
```

### Build Local
```bash
npm run build  # ✅ PASSA
# Output: ✓ 53 modules transformed
# dist/ gerado corretamente
```

### npm Scripts Disponíveis
```
dev     → vite
build   → vite build
preview → vite preview
```
⚠️ **NOTA:** SEM lint, typecheck, test scripts!

---

## 🔍 PROBLEMAS GITHUB ACTIONS

### Workflow Runs (Todos falharam)
| Run | Commit | Erro | Status |
|-----|--------|------|--------|
| #5 | 440c6d6 | Unknown (21s) | ❌ |
| #4 | 47e4f33 | Missing script: "lint" + vercel/action not found | ❌ |
| #3 | 6bbcf70 | Package lock not found | ❌ |
| #2 | 28945b6 | QA report (não é run, é commit) | ✅ |
| #1 | d8f38d9 | CI workflow creation (não é run, é commit) | ✅ |

### Erros Específicos Encontrados

**1. npm run lint**
```
npm error Missing script: "lint"
```
**Causa:** package.json não tem script "lint"
**Solução:** Remover ou adicionar script

**2. npm run typecheck**
```
npm error Missing script: "typecheck"
```
**Causa:** package.json não tem script "typecheck"
**Solução:** Remover ou adicionar script

**3. vercel/action não encontrada**
```
##[error]Unable to resolve action vercel/action, repository not found
```
**Causa:** Vercel não publica essa ação com esse nome
**Solução:** Usar ação correta ou alternativa

**4. railway-app/cli-action não encontrada**
```
##[error]Unable to resolve action railway-app/cli-action, repository not found
```
**Causa:** Railway não publica ação oficial
**Solução:** Remover ou usar CLI diretamente

---

## 📁 ARQUIVO ATUAL: .github/workflows/deploy.yml

**Status:** 5ª iteração, ainda com problemas
**Última mudança:** Removeu lint/typecheck, usou BrainCo/vercel-deploy
**Resultado:** Ainda falha (motivo unknown em 21s)

---

## 🔧 PRÓXIMOS PASSOS (Para @dev)

### FASE 1: Debug Local
```bash
# 1. Verificar npm scripts
cd apps/web && npm run

# 2. Testar build manualmente
npm ci && npm run build

# 3. Ver package.json scripts reais
cat package.json | grep -A 10 "scripts"
```

### FASE 2: Corrigir Workflow
**Opção A (Recomendado):** Usar GitHub CLI Action autêntica
```yaml
- name: Deploy to Vercel
  uses: amondnet/vercel-action@master  # ✅ Ação que funciona
  with:
    vercel-token: ${{ secrets.VERCEL_TOKEN }}
    vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
    vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

**Opção B:** Usar Vercel CLI diretamente
```yaml
- name: Install Vercel CLI
  run: npm install -g vercel

- name: Deploy
  run: vercel deploy --prod
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

### FASE 3: Testar
```bash
# Fazer push simples para triggar workflow
git commit --allow-empty -m "test: trigger workflow"
git push origin master

# Acompanhar em:
# https://github.com/DaSilvaAlves/Manero/actions
```

---

## 🔑 SECRETS CONFIGURADOS ✅

Todos 4 secrets foram adicionados ao GitHub:
- ✅ VERCEL_TOKEN
- ✅ VERCEL_ORG_ID
- ✅ VERCEL_PROJECT_ID
- ✅ RAILWAY_TOKEN

(Sem necessidade de reconfigurá-los)

---

## ⚠️ NOTAS IMPORTANTES

### Problemas Estruturais
- ❌ constants.tsx está duplicado (raiz + apps/web/src/)
- ❌ Arquivo .env.local tem PLACEHOLDER_API_KEY (usar secret no Vercel env vars)
- ℹ️ Railway backend deployment postponed (manual setup necessário)

### Workflow Atual
- Simplificado para 3 jobs: build → deploy-vercel → smoke-tests
- Removidos jobs com scripts inexistentes
- Ainda precisa da ação Vercel correta

---

## 📞 PARA RETOMAR NA PRÓXIMA JANELA

**Copie e cole isso:**

```
Retomando deployment Manuel Manero após múltiplas falhas.

Estado:
- ✅ Build local passa (npm run build)
- ✅ 4 secrets GitHub configurados
- ❌ GitHub Actions falha (ação Vercel não encontrada)
- ⏳ Workflow YAML em 5ª iteração

Próximos passos:
1. @dev debugar workflow - verificar qual ação Vercel funciona
2. Corrigir .github/workflows/deploy.yml com ação autêntica
3. Testar deployment (git push → GitHub Actions → Vercel)

Arquivo: .github/workflows/deploy.yml (precisa de correção)
Detalhes: ver HANDOFF_DEPLOYMENT_ISSUES.md

Sugestão: @dev usar amondnet/vercel-action@master (ação que funciona)
```

---

**Status Final:** ⚠️ BLOQUEADO - Aguardando @dev para debugar workflow
**Tempo estimado para resolver:** 15-30 minutos com @dev

---

*Criado: 2026-02-17 19:35 UTC*
