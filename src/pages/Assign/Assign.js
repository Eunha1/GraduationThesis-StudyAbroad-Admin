import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';

function Assign() {
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
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content></Content>
    </div>
  );
}

export default Assign;
