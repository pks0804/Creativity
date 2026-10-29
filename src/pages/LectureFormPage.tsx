// 최근 논문 등록(/papers/new)과 수정(/papers/:id/edit)을 함께 처리합니다.
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createLecture, getLecture, updateLecture } from '../services/lectureService';
import type { LinkItem } from '../services/types';
import { cleanLinks, validateLinks } from '../lib/url';
import { LinksEditor } from '../components/LinksEditor';
import { ErrorMessage, Loading, toMessage } from '../components/StatusMessage';

export default function LectureFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [links, setLinks] = useState<LinkItem[]>([{ label: '', url: '' }]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getLecture(id)
      .then((item) => {
        if (!item) {
          setError('자료를 찾을 수 없습니다.');
          return;
        }
        setTitle(item.title);
        setCourse(item.course);
        setLinks(item.links.length > 0 ? item.links : [{ label: '', url: '' }]);
      })
      .catch((e: unknown) => setError(toMessage(e)))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const cleaned = cleanLinks(links);
    if (title.trim() === '') return setError('제목을 입력해 주세요.');
    if (course.trim() === '') return setError('분류를 입력해 주세요.');
    const linkError = validateLinks(cleaned);
    if (linkError) return setError(linkError);

    const input = { title: title.trim(), course: course.trim(), links: cleaned };
    setSaving(true);
    try {
      if (id) await updateLecture(id, input);
      else await createLecture(input);
      navigate('/papers');
    } catch (err) {
      setError(toMessage(err));
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit} className="card mx-auto max-w-3xl space-y-6 sm:p-10">
      <div className="border-b border-slate-100 pb-5">
        <h1 className="page-title">{isEdit ? '최근 논문 수정' : '최근 논문 등록'}</h1>
        <p className="mt-1 text-sm text-slate-500">* 표시는 필수 항목입니다.</p>
      </div>

      <div>
        <label className="label" htmlFor="title">제목 *</label>
        <input id="title" className="input" placeholder="예: 논문 제목 (저자 · 학술지 연도)" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label className="label" htmlFor="course">분류 *</label>
        <input id="course" className="input" placeholder="예: 유도 근접(Induced Proximity) — 같은 분류끼리 묶여 보입니다" value={course} onChange={(e) => setCourse(e.target.value)} />
      </div>

      <div>
        <span className="label">외부 링크</span>
        <LinksEditor links={links} onChange={setLinks} />
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-2 border-t border-slate-100 pt-6">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? '저장 중…' : isEdit ? '수정 완료' : '등록하기'}
        </button>
        <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>취소</button>
      </div>
    </form>
  );
}
