import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Ticket } from '@/types/ticket'

export const getTickets = createAsyncThunk<Ticket[], void, { rejectValue: string }>(
    '',
    async (_, { rejectWithValue }) => {
        try {
            alert("pido")
            const response = await axios.get('http://localhost:3001/api/xconnect/api/ExtractionData/PurchaseFull?dateFrom=20240625&dateEnd=20240627');

            const arrTickets = response.data;

            console.log("conseguí:", arrTickets);

            return arrTickets;
        } catch (error) {
            console.error(error)
            return rejectWithValue('No se pudieron obtener los tickets.');
        }
    }
);