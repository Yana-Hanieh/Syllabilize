import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'
import InfoTable from "../components/generalComponents/InfoTable";
import TabButton from "../components/reusableUiComponents/TabButton";
import MessagePopup from "../components/reusableUiComponents/MessagePopup";
import ConfirmationMessage from "../components/reusableUiComponents/ConfirmationMessage";
import Pagination from "../components/reusableUiComponents/Pagination";
import { IoMdAddCircle } from "react-icons/io";

function CoursesPage({role}) {
  const { submitSearch, page, setPage, isSidebarOpen } = useOutletContext() || {};
  const [courses, setCourses] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [popupMessageOpen, setPopupMessageOpen] = useState(false);
  const [confirmationMessgeOpen, setConfirmationMessgeOpen] = useState(false)

  //fetch the data from the backend
  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: 5 });
      // once backend supports it: if (submitSearch) params.append('search', submitSearch);
      
      if (submitSearch){ //if the searched student is available, append the student's name in the url
        params.append('name', submitSearch.trim())
      }

      const res = await fetch(`http://localhost:3000/api/courses?${params}`, {
        credentials: 'include',
        cache: 'no-store'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch courses');
      }

      const data = await res.json();
      console.log('classroomAPI response', data);
      console.log('sample course:', data.courses?.[0]);
      setCourses(data.courses ?? []);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { //useeffect used outside to fetch the added student directly into the table without having to refresh the page
    fetchCourses();
  }, [page, submitSearch]);

  //used to display data in the student table
  const CourseAttributes = [
    {
      key: 'courseName',
      label:'Name',
      type:'text',
      required: true,
      value: (item) => item.courseName,
      contexts: ['add', 'adminEdit'] 
    },
    {
      key: 'courseId',
      label:'ID',
      type:'number',
      required: true,
      value: (item) => item.courseId,
      contexts:[]
    }
  ]

  //handler that triggers the delete course 
  const handleDeleteButton = (item) => {
    setItemToDelete(item);
    setConfirmationMessgeOpen(true);
    console.log("Triggering delete handler")
  }
  
  //handles deleting a course
  const handleDeleteCourse = async (itemToDelete) => {
    const targetId = itemToDelete.courseId || itemToDelete.id //getting the course id of the info card
    
    if(!targetId){ //safety guard in case the passed item doesnt have an id 
      console.error('Could not find a valid ID to delete on item:', itemToDelete);
      return
    }

    try{
      const res = await fetch(`http://localhost:3000/api/courses/${targetId}`, {method: 'DELETE', credentials: 'include'});
     
      if(res.ok){ //checks if data was successfully fetched
        setCourses((prev) => 
          prev.filter((item) => {
            const itemId= item.courseId || item.id;
            return itemId !== targetId
          })
        );
      }
    }
    catch(error){
       console.error('Failed to delete item:', error)
    }
  }

  const handleEditButton = (item) => {
    setItemToEdit(item);
    setPopupMessageOpen(true);
    console.log("Open edit modal for:", itemToEdit);
  };

 //handles editing course info (name)
  const handleEditCourse = async (itemToEdit) => {
    try{
      const res = await fetch(`http://localhost:3000/api/courses/${itemToEdit.courseId}`, {
        method: 'PUT',
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(itemToEdit)
      });

      if (!res.ok){
        throw new Error('Failed to edit Course', itemToEdit);
      }
      setPopupMessageOpen(false);
      fetchCourses(); //refresh the infotable automatically by fetching the data ny an api call
    }
    catch(error){
      console.error('Failed to edit course', error)
    }
  }

 //handles adding course info (name)
  const handleAddButton = (itemToAdd) => {
    setPopupMessageOpen(true);
    setItemToEdit(null);
    console.log("triggers edit modal handler for:",itemToAdd);
  }
  const handleAddCourse = async (itemToAdd) => {
    try{
      const res = await fetch(`http://localhost:3000/api/courses`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(itemToAdd)
     });

     if (!res.ok){
      throw new Error('Failed to add course');
     }

     const newCourse = await res.json();
     console.log('Added new course', newCourse);
     setPopupMessageOpen(false);
     fetchCourses();
    }catch(error){
      console.error('failed to add course', error)
    }
  }
  
  // handles the loading display while the data is being fetched from the backend
  if (isLoading) {
    return (
      <div className="w-full border border-neutral-300 bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center text-neutral-500">
        Loading courses...
      </div>
    );
  }
// handles the error display if there is an error fetching the data from the backend
  if (error) {
    return (
      <div className="w-full border border-red-300 bg-red-50 text-red-600 rounded-2xl p-6 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-full overflow-hidden">
      {role==='admin'&& (
          <div className="w-fit ml-auto">
            <TabButton 
              type='button'
              onClick={handleAddButton}
              variant="default"
              icon={<IoMdAddCircle className="text-neutral-800 text-2xl"/>}
            />
          </div>
        )}

      {/* information thats displayed in a table */}
      <div className='flex justify-center'>
        <InfoTable 
          items={courses}
          role={role}
          itemType='courses'
          attributes={CourseAttributes}
          onDeleteItem={(handleDeleteButton)}
          onEditItem={handleEditButton}
        />
      </div>
      
      {/* message popup */}
      {popupMessageOpen && (
        <div className={`fixed z-40 right-0 top-0 bottom-0 flex items-center justify-center p-4 bg-black/50`}
          style={{ width: isSidebarOpen ? '90%' : '80%' }} // Adjust the width based on the sidebar state 
          >
          <MessagePopup
          //checks if itemToEdit state is true/created then its adminEdit, if its false/uncreated then we're adding a new course
            attributes={CourseAttributes.filter(f => f.contexts.includes(itemToEdit ? 'adminEdit' : 'add'))}
            initialValues={itemToEdit}
            onClose={() => setPopupMessageOpen(false)}
            onSubmit={itemToEdit ? handleEditCourse : handleAddCourse}
            classType={'Course'}
          />
        </div>
      )}
      
      {/* confimration message of delete popup */}
      {confirmationMessgeOpen && ( 
        <div className={`fixed z-40 right-0 top-0 bottom-0 flex items-center justify-center p-4 bg-black/50`}
            style={{ width: isSidebarOpen ? '90%' : '80%' }} // Adjust the width based on the sidebar state 
            >
          <ConfirmationMessage
            onSubmit={() => {
              handleDeleteCourse(itemToDelete); 
              setConfirmationMessgeOpen(false);
            } }
            onClose={() => setConfirmationMessgeOpen(false)}
           itemToDelete={itemToDelete}
          />
        </div>
      )}
      
      <div className="flex justify-center">
        <Pagination 
          page={page}
          totalPages={totalPages}
          setPage={setPage}        
        />
      </div>

    </div>
  )
}

export default CoursesPage