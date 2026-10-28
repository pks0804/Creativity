import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        // Firebase는 용량이 커서 별도 파일로 나눕니다. 사이트 코드만 바뀌면 Firebase 파일은 브라우저 캐시를 그대로 씁니다.
        manualChunks: { firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'] },
      },
    },
    // Firebase 파일 하나가 500KB를 넘어 매번 경고가 뜨는데, 압축 전송 시 약 200KB라 문제없어 기준을 올립니다.
    chunkSizeWarningLimit: 800,
  },
});
