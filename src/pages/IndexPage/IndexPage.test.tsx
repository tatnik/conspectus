import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';
import { NOT_FOUND } from 'src/constants';


// 1. Объявить mockUseParams ДО всех jest.mock
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
});


import {IndexPage} from './IndexPage';

describe('<IndexPage />', () => {
  
    beforeEach(() => {
    mockUseParams.mockReturnValue({ path: '/js' });
  }); 

  it('рендерится без ошибок', () => {
    renderWithProviders(<IndexPage  />);
  });
  
  it('рендерит IndexPage для корректного раздела', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    
    const mockContext = {
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}, {id: 2, name: "Python", path: "/py"}],
    setCurrentPart,
    setShowPartNav,
    }
    
    renderWithProviders(<IndexPage  />, { mockContext });
    // Ожидаем, что IndexPage отображает раздел
    expect(screen.queryByText(NOT_FOUND)).not.toBeInTheDocument();
    // Есть элемент с классом IndexPage
    expect(document.querySelector('.IndexPage')).toBeInTheDocument();
  });
  it('рендерит NotFound для несуществующего раздела', () => {
    mockUseParams.mockReturnValue({ path: 'invalid' });
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    
    const mockContext = {
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}, {id: 2, name: "Python", path: "/py"}],
    setCurrentPart,
    setShowPartNav,
    }
    
    renderWithProviders(<IndexPage  />, { mockContext });
    // Ожидаем компонент NotFound
    expect(screen.getByText(NOT_FOUND)).toBeInTheDocument();
  });
  it('корректно передаёт renderContent для NavList', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    
    const mockContext = {
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}, {id: 2, name: "Python", path: "/py"}],
    setCurrentPart,
    setShowPartNav,
    }
    
    renderWithProviders(<IndexPage  />, { mockContext });
    // Проверяем, что список навигации отрисован
    expect(screen.getByRole('list')).toBeInTheDocument();
  });
  it('отображает элемент списка навигации', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    
    const mockContext = {
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "JavaScript", path: "/js"}, {id: 2, name: "Python", path: "/py"}],
    setCurrentPart,
    setShowPartNav,
    }
    
    renderWithProviders(<IndexPage  />, { mockContext });
    // Ожидаем, что текст элемента из nav присутствует (mock index содержит "nav-1", "nav-2")
    expect(screen.getByText('Основы')).toBeInTheDocument();
  });

});
