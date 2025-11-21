import React, { useEffect, useState } from "react";
import HoverStack from "./Components/HoverStack";
import Input from "../../Collaboration/Components/Inputs/Input";
import { LuSparkles } from "react-icons/lu";
import AxiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";

const CourseScraping = ({setPostContent ,handleCloseForm}) => {


  
  const [text, setText] = useState("");
  const [scrapingData, setScrapingData] = useState(null);
  const [formattedCategory, setFormattedCategory] = useState("css");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrapeLink, setScrapeLink] = useState("");

  const websites = [
    {
      site: "W3Schools",
      baseUrl: "https://www.w3schools.com",
    },
    {
      site: "TutorialsPoint",
      baseUrl: "https://www.tutorialspoint.com",
    },
    {
      site: "GeeksForGeeks",
      baseUrl: "https://www.geeksforgeeks.org",
    },
  ];

  useEffect(() => {
  if (text.trim() === "") {
    setScrapeLink("");
    return;
  }

  const selected = websites[activeIndex];
  let generatedLink = "";

  switch (selected.site) {
    case "W3Schools":
      generatedLink = `${selected.baseUrl}/${formattedCategory.toLowerCase()}/${formattedCategory.toLowerCase()}_${text.toLowerCase()}.asp`;
      break;

    case "TutorialsPoint":
      generatedLink = `${selected.baseUrl}/${formattedCategory.toLowerCase()}/${formattedCategory.toLowerCase()}_${text.toLowerCase()}.htm`;
      break;

    case "GeeksForGeeks":
      generatedLink = `${selected.baseUrl}/${formattedCategory.toLowerCase()}/${formattedCategory.toLowerCase()}_${text.toLowerCase()}/`;
      break;

    default:
      generatedLink = `${selected.baseUrl}`;
      break;
  }

  setScrapeLink(generatedLink);
}, [text, activeIndex, formattedCategory]);


  const Languages = activeIndex ==0  ?
    [{ platform : "C++", tag : "css"},{platform : "Python",tag : "Python"},]
    : activeIndex == 1 ? [{ platform : "C++", tag : "cplusplus"},{platform : "Python",tag : "Python"},]
    :    [{ platform : "C++", tag : "cpp"},{platform : "Python",tag : "Python"},]



  console.log("formattedCategory" , formattedCategory );
  
  
  const handleSelect = (index) => {
    setActiveIndex(index);
  };

  const handleScraping = async () => {
    try {
      setIsLoading(true);
      setError("");

      const result = await AxiosInstance.post(API_PATH.PLATFORM_COURSES.SCRAPCONTENT, {
        topic: text || "output",
        category: formattedCategory.toLowerCase(),
        platformLink : scrapeLink
      });

      setScrapingData({
        title: result.data.data.title,
        sourceURL: result.data.data.sourceURL,
        contentBlocks: result.data.data.contentBlocks,
        highlightedHTML: result.data.data.highlightedHTML,
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong while scraping.");
    } finally {
      setIsLoading(false);
    }
  };

  
  const HandleSaveBlog = (e) => {
  e.preventDefault();
  try {
    setPostContent(scrapingData.title , scrapingData.contentBlocks)
    handleCloseForm();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div className="grid grid-cols-6 gap-2 p-3">
      <div className="col-span-3 rounded-md bg-white p-3">
        <div className="flex justify-between ">
          <div className="flex items-center gap-2 mb-4 bg-gray-200 p-1 w-fit rounded-md">
          <button className="text-gray-800 font-semibold bg-white rounded px-2 py-1 text-sm hover:bg-gray-100">
            Default
          </button>
        </div>
        <div>
          <div className='flex flex-col my-2  space-y-1.5 '>
                <select  onChange={({target})=>setFormattedCategory(target.value)}  className='flex items-center gap-2.5 text-[13px] font-medium text-sky-500 bg-sky-50/60 rounded px-1.5 md:px-3 py-1 md:py-[3px] border border-sky-100 hover:border-sky-400 cursor-pointer hover:scale-[1.02] transition-all   focus:outline-none' name="" id="">
                    <option disabled> Category</option> 
                    {
                        
                        Languages.map((data)=>(
                            <option value={data.tag}>{data.platform}</option>
                        ))
                    }

                </select>
            </div>
        </div>
        </div>

        <div className="mt-4 mb-3">
          <label className="block text-gray-500 text-sm font-medium mb-1">
            Post Title
          </label>
          <input
            placeholder="How to Build a MERN App"
            className="form-input-Course"
          />
        </div>

        <div className="flex items-center gap-2 mb-3">
          {websites.map((item, index , siteName) => (
            <HoverStack
              key={index}
              siteName={item.site}
              isActive={activeIndex === index}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>

        <div className="relative mb-3">
          <Input
            value={text}
            onchange={({ target }) => setText(target.value)}
            placeholder="Enter topic name (e.g., loops)"
          />
          <button
            onClick={handleScraping}
            disabled={isLoading || !scrapeLink}
            className="absolute right-2 top-4 flex items-center gap-2.5 text-sm font-medium text-sky-600 bg-sky-100 rounded px-3 py-1 border border-sky-200 hover:border-sky-400 cursor-pointer hover:scale-105 transition-all"
          >
            <LuSparkles />
            {isLoading ? "Scraping..." : "Scrape"}
          </button>
        </div>

        
        {scrapeLink && (
          <p className="text-gray-500 italic mt-3 text-sm"> {scrapeLink} </p>
        )}
        <p className="text-gray-500 italic mt-1 text-sm"> Enter a topic that actually exists on the chosen website (e.g., W3Schools, GeeksForGeeks, etc.). The scraper can’t fetch random or unsupported topics.</p>


        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

    
        {scrapingData && (
            <form className="mt-2" onSubmit={HandleSaveBlog}>
                <button type="submit" className="btn-primary1">
                  Create Blog
                </button>
              </form>
        )}
      </div>
      <div className="col-span-3 min-h-[85vh] border border-dotted border-sky-500 p-3 overflow-y-auto max-h-[90vh] bg-white rounded-md flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-500 italic mt-3">
              Scraping website content...
            </p>
          </div>
        ) : !scrapingData ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="rounded-md p-10 bg-sky-200/60">
              <LuSparkles className="size-10 text-yellow-500" />
            </div>
            <p className="text-gray-500 italic mt-3">
              Your scraped website preview will appear here.
            </p>
          </div>
        ) : (
          <iframe
            src={`http://localhost:3000/Scrap/preview?url=${encodeURIComponent(
              scrapingData.sourceURL
            )}`}
            className="w-full h-[90vh] rounded-md"
            title="Scraped Preview"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default CourseScraping;
