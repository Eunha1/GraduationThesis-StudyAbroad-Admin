import { useEffect, useState } from 'react';
import { DeleteIcon, PencilIcon, ViewIcon } from '../../asset/images/icons';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useNavigate, Link } from 'react-router-dom';
import { getRequest, postRequest } from '../../services/Api';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { toast } from 'react-toastify';
import { checkRoles } from '../../utils/Authen';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
function VisaFile() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false)
  const [idVisa, setIdVisa] = useState()
  const title = 'Hồ sơ Visa';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/visa-file',
      title: 'Hồ sơ visa',
    },
  ];
  const headers = [
    {
      key: 'stt',
      title: 'STT',
    },
    {
      key: 'customer_name',
      title: 'Tên khách hàng',
    },
    {
      key: 'customer_phone',
      title: 'Số điện thoại',
    },
    {
      key: 'customer_email',
      title: 'Email',
    },
    {
      key: 'customer_address',
      title: 'Địa chỉ',
    },
    {
      key: 'status',
      title: 'Trạng thái',
    },
    {
      key: 'action',
      title: 'Action',
    },
  ];
  useEffect(() => {
    getVisaFile();
  }, []);
  const getVisaFile = async () => {
    const data = await getRequest('/api/file/visa-file');
    setItem(data.data);
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/visa-file/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/visa/update-file/${id}`);
  };
  const handleClose = ()=>{
    setOpen(false)  
  }
  const handleRemove = async () =>{
    const data = await postRequest(`/api/file/delete/visa-file/${idVisa}`);
    if (data.status === 1) {
      toast.success(data.message);
      getVisaFile();
    } else {
      toast.error(data.message);
    }
    setOpen(false)
  }
  const handleDelete = async (id) => {
    setOpen(true)
    setIdVisa(id)
  };
  const action = [
    {
      key: 'view-detail',
      component: <ViewIcon />,
      event: handleView,
      role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
    },
    {
      key: 'edit-file',
      component: <PencilIcon />,
      event: handleEdit,
      role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
    },
    {
      key: 'delete-file',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      {checkRoles([ADMIN]) ? (
        <></>
      ) : (
        <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
          <Link
            to="/visa-file/upload"
            className="text-white text-base font-Roboto"
          >
            Thêm
          </Link>
        </button>
      )}
      <Content>
        <BaseTable headers={headers} items={items} actions={action}></BaseTable>
      </Content>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Remove file
        </DialogTitle>
        <DialogContent>
         <p>Do you want to remove this file</p> 
        </DialogContent>
        <DialogActions
        >
          <button className='px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100' onClick={handleClose}>Cancel</button>
          <button className='px-2 py-1 rounded-lg bg-[#D0021B] text-white hover:bg-red-700' onClick={handleRemove}>Remove</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default VisaFile;
