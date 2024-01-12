
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddStudents from './components/AddStudents';
import Studentlist from './components/Studentlist';
import UpdateStudent from './components/UpdateStudent';
const myRouter = createBrowserRouter([
 {path:'',Component:Dashboard,children:[
   {path:'',Component:Studentlist},
   {path:'addStudent',Component:AddStudents},
   {path:'studentList',Component:Studentlist},
   {path:'updatestudent',Component:UpdateStudent},
 ]},
])
function App() {
  return (
    <>
    <div className="App">
   <RouterProvider router={myRouter}/>
    </div>
    </>
  );
}

export default App;
