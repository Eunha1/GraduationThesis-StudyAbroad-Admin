import { ViewIcon } from '../../asset/images/icons';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';

function OfferLetter() {
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
      key: 'id',
      title: 'ID',
    },
    {
      key: 'customer_name',
      title: 'Tên khách hàng',
    },
    {
      key: 'school',
      title: 'Trường theo học',
    },
    {
      key: 'staff_name',
      title: 'Nhân viên xử lý',
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
  const items = [
    {
      id: 1,
      customer_name: 'Do Quang Phuc',
      school: 'DHBK Ha Noi',
      staff_name: 'Do Quang Phuc',
      status: 'Da co thu moi',
    },
    {
      id: 2,
      customer_name: 'Do Quang Phuc',
      school: 'DHBK Ha Noi',
      staff_name: 'Do Quang Phuc',
      status: 'Da co thu moi',
    },
    {
      id: 3,
      customer_name: 'Do Quang Phuc',
      school: 'DHBK Ha Noi',
      staff_name: 'Do Quang Phuc',
      status: 'Da co thu moi',
    },
    {
      id: 4,
      customer_name: 'Do Quang Phuc',
      school: 'DHBK Ha Noi',
      staff_name: 'Do Quang Phuc',
      status: 'Da co thu moi',
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <BaseTable headers={headers} items={items}>
          <div>
            <ViewIcon />
          </div>
        </BaseTable>
      </Content>
    </div>
  );
}

export default OfferLetter;
