import { useQuery } from 'react-query';
import axios from 'axios';

type HaircutType = {
    style: string;
    price: number;
};

export default function useFetchHaircutStyles() {
    return useQuery(['fetchHaircutStyles'], async () => {
        const haircutStyles = await axios({
            method: 'GET',
            url: 'http://localhost:3008/api/haircut-styles',
        }).then((res: { data: HaircutType[] | [] }) => {
            const { data } = res;
            return data;
        }).catch((err: any) => {
            throw new Error('Error fetching haircut styles');
        });

        return haircutStyles;
    },
    {
        refetchOnMount: true,
        refetchInterval: 1000,
    });
}