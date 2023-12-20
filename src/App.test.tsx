import {render, screen} from '@testing-library/react';

import {HashRouter} from 'react-router-dom';
import App from './App';

test('App contains the NavBar ', () => {
    render(
        <HashRouter>
            <App />
        </HashRouter>
    );
    const headingElement = screen.getByText(/the map/i);
    expect(headingElement).toBeInTheDocument();
});
