import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest, postRequest } from '../../services/Api';
import BaseTable from '../../components/BaseTable';
import { checkRoles } from '../../utils/Authen';
import {
  ADVISE_STATUS,
  EDU_COUNSELLOR,
  TASK_STATUS,
  ADMIN,
  CONSULTATION_STATUS,
} from '../../utils/Constant';
import BasePagination from '../../components/BasePagination';
import { ChangeStatusIcon } from '../../asset/images/icons';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
function Assign() {
  const [data, setData] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState();
  const title = 'Quản lý công việc';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/assign',
      title: 'Quản lý công việc',
    },
  ];
  const headers = [
    {
      key: 'stt',
      title: 'STT',
    },
    {
      key: 'receiver',
      title: 'Người nhận nhiệm vụ',
    },
    {
      key: 'name',
      title: 'Tên khách hàng',
    },
    {
      key: 'phone',
      title: 'Số điện thoại',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'status',
      title: 'Trạng thái tư vấn',
    },
    {
      key: 'taskStatus',
      title: 'Trạng thái nhiệm vụ',
    },
    {
      key: 'action',
      title: 'action',
    },
  ];
  const onPageChange = (page) => {
    getListAdvise(page);
    setCurrentPage(page);
  };
  const statusMapping = {
    [ADVISE_STATUS.CLOSE]: 'Từ chối tư vấn',
    [ADVISE_STATUS.NEWADVISE]: 'Mới đăng kí',
    [ADVISE_STATUS.WATTING]: 'Chờ nhận tư vấn',
    [ADVISE_STATUS.BEING_CONSULTED]: 'Đang được tư vấn',
    [ADVISE_STATUS.BEING_FILE]: 'Đang làm hồ sơ',
    [ADVISE_STATUS.UPLOADED_OFFERLETTER]: 'Đã cập nhật thư mời',
    [ADVISE_STATUS.UPLOADED_VISA]: 'Đã cập nhật visa',
    [ADVISE_STATUS.END_CONSULTATION]: 'Kết thúc',
  };
  const statusTask = {
    [TASK_STATUS.WATTING_CONFIRM]: 'Chờ xác nhận',
    [TASK_STATUS.ACCEPT]: 'Chấp nhận',
    [TASK_STATUS.REFUSE]: 'Từ chối',
  };
  const consultationStatus = {
    [CONSULTATION_STATUS.POTENTIAL]: 'Tiềm năng',
    [CONSULTATION_STATUS.NO_POTENTIAL]: 'Không tiềm năng',
  };
  useEffect(() => {
    if (checkRoles(ADMIN)) {
      getListAdvise();
    }
    if (checkRoles(EDU_COUNSELLOR)) {
      getListConsultation();
    }
    // eslint-disable-next-line
  }, []);
  const getListAdvise = async (page = 1) => {
    const data = await getRequest(
      `/api/task/owner-task?page=${page}&limit=${4}`,
    );
    data.data.data = data.data.data.map((item) => ({
      ...item,
      taskStatus: statusTask[item.status],
      ...item.task,
      status: statusMapping[item.task.status],
    }));
    setData(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const getListConsultation = async (page = 1) => {
    const data = await getRequest(
      `/api/task/owner-task-consultation?page=${page}&limit=${10}`,
    );
    data.data.data = data.data.data.map((item) => ({
      ...item,
      taskStatus: statusTask[item.status],
      ...item.task,
      status: consultationStatus[item.task.status],
    }));
    setData(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const listStatus = [
    { id: ADVISE_STATUS.CLOSE, name: 'Từ chối tư vấn' },
    { id: ADVISE_STATUS.END_CONSULTATION, name: 'Kết thúc' },
  ];
  const handleChange = (item) => {
    setOpen(true);
    setID(item.customer_id);
  };
  const action = [
    {
      key: 'change-status',
      component: <ChangeStatusIcon />,
      event: handleChange,
      role: [ADMIN],
    },
  ];
  const formik = useFormik({
    initialValues: {
      status: '',
    },
    onSubmit: async (values) => {
      const data = await postRequest(
        `/api/customer/change-status/${ID}?status=${values.status}`,
      );
      if (data.status === 1) {
        toast.success(data.message);
        setCurrentPage(1);
        getListAdvise();
        setOpen(false);
      } else {
        toast.error(data.message);
      }
    },
  });
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <BaseTable headers={headers} items={data} actions={action}></BaseTable>
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Thay đổi trạng thái</DialogTitle>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <DialogContent>
            <div className="min-w-[400px]">
              <label className="font-medium text-gray-900">Trạng thái</label>
              <TextField
                select
                placeholder="Chọn trạng thái"
                variant="outlined"
                size="small"
                fullWidth
                value={formik.values.status}
                onChange={(event) =>
                  formik.setFieldValue('status', event.target.value)
                }
              >
                {listStatus.map((option, index) => (
                  <MenuItem key={index} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </DialogContent>
          <DialogActions>
            <button
              className="px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100 font-Inter "
              onClick={() => setOpen(false)}
              type="button"
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 border-[1px] border-blue-600 font-Inter"
              type="submit"
            >
              Change
            </button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}

export default Assign;
