import {fetchCategories, fetchStore, StoreData} from '@/api/storeApi';
import { useState } from 'react';

const useFetchStore = () => {
    const [storeData, setStoreData] = useState<StoreData | null>(null);
    const initFetchStore = async () => {
        const response = await fetchStore();
        setStoreData(response.data);
    }

    return {storeData, initFetchStore};
};

