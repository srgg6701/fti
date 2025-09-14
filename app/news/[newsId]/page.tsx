'use client';
import { usePathname } from 'next/navigation';

import { getUrlSegments } from '@/lib/utils';
import DataSectionNews from '@/components/dataSectionsNews';

export default function NewsId() {
  const slug = getUrlSegments(usePathname, 2);

  return <DataSectionNews slug={slug} />;
}
