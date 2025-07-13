export default {
  imports: [`import { screen } from '@testing-library/react';`],
  // дефолтные props для тестов, где не указан свой props
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
    // Можно и без props — тогда возьмётся из behavior.props
    {
      it: 'применяет класс активного элемента для активного пути',
      async: false,
      steps: `
        const items = screen.getAllByRole('listitem');
        expect(items[0].className).toContain('activeLink');
      `,
    },
  ],
};
