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
function OfferLetterRecordDetail() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idOffer, setIdOffer] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState();
  const title = 'Thư mời';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/record/offer-letter',
      title: 'Thư mời',
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
      title: 'Trường nhận thư mời',
    },
    {
      key: 'action',
      title: 'Action',
    },
  ];
  const event = new EventEmitter();
  useEffect(() => {
    getListRecordOfferLetter();
  }, []);
  const getListRecordOfferLetter = async (page = 1) => {
    const data = await getRequest(
      `/api/file/record/offer-letter?page=${page}&limit=10`,
    );
    setItem(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const onPageChange = (page) => {
    getListRecordOfferLetter(page);
    setCurrentPage(page);
  };
  const navigate = useNavigate();
  const handleView = (item) => {
    navigate(`/record/offer-letter/${item._id}`);
  };
  const handleEdit = (item) => {
    navigate(`/record/update-offer-letter/${item._id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(
      `/api/file/delete/offer-letter-record/${idOffer}`,
    );
    if (data.status === 1) {
      toast.success(data.message);
      setCurrentPage(1);
      getListRecordOfferLetter();
    } else {
      toast.error(data.message);
    }
    setOpen(false);
  });
  const handleDelete = (item) => {
    setOpen(true);
    setIdOffer(item._id);
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
          to="/record/offer-letter/upload"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={headers} items={items} actions={action}></BaseTable>
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Remove Offer Letter"
        content="Do you want to remove this offer letter"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}
export default OfferLetterRecordDetail;
