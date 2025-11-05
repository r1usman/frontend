import React from 'react'
import { NavLink } from 'react-router'

const BlogPostCard = () => {
  return (
    <div className='flex flex-col gap-2 px-20 overflow-auto font-poppins'>
      <div>
       <div className='flex flex-row items-center justify-between py-4 px-2'> 
        <div>All{` (${(data.length)})`}</div>
       </div>
      </div>
      {data.map((item) => (
        <NavLink key={item._id} to={`/Post/${item._id}`} state={{ item }}>
         
          <div className='border border-zinc-300 hover:shadow-xl rounded-md px-5 gap-3  py-4 flex group'>
            <div className='border border-zinc-300 rounded-sm  size-16 items-center justify-center flex  text-4xl'>{item.title[0]}</div>
            <div className=' flex flex-row w-full justify-between'>
              <div className='flex flex-col items-start justify-between '>
                <div className='font-semibold'>{item.title}</div>
                <div className='flex flex-row gap-2 text-zinc-600 items-center'>
                    <div className='text-[#78909c]'>
                    {item.isPublished ? `Published ${new Date(item.createdAt).toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" })}` : "Not Published"}
                    </div>
                    <div className='flex flex-row gap-1.5 text-sm'>
                        {
                            item.tags.map((tag)=>(
                                <div  className='border border-[#78909c] px-2 py-1 rounded-2xl capitalize'>{tag}</div>
                            ))
                        }
                    </div>

                </div>
              </div>
              
              <div className='flex flex-col items-center justify-between text-[#78909c]'>
                <div className='hidden  group-hover:block'>
                    
                    <div className='border-0 p-2 rounded-full hover:border ease-in duration-100 hover:bg-red-50' onClick={(e)=>{DeletePage(e , item._id)}}>
                    <Trash2 className='size-5'/>
                    </div>
                </div>
                <div className='block  group-hover:hidden text-black'>Auro</div>
                <div className='flex flex-row gap-3'>
                    <div className='flex flex-row gap-1.5 items-center'><span>0</span><MessageCircle className='size-5'/></div>
                    <div className='flex flex-row gap-1.5 items-center'><span>0</span><ChartColumn className='size-5'/></div>
                </div>
              </div>
            </div>

          </div>
        </NavLink>
      ))}
    </div>
  )
}

export default BlogPostCard