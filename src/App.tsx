// 주소(URL)별로 어떤 화면을 보여줄지 정하는 곳입니다.
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAdmin } from './components/RequireAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResearchAreasPage from './pages/ResearchAreasPage';
import PublicationsPage from './pages/PublicationsPage';
import PeoplePage from './pages/PeoplePage';
import GalleryPage from './pages/GalleryPage';
import JoinUsPage from './pages/JoinUsPage';
import LectureListPage from './pages/LectureListPage';
import LectureFormPage from './pages/LectureFormPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 누구나 볼 수 있는 페이지 (논문 링크 열기는 화면 안에서 로그인 확인) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/areas" element={<ResearchAreasPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/join" element={<JoinUsPage />} />
        <Route path="/papers" element={<LectureListPage />} />
        {/* 예전 주소(수업 자료·연구 자료)로 들어와도 길을 잃지 않도록 */}
        <Route path="/lectures" element={<Navigate to="/papers" replace />} />
        <Route path="/research/*" element={<Navigate to="/publications" replace />} />

        {/* 관리자(교수)만 */}
        <Route path="/papers/new" element={<RequireAdmin><LectureFormPage /></RequireAdmin>} />
        <Route path="/papers/:id/edit" element={<RequireAdmin><LectureFormPage /></RequireAdmin>} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
