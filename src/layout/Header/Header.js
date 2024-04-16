import images from '../../asset/images';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className="flex items-center justify-between">
      <Link to="/">
        <div className="flex items-center ml-[50px]">
          <img
            src={images.logo}
            alt="logo"
            className="h-auto w-auto object-cover"
          />
          <div className="flex flex-col p-2 ml-3">
            <p className="text-3xl font-Fredericka font-medium not-italic p-1">
              HustEDU
            </p>
            <p className="text-2xl font-GreatVibes font-medium not-italic p-1">
              Chắp cánh tương lai
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center mr-[50px]">
        <img
          src={images.user}
          alt="avatar"
          className="h-[40px] w-[40px] object-cover"
        />
        <p className="text-base p-2 ml-2">Do Quang Phuc</p>
      </div>
    </div>
  );
}

export default Header;
