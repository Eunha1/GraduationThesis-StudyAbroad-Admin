import {
  ArticleOutlined,
  AssignmentLateOutlined,
  AttachFile,
  DashboardOutlined,
  FilePresent,
  InfoOutlined,
  PaidOutlined,
} from '@mui/icons-material';

export const Menu = [
  {
    title: 'Dashboard',
    src: '/dashboard',
    key: 'dashboard',
    icon: <DashboardOutlined />,
    isActive: false,
  },
  {
    title: 'Quản lý hồ sơ',
    src: '/',
    key: 'file',
    icon: <FilePresent />,
    isActive: false,
    child: [
      {
        title: 'Hồ sơ thư mời',
        src: '/offer-letter',
        key: 'offer-letter',
        isActive: false,
        icon: <AttachFile />,
      },
      {
        title: 'Hồ sơ visa',
        src: '/visa-file',
        key: 'visa-file',
        isActive: false,
        icon: <AttachFile />,
      },
    ],
  },
  {
    title: 'Quản lý bài viết',
    src: '/article',
    key: 'article',
    icon: <ArticleOutlined />,
    isActive: false,
  },
  {
    title: 'Quản lý công việc',
    src: '/assign',
    key: 'assign',
    isActive: false,
    icon: <AssignmentLateOutlined />,
  },
  {
    title: 'Thông tin tư vấn',
    src: '/advise-info',
    key: 'advise-info',
    isActive: false,
    icon: <InfoOutlined />,
  },
  {
    title: 'Hoa hồng',
    src: '/commission',
    key: 'commission',
    isActive: false,
    icon: <PaidOutlined />,
  },
];
