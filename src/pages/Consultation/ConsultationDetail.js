import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { convertDate } from '../../utils/Convert';
function ConsultationDetail() {
  const { consultation_id } = useParams();
  const [infomation, setInfomation] = useState();
  const title = 'Chi tiết thông tin tư vấn';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/consultation',
      title: 'Thông tin tư vấn',
    },
    {
      isCurrentPage: true,
      src: `/consultation/${consultation_id}`,
      title: 'Chi tiết thông tin',
    },
  ];
  useEffect(() => {
    getConsultationDetail();
    // eslint-disable-next-line
  }, []);
  const getConsultationDetail = async () => {
    const data = await getRequest(
      `/api/consultation/consultation-detail/${consultation_id}`,
    );
    setInfomation(data.data);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        {infomation ? (
          <div>
            <div className="grid grid-cols-2 mb-8">
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Tên khách hàng :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.customer_name}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Tình trạng hồ sơ :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.status === 0 ? 'Không tiềm năng' : 'Tiềm năng'}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[50px] mb-8">
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Số điện thoại khách hàng :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.customer_phone}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Địa chỉ :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.customer_address}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Email :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.customer_email}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-[50px] mb-8">
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Quốc gia dự định du học :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.country}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Trường dự định theo học :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.school_name}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Ngành dự định học :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.majors}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 mb-8">
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Năm dự kiến du học :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.school_year}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Trình độ học vấn theo học:{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.level}
                </span>
              </div>
            </div>
            <div className="mb-8">
              <div className="font-medium text-[18px] font-Roboto mb-2">
                Ghi chú :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {infomation.note}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Thời gian tạo :{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {convertDate(infomation.created_at)}
                </span>
              </div>
              <div className="font-medium text-[18px] font-Roboto mb-2 cols-span-1">
                Thời gian cập nhật:{' '}
                <span className="italic font-normal text-[16px] font-Roboto">
                  {convertDate(infomation.updated_at)}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </Content>
    </div>
  );
}

export default ConsultationDetail;
