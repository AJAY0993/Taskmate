import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import AuthCheck from "./components/AuthCheck";
import store from "./store";
import Modal from "./components/Modal";
import FullPageLoader from "./components/FullPageLoader";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/Home"));
const DashBoard = lazy(() => import("./pages/DashBoard"));
const AboutMe = lazy(() => import("./pages/AboutMe"));
const Board = lazy(() => import("./pages/Board"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<FullPageLoader />}>
        <BrowserRouter>
          <AuthCheck>
            <Modal>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/dashboard/:id" element={<Board />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Modal>
          </AuthCheck>
        </BrowserRouter>
      </Suspense>
      <Toaster />
    </Provider>
  );
}

export default App;
