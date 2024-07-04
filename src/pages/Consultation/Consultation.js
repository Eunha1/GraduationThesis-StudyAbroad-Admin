import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import {
  PencilIcon,
  DeleteIcon,
  AssignTask,
} from '../../asset/images/icons';
import {
  ADMISSION_OFFICER,
  CONSULTATION_STATUS,
  EDU_COUNSELLOR,
} from '../../utils/Constant';
import { getRequest, postRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import BasePagination from '../../components/BasePagination';
function Consultation() {
  const [items, setItem] = useState();
  const [open, setOpen] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);
  const [idConsultation, setIdConsultation] = useState();
  const [listStaff, setListStaff] = useState();
  const [staffID, setStaffID] = useState();
  const [totalPage, setTotalPage] = useState()
  const event = new EventEmitter();
  const navigate = useNavigate();
  const title = 'Thông tin tư vấn';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/consultation',
      title: 'Thông tin tư vấn',
    },
  ];
  const headers = [
    {
      key: 'stt',
      title: 'STT',
    },
    {
      key: 'customer_name',
      title: 'Tên khách hàng',
    },
    {
      key: 'customer_phone',
      title: 'Số điện thoại',
    },
    {
      key: 'customer_email',
      title: 'Địa chỉ email',
    },
    {
      key: 'school_year',
      title: 'Năm dự định học',
    },
    {
      key: 'school',
      title: 'Trường dự định học',
    },
    {
      key: 'majors',
      title: 'Ngành học',
    },
    {
      key: 'level',
      title: 'Trình độ theo học',
    },
    {
      key: 'country',
      title: 'Quốc gia',
    },
    {
      key: 'finance',
      title: 'Khả năng tài chính',
    },
    {
      key: 'schoolarship',
      title: 'Yêu câù về học bổng',
    },
    {
      key: 'note',
      title: 'Ghi chú',
    },
    {
      key: 'status',
      title: 'Trạng thái',
    },
    {
      key: 'action',
      title: 'Action',
    },
  ];

  const handleEdit = (id) => {
    navigate(`/consultation/update/${id}`);
  };
  const handleAssign = (id) => {
    setOpenAssign(true);
    setIdConsultation(id);
  };
  const handleClose = () => {
    setOpenAssign(false);
  };
  const handleSave = async () => {
    const body = {
      receiver: staffID,
      task: idConsultation,
    };
    const data = await postRequest('/api/task/create', body);
    if (data.status === 1) {
      toast.success(data.message);
      setOpenAssign(false);
    } else {
      toast.error(data.message);
      setOpenAssign(false);
    }
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(
      `/api/consultation/delete/${idConsultation}`,
    );
    if (data.status === 1) {
      toast.success(data.message);
      getListConsultation();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (id) => {
    setOpen(true);
    setIdConsultation(id);
  };
  const action = [
    {
      key: 'edit-file',
      component: <PencilIcon />,
      event: handleEdit,
      role: [EDU_COUNSELLOR],
    },
    {
      key: 'delete-file',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [EDU_COUNSELLOR],
    },
    {
      key: 'assign-task',
      component: <AssignTask />,
      event: handleAssign,
      role: [EDU_COUNSELLOR],
    },
  ];
  const statusMapping = {
    [CONSULTATION_STATUS.POTENTIAL]: 'Tiềm năng',
    [CONSULTATION_STATUS.NO_POTENTIAL]: 'Không tiềm năng',
  };
  useEffect(() => {
    getListConsultation();
    getListStaff();
    // eslint-disable-next-line
  }, []);
  const getListConsultation = async (page = 1) => {
    const data = await getRequest(`/api/consultation/list?page=${page}&limit=10`);
    data.data.data = data.data.data.map((item) => ({
      ...item,
      status: statusMapping[item.status],
    }));
    setItem(data.data.data);
    setTotalPage(data.data.paginate.total_page)
  };
  const onPageChange = (page)=>{
    getListConsultation(page)
  }
  const getListStaff = async () => {
    const data = await getRequest(
      `/api/staff/list-staff?role=${ADMISSION_OFFICER}`,
    );
    setListStaff(data.data);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link
          to="/consultation/new-consultation"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={headers} actions={action} items={items} />
        <div className='flex items-center justify-end mt-7'>
          <BasePagination totalPage={totalPage} onPageChange={onPageChange}></BasePagination>
        </div>
      </Content>
      <BaseConfirmDialog
        title="Remove consultation"
        content="Do you want to remove this consultation"
        open={open}
        setOpen={setOpen}
        event={event}
      />
      <Dialog open={openAssign} onClose={() => setOpenAssign(false)}>
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

export default Consultation;
