import config from '~/config.json';

export const navLinks = [
  {
    label: 'Details',
    pathname: '/#details',
  },
  {
    label: 'Projects',
    pathname: '/#project-1',
  },
  {
    label: 'Experience',
    pathname: '/#experience',
  },
  {
    label: 'My Tech Stack',
    pathname: '/#tech-stack',
  },
  {
    label: 'Contact',
    pathname: '/contact',
  },
];

export const socialLinks = [
  {
    label: 'Github',
    url: `https://github.com/${config.github}`,
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    url: `https://www.linkedin.com/in/${config.linkedin}/`,
    icon: 'linkedin',
  },
  {
    label: 'LeetCode',
    url: `https://leetcode.com/u/${config.leetcode}/`,
    icon: 'leetcode',
  },
  {
    label: 'CodeChef',
    url: `https://www.codechef.com/users/${config.codechef}`,
    icon: 'codechef',
  },
];
