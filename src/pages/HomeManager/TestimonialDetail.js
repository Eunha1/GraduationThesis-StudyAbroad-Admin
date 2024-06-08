import { useParams } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Content from "../../components/Content";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from 'yup'
function TestimonialDetail (){
    const { id } = useParams()
    const isEdit = id ? true : false
    const title = isEdit ? 'Chỉnh sửa đánh giá' : 'Thêm mới đánh giá'
    const listBreadcrumb = [
        {
            src: '/',
            title: 'Trang chủ'
        },
        {
            src: '/home-manager/testimonial',
            title: 'Đánh giá của học sinh'
        },
        {
            isCurrentPage: true,
            src: isEdit ? `/home-manager/testimonial/edit/${id}` : '/home-manager/testimonial/create',
            title: isEdit ? 'Chỉnh sửa đánh giá' : 'Thêm mới đánh giá'
        }
    ]
    const validationSchema = yup.object({
        name: yup.string('Enter name').required('Name is required'),
        content: yup.string('Enter content').required('Content is required'),
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            content: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values)=>{

        }
    })
    return (
        <div>
            <Breadcrumb title={title} listBreadcrumb={listBreadcrumb}/>
            <Content>
                <Box component='form' onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-8 p-3">
                        <label className="col-span-1 font-Inter font-medium text-[16px]">Tên học sinh/sinh viên</label>
                        <TextField
                            type="text"
                            variant="outlined"
                            label='Enter name'
                            placeholder="Enter name"
                            size="small"
                            fullWidth
                            className="col-span-4"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </div>
                    <div className="grid grid-cols-8 p-3">
                        <label className="col-span-1 font-Inter font-medium text-[16px]">Mô tả</label>
                        <TextField
                            type="text"
                            multiline
                            rows={2}
                            variant="outlined"
                            label='Enter description'
                            placeholder="Enter description"
                            size="small"
                            fullWidth
                            className="col-span-6" 
                        />
                    </div>
                </Box>
            </Content>
        </div>
    )
}

export default TestimonialDetail