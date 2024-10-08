import { atom } from 'jotai';

export const orderAtom = atom({
    customerName: '',
    orderEntries: [],
});

export const orderEntriesAtom = atom([]);
