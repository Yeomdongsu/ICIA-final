import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'
import Main from './pages/Main'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Event from './pages/Event'
import ScrollHandler from './components/common/ScrollHandler'
import MainCommu from './pages/MainCommu'
import { generateSubPage } from './components/layout/SubPage'
import Mypage from './pages/Member/Mypage'
import Likes from './pages/Member/Likes'
import Reservation from './pages/Member/Reservation'
import PageCorrection from './pages/Member/PageCorrection'
import CommuBoardNoti from './components/community/Board/CommuBoardNoti'
import CompInfo from './pages/CompInfo'
import Estimate from './pages/Estimate'
import EventDetail from './pages/Events/EventDetail'
import Honeymoon from './pages/Collect/Honeymoon'
import Planner from './pages/Collect/Planner'
import WeddingHall from './pages/Collect/WeddingHall'
import SDM from './pages/Collect/SDM'
import CommuBoardReview from './components/community/Board/CommuBoardReview'
import CommuBoardWr from './components/community/BoardEtc/CommuBoardWr'
import AdminMemberMag from './pages/Admin/AdminMemberMag'
import Collect from './pages/Collect/Collect'
import CollectDetail from './pages/Collect/CollectDetail'
import { generateSubPageBoard } from './components/layout/SubPageB'
// import CommuMain from './components/community/CommuMain'
//import CancelPayBSRequest from './components/estimate/CancelPayBSRequest'
import ServiceCenter from './pages/ServiceCenter'
import ServiceCenterWrite from './components/servicecenter/ServiceCenterWrite'
import AdminBrandMag from './pages/Admin/AdminBrandMag'
import AdminBrandWr from './pages/Admin/AdminBrandWr'
import CancelPayISRequest from './components/estimate/CancelPayISRequest'
import CancelPayBSRequest from './components/estimate/CancelPayBSRequest'
import ServiceCenterDetail from './components/servicecenter/ServiceCenterDetail'
import CommuBoardUp from './components/community/BoardEtc/CommnuBoardUp'
import CommuBoardReco from './components/community/Board/CommuBoardReco'
import CommuBoardWorry from './components/community/Board/CommuBoardWorry'
import CommuBoardShow from './components/community/Board/CommuBoardShow'
import CommuBoardDetail from './components/community/Board/CommuBoardDetail'
import WeddingNews from './pages/WeddingNews'
import WedNewsWrite from './components/weddingnews/WedNewsWrite'
import WedNewsDetail from './components/weddingnews/WedNewsDetail'
import AdminMemBoardMag from './pages/Admin/AdminMemBoardMag'
import AdminBrandBoardMag from './pages/Admin/AdminBrandBoardMag'
import AdminBrandBoardWr from './pages/Admin/AdminBrandBoardWr'
import AdminEventMag from './pages/Admin/AdminEventMag'
import AdminResMag from './pages/Admin/AdminResMag'
import AdminBbibMag from './pages/Admin/AdminBbibMag'
import AdminEventWr from './pages/Admin/AdminEventWr'

/**
 * Router - ?????? ????????? ?????? ??????????????? ???????????? ??????
 * / - ?????????????????? Main ???????????? ??????
 *
 * generateSubPage - ????????? ?????? ????????? ?????? ???????????? ?????? ?????? ???????????? ??????
 */

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/compInfo',
    element: <CompInfo />,
  },
  {
    path: '/event',
    element: <Event />,
  },
  {
    path: '/event/:id',
    element: <EventDetail />,
  },
  {
    path: '/mainCommu',
    element: <MainCommu />,
  },
  {
    path: '/estimate',
    element: <Estimate />,
  },
  {
    path: '/commuBoardNoti',
    element: <CommuBoardNoti />,
  },
  {
    path: '/commuBoardReco',
    element: <CommuBoardReco />,
  },
  {
    path: '/commuBoardReview',
    element: <CommuBoardReview />,
  },
  {
    path: '/commuBoardWorry',
    element: <CommuBoardWorry />,
  },
  {
    path: '/commuBoardShow',
    element: <CommuBoardShow />,
  },
  {
    path: '/commuBoardWr',
    element: <CommuBoardWr />,
  },
  {
    path: '/commuBoardDetail',
    element: <CommuBoardDetail />,
  },
  {
    path: '/commuBoardUp',
    element: <CommuBoardUp />,
  },
  {
    path: '/adminBrandWr',
    element: <AdminBrandWr />,
  },
  {
    path: '/adminBrandBoardWr',
    element: <AdminBrandBoardWr />,
  },
  {
    path: '/adminEventWr',
    element: <AdminEventWr />,
  },
  {
    name: '????????????',
    path: '/collect',
    element: <Collect />,
  },
  {
    name: '????????????',
    path: '/ServiceCenter',
    element: <ServiceCenter />,
  },
  {
    name: '????????????',
    path: '/ServiceCenterWrite',
    element: <ServiceCenterWrite />,
  },
  {
    name: '?????????',
    path: '/community/commuBoardNoti/detail',
    element: <CommuBoardDetail />,
  },
  {
    path: '/CancelPayISRequest',
    element: <CancelPayISRequest />,
  },
  {
    path: '/ServiceCenterDetail',
    element: <ServiceCenterDetail />,
  },
  {
    path: '/WeddingNews',
    element: <WeddingNews />,
  },
  {
    path: '/WedNewsWrite',
    element: <WedNewsWrite />,
  },
  {
    path: '/WedNewsDetail',
    element: <WedNewsDetail />,
  },
  // ???????????????
  {
    path: '/CancelPayBSRequest',
    element: <CancelPayBSRequest />,
  },
  ...generateSubPage('/collect', [
    // member??? ??????????????? ???????????? ??? ?????? ???????????? ???????????????!
    {
      name: '?????????',
      path: '/honeymoon',
      element: <Honeymoon />,
    },
    {
      name: '?????????',
      path: '/wedding-hall',
      element: <WeddingHall />,
    },
    {
      name: '?????????',
      path: '/planner',
      element: <Planner />,
    },
    {
      name: '?????????',
      path: '/sdm',
      element: <SDM />,
    },
    {
      name: '????????????',
      path: '/:category/:id',
      element: <CollectDetail />,
      visible: false,
      title: 'Its a Detail Page!',
    },
  ]),

  ...generateSubPage('/member', [
    // member??? ??????????????? ???????????? ??? ?????? ???????????? ???????????????!
    {
      name: '????????? ??????',
      path: '/mypage',
      element: <Mypage />,
    },
    {
      name: '?????? ??????',
      path: '/edit',
      element: <PageCorrection />,
    },
    {
      name: '??? ??????',
      path: '/like',
      element: <Likes />,
    },
    {
      name: '?????? ??????',
      path: '/reservation',
      element: <Reservation />,
    },
  ]),

  ...generateSubPageBoard('/community', [
    {
      name: '??????',
      path: '/maincommu',
      element: <MainCommu />,
    },
    {
      name: '????????????',
      path: '/commuBoardNoti',
      element: <CommuBoardNoti />,
    },
    {
      name: '???????????????',
      path: '/commuBoardReco',
      element: <CommuBoardReco />,
    },
    {
      name: '???????????????',
      path: '/commuBoardWorry',
      element: <CommuBoardWorry />,
    },
    {
      name: '???????????????',
      path: '/commuBoardShow',
      element: <CommuBoardShow />,
    },
    {
      name: '??????????????????',
      path: '/commuBoardReview',
      element: <CommuBoardReview />,
    },
  ]),

  ...generateSubPage('/admin', [
    // admin??? ??????????????? ??????
    {
      name: '?????? ?????? ?????? ',
      path: '/memberMag',
      element: <AdminMemberMag />,
    },
    {
      name: '?????? ??????',
      path: '/brandMag',
      element: <AdminBrandMag />,
    },
    {
      name: '?????? ????????? ??????',
      path: '/memBoardMag',
      element: <AdminMemBoardMag />,
    },
    {
      name: '?????? ????????? ??????',
      path: '/brandBoardMag',
      element: <AdminBrandBoardMag />,
    },
    {
      name: '????????? ??????',
      path: '/eventMag',
      element: <AdminEventMag />,
    },
    {
      name: '?????? ??????',
      path: '/resMag',
      element: <AdminResMag />,
    },
    {
      name: '????????? ??????',
      path: '/bbibMag',
      element: <AdminBbibMag />,
    },
  ]),
])

function App() {
  useEffect(() => {
    AOS.init()
  })

  return (
    <div>
      <RouterProvider router={router} />
      <ScrollHandler />
    </div>
  )
}

export default App
