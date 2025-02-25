declare global {
  namespace JSX {
    // HTML 태그명을 모두 커버하려면 [elemName: string]: any; 로 처리
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};
