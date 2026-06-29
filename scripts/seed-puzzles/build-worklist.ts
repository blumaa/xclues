import { filmPuzzles } from './films-puzzles';
import { musicPuzzlesV2 } from './music-puzzles-v2';
import { bookPuzzlesV2 } from './book-puzzles-v2';
const SETS:Record<string,any[]>={films:filmPuzzles,music:musicPuzzlesV2,books:bookPuzzlesV2};
const badIds:string[]=JSON.parse(await Bun.file('/tmp/bad-ids.json').text());
const problems=JSON.parse(await Bun.file('/tmp/problems.json').text());
const issuesById:Record<string,string[]>={}; for(const p of problems){(issuesById[p.id]=issuesById[p.id]||[]).push(p.issue);}

// affected puzzles: genre-index -> Set(colors)
const affected:Record<string,Set<string>>={};
for(const id of badIds){const [g,idx,color]=id.split('-'); const k=`${g}-${idx}`; (affected[k]=affected[k]||new Set()).add(color);}

const work:any[]=[];
for(const k of Object.keys(affected)){
  const [genre,idxStr]=k.split('-'); const idx=+idxStr-1;
  const puzzle=SETS[genre][idx];
  const allConns=puzzle.groups.map((g:any)=>g.connection);
  for(const color of affected[k]){
    const grp=puzzle.groups.find((g:any)=>g.color===color);
    work.push({ id:`${genre}-${idx+1}-${color}`, genre, puzzleIndex:idx+1, color,
      difficulty:grp.difficulty, difficulty_score:grp.difficulty_score, connection_type:grp.connection_type,
      oldConnection:grp.connection, puzzleConnections:allConns,
      avoidItemTitles: puzzle.groups.filter((g:any)=>g.color!==color).flatMap((g:any)=>g.items.map((i:any)=>i.title)),
      issues:issuesById[`${genre}-${idx+1}-${color}`]||[] });
  }
}
await Bun.write('/tmp/worklist.json', JSON.stringify(work,null,1));
console.log('worklist groups:',work.length);
const bg:Record<string,number>={films:0,music:0,books:0}; for(const w of work) bg[w.genre]++;
console.log('by genre:',JSON.stringify(bg));
