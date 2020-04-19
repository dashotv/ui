// @ts-ignore
import React from 'react';
import { render } from '@testing-library/react';
import Header from './index';

test('renders Home in Header', () => {
    const { getByText } = render(<Header />);
    const linkElement = getByText(/Home/i);
    expect(linkElement).toBeInTheDocument();
});
