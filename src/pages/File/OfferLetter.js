import { ViewIcon } from '../../asset/images/icons';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useNavigate } from 'react-router-dom';
import { getRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
function OfferLetter() {
  const [items, setItem] = useState();
  const title = 'Hồ sơ thư mời';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/offer-letter',
      title: 'Hồ sơ thư mời',
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
    getListOfferLetter();
  }, []);
  const getListOfferLetter = async () => {
    const data = await getRequest('/api/file/offer-letter-file');
    setItem(data.data);
  };
  const navigate = useNavigate();
  const handleView = (id) => {
    navigate(`/offer-letter/${id}`);
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

export default OfferLetter;
