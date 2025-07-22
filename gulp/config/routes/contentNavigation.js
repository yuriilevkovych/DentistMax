export const contentNavigation = [
  {
    name: 'Übersicht',
    route: '#',
  },
  {
    name: 'Beh.blatt',
    route: '#',
  },
  {
    name: 'Pläne',
    route: '#',
    active: true,
    pages: [
      {
        name: 'ze',
        route: '/pages/ze/1-grants.html',
      },
      {
        name: 'par',
        route: '/pages/par/1-assessments.html',
      },
      {
        name: 'kbr',
        route: '/pages/kbr/1-services.html',
      },
      {
        name: 'kch',
        route: '#',
      },
    ],
  },
  {
    name: 'Dokumente',
    route: '#',
  },
  {
    name: 'Anhänge',
    route: '#',
  },
  {
    name: 'Kontakt',
    route: '#',
  },
];
