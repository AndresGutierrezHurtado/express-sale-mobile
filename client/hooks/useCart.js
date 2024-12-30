import { usePostData, useDeleteData, usePutData } from "./useFetchData";

export const useAddCart = async (productId) => {
    return await usePostData("/carts", { product_id: productId });
};

export const useUpdateCart = async (productId, quantity) => {
    return await usePutData(`/carts/${productId}`, {
        product_quantity: quantity,
    });
};

export const useRemoveCart = async (cartId) => {
    return await useDeleteData(`/carts/${cartId}`);
};

export const useClearCart = async () => {
    return await useDeleteData("/carts/empty");
};
