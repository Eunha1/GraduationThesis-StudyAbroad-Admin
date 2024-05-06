import { useEffect, useState } from 'react';
import { ViewIcon } from '../../asset/images/icons';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../services/Api';
function VisaFile() {
  const [items, setItem] = useState();
  const title = 'Hồ sơ Visa';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/visa-file',
      title: 'Hồ sơ visa',
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
      title: 'Email',
    },
    {
      key: 'customer_address',
      title: 'Địa chỉ',
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
  useEffect(() => {
    getVisaFile();
  }, []);
  const getVisaFile = async () => {
    const data = await getRequest('/api/file/visa-file');
    setItem(data.data);
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/visa-file/${id}`);
  };
  const action = [
    {
      key: 'view-detail',
      component: <ViewIcon />,
      event: handleView,
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <BaseTable headers={headers} items={items} actions={action}></BaseTable>
      </Content>
    </div>
  );
}

export default VisaFile;
