import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import AddStudents from "./components/AddStudents";
import Studentlist from "./components/Studentlist";
import UpdateStudent from "./components/UpdateStudent";
import AddFaculty from "./components/AddFaculty";
import FacultyList from "./components/FacultyList";
import UpdateFaculty from "./components/UpdateFaculty";
const myRouter = createBrowserRouter([
  {
    path: "",
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
      </div>
    </>
  );
}

export default App;
