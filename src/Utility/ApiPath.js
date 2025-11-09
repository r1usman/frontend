export const BASE_URL = "http://localhost:3000"

export const API_PATH = {
    AUTH: {
        LOGIN: "/Auth/login",
        REGISTER: "/Auth/register",
        PROFILE: "/Auth/profile",
        VERIFY_EMAIL: "/Auth/VerifyEmail",
        UPLOAD_PROFILE_IMG: "/Auth/uploadImg",

    },
    PLATFORM_COURSES: {
        CREATE: "/Default/Create",
        COURSES: "/Default/Course",
        GENERATE_IDEAS: "/Ask/Ideas",
        SCRAPCONTENT: "/Scrap",
        BLOG_GENERATION: "/Ask/Blog",
        UPDATE: (id) => `/Default/Update/${id}`

    },
    BLOG:
    {
        CREATE_POST: "/Blog/create",
        UPDATE_POST: (id) => `/Blog/update/${id}`,
        DELETE_POST: (id) => `/Blog/delete/${id}`,
        GET_ALL_POSTS: "/Blog/posts",
        GET_POST_BY_SLUG: "/Blog/slug/:slug",
        GET_POSTS_BY_TAG: "/Blog/tag/:tag",
        SEARCH_POSTS: "/Blog/search",
        INCREMENT_VIEW: (id) => `/Blog/increment-view/${id}`,
        LIKE_POST: (id) => `/Blog/like/${id}`,
        COURSE_BLOGS: (id) => `/Blog/CourseBlogs/${id}`
    },
    ASSIGN: {
        CREATE: "/Assign/Create",
        UPDATE: (ID) => `/Assign/Update/${ID}`,
        UPLOAD_THUMBNAIL: (ID) => `/Assign/${ID}/upload-image`,
        ASSINGMENTS: "/Assign/Assingments",
        ASSINGMENTSID: (ID) => `/Assign/Assingments/${ID}`,
        GETSTUDENTS: "/Assign/Students",
        STUDENTASSINGMENTS: "/Assign/student",
        DELETE: (ID) => `/Assign/Assingments/${ID}`,
        STATS: "/Assign/Assingments/Count/By-day",
        INSTRUCTOR: (ID) => `/Assign/InstructorDetail/${ID}`,
        RESULT: (ID) => `/Assign/Result/${ID}`
    },
    PARTIAL:
    {
        CREATE: "/Partial/Create",
        SAVE: (ID) => `/Partial/Save/${ID}`,
        SAVE_BY_INSTRUCTOR: (ID) => `/Partial/SaveEvaluation/${ID}`,
        UPDATE: (ID) => `/Partial/Update/${ID}`,
        UPLOAD_THUMBNAIL: (ID) => `/Partial/${ID}/upload-image`,
        GET_SUBMIT: "/Partial/SubmitAssingments",
        GET_ASSINGMENT_SUBMISSION: (ID) => `/Partial/SubmitAssingment/${ID}`,
        GET_STUDENTS_SUBMISSION: (ID) => `/Partial/SubmissionDetail/${ID}`,
        SAVE_THUMBNAIL: (ID) => `/Partial/SaveThumbnail/${ID}`,
        SAVE_MESSAGE: (ID) => `/Partial/SaveMessage/${ID}`,
        GET_MESSAGE: (ID) => `/Partial/SaveMessage/${ID}`
    },
    CHALLENGE: {
        CREATE: "/Chlg/Create",
        GET_ALL: "/Chlg/GetAll",
        GET_ALL_DASHBOARD: "/Chlg/GetDashboard",
        GET_BY_ID: (id) => `/Chlg/GetAll/${id}`,
        GET_PUBLIC_CHALLENGE: "/Chlg/GetAllWithPublic",
        GET_LEADERBOARD: "/Chlg/GetLeaderBoardData",
        UPDATE: (id) => `/Chlg/Update/${id}`,
        DELETE: (id) => `/Chlg/Delete/${id}`,
        DELETE_LIST: "/Chlg/DeleteList",
        UPLOAD_IMAGES: (id) => `/Chlg/${id}/upload-image`

    },
    CODE: {
        CREATE: "/Code/Create",
        GET_ALL_BY_INSTRUCTOR: "/Code/GetAllByInstructor",
        GET_ALL_BY_STUDENT: `/Code/StudentSubmission`,
        GET_PUBLIC_CHALLENGE: "/Code/Chlg/GetAllWithPublic",
        GET_TOP_PERFORMER: "Code/top3-submissions",
        GET_CHALLENGE_PERFORMER: (id) => `Code/ranking/${id}`,
        UPDATE: (id) => `/Code/Update/${id}`,
        DELETE: (id) => `/Code/Delete/:id/${id}`,
    },
    COURSE: {
        GET_COURSES_INSTRUCTOR: "/courses/instructor",
    },
    IMAGE: {
        UPLOAD_IMAGE: "/Auth/uploadImg"
    }

}