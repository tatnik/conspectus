import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';
import { NOT_FOUND } from 'src/constants';
// 1. Объявить mockUseParams ДО всех jest.mock
let mockUseParams = jest.fn();

// 2. Мокаем DataProvider
jest.mock('src/data/DataProvider', () => ({
  DataProvider: ({ renderContent }) => renderContent('# Массивы'),
}));

// 3. Мокаем useParams через mockUseParams
jest.mock('react-router-dom', () => {
  const original = jest.requireActual('react-router-dom');
  return {
    ...original,
    useParams: (...args) => mockUseParams(...args),
  };
});

import {ContentPage} from './ContentPage';



describe('<ContentPage />', () => {
  
    beforeEach(() => {
    mockUseParams.mockReturnValue({ path: '/js', fileName: 'js_array' });
  }); 

  it('рендерится без ошибок', () => {
    renderWithProviders(<ContentPage  />);
  });
  
  it('рендерит не пустой компонент', async () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "JavaScript", path: "/js"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}],
    partNavArray:  [[], [{id: 1, name: "Основы", path: "js/js_base"}], [{id: 2, name: "Массивы", path: "js/js_array"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    renderWithProviders(<ContentPage  />, { mockContext });
    expect(screen.queryByText(NOT_FOUND)).not.toBeInTheDocument();
    const mess = await screen.findByText(/Массивы/i);
    expect(mess).toBeInTheDocument();
  });
  it('рендерит NotFound для отсутствующей страницы', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "JavaScript", path: "/js"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "Python", path: "/py"}],
    partNavArray:  [[], [{id: 1, name: "Основы", path: "py/py_base"}], [{id: 2, name: "Массивы", path: "py/py_array"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    renderWithProviders(<ContentPage  />, { mockContext });
    expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
  });
  it('вызывает setCurrentPart и setShowPartNav при монтировании', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "JavaScript", path: "/js"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}],
    partNavArray:  [[], [{id: 1, name: "Основы", path: "js/js_base"}], [{id: 2, name: "Массивы", path: "js/js_array"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    renderWithProviders(<ContentPage  />, { mockContext });
    // Проверяем, что setCurrentPart и setShowPartNav были вызваны с корректными аргументами
    expect(mockContext.setCurrentPart).toHaveBeenCalledWith(mockContext.siteNav[1]);
    expect(mockContext.setShowPartNav).toHaveBeenCalledWith(true);
  });
  it('обновляет part при смене path в useParams', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "JavaScript", path: "/js"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}],
    partNavArray:  [[], [{id: 1, name: "Основы", path: "js/js_base"}], [{id: 2, name: "Массивы", path: "js/js_array"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    
    const { rerender } = renderWithProviders(<ContentPage />, { mockContext });
    mockUseParams.mockReturnValue({ path: '/js', fileName: 'js_base' });
    rerender(<ContentPage />);
    expect(screen.queryByText(NOT_FOUND)).not.toBeInTheDocument();
    
    mockUseParams.mockReturnValue({ path: 'bad_path', fileName: 'js_base' });
    rerender(<ContentPage />);
    expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
  });

});
