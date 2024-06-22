import { Fragment, useState } from 'react';
import { ArrowDouwn } from '../../asset/images/icons';
import { Menu } from '../../utils/Menu';
import { Link } from 'react-router-dom';
import { checkRoles } from '../../utils/Authen';
function SideBar() {
  const [openMenus, setOpenMenus] = useState({});
  const handleShow = (item) => {
    setOpenMenus({ ...openMenus, [item.key]: !openMenus[item.key] });
  };
  return (
    <div className="pl-4 py-4 grid grid-rows-10 h-[600px]">
      {Menu.map((item) => (
        <Fragment key={item.key}>
          {checkRoles(item.role) ? (
            <Link
              to={item.src}
              className="grid grid-cols-5 items-center p-1"
              onClick={item?.child ? () => handleShow(item) : ''}
            >
              <div className="col-span-1 mr-5">{item.icon}</div>
              <div className="text-[16px] text-gray-900 col-span-3">
                {item.title}
              </div>
              {item?.child && item?.child.length > 0 ? (
                <div className="col-span-1 ml-3">
                  <ArrowDouwn />
                </div>
              ) : (
                <></>
              )}
            </Link>
          ) : (
            <></>
          )}
          {item?.child && openMenus[item.key] && checkRoles(item.role) ? (
            <>
              {item?.child.map((child) => (
                <Link
                  to={child.src}
                  key={child.key}
                  className="flex items-center p-1 ml-8"
                >
                  <div className=" mr-5">{child.icon}</div>
                  <div className="text-[16px] text-gray-900">{child.title}</div>
                </Link>
              ))}
            </>
          ) : (
            <></>
          )}
        </Fragment>
      ))}
    </div>
  );
}

export default SideBar;
