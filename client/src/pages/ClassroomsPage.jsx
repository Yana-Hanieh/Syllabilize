import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'

function ClassroomPage({role = 'admin'}) {
  const { submitSearch, page, setPage } = useOutletContext() || {};
  const [classrooms, setClassrooms] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ page, limit: 15 });
        // once backend supports it: if (submitSearch) params.append('search', submitSearch);

        const res = await fetch(`http://localhost:3000/api/classrooms?${params}`, {
          credentials: 'include'
        });

        if (!res.ok) {
          throw new Error('Failed to fetch classrooms');
        }

        const data = await res.json();
        console.log('classroomAPI response', data);
        console.log('sample classroom:', data.classrooms?.[0]);
        setClassrooms(data.classrooms ?? []);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClassrooms();
  }, [page, submitSearch]);

  const classroomsAttributes = [
    {key:'name', label:'Name', value: (item) => item.classroomName},
    {key:'id', label:'ID', value: (item) => item.classroomId}
  ]

  const filteredClassrooms = classrooms.filter((classroom) => {
    if(!submitSearch)
      return true;
    const query = submitSearch.toLowerCase();
    return(
      classroom.classroomName?.toLowerCase().includes(query) || 
      classroom.classroomId?.toString().includes(query)
    );
  })

  const handleDelete = async (itemToDelete) => {
    const targetId = itemToDelete.classroomId || itemToDelete.id //getting the classroom id of the info card
    
    if(!targetId){ //safety guard in case the passed item doesnt have an id 
      console.error('Could not find a valid ID to delete on item:', itemToDelete);
      return
    }

    try{
      const res = await fetch(`http://localhost:3000/api/classrooms/${targetId}`, {method: 'DELETE', credentials: 'include'});
     
      if(res.ok){ //checks if data was successfully fetched
        setClassrooms((prev) => 
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
            items={filteredClassrooms}
            role={role}
            itemType='classrooms'
            attributes={classroomsAttributes}
            onDeleteItem={handleDelete}
            onEditItem={handleEdit}
          />
        </div>
    </div>
  )
}

export default ClassroomPage