// 수업 자료 등록(/lectures/new)과 수정(/lectures/:id/edit)을 함께 처리합니다.
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
    if (course.trim() === '') return setError('과목명을 입력해 주세요.');
    const linkError = validateLinks(cleaned);
    if (linkError) return setError(linkError);

    const input = { title: title.trim(), course: course.trim(), links: cleaned };
    setSaving(true);
    try {
      if (id) await updateLecture(id, input);
      else await createLecture(input);
      navigate('/lectures');
    } catch (err) {
      setError(toMessage(err));
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h1 className="text-xl font-bold">{isEdit ? '수업 자료 수정' : '수업 자료 등록'}</h1>

      <div>
        <label className="label" htmlFor="title">제목 *</label>
        <input id="title" className="input" placeholder="예: 3주차 대사와 배설" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label className="label" htmlFor="course">과목명 *</label>
        <input id="course" className="input" placeholder="예: 약동학" value={course} onChange={(e) => setCourse(e.target.value)} />
      </div>

      <div>
        <span className="label">외부 링크</span>
        <LinksEditor links={links} onChange={setLinks} />
      </div>

      {error && <ErrorMessage message={error} />}

      <div className="flex gap-2">
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? '저장 중…' : isEdit ? '수정 완료' : '등록하기'}
        </button>
        <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>취소</button>
      </div>
    </form>
  );
}
