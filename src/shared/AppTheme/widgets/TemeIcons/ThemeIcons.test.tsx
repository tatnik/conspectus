import React from 'react';
import { render } from '@testing-library/react';
import { Sun, SunHC, Moon, MoonHC } from './ThemeIcons';

describe('<ThemeIcons />', () => {
  it('рендерит иконку Sun без ошибок', () => {
    const { container } = render(<Sun />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('circle')).toBeInTheDocument();
  });
  it('рендерит иконку SunHC с дополнительной обводкой', () => {
    const { container } = render(<SunHC />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelector('circle')).toBeInTheDocument();
  });
  it('рендерит иконку Moon с вертикальным градиентом', () => {
    const { container } = render(<Moon />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Проверка, что есть градиент и он используется в fill
    const gradient = container.querySelector('linearGradient');
    expect(gradient).toBeInTheDocument();
    const circle = container.querySelector('circle');
    expect(circle).toHaveAttribute('fill', 'url(#split)');
  });
  it('рендерит иконку MoonHC с контрастной обводкой', () => {
    const { container } = render(<MoonHC />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    const circle = container.querySelector('circle');
    expect(circle).toBeInTheDocument();
    expect(circle).toHaveAttribute('fill', 'url(#split)');
  });
});
