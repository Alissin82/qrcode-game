import axios from 'axios';
import clsx, { type ClassValue } from 'clsx';
import moment from 'moment-jalaali';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const apiClient = axios.create({
    // baseURL: 'http://192.168.1.17:8000/',
    headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
    },
    withCredentials: true,
});

export function gregorianToJalaali(date: string) {
    const m = moment(date, 'YYYY-MM-DD');

    return m.format('jYYYY/jMM/jDD');
}
