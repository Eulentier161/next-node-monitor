import { render, screen } from '@testing-library/react';
import { Error } from '@components';

it('Error Component displays "Node is not running!"', () => {
    render(<Error />);
    expect(screen.getByText('Node is not running!')).toBeInTheDocument();
});
