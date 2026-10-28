// Firebase 환경변수가 없을 때 하얀 화면 대신 무엇을 해야 하는지 알려주는 화면
export function MissingConfigPage({ missing }: { missing: string[] }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <div className="card space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Firebase 설정값이 필요합니다</h1>
        <p className="text-sm leading-relaxed text-slate-600">
          아래 환경변수가 비어 있습니다. Netlify의 <strong>Site configuration → Environment variables</strong>
          (내 컴퓨터에서는 <code>.env</code> 파일)에 값을 넣은 뒤 다시 배포해 주세요.
        </p>
        <ul className="space-y-1 rounded-xl bg-slate-50 p-4 font-mono text-xs text-slate-700">
          {missing.map((key) => (
            <li key={key}>{key}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
