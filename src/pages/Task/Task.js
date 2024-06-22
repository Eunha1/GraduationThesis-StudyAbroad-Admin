import { useEffect, useState } from 'react';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest, postRequest } from '../../services/Api';
import {
  ADMISSION_OFFICER,
  ADVISE_STATUS,
  CONSULTATION_STATUS,
  EDU_COUNSELLOR,
  TASK_STATUS,
} from '../../utils/Constant';
import { ConfirmTask } from '../../asset/images/icons';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { toast } from 'react-toastify';
import { checkRoles } from '../../utils/Authen';

function Task() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [taskID, setTaskID] = useState();
  const title = 'Nhiệm vụ';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/task',
      title: 'Nhiệm vụ',
    },
  ];
  const headers = [
    {
      key: 'stt',
      title: 'STT',
    },
    {
      key: 'owner',
      title: 'Người giao nhiệm vụ',
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
      title: 'Trạng thái đơn tư vấn',
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
  const headers_2 = [
    {
      key: 'stt',
      title: 'STT',
    },
    {
      key: 'owner',
      title: 'Người giao nhiệm vụ',
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
      key: 'country',
      title: 'Quốc gia chọn',
    },
    {
      key: 'school_name',
      title: 'Trường theo học',
    },
    {
      key: 'majors',
      title: 'Ngành theo học',
    },
    {
      key: 'school_year',
      title: 'Năm theo học',
    },
    {
      key: 'finance',
      title: 'Tài chính',
    },
    {
      key: 'note',
      title: 'Ghi chú',
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
  const statusTask = {
    [TASK_STATUS.WATTING_CONFIRM]: 'Chờ xác nhận',
    [TASK_STATUS.ACCEPT]: 'Chấp nhận',
    [TASK_STATUS.REFUSE]: 'Từ chối',
  };
  const convertStatus = {
    [ADVISE_STATUS.WATTING]: 'Chờ nhận tư vấn',
    [ADVISE_STATUS.BEING_CONSULTED]: 'Đang được tư vấn',
    [ADVISE_STATUS.NEWADVISE]: 'Mới đăng kí',
  };
  const consultationStatus = {
    [CONSULTATION_STATUS.POTENTIAL]: 'Tiềm năng',
    [CONSULTATION_STATUS.NO_POTENTIAL]: 'Không tiềm năng',
  };
  useEffect(() => {
    if (checkRoles(EDU_COUNSELLOR)) {
      getListTask();
    }
    if (checkRoles(ADMISSION_OFFICER)) {
      getListTaskConsultation();
    }
    // eslint-disable-next-line
  }, []);
  const getListTask = async () => {
    const data = await getRequest('/api/task/get-task');
    data.data.data = data.data.data.map((item) => ({
      ...item,
      taskStatus: statusTask[item.status],
      ...item.task,
      status: convertStatus[item.task.status],
    }));
    setData(data.data.data);
  };
  const getListTaskConsultation = async () => {
    const data = await getRequest('/api/task/task-for-consultation');
    data.data.data = data.data.data.map((item) => ({
      ...item,
      taskStatus: statusTask[item.status],
      ...item.task,
      status: consultationStatus[item.task.status],
    }));
    setData(data.data.data);
  };
  const handleConfirm = (id) => {
    setOpen(true);
    setTaskID(id);
  };
  const handleRefuse = async () => {
    const data = await postRequest(
      `/api/task/confirm/${taskID}?status=${TASK_STATUS.REFUSE}`,
      {
        adviseStatus: ADVISE_STATUS.NEWADVISE,
      },
    );
    if (data.status === 1) {
      toast.success(data.message);
      if (checkRoles(EDU_COUNSELLOR)) {
        getListTask();
      }
      if (checkRoles(ADMISSION_OFFICER)) {
        getListTaskConsultation();
      }
      setOpen(false);
    } else {
      toast.error(data.message);
      setOpen(false);
    }
  };
  const handleAccept = async () => {
    const data = await postRequest(
      `/api/task/confirm/${taskID}?status=${TASK_STATUS.ACCEPT}`,
      {
        adviseStatus: ADVISE_STATUS.BEING_CONSULTED,
      },
    );
    if (data.status === 1) {
      toast.success(data.message);
      if (checkRoles(EDU_COUNSELLOR)) {
        getListTask();
      }
      if (checkRoles(ADMISSION_OFFICER)) {
        getListTaskConsultation();
      }
      setOpen(false);
    } else {
      toast.error(data.message);
      setOpen(false);
    }
  };
  const actions = [
    {
      key: 'confirm-task',
      component: <ConfirmTask />,
      event: handleConfirm,
      role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        {checkRoles(EDU_COUNSELLOR) ? (
          <BaseTable
            headers={headers}
            items={data}
            actions={actions}
          ></BaseTable>
        ) : (
          <BaseTable
            headers={headers_2}
            items={data}
            actions={actions}
          ></BaseTable>
        )}
      </Content>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Xác nhận nhiệm vụ</DialogTitle>
        <DialogContent>Bạn đồng ý nhận nhiệm vụ này</DialogContent>
        <DialogActions>
          <button
            className="px-2 py-1 rounded-lg border-[1px] border-gray-900 hover:bg-gray-100"
            onClick={handleRefuse}
          >
            Từ chối
          </button>
          <button
            className="px-2 py-1 rounded-lg bg-[#3861AF] text-white hover:bg-red-700"
            onClick={handleAccept}
          >
            Chấp nhận
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Task;
