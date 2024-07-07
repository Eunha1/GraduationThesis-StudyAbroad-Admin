import { useEffect, useState } from 'react';
import Breadcrumb from '../../../components/Breadcrumb';
import Content from '../../../components/Content';
import { getRequest, postRequest } from '../../../services/Api';
import BaseTable from '../../../components/BaseTable';
import { ADMIN } from '../../../utils/Constant';
import { DeleteIcon, PencilIcon } from '../../../asset/images/icons';
import BaseConfirmDialog from '../../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BasePagination from '../../../components/BasePagination';
function MenuManager() {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [idMenu, setIdMenu] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const event = new EventEmitter();
  const navigate = useNavigate();
  const title = 'Quản lý menu';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      isCurrentPage: true,
      src: '/page-manager/menu',
      title: 'Danh sách menu',
    },
  ];
  const headers = [
    {
      title: 'ID',
      key: 'stt',
    },
    {
      title: 'Tên menu',
      key: 'name',
    },
    {
      title: 'Menu Cha',
      key: 'parent',
    },
    {
      title: 'Danh mục tương ứng',
      key: 'category',
    },
    {
      title: 'Key',
      key: 'slug',
    },
    {
      title: 'Action',
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
  const handleAdd = () => {
    navigate('/page-manager/add-menu');
  };
  const handleEdit = (item) => {
    navigate(`/page-manager/edit-menu/${item._id}`);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/menu/delete-menu/${idMenu}`);
    if (data.status === 1) {
      toast.success(data.message);
      setCurrentPage(1);
      getListMenu();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (item) => {
    setOpen(true);
    setIdMenu(item._id);
  };
  const action = [
    {
      key: 'edit-file',
      component: <PencilIcon />,
      event: handleEdit,
      role: [ADMIN],
    },
    {
      key: 'delete-file',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <button
        className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center text-white"
        onClick={handleAdd}
      >
        Thêm
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
      <BaseConfirmDialog
        title="Remove menu"
        content="Do you want remove this menu"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default MenuManager;
