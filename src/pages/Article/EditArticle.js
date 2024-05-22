import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import TinyMCE from '../../components/TinyMCE';
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { useFormik } from 'formik';
import UpdateOneImage from '../../components/UpdateOneImage';
import { extractPathNameFromURL } from '../../utils/Convert';
import { toast } from 'react-toastify';

function EditArticle() {
  const { article_id } = useParams();
  const [data, setData] = useState();
  const [content, setContent] = useState();
  const [listCategory, setListCategory] = useState();
  const [image, setImage] = useState();
  const title = 'Chỉnh sửa bài viết';
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
      src: `/article/update/${article_id}`,
      title: 'Chỉnh sửa bài viết',
    },
  ];
  const navigate = useNavigate()
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
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: async  (values) => {
        const formData = new FormData()
        formData.append('title',values.title)
        formData.append('author',values.author)
        formData.append('category',values.category.toString())
        formData.append('description',values.description)
        formData.append('content',content)
        if(image.name){
            formData.append('image',image)
        }else{
            formData.append('image',extractPathNameFromURL(image))
        }
        const data = await postRequest(`/api/update-post/${article_id}`,formData)
        if(data.status === 1){
            toast.success(data.message)
            navigate('/article')
        }else{
            toast.error(data.message)
        }
    },
  });
  useEffect(() => {
    getPostById();
    getListCategory();
    // eslint-disable-next-line
  }, []);
  const getPostById = async () => {
    const data = await getRequest(`/api/get-post/${article_id}`);
    formik.setFieldValue('title', data.data.title);
    formik.setFieldValue('author', data.data.author);
    formik.setFieldValue('description', data.data.description);
    formik.setFieldValue('category', data.data.category.split(','));
    formik.setFieldValue('content', data.data.content);
    setData(data.data);
  };
  useEffect(() => {
    getListCategory();
    // eslint-disable-next-line
  }, []);
  const getListCategory = async () => {
    const data = await getRequest('/api/list-category');
    setListCategory(data.data);
  };
  const handleContent = (newContent) => {
    setContent(newContent);
  };
  const handleImage = (newImage) => {
    setImage(newImage);
  };
  const handleCancel = ()=>{
    navigate('/article')
  }
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        {data ? (
          <Box component='form' onSubmit={formik.handleSubmit}>
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
              <UpdateOneImage
                title="Image"
                onImageUpload={handleImage}
                labelName="image"
                initialImage={data.image}
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
                      <MenuItem key={index} value={option.category}>
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
                rows={3}
                placeholder="Enter description"
                label="description"
                fullWidth
                className="col-span-7"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
                  initialValue={formik.values.content}
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
        ) : (
          <div>Loading</div>
        )}
      </Content>
    </div>
  );
}

export default EditArticle;
