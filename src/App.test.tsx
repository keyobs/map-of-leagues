import {render, screen} from '@testing-library/react';
import {HashRouter} from 'react-router-dom';
import App from './App';

const loadTranslations = async () => {
    const fr = await import('./languages/fr');
    const en = await import('./languages/en');
    const frKeys = Object.keys(fr.default);
    const enKeys = Object.keys(en.default);

    return {frKeys, enKeys};
};

beforeEach(async () => {
    const {frKeys, enKeys} = await loadTranslations();
    const keys = [...frKeys, ...enKeys];
    keys.forEach((key) => {
        const value = key;
        Object.defineProperty(global.navigator, key, {
            value,
            configurable: true
        });
    });
});

test('app contains the navbar', () => {
    render(
        <HashRouter>
            <App />
        </HashRouter>
    );
    const linkElement = screen.getByText(/the map/i);
    expect(linkElement).toBeInTheDocument();
});

test('should have the same number of keys in each translation file', async () => {
    const {frKeys, enKeys} = await loadTranslations();
    console.log(frKeys.length, enKeys.length);
    expect(enKeys.length).toBe(frKeys.length);
});
