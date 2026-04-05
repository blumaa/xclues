import type { PuzzleDef } from './types';

// Replacement puzzles for the 6 gaps in books coverage
export const bookGapPuzzles: PuzzleDef[] = [
  // Gap 1: 2026-04-03
  {
    groups: [
      { connection: 'Novels by Louisa May Alcott', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Little Women', year: 1868 },
        { title: 'Little Men', year: 1871 },
        { title: 'Jo\'s Boys', year: 1886 },
        { title: 'An Old-Fashioned Girl', year: 1870 },
      ]},
      { connection: 'Books set during the apocalypse or post-apocalypse', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Road', year: 2006 },
        { title: 'The Stand', year: 1978 },
        { title: 'Station Eleven', year: 2014 },
        { title: 'World War Z', year: 2006 },
      ]},
      { connection: 'Books that open with a death', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Book Thief', year: 2005 },
        { title: 'Chronicle of a Death Foretold', year: 1981 },
        { title: 'The Lovely Bones', year: 2002 },
        { title: 'The Secret History', year: 1992 },
      ]},
      { connection: 'Books whose title contains "Little"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Little Dorrit', year: 1857 },
        { title: 'The Little Prince', year: 1943 },
        { title: 'Little Fires Everywhere', year: 2017 },
        { title: 'A Little Life', year: 2015 },
      ]},
    ],
  },
  // Gap 2: 2026-04-07
  {
    groups: [
      { connection: 'Novels by Charlotte Bronte', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Jane Eyre', year: 1847 },
        { title: 'Shirley', year: 1849 },
        { title: 'Villette', year: 1853 },
        { title: 'The Professor', year: 1857 },
      ]},
      { connection: 'Books featuring a dark or creepy house', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Haunting of Hill House', year: 1959 },
        { title: 'Rebecca', year: 1938 },
        { title: 'Wuthering Heights', year: 1847 },
        { title: 'The Fall of the House of Usher', year: 1839 },
      ]},
      { connection: 'Books where the narrator directly addresses the reader', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'If on a Winter\'s Night a Traveler', year: 1979 },
        { title: 'The Catcher in the Rye', year: 1951 },
        { title: 'Lolita', year: 1955 },
        { title: 'Moby-Dick', year: 1851 },
      ]},
      { connection: 'Books whose title is a woman\'s first and last name', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Daisy Miller', year: 1878 },
        { title: 'Anna Karenina', year: 1878 },
        { title: 'Emma Woodhouse', year: 1815 },
        { title: 'Madame Bovary', year: 1857 },
      ]},
    ],
  },
  // Gap 3: 2026-04-10
  {
    groups: [
      { connection: 'Novels by Philip Pullman', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Golden Compass', year: 1995 },
        { title: 'The Subtle Knife', year: 1997 },
        { title: 'The Amber Spyglass', year: 2000 },
        { title: 'La Belle Sauvage', year: 2017 },
      ]},
      { connection: 'Books exploring parallel worlds or alternate realities', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Neverwhere', year: 1996 },
        { title: 'The Man in the High Castle', year: 1962 },
        { title: 'Dark Matter', year: 2016 },
        { title: 'The Long Earth', year: 2012 },
      ]},
      { connection: 'Award-winning young adult novels', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Giver', year: 1993 },
        { title: 'Holes', year: 1998 },
        { title: 'The Graveyard Book', year: 2008 },
        { title: 'When You Reach Me', year: 2009 },
      ]},
      { connection: 'Books whose title contains a precious material', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Silver Linings Playbook', year: 2008 },
        { title: 'The Silver Chair', year: 1953 },
        { title: 'The Copper Beech', year: 1992 },
        { title: 'The Crystal Cave', year: 1970 },
      ]},
    ],
  },
  // Gap 4: 2026-04-11
  {
    groups: [
      { connection: 'Novels by Ursula K. Le Guin', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'A Wizard of Earthsea', year: 1968 },
        { title: 'The Left Hand of Darkness', year: 1969 },
        { title: 'The Dispossessed', year: 1974 },
        { title: 'The Lathe of Heaven', year: 1971 },
      ]},
      { connection: 'Books about utopian or ideal societies', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Utopia', year: 1516 },
        { title: 'Island', year: 1962 },
        { title: 'Ecotopia', year: 1975 },
        { title: 'Walden Two', year: 1948 },
      ]},
      { connection: 'Books with magic systems explained in detail', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Mistborn: The Final Empire', year: 2006 },
        { title: 'The Name of the Wind', year: 2007 },
        { title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
        { title: 'The Way of Kings', year: 2010 },
      ]},
      { connection: 'Books whose title references a hand or arm', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Hand of Ethelberta', year: 1876 },
        { title: 'A Farewell to Arms', year: 1929 },
        { title: 'The Invisible Hand', year: 2014 },
        { title: 'The Hand That First Held Mine', year: 2010 },
      ]},
    ],
  },
  // Gap 5: 2026-05-09
  {
    groups: [
      { connection: 'Novels by Edith Wharton', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Age of Innocence', year: 1920 },
        { title: 'The House of Mirth', year: 1905 },
        { title: 'Ethan Frome', year: 1911 },
        { title: 'The Custom of the Country', year: 1913 },
      ]},
      { connection: 'Books about the immigrant experience in America', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Jungle', year: 1906 },
        { title: 'Americanah', year: 2013 },
        { title: 'The Namesake', year: 2003 },
        { title: 'A Tree Grows in Brooklyn', year: 1943 },
      ]},
      { connection: 'Books awarded the Newbery Medal', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Charlotte\'s Web', year: 1952 },
        { title: 'Bridge to Terabithia', year: 1977 },
        { title: 'A Wrinkle in Time', year: 1962 },
        { title: 'Number the Stars', year: 1989 },
      ]},
      { connection: 'Books whose title is a social institution', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The House of God', year: 1978 },
        { title: 'The Firm', year: 1991 },
        { title: 'The School for Good and Evil', year: 2013 },
        { title: 'The Church of Baseball', year: 2023 },
      ]},
    ],
  },
  // Gap 6: 2026-06-02
  {
    groups: [
      { connection: 'Novels by Terry Pratchett', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Good Omens', year: 1990 },
        { title: 'The Colour of Magic', year: 1983 },
        { title: 'Going Postal', year: 2004 },
        { title: 'Small Gods', year: 1992 },
      ]},
      { connection: 'Books about the nature of storytelling', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Neverending Story', year: 1979 },
        { title: 'If on a Winter\'s Night a Traveler', year: 1979 },
        { title: 'The Shadow of the Wind', year: 2001 },
        { title: 'The Book Thief', year: 2005 },
      ]},
      { connection: 'Comic fantasy novels', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Hitchhiker\'s Guide to the Galaxy', year: 1979 },
        { title: 'The Princess Bride', year: 1973 },
        { title: 'Lamb: The Gospel According to Biff', year: 2002 },
        { title: 'Catch-22', year: 1961 },
      ]},
      { connection: 'Books whose title starts with a color', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'White Teeth', year: 2000 },
        { title: 'Black Beauty', year: 1877 },
        { title: 'Green Eggs and Ham', year: 1960 },
        { title: 'Red Storm Rising', year: 1986 },
      ]},
    ],
  },
];
