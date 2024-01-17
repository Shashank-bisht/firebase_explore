import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddStudents from "./components/AddStudents";
import Studentlist from "./components/Studentlist";
import UpdateStudent from "./components/UpdateStudent";
import AddFaculty from "./components/AddFaculty";
import FacultyList from "./components/FacultyList";
import UpdateFaculty from "./components/UpdateFaculty";
import Signup from './components/Signup'
import Login from "./components/Login";

const myRouter = createBrowserRouter([
  {path:'signup',Component:Signup},
  {path:'login',Component:Login},
  {
    path: "dashboard",
    Component: Dashboard,
    children: [
      { path: "", Component: Studentlist },
      { path: "addStudent", Component: AddStudents },
      { path: "studentList", Component: Studentlist },
      { path: "updatestudent", Component: UpdateStudent },
      {path:'addFaculty', Component:AddFaculty},
      {path:'facultyList', Component:FacultyList},
      {path:'updatefaculty', Component:UpdateFaculty}
    ],
  },
]);
function App() {
  return (
    <>
      <div className="App">
        <RouterProvider router={myRouter} />
        {/* RouterProvider will use the routing configuration specified in myRouter to manage the navigation and rendering of components based on the current URL. */}
      </div>
    </>
  );
}

export default App;
