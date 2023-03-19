import * as React from 'react';

export const useLocalStorage = (storageKey) => {
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem(storageKey))
    );

    React.useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
};