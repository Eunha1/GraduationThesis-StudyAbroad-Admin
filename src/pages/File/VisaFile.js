import { useEffect, useState } from 'react';
import { DeleteIcon, PencilIcon, ViewIcon } from '../../asset/images/icons';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useNavigate, Link } from 'react-router-dom';
import { getRequest, postRequest } from '../../services/Api';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { toast } from 'react-toastify';
function VisaFile() {
  const [items, setItem] = useState();
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
  const handleEdit = (id) => {};
  const handleDelete = async (id) => {
    const data = await postRequest(`/api/file/delete/visa-file/${id}`);
    if (data.status === 1) {
      toast.success(data.message);
      getVisaFile();
    } else {
      toast.error(data.message);
    }
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
          to="/visa-file/upload"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={headers} items={items} actions={action}></BaseTable>
      </Content>
    </div>
  );
}

export default VisaFile;
