// redux/services/salesService.ts

import axios, { AxiosError } from 'axios';

export interface Sale {
    id: string;
    amount: number;
    date: string;
}

const baseURL = 'http://26.96.128.174:9090/xconnect/api/ExtractionData';

export const fetchSales = async (dateFrom: string, dateEnd: string): Promise<Sale[]> => {
    const url = `${baseURL}/SalesFull?dateFrom=${dateFrom}&dateEnd=${dateEnd}`;

    try {
        const response = await axios.get<Sale[]>(url);

        if (response.status !== 200) {
            throw new Error('Failed to fetch sales data');
        }

        return response.data;
    } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
            throw new Error(`Server responded with status ${axiosError.response.status}`);
        } else if (axiosError.request) {
            throw new Error('Request error: No response received');
        } else {
            throw new Error(`Request failed: ${axiosError.message}`);
        }
    }
};
