import axios from "axios";

const UploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile || null);
    console.log("imagefile", imageFile);

    try {
        const response = await axios.post("http://localhost:3000/api/Auth/uploadImg", formData,
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