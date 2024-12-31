import { useFocusEffect } from "expo-router";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { useCallback } from "react";

export const useRouteMiddleware = (conditions, message) => {
    const router = useExpoRouter();

    useFocusEffect(
        useCallback(() => {
            if (conditions.some((condition) => condition)) {
                alert(message || "Para continuar debes iniciar sesión");
                router.replace("/profile");
            }
        }, [conditions, message, router])
    );
};
