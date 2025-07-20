import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {CurrentPartTitle} from './CurrentPartTitle';



describe('<CurrentPartTitle />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<CurrentPartTitle  isMainPage={false} isPartIndexPage={true} />);
  });
  
  it('рендерит название раздела без ссылки для индексной страницы', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "Раздел", path: "/section"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "Раздел", path: "/section"}],
    partNavArray:  [[], [{id: 1, name: "Conspect", path: "/test/conspect"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    renderWithProviders(<CurrentPartTitle  isMainPage={false} isPartIndexPage={true} />, { mockContext });
    const text = screen.getByText(/.+/); // Любое имя раздела
    expect(text.closest('a')).toBeNull();
  });
  it('рендерит ссылку на индексную страницу раздела если не индексная', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "Раздел", path: "/section"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "Раздел", path: "/section"}],
    partNavArray:  [[], [{id: 1, name: "Conspect", path: "/test/conspect"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    renderWithProviders(<CurrentPartTitle  isMainPage={false} isPartIndexPage={false} />, { mockContext });
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
  });
  it('не рендерится на главной странице', () => {
    const setCurrentPart = jest.fn();
    const setShowPartNav = jest.fn();
    const setPartNavArray = jest.fn();
    const loadPartNav = jest.fn();
    const setDataError = jest.fn();
    
    const mockContext = {
    currentPart:  {id: 1, name: "Раздел", path: "/section"},
    siteNav:  [{id: 0, name: "Main", path: "/"}, {id: 1, name: "Раздел", path: "/section"}],
    partNavArray:  [[], [{id: 1, name: "Conspect", path: "/test/conspect"}]],
    showPartNav:  true,
    setCurrentPart,
    setShowPartNav,
    setPartNavArray,
    loadPartNav,
    dataError:  "",
    setDataError,
    }
    
    renderWithProviders(<CurrentPartTitle  isMainPage={true} isPartIndexPage={true} />, { mockContext });
    // Не должен ничего рендерить
    expect(screen.queryByText(/.+/)).toBeNull();
  });

});
