
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddStudents from './components/AddStudents';
import Studentlist from './components/Studentlist';
const myRouter = createBrowserRouter([
 {path:'',Component:Dashboard,children:[
   {path:'',Component:Studentlist},
   {path:'addStudent',Component:AddStudents},
   {path:'studentList',Component:Studentlist},
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
