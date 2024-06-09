import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useEffect, useState } from 'react';
import { getRequest,postRequest } from '../../services/Api';
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { DeleteIcon } from '../../asset/images/icons';
import { ADMIN } from '../../utils/Constant';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
function NewsAndEvent() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false)
  const [listPost, setListPost] = useState();
  const [openDelete, setOpenDelete] = useState(false)
  const [idPost, setIdPost] = useState()
  const event = new EventEmitter();
  const title = 'Tin tức và sự kiện';
  const listBreadcrumb = [
    {
      title: 'Trang chủ',
      src: '/',
    },
    {
      isCurrentPage: true,
      title: 'Tin tức và sự kiện',
      src: '/home-manager/news-and-event',
    },
  ];
  const headers = [
    {
      title: 'ID',
      key: 'stt'
    },
    {
      key: 'post_title',
      title: 'Tiêu đề bài viết'
    },
    {
      key: 'type',
      title: 'Kiểu bài viết'
    },
    {
      key:'action',
      title: 'action'
    }
  ]
  event.addListener("RemoveItem", async ()=>{
    const data = await postRequest(`/api/home-manager/delete/news-and-event/${idPost}`)
    if(data.status === 1){
      toast.success(data.message)
      getList()
  }else{
      toast.error(data.message)
  }
  })
  const handleDelete= (id)=>{
    setOpenDelete(true)
    setIdPost(id)
  }
  const action = [
    {
      key: 'delete',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  useEffect(() => {
    getList();
    getListPost()
  }, []);
  const getList = async () => {
    const data = await getRequest('/api/home-manager/news-and-event/list');
    setData(data.data);
  };
  const validationSchema = yup.object({
    type: yup.string('Choose type').required('Type is required'),
    post_id: yup.string('Choose post').required('Post is required'),
  });
  const formik = useFormik({
    initialValues: {
      type: '',
      post_id: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const body = {
        post: values.post_id
      }
      const type = parseInt(values.type)
        const data = await postRequest(`/api/home-manager/create/news-and-event?type=${type}`,body)
        if(data.status === 1){
            toast.success(data.message)
            getList()
            setOpen(false)
        }else{
            toast.error(data.message)
        }
    },
  });
  const getListPost = async () => {
    const data = await getRequest('/api/post/list-post');
    setListPost(data.data);
  };
  const handleCloseAdd = ()=>{
    setOpen(false)
  }
  const listType = [
    { name: 'Sự kiện', type: 1 },
    { name: 'Tin tức', type: 2 },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button
        className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center text-white"
        onClick={() => setOpen(true)}
      >
        Thêm
      </button>
        <Dialog open={open} onClose={()=>setOpen(false)}>
          <DialogTitle>Thêm tin tức và sự kiện</DialogTitle>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <DialogContent>
            <div className='min-w-[400px]'>
              <div className="flex flex-col mb-8">
                  <label className="text-[16px] font-Inter font-medium mb-4">
                    Kiểu bài viết
                  </label>
                  <TextField
                    select
                    label="Chọn kiểu"
                    placeholder="Chọn kiểu"
                    variant="filled"
                    size="small"
                    fullWidth
                    value={formik.values.type}
                    onChange={(event) =>
                      formik.setFieldValue('type', event.target.value)
                    }
                    error={formik.touched.type && Boolean(formik.errors.type)}
                    helperText={formik.touched.type && formik.errors.type}
                  >
                    {listType.map((option, index) => (
                      <MenuItem key={index} value={option.type}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
              </div>
              <div className="flex flex-col mb-4">
                  <label className='text-[16px] font-Inter font-medium mb-4'>Chọn bài viết</label>
                    <TextField
                      select
                      label="Chọn bài viết"
                      placeholder="Chọn bài viết"
                      variant="filled"
                      fullWidth
                      value={formik.values.post_id}
                      onChange={(event) =>
                        formik.setFieldValue('post_id', event.target.value)}
                      error={formik.touched.post_id && Boolean(formik.errors.post_id)}
                      helperText={formik.touched.post_id && formik.errors.post_id}
                    >
                      {listPost ? (
                        listPost.map((option, index) => (
                          <MenuItem key={index} value={option._id}>
                            {option.title}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>
                          <CircularProgress />
                        </MenuItem>
                      )}
                    </TextField>
              </div>
            </div>
            </DialogContent>
            <DialogActions>
            <button
              className="px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100 font-Inter "
              onClick={handleCloseAdd}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border-[1px] border-blue-600 font-Inter"
              type="submit"
            >
              Create
            </button>
            </DialogActions>
          </Box>
        </Dialog>
      <Content><BaseTable headers={headers} actions={action} items={data}></BaseTable> </Content>
      <BaseConfirmDialog
        title="Xóa bài viết"
        content="Do you want remove this post"
        open={openDelete}
        setOpen={setOpenDelete}
        event={event}
      />
    </div>
  );
}

export default NewsAndEvent;
