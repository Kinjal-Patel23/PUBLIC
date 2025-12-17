import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import BlogList from "./components/BlogList";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blogs" element={<BlogList/>} />
        <Route path="/add-blog" element={<AddBlog/>} />
        <Route path="/edit-blog/:id" element={<EditBlog/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
