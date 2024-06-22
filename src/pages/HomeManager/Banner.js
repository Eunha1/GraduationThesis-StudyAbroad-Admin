import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { DeleteIcon } from '../../asset/images/icons';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import UploadOneImage from '../../components/UploadOneImage';
import { useFormik } from 'formik';
import { getRequest, postRequest } from '../../services/Api';
import { toast } from 'react-toastify';
import { ADMIN } from '../../utils/Constant';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
function Banner() {
  const [open, setOpen] = useState(false);
  const [banner, setBanner] = useState();
  const [data, setData] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [Id, setId] = useState();
  const event = new EventEmitter();
  const title = 'Banner';
  const listBreadcrumb = [
    {
      title: 'Trang chủ',
      src: '/',
    },
    {
      isCurrentPage: true,
      title: 'Banner',
      src: '/home-manager/banner',
    },
  ];
  const headers = [
    {
      title: 'ID',
      key: 'stt',
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Banner',
      key: 'image',
    },
    {
      title: 'Kiểu banner',
      key: 'type',
    },
    {
      title: 'action',
      key: 'action',
    },
  ];

  const typeBannerMapping = {
    1: 'Top banner',
    2: 'Bottom banner',
  };
  useEffect(() => {
    getList();
  }, []);
  const getList = async () => {
    const data = await getRequest('/api/home-manager/list-banner');
    data.data = data.data.map((item) => ({
      ...item,
      type: typeBannerMapping[item.type],
    }));
    setData(data.data);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/home-manager/delete-banner/${Id}`);
    if (data.status === 1) {
      toast.success(data.message);
      getList();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (id) => {
    setOpenDelete(true);
    setId(id);
  };
  const action = [
    {
      key: 'delete-file',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  const listType = [
    {
      name: 'Top banner',
      id: 1,
    },
    {
      name: 'Bottom banner',
      id: 2,
    },
  ];
  const hanedleImage = (newImage) => {
    setBanner(newImage);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('type', values.type);
      formData.append('image', banner);
      console.log(banner);
      const data = await postRequest('/api/home-manager/new-banner', formData);
      if (data.status === 1) {
        toast.success(data.message);
        getList();
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button
        className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center text-white"
        onClick={() => setOpen(true)}
      >
        Thêm banner
      </button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Thêm banner</DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="grid grid-cols-4 p-2">
              <label className="col-span-1 mr-2 font-Inter font-medium">
                Title
              </label>
              <TextField
                className="col-span-3"
                variant="outlined"
                type="text"
                name="title"
                placeholder="Enter title"
                label="Enter title"
                size="small"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>
            <div className="grid grid-cols-4 p-2">
              <label className="col-span-1 mr-2 font-Inter font-medium">
                Kiểu banner
              </label>
              <TextField
                select
                className="col-span-3"
                variant="outlined"
                type="text"
                name="type"
                placeholder="Choose type"
                label="Choose type"
                size="small"
                value={formik.values.type}
                onChange={(event) =>
                  formik.setFieldValue('type', event.target.value)
                }
              >
                {listType.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-3">
              <UploadOneImage
                title="Banner"
                onImageUpload={hanedleImage}
                labelName="banner"
              />
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100 font-Inter "
              type="button"
              onClick={handleClose}
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
        <BaseTable headers={headers} items={data} actions={action}></BaseTable>
      </Content>
      <BaseConfirmDialog
        title="Remove banner"
        content="Do you want remove this banner"
        open={openDelete}
        setOpen={setOpenDelete}
        event={event}
      />
    </div>
  );
}

export default Banner;
