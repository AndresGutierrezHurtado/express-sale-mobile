import * as ImagePicker from "expo-image-picker";

export const usePickImage = async (setFieldValue, field) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        alert("Se requiere permiso para acceder a la galería.");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        setFieldValue(field, `data:image/jpeg;base64,${result.assets[0].base64}`);
    }
};
