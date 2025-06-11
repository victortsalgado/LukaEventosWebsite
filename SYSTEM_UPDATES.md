# Sistema de Atualização Automática - Luka Eventos

## Como Funciona o Sistema

O site da Luka Eventos está configurado para **atualizar automaticamente** quando novas imagens ou vídeos são adicionados ao Object Storage. Não há necessidade de modificar código ou reiniciar o servidor.

## Estrutura de Pastas

O sistema busca arquivos nas seguintes pastas do Object Storage:

```
Object Storage/
├── Organização e Consultoria/     # Imagens de consultoria
├── Projeto 3D/                    # Renders e projetos 3D
├── Decoração/                     # Ambientação e decoração
├── Produção e Montagem/           # Vídeos e fotos de montagem
├── Buffet/                        # Serviços de catering
├── Locação/                       # Equipamentos alugados
├── Equipes/                       # Equipes especializadas
├── Ações Promocionais/            # Ativações de marca
├── Time Luka/                     # Fotos da equipe
├── Feiras/                        # Projetos de feira
└── outras pastas...
```

## Formatos Suportados

### Imagens
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### Vídeos
- `.mp4`, `.webm`, `.mov`

## Como Adicionar Novos Conteúdos

### 1. Adicionar Imagens
1. Faça upload das imagens para a pasta correspondente no Object Storage
2. **As imagens aparecerão automaticamente** no carrossel do serviço
3. O cache será atualizado a cada 10 minutos

### 2. Adicionar Vídeos
1. Para o serviço "Produção e Montagem", adicione vídeos na pasta `Produção e Montagem/`
2. O vídeo será detectado e reproduzido automaticamente
3. Se houver imagens na mesma pasta, elas aparecerão no carrossel

### 3. Novos Serviços
Para adicionar um novo serviço:
1. Crie uma nova pasta no Object Storage
2. Adicione as imagens/vídeos na pasta
3. Edite o arquivo `client/src/components/services.tsx` para incluir o novo serviço no array `servicesConfig`

## Recursos do Carrossel

### Controles do Usuário
- **Navegação manual**: Botões de seta para avançar/voltar
- **Reprodução automática**: Play/pause automático
- **Tela cheia**: Clique na imagem para visualização ampliada
- **Indicadores**: Pontos mostrando posição atual
- **Controles de teclado** (em tela cheia):
  - `←` / `→`: Navegar imagens
  - `Espaço`: Play/pause
  - `ESC`: Sair da tela cheia

### Comportamento Automático
- **Auto-rotação**: 4 segundos por imagem (pausável)
- **Pausa inteligente**: Para quando em tela cheia
- **Carregamento otimizado**: Lazy loading para performance
- **Fallbacks elegantes**: Gradientes personalizados se imagem não carregar

## Cache e Performance

### Sistema de Cache
- **Cache do servidor**: 10 minutos para listagem de arquivos
- **Cache do cliente**: 5 minutos para requisições
- **Otimização**: Reduz chamadas desnecessárias à API

### Atualizações Automáticas
- **Detecção automática**: Sistema verifica novos arquivos periodicamente
- **Sem intervenção**: Não precisa reiniciar servidor ou modificar código
- **Tempo de propagação**: Máximo 10 minutos para novas imagens aparecerem

## Solução de Problemas

### Imagem não aparece
1. Verifique se o arquivo está na pasta correta
2. Confirme o formato (jpg, png, gif, webp)
3. Aguarde até 10 minutos para o cache expirar
4. Verifique o console do navegador para erros

### Vídeo não reproduz
1. Confirme que está na pasta "Produção e Montagem"
2. Use formato MP4 preferencialmente
3. Tamanho recomendado: máximo 50MB
4. Verifique se não há caracteres especiais no nome

### Performance lenta
1. Otimize imagens antes do upload (recomendado: máximo 2MB)
2. Use formatos modernos (WebP quando possível)
3. Mantenha vídeos com boa compressão

## Monitoramento

### Logs do Sistema
O sistema registra todas as operações:
- `🔍 Buscando imagens da pasta: [nome]`
- `✅ Encontradas X imagens na pasta [nome]`
- `❌ Erro ao buscar imagens: [erro]`

### Verificação Manual
Para verificar o status do sistema, acesse:
- `/debug/storage` - Lista todos os arquivos
- Console do navegador - Mostra erros de carregamento

## Manutenção

### Limpeza de Cache
Para forçar atualização imediata:
1. Reinicie o servidor (automático no Replit)
2. Ou aguarde 10 minutos para expiração natural

### Backup
- Mantenha backup das imagens originais
- Object Storage é redundante, mas backup adicional é recomendado

---

**Nota**: Este sistema foi desenvolvido para máxima automação. Uma vez configurado, funciona independentemente sem necessidade de intervenção técnica.