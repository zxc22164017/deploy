import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import SearchPage from "./pages/SearchPage";
import Profile from "./pages/Profile";
import authServices from "./services/authServices";
import UploadPicture from "./pages/UploadPicture";
import EditProfile from "./pages/EditProfile";
import SinglePicture from "./pages/SinglePicture";
import PageNotFound from "./pages/PageNotFound";
import About from "./pages/About";
import EditPicture from "./pages/EditPicture";
import ForgetPassword from "./pages/ForgetPassword";

function App() {
  const [user, setUser] = useState(authServices.getCurrentUser());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route
            index
            element={<HomePage user={user} setUser={setUser} />}
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/search/:keyword" element={<SearchPage />}></Route>
          <Route
            path="/profile/:idFromParams"
            element={<Profile user={user} setUser={setUser} />}
          ></Route>
          <Route
            path="/profile/:idFromParams/edit"
            element={<EditProfile user={user} setUser={setUser} />}
          ></Route>
          <Route
            path="/uploadPicture"
            element={<UploadPicture user={user} setUser={setUser} />}
          ></Route>
          <Route
            path="/picture/:pictureId"
            element={<SinglePicture user={user} setUser={setUser} />}
          ></Route>
          <Route
            path="/picture/:pictureId/edit"
            element={<EditPicture user={user} setUser={setUser} />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/*" element={<PageNotFound />}></Route>
          <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
