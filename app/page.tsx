import { redirect } from 'next/navigation';
import { DEFAULT_GENRE } from '../src/config/seoConfig';
import { getGenreFromHost } from '../src/config/domainDetector';

export default async function Home() {
  if (process.env.CAPACITOR) {
    redirect(`/${DEFAULT_GENRE}`);
  }

  const { headers } = await import('next/headers');
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? undefined;
  const genre = getGenreFromHost(host);
  redirect(`/${genre}`);
}
