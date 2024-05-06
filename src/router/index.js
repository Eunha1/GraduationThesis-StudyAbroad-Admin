import DashBoard from '../pages/Dashboard/Dashboard';
import Error from '../pages/Error/Error';
import Login from '../pages/Auth/Login';
import Home from '../pages/Home/Home';
import Article from '../pages/Article/Article';
import AddArticle from '../pages/Article/AddArticle';
import OfferLetter from '../pages/File/OfferLetter';
import OfferLetterDetail from '../pages/File/OfferLetterDetail';
import VisaFile from '../pages/File/VisaFile';
import VisaFileDetail from '../pages/File/VisaFileDetail';
import Assign from '../pages/Assign/Assign';
import AdviseInfo from '../pages/AdviseInfo/AdviseInfo';
import AdviseInfoDetail from '../pages/AdviseInfo/AdviseInfoDetail';
import { ADMIN, ADMISSION_OFFICER, EDU_COUNSELLOR } from '../utils/Constant';
export const PRIVATE_ROUTER = [
  {
    key: 'home',
    path: '/',
    element: <Home />,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'dashboard ',
    path: '/dashboard',
    element: <DashBoard />,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  { key: 'article', path: '/article', element: <Article />, role: [ADMIN] },
  {
    key: 'add-article',
    path: '/article/add-article',
    element: <AddArticle />,
    role: [ADMIN],
  },
  { key: 'assign', path: '/assign', element: <Assign />, role: [ADMIN] },
  {
    key: 'advise-info',
    path: '/advise-info',
    element: <AdviseInfo />,
    role: [ADMIN],
  },
  {
    key: 'advise-info-detail',
    path: '/advise-info/:advise_id',
    element: <AdviseInfoDetail />,
    role: [ADMIN],
  },
  {
    key: 'visa-file',
    path: '/visa-file',
    element: <VisaFile />,
    role: [ADMIN],
  },
  {
    key: 'visa-file-detail',
    path: '/visa-file/:visa_id',
    element: <VisaFileDetail />,
    role: [ADMIN],
  },
  {
    key: 'offer-letter-file',
    path: '/offer-letter',
    element: <OfferLetter />,
    role: [ADMIN],
  },
  {
    key: 'offer-letter-detail',
    path: '/offer-letter/:letterId',
    element: <OfferLetterDetail />,
    role: [ADMIN],
  },
];

export const PUBLIC_ROUTER = [
  { key: 'not found', path: '*', element: <Error />, layout: null },
  { key: 'login', path: '/login', element: <Login />, layout: null },
];
