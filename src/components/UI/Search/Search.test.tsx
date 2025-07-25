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
  
  it('отображает метку поиска', () => {
    renderWithProviders(<Search  />);
    // Метка поиска присутствует и имеет qa="search-label"
    const label = document.querySelector('[data-qa="search-label"]');
    expect(label).toBeInTheDocument();
  });
  it('отображает поле поиска', () => {
    renderWithProviders(<Search  />);
    // Input для поиска присутствует и имеет data-qa="search-input"
    const input = document.querySelector('[data-qa="search-input"]');
    expect(input).toBeInTheDocument();
  });
  it('показывает индикатор загрузки во время загрузки индекса', () => {
    renderWithProviders(<Search  />);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });
  it('отображает ошибку при ошибке загрузки индекса', async () => {
    
    global.fetch = jest.fn(() =>
    Promise.resolve({
    ok: false,
    status: 500,
    } as unknown as Response)
    );
    renderWithProviders(<Search  />);
    const error = await screen.findByText(/ошибка/i);
    expect(error).toBeInTheDocument();
  });
  it('показывает NavPopup при наличии результатов поиска', async () => {
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
    const input = document.querySelector('[data-qa="search-input"] input');
    fireEvent.change(input, { target: { value: 'массив' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    expect(screen.getByText("Методы для работы с массивами / создание нового массива")).toBeInTheDocument();
  });
  it('показывает "Не найдено" при отсутствии результатов', async () => {
    global.fetch = jest.fn(() =>
    Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
    { link: '/python/if', text: 'if else', level: 2, breadcrumbs: 'Python > Условия' },
    ]),
    } as unknown as Response)
    );
    renderWithProviders(<Search  />);
    const input = document.querySelector('[data-qa="search-input"] input');
    fireEvent.change(input, { target: { value: 'qwertyuiop' } });
    await waitFor(() => expect(screen.queryByText('Загрузка...')).toBeNull());
    expect(await screen.findByText(/найдено/i)).toBeInTheDocument();
  });

});
