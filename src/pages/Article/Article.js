import BaseTable from '../../components/BaseTable';
import Content from '../../components/Content';
import { DeleteIcon, PencilIcon } from '../../asset/images/icons';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';
import { ADMIN } from '../../utils/Constant';
function Article() {
  const header = [
    {
      key: 'id',
      title: 'id',
    },
    {
      key: 'title',
      title: 'title',
    },
    {
      key: 'category',
      title: 'category',
    },
    {
      key: 'action',
      title: 'action',
    },
  ];
  const item = [
    {
      id: '1',
      title: 'Hust edu - top 1 vn',
      category: 'tao',
    },
    {
      id: '1',
      title: 'Hust edu - top 1 vn',
      category: 'tao',
    },
    {
      id: '1',
      title: 'Hust edu - top 1 vn',
      category: 'tao',
    },
    {
      id: '1',
      title: 'Hust edu - top 1 vn',
      category: 'tao',
    },
    {
      id: '1',
      title: 'Hust edu - top 1 vn',
      category: 'tao',
    },
    {
      id: '1',
      title: 'Hust edu - top 1 vn',
      category: 'tao',
    },
  ];
  const title = 'Quản lý bài viết';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/article',
      title: 'Bài viết',
    },
  ];
  const handleEdit = (id) => {
    console.log(id);
  };
  const handleDelete = (id) => {
    console.log(id);
  };
  const action = [
    {
      key: 'edit',
      component: <PencilIcon />,
      event: handleEdit,
      role: [ADMIN],
    },
    {
      key: 'delete',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link
          to="/article/add-article"
          className="text-white text-base font-Roboto"
        >
          Thêm
        </Link>
      </button>
      <Content>
        <BaseTable headers={header} items={item} actions={action}></BaseTable>
      </Content>
    </div>
  );
}

export default Article;
