import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTER } from './router';
import { Fragment } from 'react';
import Layout from './layout';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTER.map((router) => {
          let BasisLayout = Layout;
          if (router.layout === null) {
            BasisLayout = Fragment;
          }
          return (
            <Route
              key={router.key}
              path={router.path}
              element={<BasisLayout>{router.element}</BasisLayout>}
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
