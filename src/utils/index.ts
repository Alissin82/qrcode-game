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
        Accept: 'application/json',
        'Access-Control-Allow-Credentials': true,
    },
    withCredentials: true,
    withXSRFToken: true,
});

apiClient.interceptors.request.use((request) => {
    const token = localStorage.getItem('token');
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export function gregorianToJalaali(date: string) {
    const m = moment(date, 'YYYY-MM-DD');

    return m.format('jYYYY/jMM/jDD');
}

export function formatPersianDateTime(dateString: string, includeTime: boolean = true) {
    try {
        const m = moment(dateString);
        
        if (includeTime) {
            // Format: ۱۴۰۲/۱۲/۱۵ - ۱۴:۳۰
            return m.format('jYYYY/jMM/jDD - HH:mm');
        } else {
            // Format: ۱۴۰۲/۱۲/۱۵
            return m.format('jYYYY/jMM/jDD');
        }
    } catch (error) {
        console.error('Error formatting Persian date:', error);
        return dateString; // Return original string if formatting fails
    }
}

export function formatPersianDateRelative(dateString: string) {
    try {
        const m = moment(dateString);
        const now = moment();
        const diff = now.diff(m, 'days');
        
        if (diff === 0) {
            return 'امروز';
        } else if (diff === 1) {
            return 'دیروز';
        } else if (diff < 7) {
            return `${diff} روز پیش`;
        } else {
            return m.format('jYYYY/jMM/jDD');
        }
    } catch (error) {
        console.error('Error formatting relative Persian date:', error);
        return dateString;
    }
}
