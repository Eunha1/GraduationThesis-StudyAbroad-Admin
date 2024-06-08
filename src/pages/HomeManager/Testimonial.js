import { useEffect, useState } from "react";
import BaseTable from "../../components/BaseTable";
import Breadcrumb from "../../components/Breadcrumb";
import { getRequest, postRequest } from "../../services/Api";
import Content from "../../components/Content";
import { ADMIN } from "../../utils/Constant";
import { PencilIcon, DeleteIcon } from "../../asset/images/icons";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
function Testimonial(){
    const navigate = useNavigate()
    const [data, setData] = useState()
    const title = 'Đánh giá của học sinh'
    const listBreadcrumb = [
        {
            src: '/',
            title: 'Trang chủ'
        },
        {
            isCurrentPage: true,
            src: '/home-manager/testimonial',
            title: 'Đánh giá của học sinh'
        }
    ]
    const headers = [
        {
            title: 'ID',
            key: 'stt'
        },
        {
            title: 'Avatar',
            key: 'image'
        },
        {
            title: 'Nội dung',
            key: 'content'
        },
        {
            title: 'Mô tả',
            key: 'description'
        },
        {
            title: 'action',
            key: 'action'
        }
    ]
    const handleEdit = (id)=>{
        navigate(`/home-manager/testimonial/edit/${id}`)
    }
    const handleDelete = async(id)=>{
        const data = await postRequest(`/api/home-manager/delete-testimonial/${id}`)
        if(data.status === 1){
            toast.success(data.message)
            getListTestimonial()
        }else{
            toast.error(data.message)
        }
    }
    const action = [
        {
          key: 'edit',
          component: <PencilIcon />,
          event: handleEdit,
          role: [ADMIN],
        },
        {
          key: 'delete',
          component: <DeleteIcon />,
          event: handleDelete,
          role: [ADMIN],
        },
      ];
    useEffect(()=>{
        getListTestimonial()
    },[])
    const getListTestimonial = async ()=>{
        const data = await getRequest('/api/home-manager/list-testimonial')
        setData(data.data)
    }
    return (
        <div>
            <Breadcrumb title={title} listBreadcrumb={listBreadcrumb}/>
            <button className="border rounded-lg bg-[#015289] my-4 p-1 px-3 flex justify-center ">
                <Link
                to="/home-manager/testimonial/create"
                className="text-white text-base font-Roboto"
                >
                Thêm
                </Link>
            </button>
            <Content>
                <BaseTable headers={headers} items={data} actions={action}></BaseTable>
            </Content>
        </div>
    )
}

export default Testimonial