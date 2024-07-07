import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest, postRequest } from '../../services/Api';
import BaseTable from '../../components/BaseTable';
import { DeleteIcon } from '../../asset/images/icons';
import { ADMIN } from '../../utils/Constant';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
import { sanitizeTitle } from '../../utils/Convert';
import BasePagination from '../../components/BasePagination';
function Category() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [idCategory, setIdCategory] = useState();
  const [openAdd, setOpenAdd] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const event = new EventEmitter();
  const title = 'Danh sách category';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/category',
      title: 'Danh sách category',
    },
  ];
  const headers = [
    {
      key: 'stt',
      title: 'stt',
    },
    {
      key: 'category',
      title: 'category',
    },
    {
      key: 'slug',
      title: 'Key',
    },
    {
      key: 'action',
      title: 'action',
    },
  ];
  // listen event
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/category/delete/${idCategory}`);
    if (data.status === 1) {
      toast.success(data.message);
      getListCategory(currentPage);
    } else {
      toast.error(data.message);
    }
  });
  // action
  const handleDelete = (item) => {
    setOpen(true);
    setIdCategory(item._id);
  };
  const action = [
    {
      key: 'delete',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  // get list category
  useEffect(() => {
    getListCategory();
  }, []);
  const getListCategory = async (page = 1) => {
    const data = await getRequest(`/api/list-category?page=${page}&limit=10`);
    setItem(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };

  const onPageChange = (page) => {
    getListCategory(page);
    setCurrentPage(page);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };
  // form create category
  const validationSchema = yup.object({
    category: yup.string('Enter category').required('Category is required'),
    slug: yup.string('Enter slug').required('Slug is required'),
  });
  const formik = useFormik({
    initialValues: {
      category: '',
      slug: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const data = await postRequest('/api/category/create', {
        category: values.category,
        slug: values.slug,
      });
      if (data.status === 1) {
        toast.success(data.message);
        setCurrentPage(1);
        getListCategory();
      } else {
        toast.error(data.message);
      }
      formik.setFieldValue('category', '');
      formik.setFieldValue('slug', '');
      setOpenAdd(false);
    },
  });
  useEffect(() => {
    formik.setFieldValue('slug', sanitizeTitle(formik.values.category));
    // eslint-disable-next-line
  }, [formik.values.category]);
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button
        className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center text-white"
        onClick={() => setOpenAdd(true)}
      >
        Thêm
      </button>
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add new category</DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="grid grid-cols-4 p-2">
              <label
                htmlFor="category"
                className="col-span-1 mr-2 font-Inter font-medium"
              >
                Category name
              </label>
              <TextField
                className="col-span-3"
                variant="outlined"
                type="text"
                name="category"
                placeholder="Enter category name"
                label="Enter category"
                size="small"
                value={formik.values.category}
                onChange={formik.handleChange}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
            </div>
            <div className="grid grid-cols-4 p-2">
              <label
                htmlFor="slug"
                className="col-span-1 mr-2 font-Inter font-medium"
              >
                Key
              </label>
              <TextField
                className="col-span-3"
                variant="outlined"
                type="text"
                name="slug"
                placeholder="Enter key"
                size="small"
                value={formik.values.slug}
                onChange={formik.handleChange}
                error={formik.touched.slug && Boolean(formik.errors.slug)}
                helperText={formik.touched.slug && formik.errors.slug}
              />
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
      <Content>
        <BaseTable headers={headers} items={items} actions={action} />
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Remove category"
        content="Do you want to remove this category"
        setOpen={setOpen}
        open={open}
        event={event}
      />
    </div>
  );
}

export default Category;
