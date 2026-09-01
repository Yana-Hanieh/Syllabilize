import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'

function StudentsPage({role = 'admin'}) {
  const { submitSearch, page, setPage } = useOutletContext() || {};
  const [classrooms, setStudents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page, limit: 15 });
        // once backend supports it: if (submitSearch) params.append('search', submitSearch);

        const res = await fetch(`http://localhost:3000/api/classrooms?${params}`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch classrooms');
        }

        const data = await res.json();
        setStudents(data.classrooms);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [page, submitSearch]);

  const filteredStudents = classrooms.filter((classroom) => {
    if(!submitSearch)
      return true;
    const query = submitSearch.toLowerCase();
    return(
      classroom.classroomName?.toLowerCase().includes(query) || 
      classroom.classroomId?.includes(query)
    );
  })

  const handleDelete = async (itemToDelete) => {
    try{
      await fetch(`http://localhost:3000/api/classrooms/${itemToDelete.id}`, {method: 'DELETE', credentials: 'include'});
      setStudents((prev) => prev.filter((item) => item.id !== itemToDelete.id));
    }catch(error){
       console.error('Failed to delete item:', error)
    }
   
  }
  const handleEdit = (itemToEdit) => {
    console.log("Open edit modal for:", itemToEdit);
  };
  
  if (isLoading) {
    return (
      <div className="w-full border border-neutral-300 bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center text-neutral-500">
        Loading classrooms...
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
    <div>
      <div className='text-right p-4' >addition button here!!</div>
        <div className='flex justify-center'>
          <InfoCardsContainer 
            items={filteredStudents}
            role={role}
            itemType='classrooms'
            onDeleteItem={handleDelete}
            onEditItem={handleEdit}
          />
        </div>
    </div>
  )
}

export default StudentsPage