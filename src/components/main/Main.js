import './Main.css';
import Navbar from '../nav/Navbar';
import Content from '../common/Content';
import { useEffect, useState } from 'react';
import RaspberryCodeModal from '../modal/RaspberryCodeModal';
import DashBoard from '../display/Dashboard';
import StartBtn from '../buttons/StartBtn';
import TargetBoard from '../display/TargetBoard';

export const Main = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    if (userId && accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Content>
        <div className="main-grid">
          <DashBoard isLoggedIn={isLoggedIn} />
          <TargetBoard isLoggedIn={isLoggedIn} />
          <StartBtn onClick={openModal} />
        </div>
      </Content>
      {modalOpen && <RaspberryCodeModal onClose={closeModal} />}
    </>
  );
};

export default Main;
