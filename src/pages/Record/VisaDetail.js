import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import BaseTable from '../../components/BaseTable';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ViewIcon, PencilIcon, DeleteIcon } from '../../asset/images/icons';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { toast } from 'react-toastify';
function VisaDetail() {
  const [items, setItem] = useState();
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
  const handleEdit = (id) => {};
  const handleDelete = async (id) => {
    const data = await postRequest(`/api/file/delete/visa-record/${id}`);
    if (data.status === 1) {
      toast.success(data.message);
      getListRecordVisa();
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
          to="/record/visa/upload"
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

export default VisaDetail;
