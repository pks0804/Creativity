// 주소(URL)별로 어떤 화면을 보여줄지 정하는 곳입니다.
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAdmin, RequireAuth } from './components/RequireAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResearchListPage from './pages/ResearchListPage';
import ResearchDetailPage from './pages/ResearchDetailPage';
import ResearchFormPage from './pages/ResearchFormPage';
import LectureListPage from './pages/LectureListPage';
import LectureFormPage from './pages/LectureFormPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 누구나 볼 수 있는 페이지 */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* 로그인한 사람만 */}
        <Route path="/research" element={<RequireAuth><ResearchListPage /></RequireAuth>} />
        <Route path="/research/:id" element={<RequireAuth><ResearchDetailPage /></RequireAuth>} />
        <Route path="/lectures" element={<RequireAuth><LectureListPage /></RequireAuth>} />

        {/* 관리자(교수)만 */}
        <Route path="/research/new" element={<RequireAdmin><ResearchFormPage /></RequireAdmin>} />
        <Route path="/research/:id/edit" element={<RequireAdmin><ResearchFormPage /></RequireAdmin>} />
        <Route path="/lectures/new" element={<RequireAdmin><LectureFormPage /></RequireAdmin>} />
        <Route path="/lectures/:id/edit" element={<RequireAdmin><LectureFormPage /></RequireAdmin>} />

        {/* 없는 주소: 로그인 여부와 상관없이 안내 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
