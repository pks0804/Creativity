// 관리자에게만 보이는 "준비된 자료 불러오기" 안내 카드
// 아직 등록되지 않은 준비 자료가 있을 때만 나타나고, 모두 등록되면 사라집니다.
import { useState } from 'react';
import { ErrorMessage, toMessage } from './StatusMessage';
import { IconPlus } from './Icons';

interface Props {
  missingCount: number;
  description: string;
  onImport: () => Promise<void>;
}

export function ImportPreparedCard({ missingCount, description, onImport }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  if (missingCount === 0) return null;

  const handleClick = async () => {
    setBusy(true);
    setError('');
    try {
      await onImport();
    } catch (e) {
      setError(toMessage(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mb-6 space-y-3 rounded-2xl border border-brand-200 bg-brand-50/70 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-brand-900">준비된 자료 {missingCount}건이 아직 등록되지 않았습니다</p>
          <p className="mt-1 text-sm text-brand-700">{description}</p>
        </div>
        <button onClick={handleClick} disabled={busy} className="btn-primary shrink-0">
          <IconPlus className="h-4 w-4" />
          {busy ? '등록 중…' : '한 번에 불러오기'}
        </button>
      </div>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}
