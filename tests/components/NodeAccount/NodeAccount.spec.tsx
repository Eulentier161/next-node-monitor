import { render, screen } from '@testing-library/react';
import { NodeAccount } from '@components';

it('desc', () => {
    render(<NodeAccount />);
    expect(screen.getByText(/Node Account/)).toBeInTheDocument();
    expect(screen.getByText(/Address/)).toBeInTheDocument();
});
