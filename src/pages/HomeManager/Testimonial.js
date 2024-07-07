import { useEffect, useState } from 'react';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import { getRequest, postRequest } from '../../services/Api';
import Content from '../../components/Content';
import { ADMIN } from '../../utils/Constant';
import { PencilIcon, DeleteIcon } from '../../asset/images/icons';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
import BasePagination from '../../components/BasePagination';
function Testimonial() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const event = new EventEmitter();
  const [open, setOpen] = useState(false);
  const [Id, setId] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const title = 'Đánh giá của học sinh';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/home-manager/testimonial',
      title: 'Đánh giá của học sinh',
    },
  ];
  const headers = [
    {
      title: 'ID',
      key: 'stt',
    },
    {
      title: 'Avatar',
      key: 'image',
    },
    {
      title: 'Tên du học sinh',
      key: 'name',
    },
    {
      title: 'Nội dung',
      key: 'content',
    },
    {
      title: 'Mô tả',
      key: 'description',
    },
    {
      title: 'action',
      key: 'action',
    },
  ];
  const handleEdit = (item) => {
    navigate(`/home-manager/testimonial/edit/${item._id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(
      `/api/home-manager/delete-testimonial/${Id}`,
    );
    if (data.status === 1) {
      toast.success(data.message);
      setCurrentPage(1);
      getListTestimonial();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (item) => {
    setOpen(true);
    setId(item._id);
  };
  const action = [
    {
      key: 'edit',
      component: <PencilIcon />,
      event: handleEdit,
      role: [ADMIN],
    },
    {
      key: 'delete',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  useEffect(() => {
    getListTestimonial();
  }, []);
  const getListTestimonial = async (page = 1) => {
    const data = await getRequest(
      `/api/home-manager/list-testimonial?page=${page}&limit=10`,
    );
    setData(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const onPageChange = (page) => {
    getListTestimonial(page);
    setCurrentPage(page);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link
          to="/home-manager/testimonial/create"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={headers} items={data} actions={action}></BaseTable>
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Xoá đánh giá"
        content="Do you want remove this "
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default Testimonial;
