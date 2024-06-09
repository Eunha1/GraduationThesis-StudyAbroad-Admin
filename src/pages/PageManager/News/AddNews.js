import { Box, CircularProgress, MenuItem, TextField } from '@mui/material';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../../services/Api';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { AddSquare, MinusSquare } from '../../../asset/images/icons';
function AddNews() {
  const [index, setIndex] = useState([{ index: 1 }]);
  const [listPost, setListPost] = useState();
  const [listMenu, setListMenu] = useState();
  const [listPostId, setListPostId] = useState([]);
  const navigate = useNavigate();
  const title = 'Thêm bài viết';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/page-manager/news',
      title: 'Danh mục tin tức',
    },
    {
      isCurrentPage: true,
      src: '/page-manager/add-news',
      title: 'Thêm bài viết',
    },
  ];
  useEffect(() => {
    getListPost();
    getListMenu();
  }, []);
  const getListPost = async () => {
    const data = await getRequest('/api/post/list-post');
    setListPost(data.data);
  };
  const getListMenu = async () => {
    const data = await getRequest('/api/menu/list-menu');
    setListMenu(data.data);
  };
  const handleCancel = () => {
    navigate('/page-manager/news');
  };
  const handleAdd = () => {
    setIndex([...index, { index: 2 }]);
  };
  const handleRemove = () => {
    const newIndex = [...index];
    const newPostID = [...listPostId]
    newPostID.pop()
    newIndex.pop();
    setIndex(newIndex);
    setListPostId(newPostID)
  };
  const validationSchema = yup.object({
    id: yup.string('Choose category').required('Category is required'),
  });
  const formik = useFormik({
    initialValues: {
      id: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await postRequest(
        `/api/menu/add-post/${values.id}`,
        listPostId,
      );
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/page-manager/news');
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-7 ">
            <label className="col-span-2 font-Inter text-[16px] font-medium">
              Chọn danh mục Menu
            </label>
            <TextField
              select
              className="col-span-3"
              label="Chọn danh mục"
              placeholder="Chọn danh mục"
              variant="filled"
              fullWidth
              value={formik.values.id}
              onChange={(event) =>
                formik.setFieldValue('id', event.target.value)
              }
              error={formik.touched.id && Boolean(formik.errors.id)}
              helperText={formik.touched.id && formik.errors.id}
            >
              {listMenu ? (
                listMenu.map((option, index) => (
                  <MenuItem key={index} value={option._id}>
                    {option.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              )}
            </TextField>
          </div>
          <div className="flex items-center justify-between my-[20px]">
            <div className="font-Inter text-[16px] font-medium">
              Tin nổi bật
            </div>
            <div className="flex">
              <div className="cursor-pointer mr-2" onClick={handleAdd}>
                <AddSquare />
              </div>
              <div className="cursor-pointer" onClick={handleRemove}>
                <MinusSquare />
              </div>
            </div>
          </div>
          <div>
            {index ? (
              index.map((item, index) => (
                <div className="my-3" key={index}>
                  <TextField
                    select
                    label="Chọn bài viết"
                    placeholder="Chọn bài viết"
                    variant="filled"
                    fullWidth
                    defaultValue=""
                    onChange={(event) =>
                      setListPostId([...listPostId, event.target.value])
                    }
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
              ))
            ) : (
              <></>
            )}
          </div>
          <div className="border-t border-gray-700 mt-[50px] cursor-pointer">
            <div className="mt-8 flex justify-end items-center">
              <button
                className=" font-medium rounded-lg text-lg px-2 py-1 w-[70px] text-center border-[1px] border-gray-700 mr-5"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className=" text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg px-3 py-1 w-[70px] text-center"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
        </Box>
      </Content>
    </div>
  );
}

export default AddNews;
