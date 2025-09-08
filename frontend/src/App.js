import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from '../src/Components/Sidebar'
import PageRouter from './RouterPage/PageRouter';
import Header from '../src/Components/Header';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {




  return (
    <BrowserRouter>
      <div className='container-fluid'>
        <div className='row'>
          <Header />
        </div>
        <div className='row'>
          <div className='col-3 col-md-3 p-0'>
            <Sidebar />
          </div>
          <div className='col-9 col-md-9 '>
            <PageRouter />
            <ToastContainer
              position="top-center"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
