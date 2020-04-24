import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

test('renders You are media in Media', () => {
    const { getByText } = render(<Home />);
    const linkElement = getByText(/You are media./i);
    expect(linkElement).toBeInTheDocument();
});
