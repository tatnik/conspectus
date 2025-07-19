export default {
  imports: [`import { screen } from '@testing-library/react';`],
  // Дефолтные props для всех тестов, где явно не указаны свои props
  props: {
    navLinkArray: [
      { id: 1, name: 'Link1', path: '/' },
      { id: 2, name: 'Link2', path: '/about' },
    ],
    classNameList: 'nav',
    renderProps: '__INLINE_FUNC__:(val) => val.name',
  },
  tests: [
    {
      it: 'отрисовывает все navLinkArray как ссылки',
      async: false,
      steps: `
        const links = screen.getAllByRole('link');
        expect(links.length).toBe(2);
        expect(links[0]).toHaveTextContent('Link1');
        expect(links[1]).toHaveTextContent('Link2');
      `,
    },
    {
      it: 'вызывает renderProps для каждого элемента',
      async: false,
      props: {
        navLinkArray: [
          { id: 1, name: 'Link1', path: '/' },
          { id: 2, name: 'Link2', path: '/about' },
        ],
        classNameList: 'nav',
        renderProps: '__JEST_FN__',
      },
      steps: `
        expect(renderProps).toHaveBeenCalledTimes(2);
      `,
    },
    {
      it: 'применяет класс активного элемента для активного пути',
      async: false,
      steps: `
        const items = screen.getAllByRole('listitem');
        expect(items[0].className.split(' ')).toContain('active');
      `,
    },
  ],
};
