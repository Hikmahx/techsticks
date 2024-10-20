// Available subsection list for Accessibility.js: ['General', 'Web', 'Mobile', 'Screen Readers', 'Tools', 'Guides']
// Available tags list for Accessibility.js: ['wcag', 'inclusive design', 'color contrast']

const accessibility = {
  name: 'Accessibility',
  icon: '/resources/accessibility.svg',
  resources: [
    {
      title: 'Deque University',
      link: 'https://dequeuniversity.com/',
      description:
        'Offers in-depth accessibility training and courses for developers, designers, and content creators, focusing on web and mobile accessibility.',
      imageUrl:
        'https://dequeuniversity.com/assets/images/logos/deque_university_wordmark_white.png',
      dateAdded: '2024-10-15',
      level: 'any',
      subsection: 'General',
      tags: ['wcag', 'inclusive design'],
    },
    {
      title: 'ARIA Authoring Practices',
      link: 'https://www.w3.org/WAI/ARIA/apg/',
      description: 'Guidelines for using ARIA (Accessible Rich Internet Applications) to enhance accessibility.',
      imageUrl: 'https://www.w3.org/WAI/favicon.ico',
      dateAdded: '2024-10-11',
      level: 'any',
      subsection: 'Assistive Technologies',
      tags: ['aria', 'a11y'],
    },
  ],
};

export default accessibility;
