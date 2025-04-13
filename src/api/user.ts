import { apiRoutes, Services } from "@/constants/services";
import axiosInstance from "@/utils/axios";
import { v4 as uuid } from "uuid";

export const uploadFile = async (file: File) => {
    const fileName = `${uuid()}__${file.name}`
    const ContentType = file.type;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("ContentType", ContentType);
    const { data } = await axiosInstance.post(`${Services.USER}${apiRoutes.util}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return data;
}

