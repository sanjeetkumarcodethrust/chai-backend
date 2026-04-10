import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const getCloudinaryConfig = () => ({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isCloudinaryConfigured = () => {
    const { cloud_name, api_key, api_secret } = getCloudinaryConfig();

    return Boolean(cloud_name && api_key && api_secret);
};

const removeLocalFile = (localFilePath) => {
    if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
    }
};

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        if (!isCloudinaryConfigured()) {
            throw new Error("Cloudinary environment variables are incomplete.");
        }

        cloudinary.config(getCloudinaryConfig());

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        removeLocalFile(localFilePath);
        return response;
    } catch (error) {
        removeLocalFile(localFilePath);
        console.error("Cloudinary upload failed:", error.message);
        return null;
    }
};

export { uploadOnCloudinary };
