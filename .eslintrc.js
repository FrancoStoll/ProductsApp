module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    quotes: 'off', // Desactiva la regla que fuerza el uso de comillas simples
    'react/react-in-jsx-scope': 'off', // Desactiva la regla que requiere importar React en cada archivo JSX (React 17+)
    semi: 'off', // Desactiva la regla que exige punto y coma al final de cada declaración
    'no-trailing-spaces': 'off', // Desactiva la regla que prohíbe los espacios en blanco al final de las líneas
    'eol-last': 'off', // Desactiva la regla que requiere una nueva línea al final del archivo
    'react-native/no-inline-styles': 'off', // Desactiva la regla que prohíbe estilos en línea
    'curly': 'off',
    'react-hooks/exhaustive-deps': 'off',
    "react/no-unstable-nested-components": 'off',
    "typescript-eslint/no-unused-vars": 'on',
  },
};
