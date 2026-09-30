import { redirect } from 'next/navigation';
import { DEFAULT_GENRE } from '../src/config/seoConfig';

// Web: `/` is redirected per host in next.config (buildRedirects) before this
// page is reached. This static fallback serves the Capacitor export build.
export default function Home() {
  redirect(`/${DEFAULT_GENRE}`);
}
