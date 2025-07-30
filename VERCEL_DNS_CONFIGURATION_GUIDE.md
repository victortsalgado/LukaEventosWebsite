# Configuração DNS - Vercel Domain Setup

## Status Atual ✅
- **Domínio adicionado**: lukaeventos.com.br
- **Configuração**: Connect to Production ✅
- **Redirect configurado**: lukaeventos.com.br to www.lukaeventos.com.br ✅

## Próximos Passos

### 1. Clicar "Save" para Confirmar
- Finalizar a adição do domínio
- Vercel gerará instruções DNS específicas

### 2. Adicionar Segundo Domínio (www)
Após salvar o primeiro, adicionar:
- `www.lukaeventos.com.br`
- **NÃO marcar redirect** (será o domínio principal)

### 3. Instruções DNS que Aparecerão
O Vercel fornecerá algo similar a:

```dns
# Para lukaeventos.com.br
Type: A
Name: @
Value: 76.76.19.61

# Para www.lukaeventos.com.br  
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 4. Onde Configurar DNS
**No painel do registrador do domínio:**
1. Localizar seção "DNS Management" ou "Zone Editor"
2. Substituir registros existentes pelos fornecidos pelo Vercel
3. Aguardar propagação (5 minutos a 24 horas)

### 5. Verificação de Status
Após configurar DNS, o Vercel mostrará:
- **Status**: Active ✅
- **SSL Certificate**: Issued ✅
- **HTTPS**: Enabled ✅

## Configuração Recomendada

### Estratégia de Redirect Otimizada
Baseado no que vejo na imagem:
- ✅ **lukaeventos.com.br** → redireciona para www
- ✅ **www.lukaeventos.com.br** → domínio principal

Esta é uma configuração válida que funcionará perfeitamente.

### Headers de Segurança (Já Configurados)
O arquivo `vercel.json` já inclui:
- HSTS para HTTPS forçado
- Security headers completos
- Redirects automáticos

## Timeline Esperado

```
Agora: Clicar "Save" (30 segundos)
Agora: Adicionar www.lukaeventos.com.br (1 minuto)
Agora: Receber instruções DNS (imediato)
Hoje: Configurar DNS no registrador (5 minutos)
2-24h: Propagação DNS + SSL automático
```

## Resultado Final

### Após DNS Configurado
```
✅ https://lukaeventos.com.br → https://www.lukaeventos.com.br
✅ https://www.lukaeventos.com.br → Site carregado com SSL válido
✅ Certificado SSL válido para ambos domínios
✅ 0 páginas com problemas 4XX na auditoria
```

### Teste de Funcionamento
```bash
# Verificar resolução DNS
nslookup lukaeventos.com.br
nslookup www.lukaeventos.com.br

# Testar redirects
curl -I https://lukaeventos.com.br
curl -I https://www.lukaeventos.com.br
```

## Troubleshooting

### Se DNS Demorar
- **Propagação normal**: até 24 horas
- **Verificar**: https://www.whatsmydns.net/
- **Status Vercel**: Dashboard mostrará "Pending" → "Active"

### Se SSL Não Ativar
- **Aguardar DNS**: SSL só ativa após DNS resolver
- **Verificar registros**: Devem apontar exatamente para Vercel
- **Patience**: Processo automático, pode levar algumas horas

## Suporte
- **Vercel Docs**: https://vercel.com/docs/concepts/projects/domains
- **DNS Checker**: https://www.whatsmydns.net/
- **SSL Test**: https://www.ssllabs.com/ssltest/

**Você está no caminho certo! Após clicar "Save", o Vercel fornecerá as instruções DNS específicas.**