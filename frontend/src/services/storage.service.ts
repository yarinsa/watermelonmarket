export const saveToStorage = (item: string, key: string): void => {
    localStorage.setItem(key, item);
};
