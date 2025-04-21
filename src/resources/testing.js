// Available subsection list for Testing.js: ['General', 'Unit Testing', 'Integration Testing', 'End-to-End Testing']
// Available tags list for Testing.js: ['unit testing', 'automation', 'integration-testing', 'e2e testing', 'testing tools']

const testing = {
  name: 'Testing',
  icon: '/resources/testing.svg',
  resources: [
    {
      title: 'Cypress',
      link: 'https://www.cypress.io/',
      description:
        'Fast, easy, and reliable testing for anything that runs in a browser.',
      imageUrl: 'https://www.cypress.io/_astro/navbar-brand.D87396b0.svg',
      dateAdded: '2024-10-09',
      level: 'any',
      subsection: 'End-to-End Testing',
      tags: ['e2e testing', 'automation', 'testing tools'],
    },
    {
      title: 'Jest',
      link: 'https://jestjs.io/',
      description:
        'Delightful JavaScript testing framework with a focus on simplicity.',
      imageUrl: 'https://jestjs.io/img/favicon/favicon.ico',
      dateAdded: '2024-10-10',
      level: 'any',
      subsection: 'Unit Testing',
      tags: ['javascript', 'jest'],
    },
    {
      title: 'Testing Library',
      link: 'https://testing-library.com/',
      description: 'Lightweight library for testing UI components.',
      imageUrl: 'https://testing-library.com/img/octopus-64x64.png',
      dateAdded: '2024-10-12',
      level: 'any',
      subsection: 'Unit Testing',
      tags: ['javascript'],
    },
    {
      title: 'Puppeteer',
      link: 'https://pptr.dev/',
      description:
        'Node library which provides a high-level API to control Chrome or Chromium for automated testing.',
      imageUrl:
        'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png',
      dateAdded: '2024-10-13',
      level: 'intermediate',
      subsection: 'End-to-End Testing',
      tags: ['javascript', 'nodejs'],
    },
    {
      title: 'Mocha',
      link: 'https://mochajs.org/',
      description: 'Feature-rich JavaScript test framework running on Node.js.',
      imageUrl: 'https://mochajs.org/images/mocha-logo.svg',
      dateAdded: '2024-10-14',
      level: 'any',
      subsection: 'Unit Testing',
      tags: ['javascript'],
    },
    {
      title: 'Playwright',
      link: 'https://playwright.dev/',
      description:
        'Fast and reliable end-to-end testing framework for modern web apps.',
      imageUrl: 'https://playwright.dev/img/playwright-logo.svg',
      dateAdded: '2024-10-15',
      level: 'intermediate',
      subsection: 'End-to-End Testing',
      tags: ['javascript'],
    },
    {
      title: 'Selenium',
      link: 'https://www.selenium.dev/',
      description:
        'Powerful tool for controlling web browsers through programs and performing browser automation.',
      imageUrl: 'https://www.selenium.dev/images/selenium_logo_square_green.png',
      dateAdded: '2025-01-18',
      level: 'intermediate',
      subsection: 'End-to-End Testing',
      tags: ['e2e testing', 'automation', 'testing tools'],
    },
    {
      title: 'Vitest',
      link: 'https://vitest.dev/',
      description:
        'A blazing fast unit test framework powered by Vite, designed for modern JavaScript projects.',
      imageUrl: 'https://vitest.dev/logo.svg',
      dateAdded: '2025-04-21',
      level: 'any',
      subsection: 'Unit Testing',
      tags: ['javascript', 'vite'],
    },
  ],
};

export default testing;
