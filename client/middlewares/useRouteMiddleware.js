import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export const useRouteMiddleware = (conditions, action, navigation) => {
    useFocusEffect(
        useCallback(() => {
            if (conditions.find((condition) => condition === true)) {
                if (action == "navigate") alert("Debes iniciar sesión para acceder a esta sección.");
                else alert("Debes iniciar sesión para realizar esta acción.");
                navigation.navigate("/");
            }
        }, [conditions, action, navigation])
    );
};

