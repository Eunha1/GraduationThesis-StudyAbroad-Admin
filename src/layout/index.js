import Header from './Header/Header';
import SideBar from '../components/SideBar/Sidebar';
function Layout({ children }) {
  return (
    <div className="bg-gray-100 flex flex-col h-screen w-screen overflow-y-auto">
      <div className="h-[120px]">
        <Header />
      </div>
      <div className="grid grid-cols-12 flex-1 h-auto">
        <div className="col-span-2">
          <SideBar />
        </div>
        <div className="col-span-10 mr-[20px] rounded-[18px] bg-white py-4 px-2">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
