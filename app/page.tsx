import { redirect } from 'next/navigation';

<<<<<<< Updated upstream
export default function Home() {
  redirect('/films');
=======
export default async function Home() {
  const headersList = await headers();
  const host = headersList.get('x-forwarded-host') ?? headersList.get('host') ?? undefined;
  const genre = getGenreFromHost(host);
  redirect(`/${genre}`);
>>>>>>> Stashed changes
}
