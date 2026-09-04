import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import InfoCards from '../components/generalComponents/InfoCards'
import InfoCardsContainer from '../components/generalComponents/InfoCardsContainer'
import InfoTable from "../components/generalComponents/InfoTable";
import TabButton from "../components/reusableUiComponents/TabButton";
import MessagePopup from "../components/reusableUiComponents/MessagePopup";
import { IoMdAddCircle } from "react-icons/io";


function StudentsPage({role = 'admin'}) {
  const { submitSearch, page, setPage } = useOutletContext() || {};
  const [students, setStudents] = useState([]);

  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [classroomOptions, setClassroomOptions] = useState([]);
  const [courseOptions, setCourseOptions] = useState([]);

  const [popupMessageOpen, setPopupMessageOpen] = useState(false);

  // fetch the data from the backend
  useEffect(() => {
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

  const StudentsDataEntryAttributes = [
    {
      key: 'name', 
      label:'Name',
      type:'text', 
      required: true,
    },
    {
      key: 'age', 
      label:'Age',
      type:'number', 
      required: true
    },
    {
      key: 'email', 
      label:'Email',
      type: 'text', 
    },
    {
      key: 'password', 
      label:'Password',
      type:'text',
      required: true
    },
    {
      key: 'courses', 
      label:'Courses', 
      type:'multiselect', //use select since it will be a drop-down menue to choose multiple courses from
      required: false
    },
    {
      key: 'classroom', 
      label:'Classroom',
      type:'select', //use select since it will be a drop-down menue to choose one classroom from
      required: true
    }
  ]

  const StudentSelfEditAttributes = [
    {
      key: 'pfp', 
      label:'ProfilePic',
      type: 'image'
    },
    {
      key: 'password', 
      label:'Password',
      type:'text'
    },
    {
      key: 'email', 
      label:'Email',
      type: 'text'
    },
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

  const handleAdd = (itemToAdd) => {
    setPopupMessageOpen(true);
    console.log('adding element',itemToAdd);
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
    //overflow-hidden
    <div className="max-w-full overflow-auto"> 
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

      <div className='flex justify-center w-full'>
        <InfoTable
          items={filteredStudents}
          role={role}
          itemType='students'
          attributes={StudentsDisplayAttributes}
          onDeleteItem={handleDelete}
          onEditItem={handleEdit}
        />
      </div>

      {popupMessageOpen && (
      <div className="flex-1 justify-items-center">
        <MessagePopup
          attributes={StudentsDataEntryAttributes}
          initialValues={null}
          classroomOptions={classroomOptions}
          coursesOptions={courseOptions}
          onClose={() => setPopupMessageOpen(false)}
          onSubmit={() => setPopupMessageOpen(false)}
        />
      </div>
    )}

    </div>
  )
}

export default StudentsPage