export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {
    isMainPage: false,
    isPartIndexPage: true,
  },
  mockContext: {
    currentPart: { id: 1, name: 'Раздел', path: '/section' },
    siteNav: [
      { id: 0, name: 'Main', path: '/' },
      { id: 1, name: 'Раздел', path: '/section' },
    ],
    partNavArray: [
      [], // 0 индекс — для id:0
      [{ id: 1, name: 'Conspect', path: '/test/conspect' }], // 1 индекс — для id:1
    ],
    showPartNav: true,
    setCurrentPart: '__JEST_FN__',
    setShowPartNav: '__JEST_FN__',
    setPartNavArray: '__JEST_FN__',
    loadPartNav: '__JEST_FN__',
    dataError: '',
    setDataError: '__JEST_FN__',
  },
  tests: [
    {
      it: 'рендерит название раздела без ссылки для индексной страницы',
      async: false,
      steps: `
        const text = screen.getByText(/.+/); // Любое имя раздела
        expect(text.closest('a')).toBeNull();
      `,
    },
    {
      it: 'рендерит ссылку на индексную страницу раздела если не индексная',
      async: false,
      props: {
        isMainPage: false,
        isPartIndexPage: false,
      },
      steps: `
        const link = screen.getByRole('link');
        expect(link).toBeInTheDocument();
      `,
    },
    {
      it: 'не рендерится на главной странице',
      async: false,
      props: {
        isMainPage: true,
      },
      steps: `
        // Не должен ничего рендерить
        expect(screen.queryByText(/.+/)).toBeNull();
      `,
    },
  ],
};
