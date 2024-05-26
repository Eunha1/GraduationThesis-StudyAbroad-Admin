import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { ViewIcon, PencilIcon, DeleteIcon } from '../../asset/images/icons';
import { EDU_COUNSELLOR } from '../../utils/Constant';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
function Consultation() {
  const title = 'Thông tin tư vấn';
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idConsultation, setIdConsultation] = useState();
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
  const event = new EventEmitter();
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/consultation/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/consultation/update/${id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(
      `/api/consultation/delete/consultation/${idConsultation}`,
    );
    if (data.status === 1) {
      toast.success(data.message);
      getListConsultation();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (id) => {
    setOpen(true);
    setIdConsultation(id);
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
      <BaseConfirmDialog
        title="Remove consultation"
        content="Do you want to remove this consultation"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default Consultation;
