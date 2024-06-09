import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { TextField, Box } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import UploadOneImage from '../../components/UploadOneImage';
import UpdateOneImage from '../../components/UpdateOneImage';
import { toast } from 'react-toastify';
function TestimonialDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = id ? true : false;
  const title = isEdit ? 'Chỉnh sửa đánh giá' : 'Thêm mới đánh giá';
  const [avatar, setAvatar] = useState();
  const [data, setData] = useState();
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/home-manager/testimonial',
      title: 'Đánh giá của học sinh',
    },
    {
      isCurrentPage: true,
      src: isEdit
        ? `/home-manager/testimonial/edit/${id}`
        : '/home-manager/testimonial/create',
      title: isEdit ? 'Chỉnh sửa đánh giá' : 'Thêm mới đánh giá',
    },
  ];
  const handleImage = (newImage) => {
    setAvatar(newImage);
  };
  const validationSchema = yup.object({
    name: yup.string('Enter name').required('Name is required'),
    content: yup.string('Enter content').required('Content is required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('content', values.content);
      formData.append('image', avatar);
      let data;
      if (isEdit) {
        data = await postRequest(
          `/api/home-manager/update-testimonial/${id}`,
          formData,
        );
      } else {
        data = await postRequest('api/home-manager/new-testimonial', formData);
      }
      if (data.status === 1) {
        toast.success(data.message);
        navigate('/home-manager/testimonial');
      } else {
        toast.error(data.message);
      }
    },
  });
  const handleCancel = () => {
    navigate('/home-manager/testimonial');
  };
  useEffect(() => {
    if (isEdit) {
      getTestimonialById();
    }
    // eslint-disable-next-line
  }, []);
  const getTestimonialById = async () => {
    const data = await getRequest(`/api/home-manager/testimonial/${id}`);
    setData(data.data);
    formik.setFieldValue('name', data.data.name);
    formik.setFieldValue('description', data.data.description);
    formik.setFieldValue('content', data.data.content);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <div className="p-3">
            {isEdit ? (
              <div>
                {data && data.image ? (
                  <UpdateOneImage
                    title="Ảnh đại diện"
                    labelName="avatar"
                    onImageUpload={handleImage}
                    initialImage={data.image}
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <UploadOneImage
                title="Ảnh đại diện"
                labelName="avatar"
                onImageUpload={handleImage}
              />
            )}
          </div>
          <div className="grid grid-cols-8 p-3">
            <label
              htmlFor="name"
              className="col-span-1 font-Inter font-medium text-[16px]"
            >
              Tên học sinh/sinh viên
            </label>
            <TextField
              type="text"
              name="name"
              variant="outlined"
              label="Enter name"
              placeholder="Enter name"
              size="small"
              fullWidth
              className="col-span-4"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div className="grid grid-cols-8 p-3">
            <label
              htmlFor="description"
              className="col-span-1 font-Inter font-medium text-[16px]"
            >
              Mô tả
            </label>
            <TextField
              type="text"
              name="description"
              multiline
              rows={2}
              variant="outlined"
              label="Enter description"
              placeholder="Enter description"
              size="small"
              fullWidth
              className="col-span-6"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
          <div className="grid grid-cols-8 p-3">
            <label
              htmlFor="content"
              className="col-span-1 font-Inter font-medium text-[16px]"
            >
              Nội dung
            </label>
            <TextField
              type="text"
              name="content"
              multiline
              rows={4}
              variant="outlined"
              label="Enter content"
              placeholder="Enter content"
              size="small"
              fullWidth
              className="col-span-6"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.touched.content && Boolean(formik.errors.content)}
              helperText={formik.touched.content && formik.errors.content}
            />
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

export default TestimonialDetail;
