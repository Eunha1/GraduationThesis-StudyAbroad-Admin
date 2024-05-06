import images from '../../asset/images';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { LogoutIcon } from '../../asset/images/icons';
function Header() {
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    navigate('/login');
    toast.success('Logout success');
  };
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
      <LightTooltip
        title={
          <div className="flex flex-col justify-center p-2 text-[16px] cursor-pointer">
            <div className="p-1">View Profile</div>
            <div className="p-1 flex items-center" onClick={handleLogout}>
              <LogoutIcon />
              <p className="ml-5">Logout</p>
            </div>
          </div>
        }
        slotProps={{
          popper: {
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: [-15, 0],
                },
              },
            ],
          },
        }}
      >
        <div className="flex items-center mr-[50px] cursor-pointer">
          <img
            src={images.user}
            alt="avatar"
            className="h-[40px] w-[40px] object-cover"
          />
          <p className="text-base p-2 ml-2">Do Quang Phuc</p>
        </div>
      </LightTooltip>
    </div>
  );
}

export default Header;
