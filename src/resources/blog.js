// Available subsection list for Blog.js: ['Tech', 'Design', 'Productivity', 'Career Growth', 'Accessibility']
// Available tags list for Blog.js: ['tech', 'programming', 'design', 'career', 'inspiration', 'accessibility', 'tutorials']

const blog = {
  name: 'Blogs',
  icon: '/resources/blog.svg',
  resources: [
    {
      title: 'CSS Tricks',
      link: 'https://css-tricks.com/',
      description:
        'A blog dedicated to CSS tips, tricks, and web design techniques.',
      imageUrl: 'https://css-tricks.com/favicon.svg',
      dateAdded: '2024-10-09',
      level: 'any',
      subsection: 'Design',
      tags: ['design', 'programming', 'tutorials'],
    },
    {
      title: 'Smashing Magazine',
      link: 'https://www.smashingmagazine.com/',
      description:
        'An online magazine for web designers and developers for useful and innovative information.',
      imageUrl: 'https://www.smashingmagazine.com/favicon.ico',
      dateAdded: '2024-11-22',
      level: 'any',
      subsection: 'Design',
      tags: ['design', 'programming', 'guides', 'tutorials'],
    },
  ],
};

export default blog;
