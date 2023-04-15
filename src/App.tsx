import 'App.css';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import BallSort from 'components/BallSort';
import Login from 'components/Login';
import SignUp from 'components/SignUp';
import Loading from 'components/Loading';
import { AppContextProvider } from 'hooks/useAppContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const AppRoot = styled.div`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <AppRoot>
      <Suspense fallback={<Loading />}>
        <AppContextProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/ballsort" element={<BallSort />}></Route>
              </Routes>
            </BrowserRouter>
          </QueryClientProvider>
        </AppContextProvider>
      </Suspense>
      <Toaster
        toastOptions={{
          position: 'top-center',
        }}
      />
    </AppRoot>
  );
}

export default App;
