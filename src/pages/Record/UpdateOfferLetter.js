import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useEffect, useState } from 'react';
import { getRequest, postRequest } from '../../services/Api';
import UpdateImage from '../../components/UpdateImage';
import { TextField, Box } from '@mui/material';
import { extractPathNameFromURL } from '../../utils/Convert';
import { toast } from 'react-toastify';
function UpdateOfferLetter() {
  const { offer_letter_id } = useParams();
  const [data, setData] = useState();
  const [offerLetter, setOfferLetter] = useState([]);
  const title = 'Cập nhật thư mời';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/record/offer-letter',
      title: 'Thư mời',
    },
    {
      isCurrentPage: true,
      src: `/record/update-offer-letter/${offer_letter_id}`,
      title: 'Cập nhật thư mời',
    },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    getOfferLetter();
    // eslint-disable-next-line
  }, []);
  const getOfferLetter = async () => {
    const data = await getRequest(
      `/api/file/record/offer-letter/${offer_letter_id}`,
    );
    setData(data.data);
  };
  const handleOfferLetter = (newImageList) => {
    setOfferLetter(newImageList);
  };
  const handleCancel = () => {
    navigate('/record/offer-letter');
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    offerLetter.forEach((element) => {
      if (element.file) {
        formData.append('offer_letter', element.file);
      } else {
        formData.append('offer_letter', extractPathNameFromURL(element));
      }
    });
    const data = await postRequest(
      `/api/file/record/update/offer-letter/${offer_letter_id}`,
      formData,
    );
    if (data.status === 1) {
      toast.success(data.message);
      navigate('/record/offer-letter');
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box>
          {data ? (
            <div>
              <div className="grid grid-cols-4 gap-[40px]">
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
                  <label className="mb-2">Trường nhận thư mời</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="school"
                    value={data.school}
                    size="small"
                  />
                </div>
                <div className="flex flex-col col-span-1">
                  <label className="mb-2">Quốc gia</label>
                  <TextField
                    variant="outlined"
                    type="text"
                    name="country"
                    value={data.country}
                    size="small"
                  />
                </div>
              </div>
              <div className="mt-[50px]">
                <UpdateImage
                  title="Thư mời"
                  onImageUpload={handleOfferLetter}
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
        </Box>
      </Content>
    </div>
  );
}

export default UpdateOfferLetter;
