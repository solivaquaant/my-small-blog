import React from 'react';
import Giscus from '@giscus/react';
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      repo="solivaquaant/my-small-blog" // Thay bằng repo của bạn
      repoId="R_kgDOOfb_Yw"         // Thay bằng repo-id của bạn
      category="General"  // Thay bằng category của bạn
      categoryId="DIC_kwDOOfb_Y84C4ACV"      // Thay bằng category-id của bạn
      mapping="pathname"        // Ánh xạ bình luận theo đường dẫn bài viết
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode === 'dark' ? 'dark' : 'light'} // Tự động đổi màu theo giao diện
      lang="en"                 // Ngôn ngữ tiếng Việt
      loading="lazy"
    />
  );
}