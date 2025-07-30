# Guia de Limpeza e Configuração DNS

## Status Atual Analisado
Vejo muitos registros antigos que podem causar conflitos. Vamos limpar e configurar apenas o necessário.

## Passo 1: REMOVER Registros Desnecessários

### ❌ Registros para DELETAR (clique no X):
1. **A lukaeventos.com.br 34.111.175.208** ❌ (antigo)
2. **Todos os MX** (registros de email) ❌ - se não usar email
3. **Vários TXT** desnecessários ❌ 
4. **CNAMEs antigos do SendGrid** ❌ (se não usar mais)
5. **CNAME www.lukaeventos.com.br → lukaeventos.com.br** ❌ (conflita com Vercel)

### ✅ Registros para MANTER:
- **A lukaeventos.com.br 216.198.79.1** ✅ (este é do Vercel)
- **CNAME www.lukaeventos.com.br 0c7cdc82a54223f96.vercel-dns-017.com** ✅

## Passo 2: Adicionar Registro Correto do Vercel

Na seção "Nova entrada" que vejo na parte inferior:

### Registro 1: Domínio Principal (se não existir)
```
Tipo: A
Nome: lukaeventos.com.br (ou deixe vazio se o campo for "@")
Nome do servidor: 216.198.79.1
```

### Registro 2: Subdomínio WWW 
```
Tipo: CNAME  
Nome: www.lukaeventos.com.br
Nome do servidor: 0c7cdc82a54223f96.vercel-dns-017.com
```

## Configuração Limpa Final

### Depois da limpeza, você deve ter APENAS:
```
A     lukaeventos.com.br     216.198.79.1
CNAME www                    0c7cdc82a54223f96.vercel-dns-017.com
```

## Passos Específicos no Seu Painel

### 1. Remover Registros Antigos
- Clicar no **X** ao lado de cada registro desnecessário
- **Confirmar exclusão** quando solicitado

### 2. Verificar Registros Corretos
- **A lukaeventos.com.br 216.198.79.1** deve existir
- **CNAME www.lukaeventos.com.br 0c7cdc82a54223f96.vercel-dns-017.com** deve existir

### 3. Adicionar se Necessário
Na seção "Nova entrada":
- **Tipo**: CNAME
- **Nome**: www.lukaeventos.com.br  
- **Nome do servidor**: 0c7cdc82a54223f96.vercel-dns-017.com
- Clicar **ADICIONAR**

### 4. Salvar Alterações
- Clicar **SALVAR ALTERAÇÕES**
- Aguardar confirmação

## Registros de Email (Opcional)

### Se Usar Email @lukaeventos.com.br
Manter apenas os MX necessários:
```
MX lukaeventos.com.br [servidor_de_email] (prioridade 10)
```

### Se NÃO Usar Email
Deletar todos os registros MX, TXT do SendGrid, etc.

## Verificação Pós-Configuração

### Comandos de Teste
```bash
# Verificar A record
nslookup lukaeventos.com.br
# Deve retornar: 216.198.79.1

# Verificar CNAME
nslookup www.lukaeventos.com.br  
# Deve retornar: 0c7cdc82a54223f96.vercel-dns-017.com
```

### Ferramentas Online
- https://www.whatsmydns.net/
- Digite lukaeventos.com.br
- Verificar se resolve para 216.198.79.1

## Timeline Esperado

```
Agora: Limpeza DNS (5 minutos)
Agora: Salvar alterações (30 segundos)
15-30 min: Propagação inicial
2-6 horas: Propagação majoritária  
12-24 horas: SSL automático ativo no Vercel
```

## Resultado Final

### Após Propagação
- **https://lukaeventos.com.br** → Redireciona para www
- **https://www.lukaeventos.com.br** → Site carregado com SSL válido
- **Status no Vercel**: Active ✅
- **SSL Certificate**: Issued ✅

## Troubleshooting

### Se DNS Não Resolver
- **Aguardar mais tempo**: Pode levar até 24h
- **Verificar valores exatos**: Sem espaços extras
- **Limpar cache DNS local**: `ipconfig /flushdns` (Windows)

### Se SSL Não Ativar
- **Pré-requisito**: DNS deve resolver primeiro
- **Automático**: Vercel emite SSL após DNS funcionar
- **Paciência**: Processo pode levar algumas horas

**O importante é ter apenas os 2 registros do Vercel e remover todos os conflitantes!**