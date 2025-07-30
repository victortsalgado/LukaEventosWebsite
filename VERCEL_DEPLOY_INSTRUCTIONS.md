# Instruções Específicas - Deploy Vercel

## Baseado nas Suas Configurações

### ✅ Configurações Corretas (Conforme Screenshot)
1. **Framework Preset**: Vite ✅
2. **Build Command**: `npm run build` ✅  
3. **Output Directory**: `dist` ✅
4. **Install Command**: `npm install` ✅

### 📋 Variáveis de Ambiente Necessárias
**Na seção "Environment Variables" do Vercel:**

```
DATABASE_URL = [sua_string_conexao_postgresql]
SENDGRID_API_KEY = [sua_chave_sendgrid]
SESSION_SECRET = I9JU23NF394R6HH (ou qualquer string segura)
NODE_ENV = production
```

**⚠️ IMPORTANTE:** Não deixar EXAMPLE_NAME - removê-la ou configurar corretamente.

### 🚀 Passo a Passo Final

#### 1. Clicar "Deploy" 
- As configurações já estão corretas
- O build será executado automaticamente

#### 2. Após Deploy Bem-Sucedido
1. Ir para **Settings** → **Domains**
2. Adicionar:
   - `lukaeventos.com.br`
   - `www.lukaeventos.com.br`

#### 3. Configurar DNS no Registrador
O Vercel fornecerá instruções específicas como:
```
A     lukaeventos.com.br     76.76.19.61
CNAME www                    cname.vercel-dns.com
```

### 🔧 Arquivos Já Preparados
- `vercel.json` ✅ Configurado com redirects SSL
- `package.json` ✅ Scripts de build prontos
- Código ✅ Otimizado para deploy Vercel

### ⏱️ Timeline Esperado
```
Agora: Deploy inicial (2-5 min)
Agora: Adicionar domínios custom (1 min)
Agora: Configurar DNS (5 min)
2-24h: Propagação DNS + SSL automático
```

### 🎯 Resultado Final
- **Site funcionando**: https://luka-eventos-website.vercel.app
- **Domínio custom**: https://lukaeventos.com.br ✅
- **www redirect**: https://www.lukaeventos.com.br → https://lukaeventos.com.br ✅
- **SSL válido**: Para ambos domínios ✅
- **0 erros 4XX**: Na auditoria SEO ✅

### 🆘 Se Der Erro no Build
```bash
# Comandos para testar localmente antes:
npm install
npm run build
npm run start

# Se funcionar local, funcionará no Vercel
```

### 📞 Suporte
- **Vercel Status**: https://vercel-status.com
- **Build Logs**: Disponíveis no dashboard do deploy
- **Troubleshooting**: Logs detalhados na aba "Functions"

**Seu projeto está 100% pronto para deploy no Vercel! 🚀**