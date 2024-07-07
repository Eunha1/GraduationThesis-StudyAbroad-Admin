import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { getRequest } from '../../../services/Api';
import BaseTable from '../../../components/BaseTable';
import { ADMIN } from '../../../utils/Constant';
import { PencilIcon } from '../../../asset/images/icons';
import { useNavigate } from 'react-router-dom';
import BasePagination from '../../../components/BasePagination';
function ListMenu() {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const title = 'Danh mục tin tức';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/page-manager/news',
      title: 'Danh mục tin tức',
    },
  ];
  const headers = [
    {
      title: 'stt',
      key: 'stt',
    },
    {
      title: 'Tên danh mục',
      key: 'name',
    },
    {
      title: 'action',
      key: 'action',
    },
  ];
  useEffect(() => {
    getListMenu();
  }, []);
  const getListMenu = async (page = 1) => {
    const data = await getRequest(`/api/menu/list-menu?page=${page}&limit=10`);
    setData(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const onPageChange = (page) => {
    getListMenu(page);
    setCurrentPage(page);
  };
  const handleEdit = (item) => {};

  const action = [
    {
      key: 'edit-file',
      component: <PencilIcon />,
      event: handleEdit,
      role: [ADMIN],
    },
  ];
  const handleAdd = () => {
    navigate('/page-manager/add-news');
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button
        className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center text-white"
        onClick={handleAdd}
      >
        Thêm bài viết
      </button>
      <Content>
        <BaseTable headers={headers} items={data} actions={action}></BaseTable>
        <div className="flex items-center justify-end mt-7">
          <BasePagination
            totalPage={totalPage}
            currentPage={currentPage}
            onPageChange={onPageChange}
          ></BasePagination>
        </div>
      </Content>
    </div>
  );
}

export default ListMenu;
