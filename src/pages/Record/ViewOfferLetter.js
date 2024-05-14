import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import BaseTableImage from '../../components/BaseTableImage';
import { useEffect, useState } from 'react';
import { convertDate } from '../../utils/Convert';
import { getRequest } from '../../services/Api';
function ViewOfferLetter() {
  const { offer_letter_id } = useParams();
  const [infomation, setInfomation] = useState();
  const title = 'Chi tiết thư mời';
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
      src: `/record/offer-letter/${offer_letter_id}`,
      title: 'Chi tiết thư mời',
    },
  ];
  const headers = [
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'imageList',
      title: 'Danh sách hình ảnh',
    },
  ];
  useEffect(() => {
    getRecordOfferLetter();
    // eslint-disable-next-line
  }, []);
  const getRecordOfferLetter = async () => {
    const data = await getRequest(
      `/api/file/record/offer-letter/${offer_letter_id}`,
    );
    setInfomation(data.data);
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
                  <span className="font-medium mr-3">Trường có thư mời :</span>
                  {infomation.school}
                </div>
              </div>
              <div className="col-span-1 ml-[20px]">
                <div className="py-1">
                  <span className="font-medium mr-3">
                    Địa chỉ email khách hàng :
                  </span>
                  {infomation.customer_email}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Tên nhân viên :</span>
                  {infomation.Staff_name}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Thời gian cập nhật :</span>
                  {convertDate(infomation.updated_at)}
                </div>
                <div className="py-1">
                  <span className="font-medium mr-3">Thời gian tạo :</span>
                  {convertDate(infomation.created_at)}
                </div>
              </div>
            </div>
            <div className="mt-[50px]">
              <BaseTableImage
                headers={headers}
                imageList={infomation.imagesList}
              />
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </Content>
    </div>
  );
}

export default ViewOfferLetter;
