import { useQuery } from 'react-query';
import axios from 'axios';


export default function useFetchAppData() {
    console.log('This hook is being hit');
    return useQuery('fetchApps', async () => {
        const appData = await axios({
            url: 'http://localhost:3002/home',
            method: 'GET'
        }).then((res: any) => {
            const { data } = res;
            console.log('The response is:', data);
            return data;
        }).catch((e: Error) => {
            console.log(e.message);
            alert('There was an error getting the data');
        });

        return appData;
    }, {
        cacheTime: 0,
    });
}