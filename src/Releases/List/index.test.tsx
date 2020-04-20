import React from 'react';
import { render } from '@testing-library/react';
import Home from './index';

test('renders You are releases in Releases', () => {
    const { getByText } = render(<Home />);
    const linkElement = getByText(/You are releases./i);
    expect(linkElement).toBeInTheDocument();
});
