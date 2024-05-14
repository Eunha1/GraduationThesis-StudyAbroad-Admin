import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { ViewIcon, PencilIcon, DeleteIcon } from '../../asset/images/icons';
import { EDU_COUNSELLOR } from '../../utils/Constant';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Consultation() {
  const title = 'Thông tin tư vấn';
  const [items, setItem] = useState();
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/consultation',
      title: 'Thông tin tư vấn',
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
      key: 'school',
      title: 'Trường dự định học',
    },
    {
      key: 'majors',
      title: 'Ngành học',
    },
    {
      key: 'action',
      title: 'Action',
    },
  ];
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/consultation/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/consultation/update/${id}`);
  };
  const handleDelete = async (id) => {
    const data = await postRequest(
      `/api/consultation/delete/consultation/${id}`,
    );
    if (data.status === 1) {
      toast.success(data.message);
      getListConsultation();
    } else {
      toast.error(data.message);
    }
  };
  const action = [
    {
      key: 'view-detail',
      component: <ViewIcon />,
      event: handleView,
      role: [EDU_COUNSELLOR],
    },
    {
      key: 'edit-file',
      component: <PencilIcon />,
      event: handleEdit,
      role: [EDU_COUNSELLOR],
    },
    {
      key: 'delete-file',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [EDU_COUNSELLOR],
    },
  ];
  useEffect(() => {
    getListConsultation();
    // eslint-disable-next-line
  }, []);
  const getListConsultation = async () => {
    const data = await getRequest('/api/consultation/list-consultation');
    setItem(data.data);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link
          to="/consultation/new-consultation"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={headers} actions={action} items={items} />
      </Content>
    </div>
  );
}

export default Consultation;
