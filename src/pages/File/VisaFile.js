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
import { EventEmitter } from 'events';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import BasePagination from '../../components/BasePagination';
function VisaFile() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idVisa, setIdVisa] = useState();
  const [totalPage, setTotalPage] = useState()
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
  const statusMapping = {
    0: 'Chưa đủ hồ sơ',
    1: 'Đã đủ hồ sơ',
    2: 'Đã xin visa',
    3: 'Đã có visa',
  };
  const event = new EventEmitter();
  useEffect(() => {
    getVisaFile();
    // eslint-disable-next-line
  }, []);
  const getVisaFile = async (page = 1) => {
    const data = await getRequest(`/api/file/visa-file?page=${page}&limit=10`);
    data.data.data = data.data.data.map((item) => ({
      ...item,
      status: statusMapping[item.status],
    }));
    setItem(data.data.data);
    setTotalPage(data.data.paginate.total_page)
  };
  const onPageChange = (page)=>{
    getVisaFile(page)
  }
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/visa-file/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/visa/update-file/${id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/file/delete/visa-file/${idVisa}`);
    if (data.status === 1) {
      toast.success(data.message);
      getVisaFile();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = async (id) => {
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
        <div className='flex items-center justify-end mt-7'>
          <BasePagination totalPage={totalPage} onPageChange={onPageChange}></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Remove file"
        content="Do you want to remove this file"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default VisaFile;
