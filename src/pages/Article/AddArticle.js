import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import * as yup from 'yup';
import { useFormik } from 'formik';
import UploadOneImage from '../../components/UploadOneImage';
import { toast } from 'react-toastify';
import TinyMCE from '../../components/TinyMCE';
function AddArticle() {
  const [listCategory, setListCategory] = useState();
  const [image, setImage] = useState();
  const [content, setContent] = useState();
  const title = 'Thêm bài viết';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/article',
      title: 'Bài viết',
    },
    {
      isCurrentPage: true,
      src: '/add-article',
      title: 'Thêm bài viết',
    },
  ];
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate('/article');
  };
  useEffect(() => {
    getListCategory();
    // eslint-disable-next-line
  }, []);
  const getListCategory = async () => {
    const data = await getRequest('/api/list-category');
    setListCategory(data.data.data);
  };
  const handleImage = (newImage) => {
    setImage(newImage);
  };
  const validationSchema = yup.object({
    title: yup.string('Enter title').required('Title is required'),
    description: yup
      .string('Enter description')
      .required('Description is required'),
  });
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      category: [],
      description: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('category', values.category);
      formData.append('author', values.author);
      formData.append('image', image);
      formData.append('description', values.description);
      formData.append('content', content);
      const data = await postRequest('/api/post/create', formData);
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/article');
      } else {
        toast.error(data.error);
      }
    },
  });
  const handleContent = (newContent) => {
    setContent(newContent);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-8 p-3">
            <label className="col-span-1">Title</label>
            <TextField
              type="text"
              name="title"
              variant="outlined"
              placeholder="Enter title"
              size="small"
              fullWidth
              className="col-span-7"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </div>
          <div className="p-3">
            <UploadOneImage
              title="Image"
              onImageUpload={handleImage}
              labelName="image"
            />
          </div>
          <div className="flex p-3">
            <div className="w-1/2 grid grid-cols-4">
              <label htmlFor="author" className="col-span-1">
                Author
              </label>
              <TextField
                type="text"
                name="author"
                variant="outlined"
                label="Author"
                placeholder="Enter author"
                size="small"
                className="col-span-2"
                value={formik.values.author}
                onChange={formik.handleChange}
              />
            </div>
            <div className="w-1/2 grid grid-cols-4">
              <label className="col-span-1">Tags Name</label>
              <Select
                multiple
                variant="outlined"
                placeholder="Choose category"
                size="small"
                className="col-span-3"
                value={formik.values.category}
                onChange={(event) =>
                  formik.setFieldValue('category', event.target.value)
                }
              >
                {listCategory ? (
                  listCategory.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.category}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>
                    <CircularProgress />
                  </MenuItem>
                )}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-8 p-3">
            <label htmlFor="description" className="col-span-1">
              Description
            </label>
            <TextField
              type="text"
              name="description"
              multiline
              rows={2}
              placeholder="Enter description"
              label="description"
              fullWidth
              className="col-span-7"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
          </div>
          <div className="grid grid-cols-8 p-3">
            <label className="col-span-1">Content</label>
            <div className="col-span-7">
              <TinyMCE
                initialValue="You write content here"
                handleData={handleContent}
              />
            </div>
          </div>
          <div className="border-t border-gray-700 mt-[50px]">
            <div className="mt-8 flex justify-end items-center">
              <button
                className=" font-medium rounded-lg text-lg px-2 py-1 w-[70px] text-center border-[1px] border-gray-900 mr-5"
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

export default AddArticle;
