import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/shared/Sidebar';
import { Header } from '../components/shared/Header';
import Listterm from './Listterm';
import TopEmpty from './TopEmpty';
import BottomEmpty from './BottomEmpty';
const VangThiPage = () => {
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

export default VangThiPage
