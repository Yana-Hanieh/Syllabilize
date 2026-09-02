import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'
import InfoTable from "../components/generalComponents/InfoTable";

function StudentsPage({role = 'admin'}) {
  const { submitSearch, page, setPage } = useOutletContext() || {};
  const [students, setStudents] = useState([]);
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

        const res = await fetch(`http://localhost:3000/api/users?${params}`, {
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await res.json();console.log(JSON.stringify(data.students[0], null, 2));
        setStudents(data.students);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, [page, submitSearch]);

  const StudentsAttributes = [
    {key: 'pfp', label:'ProfilePic', value: (item) => item.profilePicUrl},
    {key: 'name', label:'Name', value: (item) => item.userName},
    {key: 'id', label:'ID', value: (item) => item.studentId},
    {key: 'email', label:'Email', value: (item) => item.userEmail},
    {key: 'courses', label:'Courses', value: (item) => item.courses},
    {key: 'classroom', label:'Classroom', value: (item) => item.classroom}
  ]

  const filteredStudents = students.filter((student) => {
    if(!submitSearch)
      return true;
    const query = submitSearch.toLowerCase();
    return(
      student.userName?.toLowerCase().includes(query) || 
      student.userEmail?.toLowerCase().includes(query) ||
      student.studentId?.toString().includes(query)
    );
  })

  const handleDelete = async (itemToDelete) => {
    const targetId = itemToDelete.userId || itemToDelete.studentId || itemToDelete.id //getting the id of the info card regarless if it is a student, course or a classroom id
    
    if(!targetId){ //safety guard in case the passed item doesnt have an id 
      console.error('Could not find a valid ID to delete on item:', itemToDelete);
      return
    }

    try{
      const res = await fetch(`http://localhost:3000/api/users/${targetId}`, {method: 'DELETE', credentials: 'include'});
     
      if(res.ok){ //checks if data was successfully fetched
        setStudents((prev) => 
          prev.filter((item) => {
            const itemId= item.userId || item.studentId || item.id;
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
  
  if (isLoading) {
    return (
      <div className="w-full border border-neutral-300 bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center text-neutral-500">
        Loading students...
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
          <InfoTable
            items={filteredStudents}
            role={role}
            itemType='students'
            attributes={StudentsAttributes}
            onDeleteItem={handleDelete}
            onEditItem={handleEdit}
          />
        </div>
    </div>
  )
}

export default StudentsPage