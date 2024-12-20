import { v2 as cloudinary } from "cloudinary";

// Cloudinary
(async function () {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
})();

export const uploadFile = async (file, id, url) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: `/express-sale${url}`,
            id: id,
            public_id: id,
            resource_type: "image",
            overwrite: true,
            unique_filename: true,
            transformation: [{ quality: "auto", fetch_format: "auto" }],
        });

        return {
            success: true,
            message: "Imagen subida correctamente",
            data: result.secure_url || result.url,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null,
        };
    }
};

export const deleteFile = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);

        return {
            success: true,
            message: "Imagen eliminada correctamente",
            data: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
            data: null,
        };
    }
};
