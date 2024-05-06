import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRequest } from '../../services/Api';
import BaseTableImage from '../../components/BaseTableImage';
function OfferLetterDetail() {
  const [infomation, setInfomation] = useState();
  const [imagesList, setImageList] = useState([]);
  const { letterId } = useParams();
  const title = 'Chi tiết hồ sơ';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/offer-letter',
      title: 'Hồ sơ thư mời',
    },
    {
      isCurrentPage: true,
      src: `/offer-letter/${letterId}`,
      title: 'Chi tiết hồ sơ',
    },
  ];
  const headers = [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Danh sách hình ảnh',
      key: 'imageList',
    },
  ];
  useEffect(() => {
    getDetailOfferLetter();
    // eslint-disable-next-line
  }, []);
  const getDetailOfferLetter = async () => {
    const data = await getRequest(`/api/file/offer-letter/${letterId}`);
    setInfomation(data.data);
    setImageList(data.data.imagesList);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        {infomation ? (
          <div>
            <div className="grid grid-cols-2 gap-[150px]">
              <div className="col-span-1 ml-[20px]">
                <div className="py-1">
                  <span className="font-medium mr-3">Tên khách hàng :</span>
                  {infomation.customer_name}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Số điện thoại :</span>
                  {infomation.customer_phone}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Địa chỉ :</span>
                  {infomation.customer_address}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Trường theo học :</span>
                  {infomation.school_name}
                </div>
              </div>
              <div className="col-span-1 ml-[20px]">
                <div className="py-1">
                  <span className="font-medium mr-3">Tên nhân viên :</span>
                  {infomation.Staff_name}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Số điện thoại :</span>
                  {infomation.Staff_phone}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Thời gian cập nhật :</span>
                  {infomation.updated_at}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Thời gian tạo :</span>
                  {infomation.created_at}
                </div>
              </div>
            </div>
            <div className="mt-[50px]">
              <BaseTableImage headers={headers} imageList={imagesList} />
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </Content>
    </div>
  );
}

export default OfferLetterDetail;
