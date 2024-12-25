import React, { useState, useEffect } from "react";
import { usePathname } from "expo-router";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useFetchData = async (endpoint, options) => {
    const request = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "content-type": "application/json",
            accept: "application/json",
        },
        credentials: "include",
        method: "GET",
        ...options,
    }).catch((error) => {
        console.error(error);
    });

    return request.json();
};

export const useGetData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    const pathname = usePathname();

    useEffect(() => {
        const getData = async () => {
            const response = await useFetchData(endpoint);
            setLoading(false);
            setData(response.data);
        };

        getData();
    }, [endpoint, trigger, pathname]);

    const reload = () => setTrigger((prev) => prev + 1);

    return { data, loading, reload };
};

export const usePaginateData = (endpoint) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [trigger, setTrigger] = useState(0);

    useEffect(() => {
        const getData = async () => {
            const response = await useFetchData(endpoint);
            setLoading(false);
            setData(response.data);
        };

        getData();
    }, [endpoint, trigger]);

    const reload = () => setTrigger((prev) => prev + 1);

    return {
        data: data?.rows,
        page: data?.page,
        limit: data?.limit,
        count: data?.count,
        loading,
        reload,
    };
};

export const usePostData = async (endpoint, body = {}) => {
    const response = await useFetchData(endpoint, {
        method: "POST",
        body: JSON.stringify(body),
    });

    return response;
};

export const usePutData = async (endpoint, body = {}) => {
    const response = await useFetchData(endpoint, {
        method: "PUT",
        body: JSON.stringify(body),
    });

    return response;
};

export const useDeleteData = async (endpoint, body = {}) => {
    const response = await useFetchData(endpoint, {
        method: "DELETE",
        body: JSON.stringify(body),
    });

    return response;
};
