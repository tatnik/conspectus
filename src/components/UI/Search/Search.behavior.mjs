export default {
  imports: [`import { screen, fireEvent, waitFor } from '@testing-library/react';`],
  props: {},
  describe_header: [
    `beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        // Мок-данные для поиска
      ]),
    } as unknown as Response)
  );
});`,
    `afterEach(() => {
  jest.restoreAllMocks();
});`,
  ],
  tests: [
    {
      it: 'отображает метку поиска',
      async: false,
      steps: `
        // Метка поиска присутствует и имеет qa="search-label"
      const label = document.querySelector('[data-qa="search-label"]');
      expect(label).toBeInTheDocument();      `,
    },
    {
      it: 'отображает поле поиска',
      async: false,
      steps: `
        // Input для поиска присутствует и имеет data-qa="search-input"
      const input = document.querySelector('[data-qa="search-input"]');
      expect(input).toBeInTheDocument();      `,
    },
    {
      it: 'показывает индикатор загрузки во время загрузки индекса',
      async: false,
      steps: `
        expect(screen.getByText('Загрузка...')).toBeInTheDocument();
      `,
    },
    {
      it: 'отображает ошибку при ошибке загрузки индекса',
      async: true,
      test_header: [
        `
     global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
       } as unknown as Response)
    );`,
      ],
      steps: `
    const error = await screen.findByText(/ошибка/i);
    expect(error).toBeInTheDocument();
`,
    },
    {
      it: 'показывает NavPopup при наличии результатов поиска',
      async: true,
      test_header: [
        `global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: "h2-создание-нового-массива",
        text: "создание нового массива",
        level: 2,
        link: "/js/js_arrays#h2-создание-нового-массива",
        breadcrumbs: "Методы для работы с массивами / создание нового массива" },
    ]),
  } as unknown as Response)
);`,
      ],
      steps: `
    const input = document.querySelector('[data-qa="search-input"] input');
    fireEvent.change(input, { target: { value: 'массив' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    expect(screen.getByText("Методы для работы с массивами / создание нового массива")).toBeInTheDocument();
  `,
    },
    {
      it: 'показывает "Не найдено" при отсутствии результатов',
      async: true,
      test_header: [
        `global.fetch = jest.fn(() =>
          Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
              { link: '/python/if', text: 'if else', level: 2, breadcrumbs: 'Python > Условия' },
            ]),
          } as unknown as Response)
        );`,
      ],
      steps: `
    const input = document.querySelector('[data-qa="search-input"] input');
    fireEvent.change(input, { target: { value: 'qwertyuiop' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    expect(await screen.findByText(/найдено/i)).toBeInTheDocument();
  `,
    },
  ],
};
