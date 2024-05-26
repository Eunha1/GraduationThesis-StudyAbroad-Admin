import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PRIVATE_ROUTER, PUBLIC_ROUTER } from './router';
import { Fragment } from 'react';
import Layout from './layout';
import RequireAuth from './services/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {PRIVATE_ROUTER.map((router) => {
          let BasicLayout = Layout;
          if (router.layout === null) {
            BasicLayout = Fragment;
          }
          return (
            <Route
              key={router.key}
              element={<RequireAuth allowedRole={router.role} />}
            >
              <Route
                path={router.path}
                element={<BasicLayout>{router.element}</BasicLayout>}
              />
            </Route>
          );
        })}
        {PUBLIC_ROUTER.map((router) => {
          let BasicLayout = Layout;
          if (router.layout === null) {
            BasicLayout = Fragment;
          }
          return (
            <Route
              key={router.key}
              path={router.path}
              element={<BasicLayout>{router.element}</BasicLayout>}
            />
          );
        })}
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
