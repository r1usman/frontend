import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../Collaboration/Components/Inputs/Input";
import {API_PATH} from "../../../Utility/ApiPath"
import AxiosInstance from "../../../Utility/AxiosInstances";
import { LuLoaderCircle } from "react-icons/lu";

const GenerateBlogPostForm = ({
    contentParams,
    setPostContent,
    handleCloseForm,
}) => {
    const [formData, setFormData] = useState({
        title: contentParams?.title || "",
        tone: contentParams?.tone || "",
        });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
        ...prevData,
        [key]: value,
        }));
    };


    const handleGenerateBlogPost = async (e) => {
        e.preventDefault();
        const { title, tone } = formData;

        if (!title || !tone) {
        setError("Please fill all the required fields.");
        return;
        }

        setError("");
        setIsLoading(true);

        try {
        // Call AI API to generate blog post
        const aiResponse = await AxiosInstance.post(API_PATH.PLATFORM_COURSES.BLOG_GENERATION, {
            title,
            tone,
        });
        console.log(aiResponse);
        

        const generatedPost = aiResponse.data?.content || "";
        setPostContent(title, generatedPost);
        handleCloseForm();
        } catch (error) {
        if (error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("Failed to generate blog post. Please try again.");
        }
        } finally {
        setIsLoading(false);
        }
    };

  return (
    <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center">
        <h3 className="text-lg font-semibold text-black">Generate a Blog Post</h3>

        <p className="text-xs text-slate-700 mt-[5px] mb-3">
            Provide a title and tone to generate your blog post.
        </p>

        <form onSubmit={handleGenerateBlogPost} className="flex flex-col gap-3">
            <Input
            value={formData.title}
            onchange={({ target }) => handleChange("title", target.value)}
            label="Blog Post Title"
            placeholder="Enter your blog title..."
            type="text"
            />

            <Input
            value={formData.tone}
            onchange={({ target }) => handleChange("tone", target.value)}
            label="Tone"
            placeholder="Beginner-friendly, technical, casual, etc."
            type="text"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
            type="submit"
            className="btn-primary w-full mt-2 flex justify-center items-center gap-2"
            disabled={isLoading}
            >
            {isLoading && <LuLoaderCircle className="animate-spin text-lg" />}
            {isLoading ? "Generating..." : "Generate Post"}
            </button>
        </form>
    </div>
);

};

export default GenerateBlogPostForm;
