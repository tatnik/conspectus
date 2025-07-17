export default {
  imports: [`import { screen } from '@testing-library/react';`],
  props: {},
  tests: [
    {
      it: 'не рендерится если нет showPartNav или нет partNav',
      async: false,
      steps: `
        // Проверяем, что ничего не отрисовано
        expect(screen.queryByRole('button')).toBeNull();
      `,
    },
    {
      it: 'рендерит NavPopup если есть partNav и showPartNav',
      async: false,
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
      steps: `
        // Должен быть NavPopup
        expect(screen.getByRole('button')).toBeInTheDocument();
      `,
    },
  ],
};
