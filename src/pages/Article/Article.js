import BaseTable from '../../components/BaseTable';
import Content from '../../components/Content';
import { DeleteIcon, PencilIcon } from '../../asset/images/icons';
import Breadcrumb from '../../components/Breadcrumb';
import { Link } from 'react-router-dom';
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
  const handleEdit = () => {
    console.log('edit');
  };
  const handleDelete = () => {
    console.log('delete');
  };
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
        <BaseTable headers={header} items={item}>
          <div className="flex items-center justify-center p-1">
            <div className="p-1 cursor-pointer" onClick={handleEdit}>
              <PencilIcon />
            </div>
            <div className="p-1 cursor-pointer" onClick={handleDelete}>
              <DeleteIcon />
            </div>
          </div>
        </BaseTable>
      </Content>
    </div>
  );
}

export default Article;
