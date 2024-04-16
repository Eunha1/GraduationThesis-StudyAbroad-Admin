import { Box, TextField } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
function AddArticle() {
  const title = 'Thêm bài viết';
  const listBreadcrumb = [
    {
      src: '/',
      title: 'Trang chủ',
    },
    {
      src: '/article',
      title: 'Bài viết',
    },
    {
      isCurrentPage: true,
      src: '/add-article',
      title: 'Thêm bài viết',
    },
  ];
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box component="form">
          <div className="grid grid-cols-8 p-3">
            <label htmlFor="title" className="col-span-1">
              Title
            </label>
            <TextField
              type="text"
              name="title"
              variant="outlined"
              label="Title"
              placeholder="Enter title"
              size="small"
              fullWidth
              className="col-span-6"
            />
          </div>
          <div className="flex p-3">
            <div className="w-1/2 grid grid-cols-4">
              <label htmlFor="author" className="col-span-1">
                Author
              </label>
              <TextField
                type="text"
                name="author"
                variant="outlined"
                label="Author"
                placeholder="Enter author"
                size="small"
                className="col-span-2"
              />
            </div>
            <div className="w-1/2 grid grid-cols-4">
              <label htmlFor="tags" className="col-span-1">
                Tags Name
              </label>
              <TextField
                type="text"
                name="tags"
                variant="outlined"
                label="Tags"
                placeholder="Enter tags name"
                size="small"
                className="col-span-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-8 p-3">
            <label className="col-span-1">Content</label>
            <div className="col-span-7">
              <Editor
                initialValue="<p>You write content here</p>"
                apiKey="ueu2aq0rvb0r76jaku08ubwv518ni5aqe3hfjm24v3s88jbn"
                init={{
                  height: 500,
                  menubar: false,
                  statusbar: false,
                  selector: 'textarea',
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount',
                  ],
                  toolbar:
                    'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
              />
            </div>
          </div>
        </Box>
      </Content>
      <div class="fixed bottom-0 right-0 w-[100%] h-[60px] bg-gray-100 shadow-lg ">
        <button className="text-white bg-[#015289] float-right border rounded-lg mr-14 mt-3 px-3 py-1">
          Save
        </button>
      </div>
    </div>
  );
}

export default AddArticle;
