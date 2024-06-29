import BaseTable from '../../components/BaseTable';
import Content from '../../components/Content';
import { DeleteIcon, PencilIcon, ViewIcon } from '../../asset/images/icons';
import Breadcrumb from '../../components/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN } from '../../utils/Constant';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
function Article() {
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idArticle, setIdArticle] = useState();
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
  const handleEdit = (id) => {
    navigate(`/article/update/${id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/delete-post/${idArticle}`);
    if (data.status === 1) {
      toast.success(data.message);
      getListPost();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = async (id) => {
    setOpen(true);
    setIdArticle(id);
  };
  const handleView = (id) => {};
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
  const getListPost = async () => {
    const data = await getRequest('/api/post/list-post');
    if (data.status === 1) {
      setItem(data.data);
    }
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
