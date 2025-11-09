import React, { useEffect, useState } from 'react';
import { Eye, ThumbsUp, MessageCircle, LogIn } from 'lucide-react';
import { LuFileImage, LuLoaderCircle } from 'react-icons/lu';
import CoursePhotoSelector from './CoursePhotoSelector';
import AxiosInstance from '../../../Utility/AxiosInstances';
import { API_PATH } from '../../../Utility/ApiPath';
import BlogPostSummaryCard from './BlogPostSummaryCard';
import moment from 'moment';
import Stats from '../Stats';
import UploadImage from '../../../Authentication/Components/UploadImage';
import { image } from '@uiw/react-md-editor';
 const CourseCardComponent = ({ 
  data,
  previewCourse,
  setpreviewCourse,
  FetchCourses

}) => {
    console.log("data",data);
    
    const [courseInfo, setcourseInfo] = useState(data)
    const [Articles, setArticles] = useState([])
    const [totalviews, settotalviews] = useState("")
    const [totalLikes, settotalLikes] = useState("")
    const [error, seterror] = useState("")
    const [isLoading, setisLoading] = useState(false)


    const handleCourseInfo = (key , value)=>{
        setcourseInfo((prev)=>(
            {
                ...prev,
                [key]: value
            }
        ))
    }

    const FetchCourseArticels = async(id)=>{
        try {
            console.log(id);
            
            const result = await AxiosInstance.get(API_PATH.BLOG.COURSE_BLOGS(id))
            console.log("result",result);
            
            setArticles(result.data.posts)
            settotalLikes(result.data.totalLikes)
            settotalviews(result.data.totalViews)
            
        } catch (error) {
            console.log(error);
            
        }

    }

    useEffect(()=>{
        if(courseInfo)
        {
            FetchCourseArticels(courseInfo?._id)

        }
    },[courseInfo?._id])

    console.log("Articles",Articles);
    

    const UpdateCourse = async()=>{
        try {
            setisLoading(true)
            if(!courseInfo.image)
            {
                seterror("Please Select the Coverage Page")
                return 
            }
            if(!courseInfo.description)
            {   
                seterror("Description is Required")
                return 
            }

            const uploadImage = await UploadImage(courseInfo?.image);
            const CourseImage = uploadImage.Image || "";

            
            const result = await AxiosInstance.put(API_PATH.PLATFORM_COURSES.UPDATE(courseInfo?._id) , {
                ...courseInfo,
                image : CourseImage
            })
            if(result)
            {
                FetchCourses();
                setisLoading(false)
                setpreviewCourse(!previewCourse)
            }
            

        } catch (error) {
            console.log(error);
        }
        finally
        {
            setisLoading(false)

        }
    }


    useEffect(()=>{
        const timeout = setTimeout(()=>{
            seterror("")
        },3000);
        return ()=> {
            clearInterval(timeout)
        }
    },[error])


    console.log("courseInfo", courseInfo);
    

    return (
        <div className="w-full  bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="flex h-48  border m-1 border-slate-100 rounded-md">
               
                <div className="w-2/3 border border-dotted border-sky-500 m-1.5">
                {
                   
                    (
                        <>
                            
                            <CoursePhotoSelector  image= {courseInfo.image}  setimage= {(imageurl)=> handleCourseInfo("image", imageurl) } />
                        </>

                        
                    )
                }
                </div>
                
                <div className="w-1/3  m-1.5 flex items-center justify-center bg-sky-50 ">
                    <Stats totalLikes={totalLikes}  totalviews ={totalviews} numberofblogs ={Articles.length}/>
                </div>
            </div>
        
        <div className="col-span-2 mt-3 h-full px-3 py-1.5">
            <div className='flex items-center justify-between'>
                <label htmlFor=""  className="font-medium">Description</label>
                <p className="text-red-500 text-xs ">{error}</p>
            </div>
            <textarea
                placeholder="Write a function that takes an array of integers and returns the maximum and minimum numbers as a tuple or list."
                className=" form-input-Course resize-none"
                rows={4}
                value={courseInfo?.description|| ""}
                onChange={({ target }) => handleCourseInfo("description", target.value)}
            />
            <div className='flex items-center justify-end'>
                <button onClick={UpdateCourse} className='btn-primary'>
                    {isLoading && <LuLoaderCircle className="animate-spin text-lg" />}
                    {isLoading ? "Saving..." : "Save "}

                </button>
            </div>
        </div>

            <div className="mt-5 px-3">
                {Articles?.map((post) => (
                    <BlogPostSummaryCard
                    at={"Course"}
                    key={post._id}
                    title={post.title}
                    imgUrl={post.coverImageUrl}
                    updatedOn={
                        post.updatedAt ? moment(post.updatedAt).format("Do MMM YYYY") : "N/A"
                    }
                    tags={post.tags}
                    likes={post.likes}
                    views={post.views}
                    onClick={() => navigate(`/admin/edit/${post.slug}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data: post._id })}
                    />
                ))}
            </div>
        
        </div>
    );
};

export default CourseCardComponent;
