import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest } from '../../services/Api';
import { useEffect, useState } from 'react';

function AdviseInfoDetail() {
  const { advise_id } = useParams();
  const [data, setData] = useState();
  const title = 'Chi tiết tư vấn';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/advise-info',
      title: 'Thông tin tư vấn',
    },
    {
      isCurrentPage: true,
      src: `/advise-info/${advise_id}`,
      title: 'Chi tiết tư vấn',
    },
  ];
  useEffect(() => {
    getAdviseInfoById();
    // eslint-disable-next-line
  }, []);
  const getAdviseInfoById = async () => {
    const data = await getRequest(`/api/customer/advise-info/${advise_id}`);
    setData(data.data);
  };
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <h2 className="px-6 py-4 text-xl font-bold">
            Chi tiết thông tin tư vấn
          </h2>
          {data ? (
            <div className="px-4 py-6 border-t flex justify-around">
              <div className="grid grid-rows-5 gap-[30px]">
                <div className="text-lg font-bold font-Inter">
                  Họ và Tên :{' '}
                  <span className="text-base font-medium">{data.name}</span>
                </div>
                <div className="text-lg font-bold font-Inter">
                  Số điện thoại :{' '}
                  <span className="text-base font-medium">{data.phone}</span>
                </div>
                <div className="text-lg font-bold font-Inter">
                  Trình độ quan tâm :{' '}
                  <span className="text-base font-medium">{data.level}</span>
                </div>
                <div className="text-lg font-bold font-Inter">
                  Điểm đến quan tâm :{' '}
                  <span className="text-base font-medium">
                    {data.destination}
                  </span>
                </div>
              </div>
              <div className="grid grid-rows-5 gap-[30px]">
                <div className="text-lg font-bold font-Inter">
                  Email :{' '}
                  <span className="text-base font-medium">{data.email}</span>
                </div>
                <div className="text-lg font-bold font-Inter">
                  Địa chỉ :{' '}
                  <span className="text-base font-medium">{data.address}</span>
                </div>
                <div className="text-lg font-bold font-Inter">
                  Trạng thái :{' '}
                  <span className="text-base font-medium">{data.status}</span>
                </div>
                <div className="text-lg font-bold font-Inter">
                  Câu hỏi của khách hàng :{' '}
                  <span className="text-base font-medium">{data.question}</span>
                </div>
              </div>
            </div>
          ) : (
            <>Loading...</>
          )}
        </div>
      </Content>
    </div>
  );
}

export default AdviseInfoDetail;
