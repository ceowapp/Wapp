'use server';

import { backendClient } from '../app/api/edgestore/[...edgestore]/route';
import { unstable_noStore } from 'next/cache';

export async function serverSideUpload(url: string) {
  unstable_noStore(); 
  const extension = url.split('.').pop();
  if (!extension) {
    throw new Error('Could not get extension from url');
  }
  const res = await backendClient.publicFiles.upload({
    content: {
      url,
      extension,
    },
    options: {
      temporary: true,
    },
    ctx: {
      userId: '123',
      userRole: 'admin',
    },
    input: {
      type: 'post',
    },
  });
}