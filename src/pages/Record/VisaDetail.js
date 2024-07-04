import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import BaseTable from '../../components/BaseTable';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, PencilIcon, DeleteIcon } from '../../asset/images/icons';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { toast } from 'react-toastify';
import { EventEmitter } from 'events';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import BasePagination from '../../components/BasePagination';
function VisaDetail() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idVisa, setIdVisa] = useState();
  const [totalPage, setTotalPage] = useState()
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
  const event = new EventEmitter();
  useEffect(() => {
    getListRecordVisa();
  }, []);
  const getListRecordVisa = async (page=1) => {
    const data = await getRequest(`/api/file/record/visa?page=${page}&limit=10`);
    setItem(data.data.data)
    setTotalPage(data.data.paginate.total_page)
  };
  const onPageChange = (page)=>{
    getListRecordVisa(page)
  }
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/record/visa/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/record/update-visa/${id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/file/delete/visa-record/${idVisa}`);
    if (data.status === 1) {
      toast.success(data.message);
      getListRecordVisa();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (id) => {
    setOpen(true);
    setIdVisa(id);
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
        <div className='flex items-center justify-end mt-7'>
          <BasePagination totalPage={totalPage} onPageChange={onPageChange}></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Remove Visa"
        content="Do you want to remove this visa"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default VisaDetail;
