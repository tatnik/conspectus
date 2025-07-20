export default {
  // Дополнительные импорты для теста
  imports: [
    `import { screen } from '@testing-library/react';`,
    `import { NOT_FOUND } from 'src/constants';`,
    `// 1. Объявить mockUseParams ДО всех jest.mock
let mockUseParams = jest.fn();

// 2. Мокаем DataProvider
jest.mock('src/data/DataProvider', () => ({
  DataProvider: ({ renderContent }: { renderContent: (data: string) => React.ReactNode }) => renderContent('# Массивы'),
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
  mockContext: {
    currentPart: { id: 1, name: 'JavaScript', path: '/js' },
    siteNav: [
      { id: 0, name: 'Main', path: '/' },
      { id: 1, name: 'JavaScript', path: '/js' },
    ],
    partNavArray: [
      [], // 0 индекс — для id:0
      [{ id: 1, name: 'Основы', path: 'js/js_base' }],
      [{ id: 2, name: 'Массивы', path: 'js/js_array' }],
    ],
    showPartNav: true,
    setCurrentPart: '__JEST_FN__',
    setShowPartNav: '__JEST_FN__',
    setPartNavArray: '__JEST_FN__',
    loadPartNav: '__JEST_FN__',
    dataError: '',
    setDataError: '__JEST_FN__',
  },
  describe_header: [
    `  beforeEach(() => {
    mockUseParams.mockReturnValue({ path: '/js', fileName: 'js_array' });
  }); `,
  ],
  // Тесты для компонента
  tests: [
    {
      it: 'компонент рендерится',
      async: false,
    },
    {
      it: 'рендерит не пустой компонент',
      async: true,
      steps: `
        expect(screen.queryByText(NOT_FOUND)).not.toBeInTheDocument();
        const mess = await screen.findByText(/Массивы/i);
        expect(mess).toBeInTheDocument();
      `,
    },
    {
      it: 'рендерит NotFound для отсутствующей страницы',
      mockContext: {
        currentPart: { id: 1, name: 'JavaScript', path: '/js' },
        siteNav: [
          { id: 0, name: 'Main', path: '/' },
          { id: 1, name: 'Python', path: '/py' },
        ],
        partNavArray: [
          [], // 0 индекс — для id:0
          [{ id: 1, name: 'Основы', path: 'py/py_base' }],
          [{ id: 2, name: 'Массивы', path: 'py/py_array' }],
        ],
        showPartNav: true,
        setCurrentPart: '__JEST_FN__',
        setShowPartNav: '__JEST_FN__',
        setPartNavArray: '__JEST_FN__',
        loadPartNav: '__JEST_FN__',
        dataError: '',
        setDataError: '__JEST_FN__',
      },
      async: false,
      steps: `
        expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
      `,
    },
    {
      it: 'вызывает setCurrentPart и setShowPartNav при монтировании',
      steps: `
        // Проверяем, что setCurrentPart и setShowPartNav были вызваны с корректными аргументами
        expect(mockContext.setCurrentPart).toHaveBeenCalledWith(mockContext.siteNav[1]);
        expect(mockContext.setShowPartNav).toHaveBeenCalledWith(true);
      `,
    },
    {
      it: 'обновляет part при смене path в useParams',
      noRender: true,
      async: false,
      steps: `
      const { rerender } = renderWithProviders(<ContentPage />, { mockContext });
      mockUseParams.mockReturnValue({ path: '/js', fileName: 'js_base' });
      rerender(<ContentPage />);
      expect(screen.queryByText(NOT_FOUND)).not.toBeInTheDocument();

      mockUseParams.mockReturnValue({ path: 'bad_path', fileName: 'js_base' });
      rerender(<ContentPage />);
      expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
      `,
    },
  ],
};
