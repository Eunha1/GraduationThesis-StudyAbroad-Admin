import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import BaseTable from '../../components/BaseTable';
import { AssignTask } from '../../asset/images/icons';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { ADMIN, EDU_COUNSELLOR } from '../../utils/Constant';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { toast } from 'react-toastify';
import BasePagination from '../../components/BasePagination';
function AdviseInfo() {
  const [items, setItem] = useState();
  const [listStaff, setListStaff] = useState();
  const [ID, setID] = useState();
  const [staffID, setStaffID] = useState();
  const [open, setOpen] = useState(false);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const title = 'Thông tin tư vấn';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/advise-info',
      title: 'Thông tin tư vấn',
    },
  ];
  const headers = [
    {
      key: 'stt',
      title: 'STT',
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
      key: 'address',
      title: 'Địa chỉ',
    },
    {
      key: 'level',
      title: 'Trình độ quan tâm',
    },
    {
      key: 'destination',
      title: 'Địa điểm quan tâm',
    },
    {
      key: 'question',
      title: 'Câu hỏi',
    },
    {
      key: 'status',
      title: 'Status',
    },
    {
      key: 'action',
      title: 'action',
    },
  ];
  const statusMapping = {
    1: 'Mới đăng kí',
  };
  useEffect(() => {
    getListInfo();
    getListStaff();
    // eslint-disable-next-line
  }, []);
  const getListInfo = async (page = 1) => {
    const data = await getRequest(
      `api/customer/list-advise?status=1&page=${page}&limit=10`,
    );
    data.data.data = data.data.data.map((item) => ({
      ...item,
      status: statusMapping[item.status],
    }));
    setItem(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const getListStaff = async () => {
    const data = await getRequest(
      `/api/staff/list-staff?role=${EDU_COUNSELLOR}`,
    );
    setListStaff(data.data);
  };
  const onPageChange = (page) => {
    getListInfo(page);
    setCurrentPage(page);
  };
  const handleAssign = (item) => {
    setOpen(true);
    setID(item._id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = async () => {
    const body = {
      receiver: staffID,
      task: ID,
    };
    const data = await postRequest('/api/task/create', body);
    if (data.status === 1) {
      toast.success(data.message);
      setCurrentPage(1);
      getListInfo();
      setOpen(false);
    } else {
      toast.error(data.message);
    }
  };
  const actions = [
    {
      key: 'assign-task',
      component: <AssignTask />,
      event: handleAssign,
      role: [ADMIN],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <BaseTable headers={headers} items={items} actions={actions} />
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Danh sách nhân viên</DialogTitle>
        <DialogContent>
          {listStaff ? (
            listStaff.map((item, index) => (
              <div key={index} className="flex items-center p-2">
                <input
                  type="radio"
                  className="cursor-pointer"
                  value={item.email}
                  id={`email-${index}`}
                  name="staffRadio"
                  onChange={() => setStaffID(item._id)}
                ></input>
                <label htmlFor={`email-${index}`} className="ml-4">
                  {item.email}
                </label>
              </div>
            ))
          ) : (
            <div>Loading</div>
          )}
        </DialogContent>
        <DialogActions>
          <button
            className="px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-2 py-1 rounded-lg bg-[#3861AF] text-white hover:bg-red-700"
            onClick={handleSave}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdviseInfo;
