import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { useParams } from 'react-router-dom';
import BaseTableImage from '../../components/BaseTableImage';
import { useEffect, useState } from 'react';
import { getRequest } from '../../services/Api';
import { convertDate } from '../../utils/Convert';
function VisaFileDetail() {
  const { visa_id } = useParams();
  const [infomation, setInfomation] = useState();
  const [imagesList, setImageList] = useState([]);
  const title = 'Chi tiết hồ sơ';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/visa-file',
      title: 'Hồ sơ visa',
    },
    {
      isCurrentPage: true,
      src: `/visa-file/${visa_id}`,
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
    getVisaFile();
    // eslint-disable-next-line
  }, []);
  const getVisaFile = async () => {
    const data = await getRequest(`/api/file/visa-file/${visa_id}`);
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
                  <span className="font-medium mr-3">Email :</span>
                  {infomation.customer_email}
                </div>
              </div>
              <div className="col-span-1 ml-[20px]">
              <div className="py-1">
                  <span className="font-medium mr-3">Nhân viên xử lý :</span>
                  {infomation.staff.map((item, index) => (
                    <div key={index} className="ml-6">
                      {item.email}
                    </div>
                  ))}
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
            <div className=" mt-[50px]">
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

export default VisaFileDetail;
