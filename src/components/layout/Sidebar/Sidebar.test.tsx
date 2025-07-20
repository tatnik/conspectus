import React from 'react';
import { renderWithProviders } from 'src/test-utils';
import { screen } from '@testing-library/react';

import {Sidebar} from './Sidebar';



describe('<Sidebar />', () => {
  
  
  it('рендерится без ошибок', () => {
    renderWithProviders(<Sidebar  children={["test1", "test2"]} />);
  });
  
  it('рендерит содержимое в <aside>', () => {
    renderWithProviders(<Sidebar  children={["test1", "test2"]} />);
    // Ищем aside и текст дочерних элементов
    const aside = screen.getByRole('complementary');
    expect(aside).toBeInTheDocument();
    expect(aside).toHaveTextContent('test1');
    expect(aside).toHaveTextContent('test2');
  });

});
