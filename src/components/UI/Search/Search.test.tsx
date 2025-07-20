import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import {Search} from './Search';



describe('<Search />', () => {
  
  beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        // Мок-данные для поиска
      ]),
    } as unknown as Response)
  );
});
afterEach(() => {
  jest.restoreAllMocks();
});

  it('рендерится без ошибок', () => {
    renderWithProviders(<Search  />);
  });
  
  it('отображает поле поиска', () => {
    renderWithProviders(<Search  />);
    // Поле поиска (input) есть на странице с label "Поиск:"
    expect(screen.getByLabelText('Поиск:')).toBeInTheDocument();
  });
  it('показывает индикатор загрузки во время загрузки индекса', () => {
    renderWithProviders(<Search  />);
    // Проверяет, что отображается индикатор загрузки
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
  it('отображает ошибку при ошибке загрузки индекса', async () => {
    
    // Мокаем fetch — возвращает ошибку
    global.fetch = jest.fn(() =>
    Promise.resolve({
    ok: false,
    status: 500,
    } as unknown as Response)
    );
    renderWithProviders(<Search  />);
    // Ждём появления текста ошибки
    const error = await screen.findByText(/ошибка/i);
    expect(error).toBeInTheDocument();
  });
  it('показывает NavPopup при наличии результатов поиска', async () => {
    // Мокаем fetch — отдаём индекс с одним элементом
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
    );
    renderWithProviders(<Search  />);
    // Вводим поисковый запрос, совпадающий с индексом
    fireEvent.change(screen.getByLabelText('Поиск:'), { target: { value: 'массив' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    // Проверяем, что появляется NavPopup (ищем по кнопке — popup внутри кнопки)
    const arrowButtons = await screen.findAllByRole('button');
    const navPopupBtn = arrowButtons.find((btn) =>
    btn.querySelector('.yc-arrow-toggle')
    );
    expect(navPopupBtn).toBeInTheDocument();
  });
  it('показывает "Не найдено" при отсутствии результатов', async () => {
    // Мокаем fetch — отдаём индекс без совпадений
    global.fetch = jest.fn(() =>
    Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
    { link: '/python/if', text: 'if else', level: 2, breadcrumbs: 'Python > Условия' },
    ]),
    } as unknown as Response)
    );
    renderWithProviders(<Search  />);
    // Вводим поисковый запрос, который не найден
    fireEvent.change(screen.getByLabelText('Поиск:'), { target: { value: 'qwertyuiop' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    // Проверяем, что появляется сообщение "Не найдено"
    const mess = await screen.findByText(/найдено/i);
    expect(mess).toBeInTheDocument();
  });

});
