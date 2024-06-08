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
import UploadOfferLetterFile from '../pages/File/UploadFile/UploadOfferLetter';
import UploadVisaFile from '../pages/File/UploadFile/UploadVisaFile';
import OfferLetterRecord from '../pages/Record/OfferLetter';
import VisaRecord from '../pages/Record/Visa';
import VisaDetail from '../pages/Record/VisaDetail';
import OfferLetterRecordDetail from '../pages/Record/OfferLetterDetail';
import ViewOfferLetter from '../pages/Record/ViewOfferLetter';
import ViewVisa from '../pages/Record/ViewVisa';
import Consultation from '../pages/Consultation/Consultation';
import ConsultationDetail from '../pages/Consultation/ConsultationDetail';
import CreateConsultation from '../pages/Consultation/CreateConsultation';
import UpdateConsultation from '../pages/Consultation/UpdateConsultation';
import UpdateOfferLetterFile from '../pages/File/UpdateFile/OfferLetter';
import UpdateVisaFile from '../pages/File/UpdateFile/Visa';
import UpdateOfferLetter from '../pages/Record/UpdateOfferLetter';
import UpdateVisa from '../pages/Record/UpdateVisa';
import EditArticle from '../pages/Article/EditArticle';
import Category from '../pages/Category/Category';
import MenuManager from '../pages/PageManager/Menu/Menu';
import AddMenu from '../pages/PageManager/Menu/AddMenu';
import EditMenu from '../pages/PageManager/Menu/EditMenu';
import ListMenu from '../pages/PageManager/News/ListMenu';
import AddNews from '../pages/PageManager/News/AddNews';
import Banner from '../pages/HomeManager/Banner';
import NewsAndEvent from '../pages/HomeManager/NewsAndEvent';
import Testimonial from '../pages/HomeManager/Testimonial';
import TestimonialDetail from '../pages/HomeManager/TestimonialDetail';
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
  {
    key: 'update-article',
    path: '/article/update/:article_id',
    element: <EditArticle />,
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
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'visa-file-detail',
    path: '/visa-file/:visa_id',
    element: <VisaFileDetail />,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'upload-visa-file',
    path: '/visa-file/upload',
    element: <UploadVisaFile />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'offer-letter-file',
    path: '/offer-letter-file',
    element: <OfferLetter />,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'offer-letter-detail',
    path: '/offer-letter/:letterId',
    element: <OfferLetterDetail />,
    role: [ADMIN, EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'upload-offer-letter',
    path: '/offer-letter/upload',
    element: <UploadOfferLetterFile />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'record-offer-letter',
    path: '/record/offer-letter/upload',
    element: <OfferLetterRecord />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'record-visa',
    path: '/record/visa/upload',
    element: <VisaRecord />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'record-visa-detail',
    path: '/record/visa',
    element: <VisaDetail />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'record-offer-letter-detail',
    path: '/record/offer-letter',
    element: <OfferLetterRecordDetail />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'record-offer-letter-view',
    path: '/record/offer-letter/:offer_letter_id',
    element: <ViewOfferLetter />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'record-visa-view',
    path: '/record/visa/:visa_id',
    element: <ViewVisa />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'consultation',
    path: '/consultation',
    element: <Consultation />,
    role: [EDU_COUNSELLOR],
  },
  {
    key: 'consultation-detail',
    path: '/consultation/:consultation_id',
    element: <ConsultationDetail />,
    role: [EDU_COUNSELLOR],
  },
  {
    key: 'create-consultation',
    path: '/consultation/new-consultation',
    element: <CreateConsultation />,
    role: [EDU_COUNSELLOR],
  },
  {
    key: 'update-consultation',
    path: '/consultation/update/:consultation_id',
    element: <UpdateConsultation />,
    role: [EDU_COUNSELLOR],
  },
  {
    key: 'update-offerLetter-file',
    path: '/offer-letter/update-file/:file_id',
    element: <UpdateOfferLetterFile />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'update-visa-file',
    path: '/visa/update-file/:file_id',
    element: <UpdateVisaFile />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'update-offer-letter',
    path: '/record/update-offer-letter/:offer_letter_id',
    element: <UpdateOfferLetter />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'update-visa',
    path: '/record/update-visa/:visa_id',
    element: <UpdateVisa />,
    role: [EDU_COUNSELLOR, ADMISSION_OFFICER],
  },
  {
    key: 'category',
    path: '/category',
    element: <Category />,
    role: [ADMIN],
  },
  {
    key: 'menu',
    path: '/page-manager/menu',
    element: <MenuManager />,
    role: [ADMIN],
  },
  {
    key: 'add-menu',
    path: '/page-manager/add-menu',
    element: <AddMenu />,
    role: [ADMIN],
  },
  {
    key: 'edit-menu',
    path: '/page-manager/edit-menu/:menu_id',
    element: <EditMenu />,
    role: [ADMIN],
  },
  {
    key: 'news',
    path: '/page-manager/news',
    element: <ListMenu />,
    role: [ADMIN],
  },
  {
    key: 'add-news',
    path: '/page-manager/add-news',
    element: <AddNews />,
    role: [ADMIN],
  },
  {
    key: 'banner',
    path: '/home-manager/banner',
    element: <Banner />,
    role: [ADMIN],
  },
  {
    key: 'news-and-event',
    path: '/home-manager/news-and-event',
    element: <NewsAndEvent />,
    role: [ADMIN],
  },
  {
    key: 'testimonial',
    path: '/home-manager/testimonial',
    element: <Testimonial/>,
    role: [ADMIN]
  },
  {
    key: 'create-testimonial',
    path: '/home-manager/testimonial/create',
    element: <TestimonialDetail/>,
    role: [ADMIN]
  },
  {
    key: 'edit-testimonial',
    path: '/home-manager/testimonial/edit/:id',
    element: <TestimonialDetail/>,
    role: [ADMIN]
  }
];

export const PUBLIC_ROUTER = [
  { key: 'not found', path: '*', element: <Error />, layout: null },
  { key: 'login', path: '/login', element: <Login />, layout: null },
];
