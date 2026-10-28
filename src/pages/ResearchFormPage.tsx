// 연구 자료 등록(/research/new)과 수정(/research/:id/edit)을 함께 처리합니다.
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createResearch, getResearch, updateResearch } from '../services/researchService';
import type { LinkItem } from '../services/types';
import { parseTags } from '../lib/format';
import { cleanLinks, validateLinks } from '../lib/url';
import { LinksEditor } from '../components/LinksEditor';
import { ErrorMessage, Loading, toMessage } from '../components/StatusMessage';

export default function ResearchFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [links, setLinks] = useState<LinkItem[]>([{ label: '', url: '' }]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // 수정 모드라면 기존 내용을 불러와 칸을 채워 둡니다.
  useEffect(() => {
    if (!id) return;
    getResearch(id)
      .then((item) => {
        if (!item) {
          setError('자료를 찾을 수 없습니다.');
          return;
        }
        setTitle(item.title);
        setSummary(item.summary);
        setTagsText(item.tags.join(', '));
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
    const linkError = validateLinks(cleaned);
    if (linkError) return setError(linkError);

    const input = { title: title.trim(), summary: summary.trim(), tags: parseTags(tagsText), links: cleaned };
    setSaving(true);
    try {
      if (id) {
        await updateResearch(id, input);
        navigate(`/research/${id}`);
      } else {
        const created = await createResearch(input);
        navigate(`/research/${created.id}`);
      }
    } catch (err) {
      setError(toMessage(err));
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <h1 className="text-xl font-bold">{isEdit ? '연구 자료 수정' : '연구 자료 등록'}</h1>

      <div>
        <label className="label" htmlFor="title">제목 *</label>
        <input id="title" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>

      <div>
        <label className="label" htmlFor="summary">요약</label>
        <textarea id="summary" rows={5} className="input" value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>

      <div>
        <label className="label" htmlFor="tags">태그 (쉼표로 구분)</label>
        <input
          id="tags"
          className="input"
          placeholder="예: 약동학, 항암제"
          value={tagsText}
          onChange={(e) => setTagsText(e.target.value)}
        />
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
