import { render, screen } from '@testing-library/react';
import { Footer } from '@components';

it('Footer Component renders', () => {
    render(<Footer />);
    expect(screen.getByText(/GitHub/)).toBeInTheDocument();
    expect(screen.getByText(/stolen from/)).toBeInTheDocument();
    expect(screen.getByText(/thanks to/)).toBeInTheDocument();
    expect(screen.getByText(/donate/)).toBeInTheDocument();
});
