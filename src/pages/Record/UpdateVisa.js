import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useEffect, useState } from 'react';
import { getRequest } from '../../services/Api';
import UpdateImage from '../../components/UpdateImage';
import { TextField } from '@mui/material';
import { extractPathNameFromURL } from '../../utils/Convert';
import { toast } from 'react-toastify';
import { postRequest } from '../../services/Api';
function UpdateVisa() {
  const { visa_id } = useParams();
  const [data, setData] = useState();
  const [visa, setVisa] = useState([]);
  const title = 'Cập nhật visa';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/record/visa',
      title: 'Visa',
    },
    {
      isCurrentPage: true,
      src: `/record/update-visa/${visa_id}`,
      title: 'Cập nhật visa',
    },
  ];
  const navigate = useNavigate();
  const handleVisa = (newImageList) => {
    setVisa(newImageList);
  };
  useEffect(() => {
    getRecordVisa();
    // eslint-disable-next-line
  }, []);
  const getRecordVisa = async () => {
    const data = await getRequest(`/api/file/record/visa/${visa_id}`);
    setData(data.data);
  };
  const handleCancel = () => {
    navigate('/record/visa');
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    visa.forEach((element) => {
      if (element.file) {
        formData.append('visa', element.file);
      } else {
        formData.append('visa', extractPathNameFromURL(element));
      }
    });
    const data = await postRequest(
      `/api/file/record/update/visa/${visa_id}`,
      formData,
    );
    if (data.status === 1) {
      toast.success(data.message);
      navigate('/record/visa');
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        {data ? (
          <div>
            <div className="grid grid-cols-3 gap-[50px]">
              <div className="flex flex-col col-span-1">
                <label className="mb-2">Tên khách hàng</label>
                <TextField
                  variant="outlined"
                  type="text"
                  size="small"
                  name="customer_name"
                  value={data.customer_name}
                />
              </div>
              <div className="flex flex-col col-span-1">
                <label className="mb-2">Số điện thoại</label>
                <TextField
                  variant="outlined"
                  type="text"
                  name="customer_phone"
                  value={data.customer_phone}
                  size="small"
                />
              </div>
              <div className="flex flex-col col-span-1">
                <label className="mb-2">Quốc gia</label>
                <TextField
                  variant="outlined"
                  type="text"
                  name="customer_phone"
                  value={data.country}
                  size="small"
                />
              </div>
            </div>
            <div>
              <UpdateImage
                title="visa"
                onImageUpload={handleVisa}
                listImages={data.imagesList[0].images}
              />
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
        <div className="border-t border-gray-700 mt-[50px]">
          <div className="mt-8 flex justify-end items-center">
            <button
              className=" font-medium rounded-lg text-lg px-2 py-1 w-[70px] text-center border-[1px] border-gray-900 mr-5"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className=" text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg px-3 py-1 w-[70px] text-center"
              type="submit"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Content>
    </div>
  );
}

export default UpdateVisa;
