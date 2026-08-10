import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
  title: "Meshmetal Docs",
  description: "Deep Metric Learning for Petabase-Scale Sequence Similarity Search",
  mermaid: {
    // Increase padding around node text
    themeVariables: {
      nodePadding: 15,
    },
    flowchart: {
      padding: 20
    }
  },
  themeConfig: {
    nav: [
      { text: 'Introduction', link: '/' },
      { text: 'Getting Started', link: '/getting-started/' },
      { text: 'Indexing', link: '/indexing/' },
      { text: 'Query', link: '/query/' },
      { text: 'Components', link: '/components/brwt' },
    ],

    sidebar: [
      {
        text: 'Overview',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Architecture & Data Flow', link: '/architecture' }
        ]
      },
      {
        text: 'Getting Started',
        items: [
          { text: 'Quick Start Overview', link: '/getting-started/' },
          { text: 'Docker Guided Setup', link: '/getting-started/docker' },
          { text: 'Manual Installation', link: '/getting-started/manual-install' }
        ]
      },
      {
        text: 'Indexing Pipeline',
        items: [
          { text: 'Pipeline Overview', link: '/indexing/' },
          { text: '1. S3 Contig Download', link: '/indexing/download' },
          { text: '2. Sequence Encoding', link: '/indexing/encoding' },
          { text: '3. Hash Combining & Dedup', link: '/indexing/combining' },
          { text: '4. Matrix Annotation', link: '/indexing/annotation' },
          { text: '5. BRWT Construction', link: '/indexing/brwt' },
          { text: '6. FAISS Indexing', link: '/indexing/faiss-index' }
        ]
      },
      {
        text: 'Query & Search',
        items: [
          { text: 'Query Overview', link: '/query/' },
          { text: 'Hosting Query Servers', link: '/query/servers' },
          { text: 'Running Queries', link: '/query/running-queries' }
        ]
      },
      {
        text: 'Components Reference',
        items: [
          { text: 'BRWT Core', link: '/components/brwt' },
          { text: 'Standalone FAISS', link: '/components/standalone-faiss' },
          { text: 'Incremental Database Update', link: '/incremental-update' }
        ]
      },
      {
        text: 'Support',
        items: [
          { text: 'FAQ & Troubleshooting', link: '/faq' }
        ]
      }
    ],

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ytye2010/Meshmetal' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Meshmetal Team'
    },
    
  }
}))
