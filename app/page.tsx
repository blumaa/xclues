import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getGenreFromHost } from '../src/config/domainDetector';

export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('host') ?? undefined;
  const genre = getGenreFromHost(host);
  redirect(`/${genre}`);
}
