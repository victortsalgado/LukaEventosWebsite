# Contribuindo para o Luka Eventos Website

Obrigado por considerar contribuir para o projeto! Este documento fornece diretrizes para contribuições.

## 🚀 Como Começar

1. **Fork o repositório**
2. **Clone seu fork localmente**
   ```bash
   git clone https://github.com/SEU_USUARIO/luka-eventos.git
   cd luka-eventos
   ```
3. **Instale as dependências**
   ```bash
   npm install
   ```
4. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

## 📋 Estrutura de Branches

- `main`: Branch principal com código de produção
- `develop`: Branch de desenvolvimento
- `feature/*`: Branches para novas funcionalidades
- `bugfix/*`: Branches para correções de bugs
- `hotfix/*`: Branches para correções urgentes

## 🛠️ Workflow de Desenvolvimento

1. **Crie uma branch para sua funcionalidade**
   ```bash
   git checkout -b feature/nome-da-funcionalidade
   ```

2. **Faça suas alterações**
   - Siga os padrões de código existentes
   - Adicione testes quando apropriado
   - Mantenha commits pequenos e descritivos

3. **Teste suas alterações**
   ```bash
   npm run dev          # Teste em desenvolvimento
   npm run build        # Teste o build de produção
   npm run type-check   # Verifique tipos TypeScript
   ```

4. **Commit suas alterações**
   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade"
   ```

5. **Push para seu fork**
   ```bash
   git push origin feature/nome-da-funcionalidade
   ```

6. **Abra um Pull Request**

## 📝 Padrões de Commit

Utilizamos o padrão [Conventional Commits](https://conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, ponto e vírgula, etc
- `refactor:` Refatoração de código
- `test:` Adição ou alteração de testes
- `chore:` Alterações em configurações, build, etc

### Exemplos:
```
feat: adiciona página de contato
fix: corrige navegação mobile
docs: atualiza README com instruções de deploy
style: ajusta espaçamento do header
refactor: reorganiza componentes de UI
test: adiciona testes para formulário de contato
chore: atualiza dependências
```

## 🎨 Padrões de Código

### TypeScript
- Use tipagem estrita
- Prefira interfaces over types quando possível
- Documente tipos complexos

### React
- Componentes funcionais com hooks
- Props tipadas com TypeScript
- Use memo() para componentes que renderizam frequentemente

### CSS/Tailwind
- Use classes utilitárias do Tailwind
- Mantenha responsividade mobile-first
- Organize classes por categoria (layout, spacing, colors, etc)

### Estrutura de Arquivos
```
client/src/
├── components/        # Componentes reutilizáveis
│   ├── ui/           # Componentes base (shadcn/ui)
│   └── common/       # Componentes comuns
├── pages/            # Páginas da aplicação
├── hooks/            # Custom hooks
├── lib/              # Utilitários e configurações
├── types/            # Definições de tipos
└── assets/           # Assets estáticos
```

## 🧪 Testes

- Escreva testes para novas funcionalidades
- Mantenha cobertura de testes acima de 80%
- Use Jest para testes unitários
- Use React Testing Library para testes de componentes

## 📚 Documentação

- Documente novas funcionalidades no README
- Adicione comentários em código complexo
- Mantenha comentários atualizados
- Use JSDoc para funções públicas

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

1. **Descrição clara** do problema
2. **Passos para reproduzir** o bug
3. **Comportamento esperado** vs **comportamento atual**
4. **Screenshots** (se aplicável)
5. **Informações do ambiente**:
   - Sistema operacional
   - Navegador e versão
   - Versão do Node.js

## 💡 Sugerindo Melhorias

Para sugerir melhorias:

1. **Verifique** se já não existe uma issue similar
2. **Descreva** a melhoria proposta
3. **Explique** os benefícios
4. **Considere** a complexidade de implementação

## 📋 Checklist para Pull Requests

Antes de abrir um PR, verifique:

- [ ] Código segue os padrões estabelecidos
- [ ] Testes passam localmente
- [ ] Build de produção funciona
- [ ] Documentação foi atualizada (se necessário)
- [ ] Commits seguem o padrão conventional
- [ ] Não há conflitos com a branch main
- [ ] PR tem descrição clara do que foi alterado

## 🔍 Processo de Review

1. **Revisão automática**: CI/CD executa testes
2. **Revisão manual**: Mantedores revisam o código
3. **Feedback**: Discussão e sugestões de melhorias
4. **Aprovação**: PR é aprovado e merged

## 🤝 Código de Conduta

- Seja respeitoso e profissional
- Aceite feedback construtivo
- Foque na melhoria do projeto
- Ajude outros contribuidores

## 📞 Dúvidas?

Se tiver dúvidas sobre como contribuir:

1. Abra uma issue com a tag `question`
2. Entre em contato via email: dev@lukaeventos.com.br
3. Consulte a documentação existente

---

Obrigado por contribuir com o projeto Luka Eventos! 🎉