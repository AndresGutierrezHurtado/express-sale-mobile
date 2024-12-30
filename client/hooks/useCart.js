import { usePostData, useDeleteData, usePutData } from "./useFetchData";

export const useAddCart = async (productId) => {
    return await usePostData("/carts", { product_id: productId });
};

export const useUpdateCart = async (cartId, quantity, reload) => {
    const response = await usePutData(`/carts/${cartId}`, {
        product_quantity: quantity,
    });

    if (response.success) return reload();
};

export const useRemoveCart = async (cartId, reload) => {
    const response = await useDeleteData(`/carts/${cartId}`);

    if (response.success) return reload();
};

export const useClearCart = async (reload) => {
    const response = await useDeleteData("/carts/empty");

    if (response.success) return reload();
};
