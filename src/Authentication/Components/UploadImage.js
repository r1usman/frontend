import axios from "axios";
import AxiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";

const UploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile || null);
    console.log("imagefile", imageFile);

    try {
        const response = await AxiosInstance.post(API_PATH.AUTH.UPLOAD_PROFILE_IMG, formData,
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