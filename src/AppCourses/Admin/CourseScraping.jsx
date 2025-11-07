import React, { useEffect, useState } from "react";
import HoverStack from "./Components/HoverStack";
import Input from "../../Collaboration/Components/Inputs/Input";
import { LuSparkles } from "react-icons/lu";
import AxiosInstance from "../../Utility/AxiosInstances";
import { API_PATH } from "../../Utility/ApiPath";

const CourseScraping = () => {
  const [text, setText] = useState("");
  const [scrapingData, setScrapingData] = useState(null);
  const [formattedCategory, setFormattedCategory] = useState("Python");
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

  // ✅ Dynamically update scrapeLink when text or selected site changes
  useEffect(() => {
    if (text.trim() === "") {
      setScrapeLink("");
      return;
    }
    const selected = websites[activeIndex];
    const generatedLink = `${selected.baseUrl}/${formattedCategory.toLowerCase()}/${formattedCategory.toLowerCase()}_${text.toLowerCase()}.asp`;
    setScrapeLink(generatedLink);
  }, [text, activeIndex, formattedCategory]);

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

  return (
    <div className="grid grid-cols-6 gap-2 p-3">
      {/* LEFT SIDE */}
      <div className="col-span-3 rounded-md bg-white p-3">
        {/* Category Selector (optional) */}
        <div className="flex items-center gap-2 mb-4 bg-gray-200 p-1 w-fit rounded-md">
          <button className="text-gray-800 font-semibold bg-white rounded px-2 py-1 text-sm hover:bg-gray-100">
            Default
          </button>
        </div>

        {/* Title Input */}
        <div className="mt-4 mb-3">
          <label className="block text-gray-500 text-sm font-medium mb-1">
            Post Title
          </label>
          <input
            placeholder="How to Build a MERN App"
            className="form-input-Course"
          />
        </div>

        {/* Website Selector */}
        <div className="flex items-center gap-2 mb-3">
          {websites.map((item, index) => (
            <HoverStack
              key={index}
              siteName={item.site}
              isActive={activeIndex === index}
              onClick={() => handleSelect(index)}
            />
          ))}
        </div>

        {/* Input + Scrape Button */}
        <div className="relative mb-3">
          <Input
            value={text}
            onchange={({ target }) => setText(target.value)}
            placeholder="Enter topic name (e.g., loops)"
          />
          <button
            onClick={handleScraping}
            disabled={isLoading || !scrapeLink}
            className="absolute right-2 top-2 flex items-center gap-2.5 text-sm font-medium text-sky-600 bg-sky-100 rounded px-3 py-1 border border-sky-200 hover:border-sky-400 cursor-pointer hover:scale-105 transition-all"
          >
            <LuSparkles />
            {isLoading ? "Scraping..." : "Scrape"}
          </button>
        </div>

        
        {scrapeLink && (
          <p className="text-gray-500 italic mt-3 text-sm"> {scrapeLink} </p>
        )}
        <p className="text-gray-500 italic mt-1 text-sm"> The system fetched this topic from an external source. Please research the original page before writing</p>


        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

    
        {scrapingData && (
            <form className="mt-2">
                <button type="submit" className="btn-primary1 ">
                    Create Blog
                </button>
            </form>
        )}
      </div>

      {/* RIGHT SIDE (Preview Section) */}
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
