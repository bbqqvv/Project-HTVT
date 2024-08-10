import React from 'react'

import { Outlet } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar';
import { Header } from '../components/shared/Header';

import Listterm from './Listterm';
import BottomEmpty from './BottomEmpty';
import TopEmpty from './TopEmpty';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

function handleClick() {
  navigate('/hoanthi');
}




const SinhVienPage: React.FC = () => {
  return (
    <div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <>
          <Header />
          <TopEmpty />
          <Listterm />
          <BottomEmpty />
        </>
      </div>
    </div>
  )
}


export default SinhVienPage
