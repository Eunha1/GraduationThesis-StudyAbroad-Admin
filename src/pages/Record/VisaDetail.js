import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import BaseTable from '../../components/BaseTable';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, PencilIcon, DeleteIcon } from '../../asset/images/icons';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
function VisaDetail() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false)
  const [idVisa, setIdVisa] = useState()
  const title = 'Visa';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/record/visa',
      title: 'Visa',
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
      key: 'country',
      title: 'Quốc gia có visa',
    },
    {
      key: 'action',
      title: 'Action',
    },
  ];
  useEffect(() => {
    getListRecordVisa();
  }, []);
  const getListRecordVisa = async () => {
    const data = await getRequest('/api/file/record/visa');
    if (data.status === 1) {
      setItem(data.data);
    }
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/record/visa/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/record/update-visa/${id}`);
  };
  const handleClose = ()=>{
    setOpen(false)
  }
  const handleRemove = async ()=>{
    const data = await postRequest(`/api/file/delete/visa-record/${idVisa}`);
    if (data.status === 1) {
      toast.success(data.message);
      getListRecordVisa();
    } else {
      toast.error(data.message);
    }
  }
  const handleDelete =  (id) => {
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
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link
          to="/record/visa/upload"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={headers} items={items} actions={action}></BaseTable>
      </Content>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Remove Visa
        </DialogTitle>
        <DialogContent>
         <p>Do you want to remove this visa</p> 
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

export default VisaDetail;
