---
to: src/<%= serviceType %>/<%= name %>/pages/HomePage/index.tsx
---
import ServiceHead from '<%= serviceType %>/<%= name %>/components/ServiceHead';
import ServiceName from '<%= serviceType %>/<%= name %>/components/ServiceName';

/**
 * 여기서 작성한 페이지를 /pages 디렉토리 내부에서 export 하시면 디렉토리 경로대로 페이지가 생성돼요.
 *
 * @example
 * ```ts
 * export { default } from '<%= name %>/pages/HomePage';
 * ```
 */
const HomePage = () => {
  return (
    <div>
      <ServiceHead />
      <ServiceName name="<%= name %>" />
    </div>
  );
};

export default HomePage;
