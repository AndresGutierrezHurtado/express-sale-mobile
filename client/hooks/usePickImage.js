import * as ImagePicker from "expo-image-picker";

export const usePickImage = async (setFieldValue, field, multiple = false) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
        alert("Se requiere permiso para acceder a la galería.");
        return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
        allowsMultipleSelection: multiple,
        selectionLimit: multiple ? 6 : 1,
        allowsEditing: true,
        quality: 1,
    });

    if (!result.canceled) {
        const images = result.assets.map((a) => `data:image/jpeg;base64,${a.base64}`);

        setFieldValue(field, multiple ? images : images[0]);
    }
};
