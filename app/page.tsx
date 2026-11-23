import { redirect } from 'next/navigation';
import { DEFAULT_GENRE } from '../src/config/seoConfig';

// `/` is redirected per host in next.config (buildRedirects); this fallback
// covers hosts without a rule (localhost, previews).
export default function Home() {
  redirect(`/${DEFAULT_GENRE}`);
}
