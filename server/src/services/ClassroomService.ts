import { Classroom } from "../interfaces/Classroom"; //importing the classroom interface
export class ClassroomService{
    private classrooms: Classroom[] = []; //a private variable called classrooms which includes an array of classroom objects
    private nextClassroomId = 1; 

    create(name:string): Classroom | string { //creating an instance of ClassroomService called classroom
        const newClassroom: Classroom = {classroomId: this.nextClassroomId++, //we assign this specific class object with the nectClassroomId, and increments it for the next object
                                        classroomName: name,  //assign the classroomName with the name parameter
                                        studentList:[] } //creates an empty student list
        this.classrooms.push(newClassroom); //pushes these created parameters into the newly created newClassroom object
        // const classroomId= newClassroom.classroomId;
        // const classroomName= newClassroom.classroomName;
        // const studentList= newClassroom.studentList;
        // const result= `Classroom ID: ${classroomId} Classsroom Name: ${classroomName} Student List: ${studentList}`;
        // return result; //returns the created object which will be used by the controller (caller)
        return newClassroom;
    }

    //the view function has 2 methods, the getAll to view all the classrooms, and getOne to view only one classroom
    getAll(): Classroom[]{ //shows a table/list of every classroom (names and student counts)
        return [...this.classrooms] //we return the copy of the array using a spread syntax to ensure data integrity/security from accidental mutation
    }

    getOne(id:number){//shows full details for one specific classroom (name, studentcount and actual list of students)
        const foundClassroom = this.classrooms.find(c => c.classroomId === id) //.find() returns the first matching element of undefined if none is matched, and its stored in a variable called foundClass
        if (!foundClassroom){  //if .find() returns undefined exit early and return null
            return null;
        }
        return foundClassroom; //if a classroom is matched then return it
    }

    update(id: number, newName: string): Classroom | null{
        const foundClassroom = this.classrooms.find (c => c.classroomId === id)
        if (!foundClassroom){  //if .find() returns undefined exit early and return null
            return null;
        }
        foundClassroom.classroomName = newName; //mutate the exitsting object directly on the classrooms object by changing the classroom name only
        return foundClassroom; //returns the altered foundClassroom
    }

    delete(id:number): boolean{ //deletes the class, and returns a boolean value
        const index = this.classrooms.findIndex(c => c.classroomId === id) //firstIndex() returns the position/index of the first object where the id matches
        if (index === -1){ //guard clause to make sure that the array has an object
            return false
        }
        this.classrooms.splice(index, 1); //.splice() mutates the classes directly, it removes 1 element from the classes array at the specified index
        return true;
    }
}