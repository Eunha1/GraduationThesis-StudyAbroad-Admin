import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest } from '../../services/Api';
import BaseTable from '../../components/BaseTable';
import { checkRoles } from '../../utils/Authen';
import {
  ADVISE_STATUS,
  EDU_COUNSELLOR,
  TASK_STATUS,
  ADMIN,
  CONSULTATION_STATUS,
} from '../../utils/Constant';

function Assign() {
  const [data, setData] = useState();
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
  ];
  const statusMapping = {
    [ADVISE_STATUS.NEWADVISE]: 'Mới đăng kí',
    [ADVISE_STATUS.WATTING]: 'Chờ nhận tư vấn',
    [ADVISE_STATUS.BEING_CONSULTED]: 'Đang được tư vấn',
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
  const getListAdvise = async () => {
    const data = await getRequest('/api/task/owner-task');
    data.data.data = data.data.data.map((item) => ({
      ...item,
      taskStatus: statusTask[item.status],
      ...item.task,
      status: statusMapping[item.task.status],
    }));
    setData(data.data.data);
  };
  const getListConsultation = async () => {
    const data = await getRequest('/api/task/owner-task-consultation');
    data.data.data = data.data.data.map((item) => ({
      ...item,
      taskStatus: statusTask[item.status],
      ...item.task,
      status: consultationStatus[item.task.status],
    }));
    setData(data.data.data);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <BaseTable headers={headers} items={data}></BaseTable>
      </Content>
    </div>
  );
}

export default Assign;
