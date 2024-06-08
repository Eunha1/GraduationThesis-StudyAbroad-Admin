import { Box, TextField, CircularProgress, MenuItem } from '@mui/material';
import Breadcrumb from '../../components/Breadcrumb';
import Content from '../../components/Content';
import { getRequest } from '../../services/Api';
import { useEffect, useState } from 'react';
import { AddSquare, MinusSquare } from '../../asset/images/icons';
function NewsAndEvent() {
  const [listPost, setListPost] = useState();
  const [postID, setPostID] = useState([]);
  const [newsID, setNewsID] = useState()
  const [eventID, setEventID] = useState()
  const title = 'Tin tức và sự kiện';
  const listBreadcrumb = [
    {
      title: 'Trang chủ',
      src: '/',
    },
    {
      isCurrentPage: true,
      title: 'Tin tức và sự kiện',
      src: '/home-manager/news-and-event',
    },
  ];
  useEffect(() => {
    getListPost();
  }, []);
  const getListPost = async () => {
    const data = await getRequest('/api/post/list-post');
    setListPost(data.data);
  };
  const getListNews = async () => {
    const data = await getRequest('/api/home-manager/news-and-event/list?type=1')
    setNewsID(data.data.post_info)
  }
  const getListEvent = async () => {
    const data = await getRequest('/api/home-manager/news-and-event/list?type=2')
    setNewsID(data.data.post_info)
  }
  return (
    <div>
      <Breadcrumb title={title} listBreadcrumb={listBreadcrumb} />
      <Content>
        <Box>
          <div>
            <div className="flex flex-col mb-[30px]">
              <div className="flex justify-between mb-2">
                <label className="font-Inter font-medium text-[16px] mb-2">
                  Tin tức
                </label>
                <div className="flex">
                  <div className="cursor-pointer mr-2">
                    <AddSquare />
                  </div>
                  <div className="cursor-pointer">
                    <MinusSquare />
                  </div>
                </div>
              </div>
              <TextField
                select
                label="Chọn bài viết"
                placeholder="Chọn bài viết"
                variant="filled"
                fullWidth
                defaultValue=""
                onChange={(event) => setPostID([...postID, event.target.value])}
              >
                {listPost ? (
                  listPost.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.title}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>
                    <CircularProgress />
                  </MenuItem>
                )}
              </TextField>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-2">
              <label className="font-Inter font-medium text-[16px] mb-2">
                Sự kiện
              </label>
              <div className="flex">
                <div className="cursor-pointer mr-2">
                  <AddSquare />
                </div>
                <div className="cursor-pointer">
                  <MinusSquare />
                </div>
              </div>
            </div>
            <TextField
              select
              label="Chọn bài viết"
              placeholder="Chọn bài viết"
              variant="filled"
              fullWidth
              defaultValue=""
              onChange={(event) => setPostID([...postID, event.target.value])}
            >
              {listPost ? (
                listPost.map((option, index) => (
                  <MenuItem key={index} value={option._id}>
                    {option.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>
                  <CircularProgress />
                </MenuItem>
              )}
            </TextField>
          </div>
          <div></div>
          <div className="border-t border-gray-700 mt-[50px] cursor-pointer">
            <div className="mt-8 flex justify-end items-center">
              <button
                className=" text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-lg px-3 py-1 w-[70px] text-center"
                type="submit"
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

export default NewsAndEvent;
