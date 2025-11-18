import axios from "axios";
import AxiosInstance from "../../../Utility/AxiosInstances";
import { API_PATH } from "../../../Utility/ApiPath";

const UploadImage = async (imageFile, id) => {
    const formData = new FormData();
    console.log("imageFile, id", imageFile, id);

    formData.append('image', imageFile || null);
    try {
        const response = await AxiosInstance.put(API_PATH.PLATFORM_COURSES.UPLOAD_COURSE_IMAGE(id), formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )

        return response.data
    } catch (error) {
        console.log("Error uploading the image", error);

    }
}
export default UploadImage