import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'
import InfoTable from "../components/generalComponents/InfoTable";
import TabButton from "../components/reusableUiComponents/TabButton";
import MessagePopup from "../components/reusableUiComponents/MessagePopup";
import ConfirmationMessage from "../components/reusableUiComponents/ConfirmationMessage";
import { IoMdAddCircle } from "react-icons/io";


function StudentsPage({role = 'admin'}) {
  const { submitSearch, page, setPage, isSidebarOpen } = useOutletContext() || {};
  const [students, setStudents] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [classroomOptions, setClassroomOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [popupMessageOpen, setPopupMessageOpen] = useState(false);
  const [confirmationMessgeOpen, setConfirmationMessgeOpen] = useState(false)

  // fetch the data from the backend
  const fetchStudents = async () => {
    try {
      const params = new URLSearchParams({ page, limit: 15 });
      const res = await fetch(`http://localhost:3000/api/users?${params}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch students');
      }

      const data = await res.json();
      console.log(JSON.stringify(data.students[0], null, 2));
      setStudents(data.students);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { //useeffect used outside to fetch the added student directly into the table without having to refresh the page
    fetchStudents();
  }, [page, submitSearch]);

  // fetch the classroom and course options for the select fields
  useEffect(() => {
    const fetchOptions = async() => {
      try{
        const params = new URLSearchParams({ page, limit: 15 });
        const [classroomRes, courseRes] = await Promise.all([
          fetch(`http://localhost:3000/api/classrooms?${params}`, {credentials: 'include'}), 
          fetch(`http://localhost:3000/api/courses?${params}`, {credentials: 'include'}),
        ]);

        const classroomData = await classroomRes.json();
        const courseData = await courseRes.json();
        setClassroomOptions(classroomData.classrooms ?? [])
        setCourseOptions(courseData.courses ?? [])
      } catch (err) {
        console.error('Failed to fetch options:', err);
      }
    }; fetchOptions();
  }, []);

  //used to display data in the student table
  const StudentsDisplayAttributes = [
    {
      key: 'pfp', 
      label:'ProfilePic', 
      value: (item) => item.profilePicUrl
    },
    {
      key: 'name', 
      label:'Name', 
      value: (item) => item.userName},
    {
      
      key: 'id', 
      label:'ID', 
      value: (item) => item.studentId},
    {
      key: 'email', 
      label:'Email', 
      value: (item) => item.userEmail},
    {
      key: 'courses', 
      label:'Courses', 
      value: (item) => item.Courses?.map(course => course.courseName).join(', ') || 'No courses'},
    {
      key: 'classroom', 
      label:'Classroom', 
      value: (item) => item.classroom?.classroomName
    }
  ]
  
  const StudentFieldAttributes = [
    { key: 'userName', label: 'Name', type: 'text', required: true, contexts: ['add'] },
    { key: 'studentAge', label: 'Age', type: 'number', required: true, contexts: ['add'] },
    { key: 'userEmail', label: 'Email', type: 'email', required: true, contexts: ['add', 'adminEdit', 'selfEdit'] },
    { key: 'userPassword', label: 'Password', type: 'password', required: true, contexts: ['add', 'selfEdit'] },
    { key: 'courseIds', label: 'Courses', type: 'multiselect', contexts: ['add', 'adminEdit'] },
    { key: 'classroomId', label: 'Classroom', type: 'select', required: true, contexts: ['add', 'adminEdit'] },
    { key: 'pfp', label: 'ProfilePic', type: 'image', contexts: ['selfEdit'] },
]

  //filtering student based on their name, email or std id for the search
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

  //handler that triggers the delete student 
  const handleDeleteButton = (item) => {
    setItemToDelete(item);
    setConfirmationMessgeOpen(true);
    console.log("Triggering delete handler")
  }
  
  //handles deleting a student
  const handleDeleteStudent = async (itemToDelete) => {
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

  //handles editing student info
  const handleEditButton = (item) => {
    setItemToEdit(item);
    setPopupMessageOpen(true);
    console.log("triggers edit modal handler for:", itemToEdit);
  };

  const handleEditStudent = async (itemToEdit) => {
      const formattedData ={ 
        ...itemToEdit,
        userId: itemToEdit.userId || itemToEdit.studentId || itemToEdit.id,
        studentAge: Number(itemToEdit.studentAge), // Ensure studentAge is an integer
        classroomId: Number(itemToEdit.classroomId) || null, // Ensure classroomId is either a valid ID or null
        courseIds: itemToEdit.courseIds || itemToEdit.Courses?.map((course) => course.courseId) || [],
      }
    try{
      const res = await fetch(`http://localhost:3000/api/users/${formattedData.userId}`, {
        method: 'PUT',
        credentials: 'include', 
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formattedData)
      });

      if(!res.ok){
        throw new Error('Failed to edit student');
      }

      setPopupMessageOpen(false);
      fetchStudents();
    } catch(error){
      console.error('Failed to edit student:', error);
    }
  }
  
  //handler that triggers the add student popup message
  const handleAddButton = (itemToAdd) => {
    setPopupMessageOpen(true);
    setItemToEdit(null)
    console.error("triggers add modal handler for:", itemToAdd);
  }

  //handles adding the data for the student into the form
  const handleAddStudent = async (itemToAdd) => {
    try{
      //data is formatted to ensure that the data type is compatible with the format used in the backend
      const formattedData ={ 
        ...itemToAdd,
        studentAge: Number(itemToAdd.studentAge), // Ensure studentAge is an integer
        classroomId: Number(itemToAdd.classroomId) || null, // Ensure classroomId is either a valid ID or null
        courseIds: itemToAdd.courseIds || [], // Ensure courseIds is an array, even if not provided
      }
      const res= await fetch(`http://localhost:3000/api/users`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formattedData)
      });
      
      if(!res.ok){
        throw new Error('Failed to add student');
      }

      const newStudent = await res.json();
      console.log('Added new student:', newStudent);
      setPopupMessageOpen(false);
      fetchStudents(); // Refresh the student list after adding a new student
    } catch(error){
      console.error('Failed to add student:', error);
    }
  };
  
  // handles the loading display while the data is being fetched from the backend
  if (isLoading) {
    return (
      <div className="w-full border border-neutral-300 bg-white dark:bg-neutral-800 rounded-2xl p-10 text-center text-neutral-500">
        Loading students...
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
      {role==='admin'&& ( //ensures that only the admin can see the add button, since students shouldnt be able to add other students
          <div className="w-fit ml-auto">
            {/* add button available to admin only */}
            <TabButton 
              type='button'
              onClick={handleAddButton}
              variant="default"
              icon={<IoMdAddCircle className="text-neutral-800 text-2xl"/>}
            />
          </div>
      )} 

      {/* information thats displayed in a table */}
      <div className='flex justify-center w-full'>
        <InfoTable
          items={filteredStudents}
          role={role}
          itemType='students'
          attributes={StudentsDisplayAttributes}
          onDeleteItem={handleDeleteButton}
          onEditItem={handleEditButton}
        />
      </div>

      {/* adding message popup */}
      {popupMessageOpen && (
        <div className={`fixed z-40 right-0 top-0 bottom-0 flex items-center justify-center p-4 bg-black/50`}
          style={{ width: isSidebarOpen ? '90%' : '80%' }} // Adjust the width based on the sidebar state 
          >
          <MessagePopup
            attributes={StudentFieldAttributes.filter(f => f.contexts.includes( itemToEdit? 'adminEdit':'add'))}
            initialValues={itemToEdit}
            classroomOptions={classroomOptions}
            coursesOptions={courseOptions}
            onClose={() => setPopupMessageOpen(false)}
            onSubmit={itemToEdit ? handleEditStudent : handleAddStudent}
            classType={'Student'}
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
              handleDeleteStudent(itemToDelete); 
              setConfirmationMessgeOpen(false);
            } }
            onClose={() => setConfirmationMessgeOpen(false)}
           itemToDelete={itemToDelete}
          />
        </div>
      )}

    </div>
  )
}

export default StudentsPage