import { ViewIcon, DeleteIcon, PencilIcon } from '../../asset/images/icons';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useNavigate, Link } from 'react-router-dom';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../../utils/Constant';
import { toast } from 'react-toastify';
import { checkRoles } from '../../utils/Authen';
import { EventEmitter } from 'events';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
function OfferLetter() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idOffer, setIdOffer] = useState();
  const title = 'Hồ sơ thư mời';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/offer-letter-file',
      title: 'Hồ sơ thư mời',
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
  const event = new EventEmitter();
  useEffect(() => {
    getListOfferLetter();
  }, []);
  const statusMapping = {
    0: 'Chưa đủ hồ sơ',
    1: 'Đã đủ hồ sơ',
    2: 'Đã xin gửi thư mời',
    3: 'Đã có thư mời',
  };
  const getListOfferLetter = async () => {
    const data = await getRequest('/api/file/offer-letter-file');
    data.data = data.data.map((item) => ({
      ...item,
      status: statusMapping[item.status],
    }));
    setItem(data.data);
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/offer-letter/${id}`);
  };
  const handleEdit = (id) => {
    navigate(`/offer-letter/update-file/${id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(
      `/api/file/delete/offer-letter-file/${idOffer}`,
    );
    if (data.status === 1) {
      toast.success(data.message);
      getListOfferLetter();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (id) => {
    setOpen(true);
    setIdOffer(id);
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
            to="/offer-letter/upload"
            className="text-white text-base font-Roboto"
          >
            Thêm
          </Link>
        </button>
      )}
      <Content>
        <BaseTable headers={headers} items={items} actions={action}></BaseTable>
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

export default OfferLetter;
