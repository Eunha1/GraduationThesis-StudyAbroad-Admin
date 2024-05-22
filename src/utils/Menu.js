import {
  ArticleOutlined,
  AssignmentLateOutlined,
  AttachFile,
  DashboardOutlined,
  FilePresent,
  InfoOutlined,
  PaidOutlined,
} from '@mui/icons-material';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from './Constant';
import { NoteIcon, UploadIcon2 } from '../asset/images/icons';

export const Menu = [
  {
    title: 'Dashboard',
    src: '/dashboard',
    key: 'dashboard',
    icon: <DashboardOutlined />,
    isActive: false,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    title: 'Quản lý hồ sơ',
    src: '/',
    key: 'file',
    icon: <FilePresent />,
    isActive: false,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
    child: [
      {
        title: 'Hồ sơ thư mời',
        src: '/offer-letter-file',
        key: 'offer-letter-file',
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
    role: [ADMIN],
  },
  {
    title: 'Quản lý công việc',
    src: '/assign',
    key: 'assign',
    isActive: false,
    icon: <AssignmentLateOutlined />,
    role: [ADMIN],
  },
  {
    title: 'Thông tin tư vấn',
    src: '/advise-info',
    key: 'advise-info',
    isActive: false,
    icon: <InfoOutlined />,
    role: [ADMIN],
  },
  {
    title: 'Commission',
    src: '/commission',
    key: 'commission',
    isActive: false,
    icon: <PaidOutlined />,
    role: [ADMIN],
  },
  {
    title: 'Upload',
    src: '/',
    key: 'record',
    isActive: false,
    icon: <UploadIcon2 />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
    child: [
      {
        title: 'Thư mời',
        src: '/record/offer-letter',
        key: 'record-offer-letter',
        isActive: false,
        icon: <AttachFile />,
      },
      {
        title: 'Visa',
        src: '/record/visa',
        key: 'record-visa',
        isActive: false,
        icon: <AttachFile />,
      },
    ],
  },
  {
    title: 'Thông tin tư vấn',
    src: '/consultation',
    key: 'Consultation',
    isActive: false,
    icon: <NoteIcon />,
    role: [EDU_COUNSELLOR],
  },
];
