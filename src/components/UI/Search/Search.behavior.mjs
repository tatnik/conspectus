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
      it: 'отображает поле поиска',
      async: false,
      steps: `
        // Поле поиска (input) есть на странице с label "Поиск:"
        expect(screen.getByLabelText('Поиск:')).toBeInTheDocument();
      `,
    },
    {
      it: 'показывает индикатор загрузки во время загрузки индекса',
      async: false,
      // loading=true можно замокать через state или отдельно (зависит от способа рендера)
      steps: `
        // Проверяет, что отображается индикатор загрузки
        expect(screen.getByText('Загрузка...')).toBeInTheDocument();
      `,
    },
    {
      it: 'отображает ошибку при ошибке загрузки индекса',
      async: true,
      // error можно подставить через state/mock, если используешь тестовую обертку
      // Вручную задаём query и ошибку — проверить, что появляется ошибка
      test_header: [
        `
     // Мокаем fetch — возвращает ошибку
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
       } as unknown as Response)
    );`,
      ],
      steps: `
    // Ждём появления текста ошибки
    const error = await screen.findByText(/ошибка/i);
    expect(error).toBeInTheDocument();
`,
    },
    {
      it: 'показывает NavPopup при наличии результатов поиска',
      async: true,
      test_header: [
        `// Мокаем fetch — отдаём индекс с одним элементом
global.fetch = jest.fn(() =>
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
    // Вводим поисковый запрос, совпадающий с индексом
    fireEvent.change(screen.getByLabelText('Поиск:'), { target: { value: 'массив' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    // Проверяем, что появляется NavPopup (ищем по кнопке — popup внутри кнопки)
    const arrowButtons = await screen.findAllByRole('button');
    const navPopupBtn = arrowButtons.find((btn) =>
        btn.querySelector('.yc-arrow-toggle')
    );
    expect(navPopupBtn).toBeInTheDocument();
  `,
    },

    {
      it: 'показывает "Не найдено" при отсутствии результатов',
      async: true,
      test_header: [
        `// Мокаем fetch — отдаём индекс без совпадений
        global.fetch = jest.fn(() =>
          Promise.resolve({
          ok: true,
          json: () => Promise.resolve([
              { link: '/python/if', text: 'if else', level: 2, breadcrumbs: 'Python > Условия' },
            ]),
          } as unknown as Response)
        );`,
      ],
      steps: `
    // Вводим поисковый запрос, который не найден
    fireEvent.change(screen.getByLabelText('Поиск:'), { target: { value: 'qwertyuiop' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    // Проверяем, что появляется сообщение "Не найдено"
    const mess = await screen.findByText(/найдено/i);
    expect(mess).toBeInTheDocument();
  `,
    },
  ],
};
