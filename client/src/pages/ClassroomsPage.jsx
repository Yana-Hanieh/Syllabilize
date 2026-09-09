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

function ClassroomPage({role}) {
  const { submitSearch, page, setPage, isSidebarOpen } = useOutletContext() || {};
  const [classrooms, setClassrooms] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [popupMessageOpen, setPopupMessageOpen] = useState(false);
  const [confirmationMessgeOpen, setConfirmationMessgeOpen] = useState(false)

 //fetch paginated list of classrooms from the backend server
  const fetchClassrooms = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: 5 });
      // once backend supports it: if (submitSearch) params.append('search', submitSearch);

      
      if (submitSearch){ //if the searched classroom is available, append the student's name in the url
        params.append('name', submitSearch.trim())
      }

      const res = await fetch(`http://localhost:3000/api/classrooms?${params}`, {
        credentials: 'include'
      });

      if (!res.ok) {
        throw new Error('Failed to fetch classrooms');
      }

      const data = await res.json();
      setClassrooms(data.classrooms ?? []);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { //useeffect used outside to fetch the added student directly into the table without having to refresh the page
    fetchClassrooms();
  }, [page, submitSearch]);

  //used to display data in the student table
  const ClassroomAttributes = [
    {
      key:'classroomName', 
      label:'Name', 
      type:'text',
      required: true,
      value: (item) => item.classroomName,
      contexts: ['add', 'adminEdit'] 
    },
    {
      key:'classroomId', 
      label:'ID', 
      type:'number',
      required: true,
      value: (item) => item.classroomId,
      contexts:[]
    }
  ]


   //handler that triggers the delete student 
  const handleDeleteButton = (item) => {
    setItemToDelete(item); 
    setConfirmationMessgeOpen(true);  
    console.log("Triggering delete handler")
  }

  //handles deleting a student
  const handleDeleteClassroom  = async (itemToDelete) => {
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
            const itemId= item.classroomId || item.id;
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

  const handleEditClassroom = async (itemToEdit) => {
    try{
      const res = await fetch(`http://localhost:3000/api/classrooms/${itemToEdit.classroomId}`, {
        method: 'PUT',
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(itemToEdit)
      });

      if(!res.ok){
        throw new Error('Failed to edit Classroom', itemToEdit);
      }
      setPopupMessageOpen(false);
      fetchClassrooms();
    }
    catch(error){
      console.error('Failed to edit classroom', error)
    }
  }

  const handleAddButton = (itemToAdd) => {
    setPopupMessageOpen(true);
    setItemToEdit(null)
    console.log('triggers edit modal handler for: ',itemToAdd);
  };

  const handleAddClassroom = async (itemToAdd) => {
    try{
      const res = await fetch(`http://localhost:3000/api/classrooms`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(itemToAdd)
     });

     if (!res.ok){
      throw new Error('Failed to add classroom');
     }

     const newClassroom = await res.json();
     console.log('Added new classroom:', newClassroom);
     setPopupMessageOpen(false);
     fetchClassrooms();
    } catch(error){
      console.error('Failed to add classroom', error)
    }
  }

  // handles the loading display while the data is being fetched from the backend
  if (isLoading) {
    return (
      <div className="w-full border border-neutral-300 bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center text-neutral-500">
        Loading classrooms...
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
          items={classrooms}
          role={role}
          itemType='classrooms'
          attributes={ClassroomAttributes}
          onDeleteItem={handleDeleteButton}
          onEditItem={handleEditButton}
        />
      </div>

      {/* message popup */}
      {popupMessageOpen && (
        <div className={`fixed z-40 right-0 top-0 bottom-0 flex items-center justify-center p-4 bg-black/50`}
          style={{ width: isSidebarOpen ? '90%' : '80%' }} // Adjust the width based on the sidebar state 
          >
          <MessagePopup
            attributes={ClassroomAttributes.filter(f => f.contexts.includes(itemToEdit ? 'adminEdit' : 'add'))}
            initialValues={itemToEdit}
            onClose={() => setPopupMessageOpen(false)}
            onSubmit={itemToEdit? handleEditClassroom : handleAddClassroom}
            classType={'Classroom'}
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
              handleDeleteClassroom(itemToDelete); 
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


export default ClassroomPage