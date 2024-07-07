import { useEffect, useState } from 'react';
import BaseTable from '../../components/BaseTable';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest, postRequest } from '../../services/Api';
import BasePagination from '../../components/BasePagination';
import { DeleteIcon } from '../../asset/images/icons';
import { ADMIN } from '../../utils/Constant';
import BaseConfirmDialog from '../../components/BaseConfirmDialog';
import { EventEmitter } from 'events';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
function DashBoard() {
  const [data, setData] = useState();
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [ID, setID] = useState();
  const event = new EventEmitter();
  const title = 'Tài khoản nhân viên';
  const listBreadcrumb = [
    {
      title: 'Trang chủ',
      src: '/',
    },
    {
      isCurrentPage: true,
      title: 'Tài khoản nhân viên',
      src: '/dashboard',
    },
  ];
  const headers = [
    {
      title: 'ID',
      key: 'stt',
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'role',
    },
    {
      title: 'action',
      key: 'action',
    },
  ];
  useEffect(() => {
    getListStaff();
  }, []);
  const getListStaff = async (page = 1) => {
    const data = await getRequest(`/api/staff/all-staff?page=${page}&limit=10`);
    setData(data.data.data);
    setTotalPage(data.data.paginate.total_page);
  };
  const onPageChange = (page) => {
    getListStaff(page);
    setCurrentPage(page);
  };
  event.addListener('RemoveItem', async () => {
    const data = await postRequest(`/api/staff/delete/${ID}`);
    if (data.status === 1) {
      toast.success(data.message);
      setCurrentPage(1);
      getListStaff();
    } else {
      toast.error(data.message);
    }
  });
  const handleDelete = (item) => {
    setOpen(true);
    setID(item._id);
  };
  const action = [
    {
      key: 'delete-account',
      component: <DeleteIcon />,
      event: handleDelete,
      role: [ADMIN],
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb}></Breadcrumb>
      <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
        <Link to="/new-account" className="text-white text-base font-Roboto">
          Thêm
        </Link>
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
        title="Remove account"
        content="Do you want to remove this account"
        open={open}
        setOpen={setOpen}
        event={event}
      />
    </div>
  );
}

export default DashBoard;
