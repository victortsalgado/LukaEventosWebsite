# Configuração SSL e Domínios - Luka Eventos

## Status Atual da Configuração SSL

### Domínio Principal ✅
- **lukaeventos.com.br**: SSL válido e funcionando
- **Certificado**: Inclui apenas o domínio principal
- **HTTPS**: Totalmente funcional

### Subdomínio WWW ❌
- **www.lukaeventos.com.br**: SSL inválido
- **Problema**: Certificado não inclui Subject Alternative Name para www
- **Erro**: `SSL: no alternative certificate subject name matches target hostname`

## Soluções Implementadas

### 1. Redirecionamento www → não-www ✅
```javascript
// Middleware implementado em server/index.ts
if (host && host.startsWith('www.')) {
  const newHost = host.slice(4); // Remove 'www.'
  const redirectUrl = `${protocol}://${newHost}${req.originalUrl}`;
  return res.redirect(301, redirectUrl);
}
```

### 2. Force HTTPS em Produção ✅
```javascript
// Força redirecionamento HTTP → HTTPS
if (NODE_ENV === 'production' && protocol !== 'https') {
  const redirectUrl = `https://${host}${req.originalUrl}`;
  return res.redirect(301, redirectUrl);
}
```

### 3. Headers de Segurança SSL ✅
```javascript
// HSTS para forçar HTTPS futuro
res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

// Headers de segurança adiccionais
res.setHeader('X-Content-Type-Options', 'nosniff');
res.setHeader('X-Frame-Options', 'SAMEORIGIN');
res.setHeader('X-XSS-Protection', '1; mode=block');
```

### 4. Configuração de Sessão Segura ✅
```javascript
cookie: {
  secure: NODE_ENV === "production", // HTTPS only em produção
  httpOnly: true,                    // Previne XSS
  maxAge: 24 * 60 * 60 * 1000       // 24 horas
}
```

## Configuração DNS Necessária

### Situação Atual
- **lukaeventos.com.br**: Configurado e funcionando
- **www.lukaeventos.com.br**: Sem registro DNS

### Configuração Recomendada
Para resolver completamente o problema SSL, é necessário:

1. **Adicionar registro CNAME para www**:
   ```
   CNAME: www.lukaeventos.com.br → lukaeventos.com.br
   ```

2. **Solicitar certificado SSL que inclua ambos**:
   - lukaeventos.com.br (atual)
   - www.lukaeventos.com.br (necessário)

## Arquivo SEO Atualizados

### robots.txt ✅
- Localização: `public/robots.txt`
- Status: Funcionando em produção
- Conteúdo: Permite todos os crawlers e define sitemap

### sitemap.xml ✅
- Localização: Definido em middleware
- URLs: Todas as páginas principais do site
- HTTPS: Todos os links utilizam HTTPS

### llms.txt ✅
- Localização: Definido em middleware
- Política: Acesso para LLMs com restrições apropriadas

## Comportamento Esperado

### Cenário 1: Usuário acessa https://lukaeventos.com.br/
- **Resultado**: Acesso direto ✅
- **SSL**: Válido e seguro ✅

### Cenário 2: Usuário acessa http://lukaeventos.com.br/
- **Resultado**: Redirecionamento 301 para HTTPS ✅
- **SSL**: Forçado para versão segura ✅

### Cenário 3: Usuário acessa https://www.lukaeventos.com.br/
- **Resultado**: Erro SSL no navegador ❌
- **Solução**: Redirecionamento via JavaScript ou aviso ⚠️

### Cenário 4: Usuário acessa http://www.lukaeventos.com.br/
- **Resultado**: Redirecionamento 301 para https://lukaeventos.com.br/ ✅
- **SSL**: Funciona após redirecionamento ✅

## Próximos Passos

### Imediato (Código) ✅
- [x] Middleware de redirecionamento implementado
- [x] Headers de segurança SSL configurados
- [x] Force HTTPS em produção
- [x] Sessões seguras configuradas

### Infraestrutura (Provedor)
- [ ] Configurar CNAME para www no DNS
- [ ] Solicitar certificado SSL que inclua www
- [ ] Verificar configuração de proxy/load balancer

### Validação Pós-Deploy
- [ ] Testar https://lukaeventos.com.br/ (deve funcionar)
- [ ] Testar http://lukaeventos.com.br/ (deve redirecionar)
- [ ] Testar www.lukaeventos.com.br (deve redirecionar após DNS)
- [ ] Verificar headers de segurança em produção

## Comandos de Teste

```bash
# Testar domínio principal
curl -I https://lukaeventos.com.br/

# Testar redirecionamento HTTP→HTTPS
curl -I http://lukaeventos.com.br/

# Testar www (após configuração DNS)
curl -I https://www.lukaeventos.com.br/

# Verificar certificado SSL
openssl s_client -connect lukaeventos.com.br:443 -servername lukaeventos.com.br
```

## Nota Importante

O problema principal está na **infraestrutura de certificado SSL**, não no código da aplicação. O código está configurado corretamente para:

1. Redirecionar www → não-www
2. Forçar HTTPS em produção
3. Aplicar headers de segurança apropriados
4. Manter sessões seguras

A solução completa requer configuração no nível de DNS/certificado pelo provedor de hospedagem.

**Status**: Código otimizado ✅ | Infraestrutura pendente ⚠️