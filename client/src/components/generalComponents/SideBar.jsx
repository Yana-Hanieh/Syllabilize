import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import TabButton from '../reusableUiComponents/TabButton';
import { IoMenu } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { PiStudentFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { FaBook } from "react-icons/fa";

function SideBar({userRole = 'student', userName='John Doe', profilePicUrl=null}) {
  const navigate = useNavigate();
  const location = useLocation(); //gives access to the current url info 
  const isActive = (Path) => location.pathname.includes(Path); //returns true if the current url is the same as the buttons' path
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const NavigationLinks = [
    {Label:"Students", Path:"/students", Icon:PiStudentFill, Role:['admin']},
    {Label:"Courses", Path:"/courses", Icon:SiGoogleclassroom, Role:['admin','student']},
    {Label:"Classrooms", Path:"/classrooms", Icon:FaBook, Role:['admin','student']}
  ]

  const visibleLinks =NavigationLinks.filter(link => link.Role.includes(userRole))

  return (
    <div>
      {/* blurs the screen when the sidebar is open on small devices */}
      {!isCollapsed && (
        <div 
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-neutral-600/40 backdrop-blur-sm z-40 sm:hidden transition-opacity"
        />
      )}

      <div className={`bg-white dark:bg-neutral-200 shadow-sm z-50 rounded-r-xl absolute sm:relative flex flex-col transition-all duration-300 ease-in-out sm:pt-3
              ${isCollapsed ? `w-16 sm:w-20 gap-5 sm:h-screen items-center pb-6 ` : `w-2/3 h-full sm:h-screen sm:w-65 gap-3`}`}
            >
              
          {/* Top section of the sidebar, contains pfp + users' name */}
          <div className="flex items-center justify-end h-10 sm:p-2">
              <IoMenu
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-3xl cursor-pointer text-neutral-600 hover:text-secondary" />
          </div> 

            {/* profile and user name is shown only when the bar is opened */}
            {!isCollapsed &&(
                <div className="flex flex-row gap-3 px-4 sm:px-6 items-center">
                    {profilePicUrl ? (
                      <img 
                        src={profilePicUrl} 
                        alt={`${userName}'s profilePic`} 
                        className='w-10 h-10 rounded-full cursor-pointer'
                      />
                    ):(
                      <CgProfile className='text-4xl text-neutral-600 cursor-pointer '/>  /* onClick={() => <Navigate to='student/courses'/>} */
                    )}

                    <div className=' rounded-xl w-2/3 px-3 py-1 text-neutral-100 bg-primary'>
                      <p className="text-sm truncate">{userName}</p>
                      <p className="text-xs capitalize opacity-90">{userRole}</p>
                    </div>
                </div>
            )}

          {/* elements of the sideBar */}
          <div className="flex flex-col gap-4 px-4 cursor-pointer">
            {visibleLinks.map(({Label,Path,Icon}) =>(
              <TabButton
                key={Path}
                icon={Icon}
                label={isCollapsed ? '' : Label}
                isActive={isActive(Path)}
                onClick={() => navigate(`/${userRole}${Path}`)}
                className={`hover:bg-secondary ${isCollapsed ? 'justify-center': ''}`}
                />
            ))} 
          </div>

          {/* Logout button in the end of the sidebar */}
          <div className={`mt-auto ${isCollapsed ? 'p-2' : 'p-4'}`}>
              <TabButton 
                icon={FiLogOut}
                variant='danger'
                label={isCollapsed? '': 'LogOut'}
                onClick={() => navigate('/login')}
              />
          </div>

        </div>
    </div>
  )
}

export default SideBar
