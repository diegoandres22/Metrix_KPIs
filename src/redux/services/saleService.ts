import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket } from '@/types/ticket'
import { endpoints } from '@/variables';


interface DateParams {
    dateFrom: string;
    dateEnd: string;
}

export const getTickets = createAsyncThunk<Ticket[], DateParams, { rejectValue: string }>(
    'tickets/getTickets',
    async ({ dateFrom, dateEnd }, { rejectWithValue }) => {
        try {

            const response = await axios.get(endpoints.salesFull(dateFrom, dateEnd));

            const arrTickets = response.data;

            return arrTickets;
        } catch (error) {
            console.error(error)
            return rejectWithValue('No se pudieron obtener los tickets.');
        }
    }
);