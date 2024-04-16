import Header from './Header/Header';
import SideBar from '../components/SideBar/Sidebar';
import styles from './layout.module.css';
function Layout({ children }) {
  return (
    <div className="bg-gray-200 flex flex-col h-screen w-screen overflow-y-auto">
      <div className={styles.header_content}>
        <Header />
      </div>
      <div className={styles.main_container}>
        <SideBar />
        <div className={styles.main_content}>{children}</div>
      </div>
    </div>
  );
}

export default Layout;
