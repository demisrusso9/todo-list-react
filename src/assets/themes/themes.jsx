import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
    primary: '#f2f5f6',
    secondary: '#e9eff1',
    color: '#000'
}

export const darkTheme = {
    primary: '#232526',
    secondary: '#414345',
    color: '#fff'
}

export const GlobalStyles = createGlobalStyle`
body {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.color};
}

.input {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.color};
}

.input::placeholder{    
    color: ${props => props.theme.color};
}

.select-items {
    background-color: ${props => props.theme.secondary};
    color: ${props => props.theme.color};
}
`