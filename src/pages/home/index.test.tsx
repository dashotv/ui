import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

test('renders You are home in Home', () => {
    const { getByText } = render(<Home />);
    const linkElement = getByText(/You are home/i);
    expect(linkElement).toBeInTheDocument();
});
