import { useQuery, useQueryClient } from "react-query";

export const useGetReadingsService = (_jwt = '') => {
    // console.log('Readings.useGetReadingsService()');

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const client = useQueryClient();
    return useQuery(
        "readingQueryKey",
        async () => {

            // get all readings
            const response = (_jwt) ?
                await fetch(`${BASE_URL}/readings`, {
                    headers: {
                        Authorization: `Bearer ${_jwt}`
                    }
                }) : await new Response();
            const readings = await response.json();

            // pre load the cache
            readings?.forEach((reading: any) => {
                client.setQueryData(["reading", reading.id], reading);
            });

            return readings;
        });

};
