export default {
  imports: [
    `import { screen } from '@testing-library/react';`,
    `import { NOT_FOUND } from 'src/constants';`,
  ],
  header: [
    `// 1. Объявить mockUseParams ДО всех jest.mock
let mockUseParams = jest.fn();

// 2. Мокаем DataProvider
jest.mock('src/data/DataProvider', () => ({
  DataProvider: ({ renderContent }: { renderContent: (data: string) => React.ReactNode }) => renderContent('## [Основы](/js/js_base)'),
}));

// 3. Мокаем useParams через mockUseParams
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useParams: (...args: unknown[]) => mockUseParams(...args),
  };
});`,
  ],
  props: {},
  mockContext: {
    siteNav: [
      { id: 0, name: 'Main', path: '/' },
      { id: 1, name: 'JavaScript', path: '/js' },
      { id: 2, name: 'Python', path: '/py' },
    ],
    setCurrentPart: '__JEST_FN__',
    setShowPartNav: '__JEST_FN__',
  },
  describe_header: [
    `  beforeEach(() => {
    mockUseParams.mockReturnValue({ path: '/js' });
  }); `,
  ],
  tests: [
    {
      it: 'рендерит IndexPage для корректного раздела',
      steps: `
        // Ожидаем, что IndexPage отображает раздел
        expect(screen.queryByText(NOT_FOUND)).not.toBeInTheDocument();
        // Есть элемент с классом IndexPage
        expect(document.querySelector('.IndexPage')).toBeInTheDocument();
      `,
      async: false,
    },
    {
      it: 'рендерит NotFound для несуществующего раздела',
      test_header: [
        // useParams возвращает невалидный путь
        `mockUseParams.mockReturnValue({ path: 'invalid' });`,
      ],
      steps: `
        // Ожидаем компонент NotFound
        expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
      `,
      async: false,
    },
    {
      it: 'корректно передаёт renderContent для NavList',
      steps: `
        // Проверяем, что список навигации отрисован
        expect(screen.getByRole('list')).toBeInTheDocument();
      `,
      async: false,
    },
    {
      it: 'отображает элемент списка навигации',
      steps: `
        // Ожидаем, что текст элемента из nav присутствует (mock index содержит "nav-1", "nav-2")
        expect(screen.getByText('Основы')).toBeInTheDocument();
      `,
      async: false,
    },
  ],
};
