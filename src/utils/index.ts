import axios from 'axios';
import clsx, { type ClassValue } from 'clsx';
import moment from 'moment-jalaali';
import { twMerge } from 'tailwind-merge';
import { config } from '../config/config.ts';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const apiClient = axios.create({
    baseURL: config.apiUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
    withCredentials: true,
    withXSRFToken: true,
});

export function gregorianToJalaali(date: string) {
    const m = moment(date, 'YYYY-MM-DD');

    return m.format('jYYYY/jMM/jDD');
}
