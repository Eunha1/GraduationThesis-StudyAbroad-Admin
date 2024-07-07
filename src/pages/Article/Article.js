import BaseTable from '../../components/BaseTable';
import Content from '../../components/Content';
import { DeleteIcon, PencilIcon } from '../../asset/images/icons';
import Breadcrumb from '../../components/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN } from '../../utils/Constant';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
import BasePagination from '../../components/BasePagination';
function Article() {
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idArticle, setIdArticle] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const header = [
    {
      key: 'stt',
      title: 'stt',
    },
    {
      key: 'title',
      title: 'title',
    },
    {
      key: 'category',
      title: 'category',
    },
    {
      key: 'author',
      title: 'author',
    },
    {
      key: 'description',
      title: 'description',
    },
    {
      key: 'action',
      title: 'action',
    },
  ];

  const title = 'Quản lý bài viết';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/article',
      title: 'Bài viết',
    },
  ];
  const event = new EventEmitter();
  const navigate = useNavigate();
  const onPageChange = (page) => {
    getListPost(page);
    setCurrentPage(page);
  };
  const handleEdit = (item) => {
    navigate(`/article/update/${item._id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/delete-post/${idArticle}`);
    if (data.status === 1) {
      toast.success(data.message);
      setCurrentPage(1);
      getListPost();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (item) => {
    setOpen(true);
    setIdArticle(item._id);
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
    getListPost();
  }, []);
  const getListPost = async (page = 1) => {
    const data = await getRequest(`/api/post/list-post?page=${page}&limit=10`);
    setItem(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link
          to="/article/add-article"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={header} items={item} actions={action}></BaseTable>
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Remove article"
        content="Do you want to remove this article"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default Article;
