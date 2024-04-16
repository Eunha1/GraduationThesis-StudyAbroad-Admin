import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTER } from './router';
import { Fragment } from 'react';
import Layout from './layout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTER.map((router) => {
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
    </BrowserRouter>
  );
}

export default App;
