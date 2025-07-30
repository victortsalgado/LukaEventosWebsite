# Instruções DNS - Configuração Final

## Dados Fornecidos pelo Vercel ✅

### Para lukaeventos.com.br
```
Type: A
Name: @ (ou lukaeventos.com.br)
Value: 216.198.791
```

### Para www.lukaeventos.com.br  
```
Type: CNAME
Name: www
Value: 0c7cdc82a54223f96.vercel-dns-017.com
```

## Onde Configurar DNS

### 1. Acessar Painel do Registrador
- Acessar o site onde o domínio lukaeventos.com.br foi registrado
- Fazer login na conta
- Procurar seção "DNS", "Zone Editor" ou "Gerenciamento DNS"

### 2. Substituir Registros Existentes

#### Remover Registros Antigos
- Deletar qualquer registro A existente para lukaeventos.com.br
- Deletar qualquer registro CNAME existente para www

#### Adicionar Novos Registros
```dns
# Registro 1: Domínio principal
Type: A
Host/Name: @ (ou deixar vazio, ou lukaeventos.com.br)
Value/Points to: 216.198.791
TTL: 3600 (ou padrão)

# Registro 2: Subdomínio www
Type: CNAME  
Host/Name: www
Value/Points to: 0c7cdc82a54223f96.vercel-dns-017.com
TTL: 3600 (ou padrão)
```

### 3. Salvar Alterações
- Clicar "Save", "Apply" ou "Salvar Alterações"
- Aguardar confirmação do registrador

## Registradores Comuns - Interface

### Registro.br (Domínios .br)
1. Acessar https://registro.br
2. Login → Meus Domínios
3. Selecionar lukaeventos.com.br
4. DNS → Editar Zona
5. Adicionar registros conforme acima

### GoDaddy
1. DNS Management
2. Adicionar Registro → A Record
3. Host: @, Aponta para: 216.198.791
4. Adicionar Registro → CNAME
5. Host: www, Aponta para: 0c7cdc82a54223f96.vercel-dns-017.com

### Cloudflare (se estiver usando)
1. DNS → Records
2. Add Record → A
3. Name: @, IPv4: 216.198.791
4. Add Record → CNAME
5. Name: www, Target: 0c7cdc82a54223f96.vercel-dns-017.com

## Verificação da Configuração

### Comandos de Teste
```bash
# Verificar registro A
nslookup lukaeventos.com.br
# Deve retornar: 216.198.791

# Verificar registro CNAME
nslookup www.lukaeventos.com.br
# Deve retornar: 0c7cdc82a54223f96.vercel-dns-017.com
```

### Ferramentas Online
- **DNS Checker**: https://www.whatsmydns.net/
- **DNS Lookup**: https://mxtoolbox.com/DNSLookup.aspx
- **Propagation Check**: https://dnschecker.org/

## Timeline de Propagação

```
0-5 min: Registros salvos no registrador
5-30 min: Propagação inicial (alguns servidores)
2-6 horas: Propagação majoritária (70-90% mundial)
12-24 horas: Propagação completa (99% mundial)
```

## Monitoramento no Vercel

### Status Esperado
Após DNS configurado, no dashboard Vercel:
```
lukaeventos.com.br
Status: Active ✅
SSL Certificate: Issued ✅

www.lukaeventos.com.br  
Status: Active ✅
SSL Certificate: Issued ✅
```

### Se Aparecer "Invalid Configuration"
- **Aguardar**: DNS pode levar até 24h para propagar
- **Verificar**: Registros foram adicionados corretamente
- **Testar**: Usar ferramentas de verificação DNS
- **Refresh**: Clicar botão "Refresh" no dashboard Vercel

## Resultado Final Esperado

### Após Propagação Completa
```bash
# Teste 1: Domínio principal
curl -I https://lukaeventos.com.br
# Esperado: HTTP/2 200 OK + redirect para www

# Teste 2: Subdomínio www
curl -I https://www.lukaeventos.com.br  
# Esperado: HTTP/2 200 OK + site carregado

# Teste 3: SSL válido
openssl s_client -connect lukaeventos.com.br:443
# Esperado: Certificado Let's Encrypt válido
```

### No Navegador
- **https://lukaeventos.com.br** → Redireciona para www
- **https://www.lukaeventos.com.br** → Site carregado com cadeado verde
- **Erro SSL eliminado** → "Sua conexão não é particular" desaparece
- **Auditoria SEO** → 0 páginas com problemas 4XX

## Troubleshooting

### DNS Não Propaga
- **Verificar TTL**: Valores muito altos demoram mais
- **Limpar Cache**: DNS local pode estar em cache
- **Aguardar**: Propagação pode levar até 48h em casos extremos

### SSL Não Ativa
- **Pré-requisito**: DNS deve resolver corretamente primeiro
- **Automatic**: Vercel emite SSL automaticamente após DNS
- **Tempo**: SSL geralmente ativa 5-15 min após DNS resolver

### Registros Incorretos
- **Verificar exatos**: Valores devem ser exatamente como fornecidos
- **Sem espaços**: Cuidado com espaços em branco extras
- **Copiar/colar**: Evitar digitação manual dos valores

## Suporte

### Documentação
- **Vercel**: https://vercel.com/docs/concepts/projects/domains
- **DNS**: https://developers.cloudflare.com/dns/

### Contato
- **Registrador**: Suporte do provedor onde domínio foi comprado
- **Vercel**: help@vercel.com para problemas de SSL
- **DNS**: Suporte técnico do registrador para configuração

**Agora é só configurar o DNS no registrador usando estes valores exatos e aguardar a propagação!**