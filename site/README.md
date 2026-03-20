# RehabPro · Prescrição Protética

Ferramenta clínica para avaliação funcional de amputados e prescrição de componentes protéticos.

## Estrutura de ficheiros

```
site/
├── index.html          ← Página inicial com fotos e apresentação
├── ferramenta.html     ← Formulário de avaliação (AMPnoPRO + 5 blocos)
├── resultado.html      ← Relatório clínico gerado automaticamente
├── css/
│   └── style.css       ← Estilos partilhados por todas as páginas
└── js/
    └── app.js          ← Lógica AMPnoPRO, K-Level e cálculo de prescrição
```

## Como publicar no GitHub Pages

1. Cria uma conta em [github.com](https://github.com) (se ainda não tens)
2. Clica em **"New repository"** → dá um nome (ex: `rehabpro`)
3. Faz upload de **todos os ficheiros** desta pasta (mantendo a estrutura de pastas)
4. Vai a **Settings → Pages**
5. Em "Branch", seleciona `main` e pasta `/ (root)`
6. Clica **Save**

O teu site ficará disponível em:
`https://[teu-username].github.io/rehabpro/`

## Adicionar as tuas próprias fotos

Para substituir as imagens do Unsplash pelas tuas:

1. Cria uma pasta `images/` dentro de `site/`
2. Coloca as tuas fotos lá (ex: `foto1.jpg`, `foto2.jpg`, etc.)
3. No `index.html`, substitui os URLs do Unsplash por caminhos locais:
   ```html
   <!-- Antes -->
   src="https://images.unsplash.com/..."
   
   <!-- Depois -->
   src="images/foto1.jpg"
   ```

## Tecnologias

- HTML5 semântico
- CSS3 com variáveis e Grid/Flexbox
- JavaScript vanilla (sem frameworks)
- Fontes: Sora + DM Mono (Google Fonts)
- Dados passados entre páginas via `sessionStorage`

## Aviso legal

Ferramenta de apoio à decisão clínica. Uso exclusivo por profissionais de saúde.
Não substitui o julgamento clínico do médico especialista.
