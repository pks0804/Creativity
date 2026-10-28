import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="py-16 text-center">
      <p className="text-6xl font-bold tracking-tight text-brand-200">404</p>
      <p className="mb-8 mt-4 text-slate-600">요청하신 페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="btn-primary">홈으로</Link>
    </div>
  );
}
