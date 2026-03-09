import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';
import GiscusComponent from '@site/src/components/GiscusComponent';
import { useBlogPost } from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();

  return (
    <>
      <BlogPostItem {...props} />
      {/* Chỉ hiển thị bình luận khi ở trang chi tiết bài viết, không hiện ở trang danh sách */}
      {isBlogPostPage && (
        <div style={{ marginTop: '2rem' }}>
          <GiscusComponent />
        </div>
      )}
    </>
  );
}