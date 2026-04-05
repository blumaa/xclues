export interface PuzzleItemDef {
  title: string;
  year?: number;
  artist?: string;
  album?: string;
}

export interface PuzzleGroupDef {
  connection: string;
  connection_type: string;
  color: 'yellow' | 'green' | 'blue' | 'purple';
  difficulty: 'easy' | 'medium' | 'hard' | 'hardest';
  difficulty_score: number;
  items: [PuzzleItemDef, PuzzleItemDef, PuzzleItemDef, PuzzleItemDef];
}

export interface PuzzleDef {
  groups: [PuzzleGroupDef, PuzzleGroupDef, PuzzleGroupDef, PuzzleGroupDef];
}
