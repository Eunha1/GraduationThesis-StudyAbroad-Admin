import BaseTable from '../../components/BaseTable';
import Content from '../../components/Content';
import { DeleteIcon, PencilIcon, ViewIcon } from '../../asset/images/icons';
import Breadcrumb from '../../components/Breadcrumb';
import { Link, useNavigate } from 'react-router-dom';
import { ADMIN } from '../../utils/Constant';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
function Article() {
  const [item, setItem] = useState();
  const [open, setOpen] = useState(false)
  const [idArticle, setIdArticle] = useState()
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
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/article/update/${id}`);
  };
  const handleClose = ()=>{
    setOpen(false)
  }
  const handleRemove = async ()=>{
      const data = await postRequest(`/api/delete-post/${idArticle}`);
      if (data.status === 1) {
        toast.success(data.message);
        getListPost();
      } else {
        toast.error(data.message);
      }
    setOpen(false)
  }
  const handleDelete = async (id) => {
    setOpen(true)
    setIdArticle(id)
  };
  const handleView = (id) => {};
  const action = [
    {
      key: 'view',
      component: <ViewIcon />,
      event: handleView,
      role: [ADMIN],
    },
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
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          Remove article
        </DialogTitle>
        <DialogContent>
         <p>Do you want to remove this article</p> 
        </DialogContent>
        <DialogActions
        >
          <button className='px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100' onClick={handleClose}>Cancel</button>
          <button className='px-2 py-1 rounded-lg bg-[#D0021B] text-white hover:bg-red-700' onClick={handleRemove}>Remove</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Article;
