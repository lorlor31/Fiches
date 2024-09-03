import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  ignoreDeadLinks: true,
  title: "Fiches Dev Web",
  description: "Dev Web tutorials",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/index' },
      { text: 'Feat.', link: '/menus/les_autres' },
    ],

    sidebar: [
      {
        text: 'Navigation Rapide',
        items: [
          { text: 'WordPress', link: '/menus/WP' },
          { text: 'MEP', link: '/menus/mep' },
          { text: 'Laravel', link: '/menus/laravel' },
          { text: 'React', link: '/menus/cecile' },
          { text: 'Docker', link: '/menus/baptiste' },
          { text: 'CI-CD', link: '/menus/cicd' },
          { text: 'Symfony', link: '/menus/symfony' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lorlor31' }
    ]

      
    
  }

})
