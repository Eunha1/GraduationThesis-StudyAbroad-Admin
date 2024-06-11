import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import BaseTable from '../../components/BaseTable';
import { ViewIcon } from '../../asset/images/icons';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { ADMIN } from '../../utils/Constant';
function AdviseInfo() {
  const [items, setItem] = useState();
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
    // {
    //   key: 'action',
    //   title: 'action',
    // },
  ];
  const statusMapping = {
    1: 'Mới đăng kí'
  }
  useEffect(() => {
    getListInfo();
  }, []);
  const getListInfo = async () => {
    const data = await getRequest('/api/customer/advise-info');
    data.data = data.data.map((item)=>(
      {
        ...item,
        status: statusMapping[item.status]
      }
    ))
    setItem(data.data);
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/advise-info/${id}`);
  };
  const actions = [
    {
      key: 'view-detail',
      component: <ViewIcon />,
      event: handleView,
      role: [ADMIN],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <BaseTable headers={headers} items={items} actions={actions} />
      </Content>
    </div>
  );
}

export default AdviseInfo;
