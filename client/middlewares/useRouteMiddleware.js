import { useFocusEffect } from "expo-router";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { useCallback } from "react";

export const useRouteMiddleware = (conditions, action, redirect = "/") => {
    const router = useExpoRouter();

    useFocusEffect(
        useCallback(() => {
            if (conditions.find((condition) => condition === true)) {
                if (action == "navigate")
                    alert("Debes iniciar sesión para acceder a esta sección.");
                else alert("Debes iniciar sesión para realizar esta acción.");
                router.navigate(redirect);
            } else {
                console.log("No se cumplieron las condiciones");
            }
        }, [conditions, action])
    );
};
