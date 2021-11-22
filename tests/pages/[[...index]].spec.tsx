import { render, screen } from '@testing-library/react';
import Home from '../../pages/[[...index]]';

it('desc', () => {
    render(<Home />);
    screen.getAllByText('Node Account').forEach((element) => expect(element).toBeInTheDocument());
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(screen.getByText('Blocks')).toBeInTheDocument();
    expect(screen.getByText('System')).toBeInTheDocument();
});
