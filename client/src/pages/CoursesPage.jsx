import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'
import InfoTable from "../components/generalComponents/InfoTable";
import TabButton from "../components/reusableUiComponents/TabButton";
import { IoMdAddCircle } from "react-icons/io";

function CoursesPage({role}) {
  const { submitSearch, page, setPage } = useOutletContext() || {};
  const [courses, setCourses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page, limit: 15 });
        // once backend supports it: if (submitSearch) params.append('search', submitSearch);

        const res = await fetch(`http://localhost:3000/api/courses?${params}`, {
          credentials: 'include',
          cache: 'no-store'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch courses');
        }

        const data = await res.json();
        console.log('classroomAPI response', data);
        console.log('sample classroom:', data.courses?.[0]);
        setCourses(data.courses ?? []);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [page, submitSearch]);

  const coursesAttributes = [
    {key: 'name', label:'Name', value: (item) => item.courseName},
    {key: 'id', label:'ID', value: (item) => item.courseId}
  ]

  const filteredCourses = courses.filter((classroom) => {
    if(!submitSearch)
      return true;
    const query = submitSearch.toLowerCase();
    return(
      classroom.classroomName?.toLowerCase().includes(query) || 
      classroom.classroomId?.toString().includes(query)
    );
  })

  const handleDelete = async (itemToDelete) => {
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
            const itemId= item.userId || item.classroomId || item.id;
            return itemId !== targetId
          })
        );
      }
    }
    catch(error){
       console.error('Failed to delete item:', error)
    }
   
  }
  const handleEdit = (itemToEdit) => {
    console.log("Open edit modal for:", itemToEdit);
  };

  const handleAdd = (itemToAdd) => {
    console.log('adding element',itemToAdd);
  }
  
  if (isLoading) {
    return (
      <div className="w-full border border-neutral-300 bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center text-neutral-500">
        Loading courses...
      </div>
    );
  }

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
              onClick={handleAdd}
              variant="default"
              icon={<IoMdAddCircle className="text-neutral-800 text-2xl"/>}
            />
          </div>
        )}

      <div className='flex justify-center'>
        <InfoTable 
          items={filteredCourses}
          role={role}
          itemType='courses'
          attributes={coursesAttributes}
          onDeleteItem={(handleDelete)}
          onEditItem={handleEdit}
        />
      </div>
    </div>
  )
}

export default CoursesPage