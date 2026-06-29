import { filmPuzzles } from './films-puzzles';
import { musicPuzzlesV2 } from './music-puzzles-v2';
import { bookPuzzlesV2 } from './book-puzzles-v2';
const out:any[]=[];
const sets:[string,any[]][]=[['films',filmPuzzles],['music',musicPuzzlesV2],['books',bookPuzzlesV2]];
for(const [genre,puzzles] of sets){
  puzzles.forEach((p:any,pi:number)=>p.groups.forEach((g:any)=>{
    out.push({ id:`${genre}-${pi+1}-${g.color}`, genre, connection:g.connection,
      items:g.items.map((it:any)=>genre==='music'?`${it.title} — ${it.artist} (${it.year})`:`${it.title} (${it.year})`) });
  }));
}
await Bun.write('/tmp/verify-input.json', JSON.stringify(out));
console.log('groups:',out.length);
