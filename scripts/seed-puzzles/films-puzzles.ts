import type { PuzzleDef } from './types';

export const filmPuzzles: PuzzleDef[] = [
  // Puzzle 1
  {
    groups: [
      { connection: "Films directed by Kelly Reichardt", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Wendy and Lucy", year: 2008 },
        { title: "Meek's Cutoff", year: 2010 },
        { title: "Certain Women", year: 2016 },
        { title: "First Cow", year: 2019 },
      ]},
      { connection: "Films from the French New Wave movement", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Breathless", year: 1960 },
        { title: "The 400 Blows", year: 1959 },
        { title: "Jules and Jim", year: 1962 },
        { title: "Shoot the Piano Player", year: 1960 },
      ]},
      { connection: "Neo-noir films released in the 1990s", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Last Seduction", year: 1994 },
        { title: "Dark City", year: 1998 },
        { title: "U Turn", year: 1997 },
        { title: "One False Move", year: 1992 },
      ]},
      { connection: "Film titles that contain a number spelled out as a word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Three Colors: Red", year: 1994 },
        { title: "Four Weddings and a Funeral", year: 1994 },
        { title: "Seven Samurai", year: 1954 },
        { title: "Two for the Road", year: 1967 },
      ]},
    ],
  },
  // Puzzle 2
  {
    groups: [
      { connection: "Films directed by Yorgos Lanthimos", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Dogtooth", year: 2009 },
        { title: "The Lobster", year: 2015 },
        { title: "The Killing of a Sacred Deer", year: 2017 },
        { title: "The Favourite", year: 2018 },
      ]},
      { connection: "Body horror films", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Fly", year: 1986 },
        { title: "Videodrome", year: 1983 },
        { title: "Annihilation", year: 2018 },
        { title: "Titane", year: 2021 },
      ]},
      { connection: "Mumblecore films", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Funny Ha Ha", year: 2002 },
        { title: "The Puffy Chair", year: 2005 },
        { title: "Baghead", year: 2008 },
        { title: "Humpday", year: 2009 },
      ]},
      { connection: "Film titles phrased as a direct question to the viewer", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Who's Afraid of Virginia Woolf?", year: 1966 },
        { title: "What's Eating Gilbert Grape", year: 1993 },
        { title: "What's Up, Doc?", year: 1972 },
        { title: "Are We There Yet?", year: 2005 },
      ]},
    ],
  },
  // Puzzle 3
  {
    groups: [
      { connection: "Films released in 1968", connection_type: "decade", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "2001: A Space Odyssey", year: 1968 },
        { title: "Rosemary's Baby", year: 1968 },
        { title: "Planet of the Apes", year: 1968 },
        { title: "Night of the Living Dead", year: 1968 },
      ]},
      { connection: "Films directed by Céline Sciamma", connection_type: "director", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Water Lilies", year: 2007 },
        { title: "Tomboy", year: 2011 },
        { title: "Girlhood", year: 2014 },
        { title: "Portrait of a Lady on Fire", year: 2019 },
      ]},
      { connection: "Slow cinema films defined by minimal dialogue and extreme long takes", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Jeanne Dielman, 23 Commerce Quay, 1080 Brussels", year: 1975 },
        { title: "Nostalghia", year: 1983 },
        { title: "Uncle Boonmee Who Can Recall His Past Lives", year: 2010 },
        { title: "Cemetery of Splendour", year: 2015 },
      ]},
      { connection: "Film titles that contain a body part as a standalone word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Braveheart", year: 1995 },
        { title: "Footloose", year: 1984 },
        { title: "Kneecap", year: 2024 },
        { title: "Elbow Room", year: 1985 },
      ]},
    ],
  },
  // Puzzle 4
  {
    groups: [
      { connection: "Films directed by Lynne Ramsay", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Ratcatcher", year: 1999 },
        { title: "Morvern Callar", year: 2002 },
        { title: "We Need to Talk About Kevin", year: 2011 },
        { title: "You Were Never Really Here", year: 2017 },
      ]},
      { connection: "New Hollywood films of the early 1970s", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Last Picture Show", year: 1971 },
        { title: "Badlands", year: 1973 },
        { title: "McCabe and Mrs. Miller", year: 1971 },
        { title: "The Long Goodbye", year: 1973 },
      ]},
      { connection: "Dogme 95 certified films", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Celebration", year: 1998 },
        { title: "The Idiots", year: 1998 },
        { title: "Mifune", year: 1999 },
        { title: "Italian for Beginners", year: 2000 },
      ]},
      { connection: "Film titles that are a single surname with no other words", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Patton", year: 1970 },
        { title: "Zelig", year: 1983 },
        { title: "Nixon", year: 1995 },
        { title: "Serpico", year: 1973 },
      ]},
    ],
  },
  // Puzzle 5
  {
    groups: [
      { connection: "Films directed by Paul Thomas Anderson", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Boogie Nights", year: 1997 },
        { title: "Magnolia", year: 1999 },
        { title: "The Master", year: 2012 },
        { title: "Phantom Thread", year: 2017 },
      ]},
      { connection: "Heist films centered on women as the criminal leads", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Ocean's Eight", year: 2018 },
        { title: "Set It Off", year: 1996 },
        { title: "Widows", year: 2018 },
        { title: "Big Eyes", year: 2014 },
      ]},
      { connection: "Courtroom drama films where the verdict surprises the audience", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Primal Fear", year: 1996 },
        { title: "Witness for the Prosecution", year: 1957 },
        { title: "The Verdict", year: 1982 },
        { title: "Judgment at Nuremberg", year: 1961 },
      ]},
      { connection: "Film titles where every content word begins with the same letter", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Dirty Dancing", year: 1987 },
        { title: "Pretty in Pink", year: 1986 },
        { title: "Ferris Bueller's Day Off", year: 1986 },
        { title: "Wild Wild West", year: 1999 },
      ]},
    ],
  },
  // Puzzle 6
  {
    groups: [
      { connection: "Films released in 1994 that became cultural touchstones", connection_type: "decade", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Pulp Fiction", year: 1994 },
        { title: "The Shawshank Redemption", year: 1994 },
        { title: "Forrest Gump", year: 1994 },
        { title: "Léon: The Professional", year: 1994 },
      ]},
      { connection: "Films directed by Bong Joon-ho other than Parasite", connection_type: "director", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Memories of Murder", year: 2003 },
        { title: "The Host", year: 2006 },
        { title: "Mother", year: 2009 },
        { title: "Snowpiercer", year: 2013 },
      ]},
      { connection: "Italian Neorealist films", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Rome, Open City", year: 1945 },
        { title: "Bicycle Thieves", year: 1948 },
        { title: "Umberto D.", year: 1952 },
        { title: "La Terra Trema", year: 1948 },
      ]},
      { connection: "Film titles containing the word 'Silver' or 'Gold' referring to a colour not seen on screen", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Silver Linings Playbook", year: 2012 },
        { title: "Gold", year: 2016 },
        { title: "The Gold Rush", year: 1925 },
        { title: "Silver Bullet", year: 1985 },
      ]},
    ],
  },
  // Puzzle 7
  {
    groups: [
      { connection: "Films directed by Terrence Malick", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Days of Heaven", year: 1978 },
        { title: "The Thin Red Line", year: 1998 },
        { title: "The New World", year: 2005 },
        { title: "The Tree of Life", year: 2011 },
      ]},
      { connection: "Films set primarily in the rural American South featuring poverty and hardship", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Beasts of the Southern Wild", year: 2012 },
        { title: "Mud", year: 2012 },
        { title: "Winter's Bone", year: 2010 },
        { title: "Killer of Sheep", year: 1978 },
      ]},
      { connection: "Real-event mountain climbing and extreme survival documentary films", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Free Solo", year: 2018 },
        { title: "Touching the Void", year: 2003 },
        { title: "Man on Wire", year: 2008 },
        { title: "Meru", year: 2015 },
      ]},
      { connection: "Film titles structured as an imperative verb phrase beginning with a two-letter word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Go", year: 1999 },
        { title: "Be Kind Rewind", year: 2008 },
        { title: "Do the Right Thing", year: 1989 },
        { title: "Get Out", year: 2017 },
      ]},
    ],
  },
  // Puzzle 8
  {
    groups: [
      { connection: "Films released in the year 2000", connection_type: "decade", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Gladiator", year: 2000 },
        { title: "Requiem for a Dream", year: 2000 },
        { title: "Crouching Tiger, Hidden Dragon", year: 2000 },
        { title: "Almost Famous", year: 2000 },
      ]},
      { connection: "Films directed by Agnès Varda", connection_type: "director", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Cléo from 5 to 7", year: 1962 },
        { title: "Vagabond", year: 1985 },
        { title: "The Gleaners and I", year: 2000 },
        { title: "Faces Places", year: 2017 },
      ]},
      { connection: "Folk horror films set in isolated pagan communities", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Wicker Man", year: 1973 },
        { title: "Midsommar", year: 2019 },
        { title: "Kill List", year: 2011 },
        { title: "A Dark Song", year: 2016 },
      ]},
      { connection: "Film titles that contain a homophone of another common English word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Reel Steel", year: 2011 },
        { title: "Knives Out", year: 2019 },
        { title: "Knight and Day", year: 2010 },
        { title: "Reign of Fire", year: 2002 },
      ]},
    ],
  },
  // Puzzle 9
  {
    groups: [
      { connection: "Films directed by Claire Denis", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Beau Travail", year: 1999 },
        { title: "Trouble Every Day", year: 2001 },
        { title: "35 Shots of Rum", year: 2008 },
        { title: "Bastards", year: 2013 },
      ]},
      { connection: "Pre-Code Hollywood films from 1932 to 1934", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Baby Face", year: 1933 },
        { title: "I Am a Fugitive from a Chain Gang", year: 1932 },
        { title: "She Done Him Wrong", year: 1933 },
        { title: "Freaks", year: 1932 },
      ]},
      { connection: "Found footage horror films", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Blair Witch Project", year: 1999 },
        { title: "Cloverfield", year: 2008 },
        { title: "REC", year: 2007 },
        { title: "Paranormal Activity", year: 2007 },
      ]},
      { connection: "Film titles that are a well-known idiomatic phrase in English", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "No Country for Old Men", year: 2007 },
        { title: "Dead Ringer", year: 1964 },
        { title: "Bite the Bullet", year: 1975 },
        { title: "The Usual Suspects", year: 1995 },
      ]},
    ],
  },
  // Puzzle 10
  {
    groups: [
      { connection: "Films directed by Mike Leigh", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Secrets and Lies", year: 1996 },
        { title: "All or Nothing", year: 2002 },
        { title: "Happy-Go-Lucky", year: 2008 },
        { title: "Another Year", year: 2010 },
      ]},
      { connection: "European road movies", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Kings of the Road", year: 1976 },
        { title: "The Motorcycle Diaries", year: 2004 },
        { title: "Land Ho!", year: 2014 },
        { title: "Certified Copy", year: 2010 },
      ]},
      { connection: "Films released in 2011 that won the Cannes Palme d'Or or Grand Prix", connection_type: "decade", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Artist", year: 2011 },
        { title: "The Tree of Life", year: 2011 },
        { title: "Drive", year: 2011 },
        { title: "Polisse", year: 2011 },
      ]},
      { connection: "Film titles consisting only of a single letter or short acronym", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "M", year: 1931 },
        { title: "W.", year: 2008 },
        { title: "F/X", year: 1986 },
        { title: "A.I. Artificial Intelligence", year: 2001 },
      ]},
    ],
  },
  // Puzzle 11
  {
    groups: [
      { connection: "Films directed by Andrea Arnold", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Red Road", year: 2006 },
        { title: "Fish Tank", year: 2009 },
        { title: "Wuthering Heights", year: 2011 },
        { title: "American Honey", year: 2016 },
      ]},
      { connection: "Latin American films rooted in magical realism", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Like Water for Chocolate", year: 1992 },
        { title: "Y Tu Mamá También", year: 2001 },
        { title: "Pan's Labyrinth", year: 2006 },
        { title: "Roma", year: 2018 },
      ]},
      { connection: "Grindhouse exploitation films later reclaimed as feminist texts", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Faster, Pussycat! Kill! Kill!", year: 1965 },
        { title: "Coffy", year: 1973 },
        { title: "Ms. 45", year: 1981 },
        { title: "I Spit on Your Grave", year: 1978 },
      ]},
      { connection: "Film titles that are imperative commands beginning with 'Don't' or 'Stop'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Don't Look Now", year: 1973 },
        { title: "Stop Making Sense", year: 1984 },
        { title: "Don't Look Up", year: 2021 },
        { title: "Don't Breathe", year: 2016 },
      ]},
    ],
  },
  // Puzzle 12
  {
    groups: [
      { connection: "Films directed by Michael Haneke", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Funny Games", year: 1997 },
        { title: "The Piano Teacher", year: 2001 },
        { title: "Caché", year: 2005 },
        { title: "Amour", year: 2012 },
      ]},
      { connection: "Science fiction films from the 1980s not set on Earth", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Thing", year: 1982 },
        { title: "Aliens", year: 1986 },
        { title: "Enemy Mine", year: 1985 },
        { title: "Outland", year: 1981 },
      ]},
      { connection: "Mockumentary comedies", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "This Is Spinal Tap", year: 1984 },
        { title: "Best in Show", year: 2000 },
        { title: "A Mighty Wind", year: 2003 },
        { title: "Man Bites Dog", year: 1992 },
      ]},
      { connection: "Film titles where the title word doubles as a percussion or impact sound", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Whiplash", year: 2014 },
        { title: "Crash", year: 2004 },
        { title: "Bang", year: 1995 },
        { title: "Clang", year: 2016 },
      ]},
    ],
  },
  // Puzzle 13
  {
    groups: [
      { connection: "Films directed by Werner Herzog", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Aguirre, the Wrath of God", year: 1972 },
        { title: "Nosferatu the Vampyre", year: 1979 },
        { title: "Fitzcarraldo", year: 1982 },
        { title: "Grizzly Man", year: 2005 },
      ]},
      { connection: "Blaxploitation films of the early 1970s", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Shaft", year: 1971 },
        { title: "Super Fly", year: 1972 },
        { title: "Cleopatra Jones", year: 1973 },
        { title: "Truck Turner", year: 1974 },
      ]},
      { connection: "Science fiction films where language or communication is the central mystery", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Arrival", year: 2016 },
        { title: "Dune", year: 1984 },
        { title: "Contact", year: 1997 },
        { title: "The Day the Earth Stood Still", year: 1951 },
      ]},
      { connection: "Film titles that begin with a colour and end with a number", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Green Room", year: 2015 },
        { title: "Blue Is the Warmest Colour", year: 2013 },
        { title: "Red Eye", year: 2005 },
        { title: "White Noise", year: 2022 },
      ]},
    ],
  },
  // Puzzle 14
  {
    groups: [
      { connection: "Films directed by John Cassavetes", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Shadows", year: 1958 },
        { title: "Faces", year: 1968 },
        { title: "A Woman Under the Influence", year: 1974 },
        { title: "The Killing of a Chinese Bookie", year: 1976 },
      ]},
      { connection: "Sundance indie breakout films from the early 1990s", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "sex, lies, and videotape", year: 1989 },
        { title: "Slacker", year: 1990 },
        { title: "Clerks", year: 1994 },
        { title: "Safe", year: 1995 },
      ]},
      { connection: "Biographical sports films focused on a single controversial athlete", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Raging Bull", year: 1980 },
        { title: "The Wrestler", year: 2008 },
        { title: "I, Tonya", year: 2017 },
        { title: "Foxcatcher", year: 2014 },
      ]},
      { connection: "Film titles where 'The' is followed immediately by a gerund (-ing word)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Shining", year: 1980 },
        { title: "The Happening", year: 2008 },
        { title: "The Killing", year: 1956 },
        { title: "The Missing", year: 2003 },
      ]},
    ],
  },
  // Puzzle 15
  {
    groups: [
      { connection: "Films directed by Hou Hsiao-hsien", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A City of Sadness", year: 1989 },
        { title: "The Puppetmaster", year: 1993 },
        { title: "Flowers of Shanghai", year: 1998 },
        { title: "Three Times", year: 2005 },
      ]},
      { connection: "Iranian New Wave films directed by Abbas Kiarostami", connection_type: "director", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Close-Up", year: 1990 },
        { title: "Taste of Cherry", year: 1997 },
        { title: "The Wind Will Carry Us", year: 1999 },
        { title: "Ten", year: 2002 },
      ]},
      { connection: "Feminist science fiction films from the 2010s with female protagonists facing existential threat", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Under the Skin", year: 2013 },
        { title: "Ex Machina", year: 2014 },
        { title: "Advantageous", year: 2015 },
        { title: "Prospect", year: 2018 },
      ]},
      { connection: "Film titles that are also a verb meaning 'to wager or bet'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Rounders", year: 1998 },
        { title: "Croupier", year: 1998 },
        { title: "The Cincinnati Kid", year: 1965 },
        { title: "Maverick", year: 1994 },
      ]},
    ],
  },
  // Puzzle 16
  {
    groups: [
      { connection: "Films directed by Ari Aster", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Hereditary", year: 2018 },
        { title: "Midsommar", year: 2019 },
        { title: "Beau Is Afraid", year: 2023 },
        { title: "The Strange Thing About the Johnsons", year: 2011 },
      ]},
      { connection: "Films released in 1974", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Chinatown", year: 1974 },
        { title: "The Godfather Part II", year: 1974 },
        { title: "Blazing Saddles", year: 1974 },
        { title: "Bring Me the Head of Alfredo Garcia", year: 1974 },
      ]},
      { connection: "Films told from the perspective of a woman wrongfully imprisoned", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Caged", year: 1950 },
        { title: "Monster", year: 2003 },
        { title: "Swallow", year: 2019 },
        { title: "The Accused", year: 1988 },
      ]},
      { connection: "Film titles that contain a punctuation mark embedded in or replacing a letter", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Se7en", year: 1995 },
        { title: "S1m0ne", year: 2002 },
        { title: "M*A*S*H", year: 1970 },
        { title: "THX 1138", year: 1971 },
      ]},
    ],
  },
  // Puzzle 17
  {
    groups: [
      { connection: "Films directed by Joanna Hogg", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Unrelated", year: 2007 },
        { title: "Archipelago", year: 2010 },
        { title: "Exhibition", year: 2013 },
        { title: "The Souvenir", year: 2019 },
      ]},
      { connection: "Taiwanese New Cinema movement films from the 1980s", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Boys from Fengkuei", year: 1983 },
        { title: "A Summer at Grandpa's", year: 1984 },
        { title: "Terrorizers", year: 1986 },
        { title: "Rebels of the Neon God", year: 1992 },
      ]},
      { connection: "Spaghetti Westerns directed by Sergio Leone", connection_type: "director", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "A Fistful of Dollars", year: 1964 },
        { title: "For a Few Dollars More", year: 1965 },
        { title: "Once Upon a Time in the West", year: 1968 },
        { title: "Duck, You Sucker", year: 1971 },
      ]},
      { connection: "Film titles that are a phrase or idiom associated with forgetting or remembering", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Memento", year: 2000 },
        { title: "Remember Me", year: 2010 },
        { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
        { title: "Total Recall", year: 1990 },
      ]},
    ],
  },
  // Puzzle 18
  {
    groups: [
      { connection: "Films directed by Robert Altman", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Nashville", year: 1975 },
        { title: "Short Cuts", year: 1993 },
        { title: "Gosford Park", year: 2001 },
        { title: "The Player", year: 1992 },
      ]},
      { connection: "Films from the New Romanian Cinema of the 2000s", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Death of Mr. Lazarescu", year: 2005 },
        { title: "4 Months, 3 Weeks and 2 Days", year: 2007 },
        { title: "Police, Adjective", year: 2009 },
        { title: "Child's Pose", year: 2013 },
      ]},
      { connection: "Cold War espionage thrillers set in divided Berlin", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Lives of Others", year: 2006 },
        { title: "The Spy Who Came in from the Cold", year: 1965 },
        { title: "Funeral in Berlin", year: 1966 },
        { title: "The Quiller Memorandum", year: 1966 },
      ]},
      { connection: "Film titles that begin and end with the exact same letter", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Tenet", year: 2020 },
        { title: "Elle", year: 2016 },
        { title: "Alive", year: 1993 },
        { title: "Entrapment", year: 1999 },
      ]},
    ],
  },
  // Puzzle 19
  {
    groups: [
      { connection: "Films directed by Park Chan-wook", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Sympathy for Mr. Vengeance", year: 2002 },
        { title: "Oldboy", year: 2003 },
        { title: "Lady Vengeance", year: 2005 },
        { title: "The Handmaiden", year: 2016 },
      ]},
      { connection: "Films released in 1987 that defined the blockbuster era", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Full Metal Jacket", year: 1987 },
        { title: "Predator", year: 1987 },
        { title: "RoboCop", year: 1987 },
        { title: "The Princess Bride", year: 1987 },
      ]},
      { connection: "Films where enclosed architecture functions as a psychological trap", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Shining", year: 1980 },
        { title: "High-Rise", year: 2015 },
        { title: "Possessor", year: 2020 },
        { title: "Coherence", year: 2013 },
      ]},
      { connection: "Film titles that are also the clinical name of a medical phobia", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Vertigo", year: 1958 },
        { title: "Arachnophobia", year: 1990 },
        { title: "Misophonia", year: 2022 },
        { title: "Claustrophobia", year: 2003 },
      ]},
    ],
  },
  // Puzzle 20
  {
    groups: [
      { connection: "Films directed by Jean-Pierre and Luc Dardenne", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Rosetta", year: 1999 },
        { title: "The Son", year: 2002 },
        { title: "The Child", year: 2005 },
        { title: "Two Days, One Night", year: 2014 },
      ]},
      { connection: "Films released in 2003 that became critical classics", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Lost in Translation", year: 2003 },
        { title: "Elephant", year: 2003 },
        { title: "Mystic River", year: 2003 },
        { title: "28 Days Later", year: 2002 },
      ]},
      { connection: "Inner-city coming-of-age films set in American housing projects", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Boyz n the Hood", year: 1991 },
        { title: "Menace II Society", year: 1993 },
        { title: "Juice", year: 1992 },
        { title: "Sugar Hill", year: 1994 },
      ]},
      { connection: "Film titles that are also a type of architectural or civil engineering structure", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Bridge", year: 2006 },
        { title: "The Wall", year: 1982 },
        { title: "The Tower", year: 2012 },
        { title: "The Dam", year: 2019 },
      ]},
    ],
  },
  // Puzzle 21
  {
    groups: [
      { connection: "Films directed by Wong Kar-wai", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Chungking Express", year: 1994 },
        { title: "Happy Together", year: 1997 },
        { title: "In the Mood for Love", year: 2000 },
        { title: "2046", year: 2004 },
      ]},
      { connection: "Films released in 1981", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Raiders of the Lost Ark", year: 1981 },
        { title: "An American Werewolf in London", year: 1981 },
        { title: "Das Boot", year: 1981 },
        { title: "Escape from New York", year: 1981 },
      ]},
      { connection: "Real-story prison escape films", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Papillon", year: 1973 },
        { title: "The Great Escape", year: 1963 },
        { title: "Escape from Alcatraz", year: 1979 },
        { title: "Midnight Express", year: 1978 },
      ]},
      { connection: "Film titles where the word 'Last' appears and refers to finality rather than order", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Last Picture Show", year: 1971 },
        { title: "Last Tango in Paris", year: 1972 },
        { title: "The Last Temptation of Christ", year: 1988 },
        { title: "Last Days", year: 2005 },
      ]},
    ],
  },
  // Puzzle 22
  {
    groups: [
      { connection: "Films directed by Apichatpong Weerasethakul", connection_type: "director", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Blissfully Yours", year: 2002 },
        { title: "Tropical Malady", year: 2004 },
        { title: "Syndromes and a Century", year: 2006 },
        { title: "Uncle Boonmee Who Can Recall His Past Lives", year: 2010 },
      ]},
      { connection: "Slasher films that defined the horror genre in the late 1970s and early 1980s", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Halloween", year: 1978 },
        { title: "Friday the 13th", year: 1980 },
        { title: "A Nightmare on Elm Street", year: 1984 },
        { title: "The Texas Chain Saw Massacre", year: 1974 },
      ]},
      { connection: "Pre-Code Hollywood melodramas with transgressive female protagonists", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Baby Face", year: 1933 },
        { title: "She Done Him Wrong", year: 1933 },
        { title: "Virtue", year: 1932 },
        { title: "Three on a Honeymoon", year: 1935 },
      ]},
      { connection: "Film titles that contain a word meaning 'genuine' or 'authentic' used ironically", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "True Lies", year: 1994 },
        { title: "True Grit", year: 2010 },
        { title: "True Romance", year: 1993 },
        { title: "True Story", year: 2015 },
      ]},
    ],
  },
  // Puzzle 23
  {
    groups: [
      { connection: "Tilda Swinton films", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Orlando", year: 1992 },
        { title: "Michael Clayton", year: 2007 },
        { title: "We Need to Talk About Kevin", year: 2011 },
        { title: "Okja", year: 2017 },
      ]},
      { connection: "Films about grief after the sudden loss of a child", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Manchester by the Sea", year: 2016 },
        { title: "Rabbit Hole", year: 2010 },
        { title: "Ordinary People", year: 1980 },
        { title: "Collateral Beauty", year: 2016 },
      ]},
      { connection: "Films set almost entirely in a single hotel", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Shining", year: 1980 },
        { title: "Lost in Translation", year: 2003 },
        { title: "Four Rooms", year: 1995 },
        { title: "The Grand Budapest Hotel", year: 2014 },
      ]},
      { connection: "Titles containing a weather phenomenon", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Twister", year: 1996 },
        { title: "Hail, Caesar!", year: 2016 },
        { title: "Fog of War", year: 2003 },
        { title: "Thunder Road", year: 2018 },
      ]},
    ],
  },
  // Puzzle 24
  {
    groups: [
      { connection: "Toni Collette films", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Sixth Sense", year: 1999 },
        { title: "Muriel's Wedding", year: 1994 },
        { title: "Hereditary", year: 2018 },
        { title: "Little Miss Sunshine", year: 2006 },
      ]},
      { connection: "Films where the heist goes catastrophically wrong", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Fargo", year: 1996 },
        { title: "Reservoir Dogs", year: 1992 },
        { title: "Hell or High Water", year: 2016 },
        { title: "Killing Zoe", year: 1993 },
      ]},
      { connection: "Films set primarily in a desert landscape with survival stakes", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Dune", year: 2021 },
        { title: "Lawrence of Arabia", year: 1962 },
        { title: "Lone Survivor", year: 2013 },
        { title: "Bagdad Cafe", year: 1987 },
      ]},
      { connection: "Titles that are also place names but the film is set elsewhere", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Casablanca", year: 1942 },
        { title: "Chinatown", year: 1974 },
        { title: "Brazil", year: 1985 },
        { title: "Siberia", year: 2018 },
      ]},
    ],
  },
  // Puzzle 25
  {
    groups: [
      { connection: "Mahershala Ali films", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Moonlight", year: 2016 },
        { title: "Green Book", year: 2018 },
        { title: "Alita: Battle Angel", year: 2019 },
        { title: "The Place Beyond the Pines", year: 2012 },
      ]},
      { connection: "Films driven by a protagonist's quest for justice against a corrupt system", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Three Billboards Outside Ebbing, Missouri", year: 2017 },
        { title: "Prisoners", year: 2013 },
        { title: "Wind River", year: 2017 },
        { title: "Mystic River", year: 2003 },
      ]},
      { connection: "Films set entirely during a single snowstorm", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Hateful Eight", year: 2015 },
        { title: "30 Days of Night", year: 2007 },
        { title: "Misery", year: 1990 },
        { title: "Avalanche", year: 1978 },
      ]},
      { connection: "Titles starting with 'The Last'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Last Samurai", year: 2003 },
        { title: "The Last King of Scotland", year: 2006 },
        { title: "The Last Duel", year: 2021 },
        { title: "The Last Picture Show", year: 1971 },
      ]},
    ],
  },
  // Puzzle 26
  {
    groups: [
      { connection: "Florence Pugh films", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Midsommar", year: 2019 },
        { title: "Little Women", year: 2019 },
        { title: "Black Widow", year: 2021 },
        { title: "Lady Macbeth", year: 2016 },
      ]},
      { connection: "Films about coming-of-age during a transformative summer", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Stand by Me", year: 1986 },
        { title: "Moonrise Kingdom", year: 2012 },
        { title: "Superbad", year: 2007 },
        { title: "The Kings of Summer", year: 2013 },
      ]},
      { connection: "Films confined to a single room for nearly the entire runtime", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "12 Angry Men", year: 1957 },
        { title: "Rope", year: 1948 },
        { title: "Room", year: 2015 },
        { title: "Carnage", year: 2011 },
      ]},
      { connection: "Titles that are written-out cardinal numbers", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Seven", year: 1995 },
        { title: "Twelve", year: 2010 },
        { title: "Nine", year: 2009 },
        { title: "Thirteen", year: 2003 },
      ]},
    ],
  },
  // Puzzle 27
  {
    groups: [
      { connection: "Oscar Isaac films", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Ex Machina", year: 2014 },
        { title: "Inside Llewyn Davis", year: 2013 },
        { title: "A Most Violent Year", year: 2014 },
        { title: "Triple Frontier", year: 2019 },
      ]},
      { connection: "Films exploring doppelgangers and fractured identity", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Enemy", year: 2013 },
        { title: "Us", year: 2019 },
        { title: "Black Swan", year: 2010 },
        { title: "The Double", year: 2013 },
      ]},
      { connection: "Films set in outer space with no clear rescue possible", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Gravity", year: 2013 },
        { title: "Life", year: 2017 },
        { title: "Ad Astra", year: 2019 },
        { title: "The Martian", year: 2015 },
      ]},
      { connection: "Titles containing a number written as a digit", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "2001: A Space Odyssey", year: 1968 },
        { title: "1917", year: 2019 },
        { title: "127 Hours", year: 2010 },
        { title: "500 Days of Summer", year: 2009 },
      ]},
    ],
  },
  // Puzzle 28
  {
    groups: [
      { connection: "Frances McDormand films", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Fargo", year: 1996 },
        { title: "Nomadland", year: 2020 },
        { title: "Burn After Reading", year: 2008 },
        { title: "Three Billboards Outside Ebbing, Missouri", year: 2017 },
      ]},
      { connection: "Films following characters on slow, solitary journeys of self-reckoning", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Wild", year: 2014 },
        { title: "The Straight Story", year: 1999 },
        { title: "Nebraska", year: 2013 },
        { title: "About Schmidt", year: 2002 },
      ]},
      { connection: "Single-location thrillers set entirely indoors", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Phone Booth", year: 2002 },
        { title: "Buried", year: 2010 },
        { title: "Locke", year: 2013 },
        { title: "The Man from Earth", year: 2007 },
      ]},
      { connection: "Titles that are also a person's full name (first and last)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Erin Brockovich", year: 2000 },
        { title: "Edward Scissorhands", year: 1990 },
        { title: "Forrest Gump", year: 1994 },
        { title: "Donnie Darko", year: 2001 },
      ]},
    ],
  },
  // Puzzle 29
  {
    groups: [
      { connection: "Tilda Swinton films where she plays a villain or antagonist", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Chronicles of Narnia: The Lion, the Witch and the Wardrobe", year: 2005 },
        { title: "Snowpiercer", year: 2013 },
        { title: "Doctor Strange", year: 2016 },
        { title: "We Need to Talk About Kevin", year: 2011 },
      ]},
      { connection: "Films about a character trapped in a time loop who must break the cycle", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Edge of Tomorrow", year: 2014 },
        { title: "Happy Death Day", year: 2017 },
        { title: "Palm Springs", year: 2020 },
        { title: "Source Code", year: 2011 },
      ]},
      { connection: "Films set during one continuous night in a city", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Collateral", year: 2004 },
        { title: "Nick and Norah's Infinite Playlist", year: 2008 },
        { title: "After Hours", year: 1985 },
        { title: "Go", year: 1999 },
      ]},
      { connection: "Titles that are a single imperative verb", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Run", year: 2020 },
        { title: "Flee", year: 2021 },
        { title: "Crawl", year: 2019 },
        { title: "Upgrade", year: 2018 },
      ]},
    ],
  },
  // Puzzle 30
  {
    groups: [
      { connection: "Oscar Isaac films where he plays a musician", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Inside Llewyn Davis", year: 2013 },
        { title: "Show Me a Hero", year: 2015 },
        { title: "The Card Counter", year: 2021 },
        { title: "Annihilation", year: 2018 },
      ]},
      { connection: "Films where revenge consumes and ultimately destroys the protagonist", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Oldboy", year: 2003 },
        { title: "Blue Ruin", year: 2013 },
        { title: "I Saw the Devil", year: 2010 },
        { title: "Promising Young Woman", year: 2020 },
      ]},
      { connection: "Films set in space that focus on psychological isolation rather than action", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Moon", year: 2009 },
        { title: "High Life", year: 2018 },
        { title: "Sunshine", year: 2007 },
        { title: "Approaching the Unknown", year: 2016 },
      ]},
      { connection: "Titles containing a shade of red", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Crimson Tide", year: 1995 },
        { title: "Scarlet Street", year: 1945 },
        { title: "The Pink Panther", year: 1963 },
        { title: "Rose", year: 2005 },
      ]},
    ],
  },
  // Puzzle 31
  {
    groups: [
      { connection: "Mahershala Ali films where he plays a mentor figure", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Moonlight", year: 2016 },
        { title: "Green Book", year: 2018 },
        { title: "Swan Song", year: 2021 },
        { title: "The Place Beyond the Pines", year: 2012 },
      ]},
      { connection: "Films about characters who discover they are not who they thought they were", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Truman Show", year: 1998 },
        { title: "Changeling", year: 2008 },
        { title: "Shutter Island", year: 2010 },
        { title: "Arrival", year: 2016 },
      ]},
      { connection: "Films set entirely within a moving vehicle", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Locke", year: 2013 },
        { title: "Speed", year: 1994 },
        { title: "Unstoppable", year: 2010 },
        { title: "The Commuter", year: 2018 },
      ]},
      { connection: "Titles that are two-word phrases where both words are nouns", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Snake Eyes", year: 1998 },
        { title: "Road House", year: 1989 },
        { title: "Star Wars", year: 1977 },
        { title: "Blood Diamond", year: 2006 },
      ]},
    ],
  },
  // Puzzle 32
  {
    groups: [
      { connection: "Florence Pugh films where she plays a woman in a male-dominated world", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Fighting with My Family", year: 2019 },
        { title: "Oppenheimer", year: 2023 },
        { title: "Lady Macbeth", year: 2016 },
        { title: "The Wonder", year: 2022 },
      ]},
      { connection: "Films about grief that use the supernatural as a metaphor", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Ghost Story", year: 2017 },
        { title: "Hereditary", year: 2018 },
        { title: "The Babadook", year: 2014 },
        { title: "Midsommar", year: 2019 },
      ]},
      { connection: "Films set in a snowbound or frozen environment where survival is at stake", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Revenant", year: 2015 },
        { title: "Alive", year: 1993 },
        { title: "Snowpiercer", year: 2013 },
        { title: "The Grey", year: 2011 },
      ]},
      { connection: "Titles that are a single adjective only", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Unforgiven", year: 1992 },
        { title: "Notorious", year: 1946 },
        { title: "Irreversible", year: 2002 },
        { title: "Unbreakable", year: 2000 },
      ]},
    ],
  },
  // Puzzle 33
  {
    groups: [
      { connection: "Frances McDormand films directed by Joel or Ethan Coen", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Blood Simple", year: 1984 },
        { title: "Raising Arizona", year: 1987 },
        { title: "Fargo", year: 1996 },
        { title: "The Man Who Wasn't There", year: 2001 },
      ]},
      { connection: "Films about characters who must confront their past on a long journey home", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Straight Story", year: 1999 },
        { title: "The Way", year: 2010 },
        { title: "Into the Wild", year: 2007 },
        { title: "Paris, Texas", year: 1984 },
      ]},
      { connection: "Films set in a single building over one continuous night", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Clue", year: 1985 },
        { title: "The House on Haunted Hill", year: 1959 },
        { title: "Identity", year: 2003 },
        { title: "The Midnight After", year: 2014 },
      ]},
      { connection: "Titles that are a possessive phrase (with apostrophe-s) ending in a proper name", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Schindler's List", year: 1993 },
        { title: "Sophie's Choice", year: 1982 },
        { title: "Bridget Jones's Diary", year: 2001 },
        { title: "Smilla's Sense of Snow", year: 1997 },
      ]},
    ],
  },
  // Puzzle 34
  {
    groups: [
      { connection: "Toni Collette films where she plays a character harboring a dark secret", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "About a Boy", year: 2002 },
        { title: "Knives Out", year: 2019 },
        { title: "The Sixth Sense", year: 1999 },
        { title: "Hereditary", year: 2018 },
      ]},
      { connection: "Films where the protagonist is a con artist who falls for their mark", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Dirty Rotten Scoundrels", year: 1988 },
        { title: "Heartbreakers", year: 2001 },
        { title: "I Love You Phillip Morris", year: 2009 },
        { title: "The Hustle", year: 2019 },
      ]},
      { connection: "Films set primarily in a hotel where the hotel itself becomes a trap", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "1408", year: 2007 },
        { title: "Identity", year: 2003 },
        { title: "Barton Fink", year: 1991 },
        { title: "The Innkeepers", year: 2011 },
      ]},
      { connection: "Titles that contain an ordinal number", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "First Blood", year: 1982 },
        { title: "The Third Man", year: 1949 },
        { title: "First Man", year: 2018 },
        { title: "Second Act", year: 2018 },
      ]},
    ],
  },
  // Puzzle 35
  {
    groups: [
      { connection: "Mahershala Ali films where he plays a morally complex figure navigating race", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Moonlight", year: 2016 },
        { title: "Green Book", year: 2018 },
        { title: "Passing", year: 2021 },
        { title: "Swan Song", year: 2021 },
      ]},
      { connection: "Films about a heist planned with obsessive precision that still unravels", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Heat", year: 1995 },
        { title: "Inside Man", year: 2006 },
        { title: "The Town", year: 2010 },
        { title: "The Italian Job", year: 2003 },
      ]},
      { connection: "Films set entirely during a blizzard that cuts characters off from the outside world", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Hateful Eight", year: 2015 },
        { title: "Wind River", year: 2017 },
        { title: "Smilla's Sense of Snow", year: 1997 },
        { title: "Storm of the Century", year: 1999 },
      ]},
      { connection: "Titles that contain a compass direction", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "North by Northwest", year: 1959 },
        { title: "East of Eden", year: 1955 },
        { title: "True North", year: 2006 },
        { title: "Southern Comfort", year: 1981 },
      ]},
    ],
  },
  // Puzzle 36
  {
    groups: [
      { connection: "Florence Pugh films that are period pieces set before 1900", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Little Women", year: 2019 },
        { title: "Lady Macbeth", year: 2016 },
        { title: "The Wonder", year: 2022 },
        { title: "Outlaw King", year: 2018 },
      ]},
      { connection: "Films about a woman who refuses to be silenced by those in power", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Norma Rae", year: 1979 },
        { title: "Silkwood", year: 1983 },
        { title: "North Country", year: 2005 },
        { title: "Bombshell", year: 2019 },
      ]},
      { connection: "Films set in a single outdoor location from which characters cannot escape", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "127 Hours", year: 2010 },
        { title: "The Shallows", year: 2016 },
        { title: "Open Water", year: 2003 },
        { title: "The Edge", year: 1997 },
      ]},
      { connection: "Titles where the first word is a preposition", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Into the Wild", year: 2007 },
        { title: "From Dusk Till Dawn", year: 1996 },
        { title: "Against All Odds", year: 1984 },
        { title: "Before Sunset", year: 2004 },
      ]},
    ],
  },
  // Puzzle 37
  {
    groups: [
      { connection: "Oscar Isaac films directed by the Coen Brothers", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Inside Llewyn Davis", year: 2013 },
        { title: "True Grit", year: 2010 },
        { title: "No Country for Old Men", year: 2007 },
        { title: "A Serious Man", year: 2009 },
      ]},
      { connection: "Films about a long-buried trauma that resurfaces to destroy a family", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hereditary", year: 2018 },
        { title: "August: Osage County", year: 2013 },
        { title: "Ordinary People", year: 1980 },
        { title: "The Savages", year: 2007 },
      ]},
      { connection: "Films set in a single bar or pub where the real drama unfolds offstage", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Guard", year: 2011 },
        { title: "Barfly", year: 1987 },
        { title: "Factotum", year: 2005 },
        { title: "Last Orders", year: 2001 },
      ]},
      { connection: "Titles that are phrased as a question (with or without the question mark)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Who's Afraid of Virginia Woolf?", year: 1966 },
        { title: "Are We There Yet?", year: 2005 },
        { title: "What's Eating Gilbert Grape", year: 1993 },
        { title: "Who Am I", year: 2014 },
      ]},
    ],
  },
  // Puzzle 38
  {
    groups: [
      { connection: "Tilda Swinton films directed by Bong Joon-ho or Jim Jarmusch", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Snowpiercer", year: 2013 },
        { title: "Okja", year: 2017 },
        { title: "Only Lovers Left Alive", year: 2013 },
        { title: "Broken Flowers", year: 2005 },
      ]},
      { connection: "Films about a character who can see visions of the future but cannot stop tragedy", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Minority Report", year: 2002 },
        { title: "Donnie Darko", year: 2001 },
        { title: "Final Destination", year: 2000 },
        { title: "Next", year: 2007 },
      ]},
      { connection: "Films where the thriller unfolds entirely in one apartment", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Rear Window", year: 1954 },
        { title: "Rosemary's Baby", year: 1968 },
        { title: "The Tenant", year: 1976 },
        { title: "Sliver", year: 1993 },
      ]},
      { connection: "Titles that contain the word 'Blue' used metaphorically", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Blue Valentine", year: 2010 },
        { title: "Blue Velvet", year: 1986 },
        { title: "Blue Ruin", year: 2013 },
        { title: "Blue Jasmine", year: 2013 },
      ]},
    ],
  },
  // Puzzle 39
  {
    groups: [
      { connection: "Frances McDormand films where she plays a determined working-class American woman", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Fargo", year: 1996 },
        { title: "Nomadland", year: 2020 },
        { title: "North Country", year: 2005 },
        { title: "Laurel Canyon", year: 2002 },
      ]},
      { connection: "Films about characters who retreat from society to live entirely off the grid", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Into the Wild", year: 2007 },
        { title: "Captain Fantastic", year: 2016 },
        { title: "Leave No Trace", year: 2018 },
        { title: "Hunt for the Wilderpeople", year: 2016 },
      ]},
      { connection: "Films set during a single night where dawn represents safety or salvation", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "From Dusk Till Dawn", year: 1996 },
        { title: "An American Werewolf in London", year: 1981 },
        { title: "Night of the Living Dead", year: 1968 },
        { title: "30 Days of Night", year: 2007 },
      ]},
      { connection: "Titles that contain a synonym for 'cold' or 'frozen'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Ice Age", year: 2002 },
        { title: "Chill Factor", year: 1999 },
        { title: "Arctic", year: 2018 },
        { title: "Cold Mountain", year: 2003 },
      ]},
    ],
  },
  // Puzzle 40
  {
    groups: [
      { connection: "Toni Collette films in the horror or psychological thriller genre", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Hereditary", year: 2018 },
        { title: "The Sixth Sense", year: 1999 },
        { title: "Knives Out", year: 2019 },
        { title: "Krampus", year: 2015 },
      ]},
      { connection: "Films about an obsessive artist driven to self-destruction in pursuit of perfection", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Black Swan", year: 2010 },
        { title: "Whiplash", year: 2014 },
        { title: "Florence Foster Jenkins", year: 2016 },
        { title: "Shine", year: 1996 },
      ]},
      { connection: "Films set in space that subvert the heroic astronaut myth", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Alien", year: 1979 },
        { title: "Event Horizon", year: 1997 },
        { title: "Solaris", year: 2002 },
        { title: "Europa Report", year: 2013 },
      ]},
      { connection: "Titles that are a city name plus one other word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "London Boulevard", year: 2010 },
        { title: "Dallas Buyers Club", year: 2013 },
        { title: "Tokyo Story", year: 1953 },
        { title: "Vienna Blood", year: 2019 },
      ]},
    ],
  },
  // Puzzle 41
  {
    groups: [
      { connection: "Mahershala Ali films where he plays a complex father or father figure", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Moonlight", year: 2016 },
        { title: "Swan Song", year: 2021 },
        { title: "Passing", year: 2021 },
        { title: "The Place Beyond the Pines", year: 2012 },
      ]},
      { connection: "Films about a protagonist who discovers the world they know is artificial or constructed", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Truman Show", year: 1998 },
        { title: "Dark City", year: 1998 },
        { title: "The Matrix", year: 1999 },
        { title: "Pleasantville", year: 1998 },
      ]},
      { connection: "Films set entirely in one enclosed indoor space where strangers are trapped together", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Cube", year: 1997 },
        { title: "Exam", year: 2009 },
        { title: "The Belko Experiment", year: 2016 },
        { title: "Circle", year: 2015 },
      ]},
      { connection: "Titles where every content word begins with the same letter", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Mad Max", year: 1979 },
        { title: "Peeping Tom", year: 1960 },
        { title: "Billy Budd", year: 1962 },
        { title: "Sexy Beast", year: 2000 },
      ]},
    ],
  },
  // Puzzle 42
  {
    groups: [
      { connection: "Oscar Isaac films where he plays a criminal or outlaw", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Triple Frontier", year: 2019 },
        { title: "The Card Counter", year: 2021 },
        { title: "A Most Violent Year", year: 2014 },
        { title: "Drive", year: 2011 },
      ]},
      { connection: "Films about characters who must survive the night against a relentless pursuer", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "It Follows", year: 2014 },
        { title: "The Terminator", year: 1984 },
        { title: "Duel", year: 1971 },
        { title: "The Hitcher", year: 1986 },
      ]},
      { connection: "Films set in a desert where characters face moral rather than physical peril", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Sicario", year: 2015 },
        { title: "No Country for Old Men", year: 2007 },
        { title: "Blood Simple", year: 1984 },
        { title: "Lone Star", year: 1996 },
      ]},
      { connection: "Titles that begin with the definite article followed by a gerund", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Shining", year: 1980 },
        { title: "The Happening", year: 2008 },
        { title: "The Killing", year: 1956 },
        { title: "The Haunting", year: 1963 },
      ]},
    ],
  },
  // Puzzle 43
  {
    groups: [
      { connection: "Tilda Swinton films where she plays a vampire or immortal being", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Only Lovers Left Alive", year: 2013 },
        { title: "Orlando", year: 1992 },
        { title: "Constantine", year: 2005 },
        { title: "The Beach", year: 2000 },
      ]},
      { connection: "Films about an unlikely duo forced together on a journey who come to understand each other", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Rain Man", year: 1988 },
        { title: "Planes, Trains and Automobiles", year: 1987 },
        { title: "Midnight Run", year: 1988 },
        { title: "The Intouchables", year: 2011 },
      ]},
      { connection: "Films set in an isolated location where paranoia tears a group apart", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Thing", year: 1982 },
        { title: "The Hateful Eight", year: 2015 },
        { title: "Coherence", year: 2013 },
        { title: "Annihilation", year: 2018 },
      ]},
      { connection: "Titles that are a two-word phrase where the second word is 'Runner' or 'Running'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Blade Runner", year: 1982 },
        { title: "Kite Runner", year: 2007 },
        { title: "Logan's Run", year: 1976 },
        { title: "Road Runner", year: 1949 },
      ]},
    ],
  },
  // Puzzle 44
  {
    groups: [
      { connection: "Frances McDormand films where she plays a grieving or isolated figure", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Nomadland", year: 2020 },
        { title: "Almost Famous", year: 2000 },
        { title: "The Man Who Wasn't There", year: 2001 },
        { title: "Moonrise Kingdom", year: 2012 },
      ]},
      { connection: "Films where characters discover a dark secret lurking beneath their idyllic community", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Midsommar", year: 2019 },
        { title: "Get Out", year: 2017 },
        { title: "The Wicker Man", year: 1973 },
        { title: "Rosemary's Baby", year: 1968 },
      ]},
      { connection: "Films set in a single night where the location is cut off from the outside world", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Purge", year: 2013 },
        { title: "Assault on Precinct 13", year: 1976 },
        { title: "Judgment Night", year: 1993 },
        { title: "Clue", year: 1985 },
      ]},
      { connection: "Titles that contain a river, lake, sea, or ocean", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The River Wild", year: 1994 },
        { title: "Lake Placid", year: 1999 },
        { title: "Ocean's Eleven", year: 2001 },
        { title: "Sea of Love", year: 1989 },
      ]},
    ],
  },
  // Puzzle 45
  {
    groups: [
      { connection: "Toni Collette films directed outside Hollywood", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Muriel's Wedding", year: 1994 },
        { title: "Japanese Story", year: 2003 },
        { title: "The Dead Girl", year: 2006 },
        { title: "Glorious 39", year: 2009 },
      ]},
      { connection: "Films about obsessive love that slowly destroys both parties", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Requiem for a Dream", year: 2000 },
        { title: "Eyes Wide Shut", year: 1999 },
        { title: "Fatal Attraction", year: 1987 },
        { title: "Damage", year: 1992 },
      ]},
      { connection: "Films set entirely in one night at a roadside location far from help", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Duel", year: 1971 },
        { title: "Joy Ride", year: 2001 },
        { title: "Red Eye", year: 2005 },
        { title: "Breakdown", year: 1997 },
      ]},
      { connection: "Titles that contain a month of the year", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "April Fools' Day", year: 1986 },
        { title: "October Sky", year: 1999 },
        { title: "August: Osage County", year: 2013 },
        { title: "November", year: 2004 },
      ]},
    ],
  },
  // Puzzle 46
  {
    groups: [
      { connection: "Oscar Isaac films where he plays a scientist or intellectual", connection_type: "actor", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Ex Machina", year: 2014 },
        { title: "Annihilation", year: 2018 },
        { title: "Operation Finale", year: 2018 },
        { title: "Life Itself", year: 2018 },
      ]},
      { connection: "Films about characters slowly losing their grip on sanity in an isolated setting", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Lighthouse", year: 2019 },
        { title: "The Witch", year: 2015 },
        { title: "Bug", year: 2006 },
        { title: "Take Shelter", year: 2011 },
      ]},
      { connection: "Films set primarily at sea during a desperate fight for survival", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Captain Phillips", year: 2013 },
        { title: "All Is Lost", year: 2013 },
        { title: "The Perfect Storm", year: 2000 },
        { title: "Master and Commander: The Far Side of the World", year: 2003 },
      ]},
      { connection: "Titles that contain an animal known for its speed", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Cheetah Girls", year: 2003 },
        { title: "Greyhound", year: 2020 },
        { title: "Falcon and the Snowman", year: 1985 },
        { title: "Hare Krishna", year: 1966 },
      ]},
    ],
  },
  // Puzzle 47
  {
    groups: [
      { connection: "Marvel Cinematic Universe Phase One films", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Iron Man", year: 2008 },
        { title: "Thor", year: 2011 },
        { title: "The Incredible Hulk", year: 2008 },
        { title: "Captain America: The First Avenger", year: 2011 },
      ]},
      { connection: "Films adapted from Stephen King novels set in Maine", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Misery", year: 1990 },
        { title: "Dolores Claiborne", year: 1995 },
        { title: "Needful Things", year: 1993 },
        { title: "Thinner", year: 1996 },
      ]},
      { connection: "Films featuring a chess match as a pivotal plot scene", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Thomas Crown Affair", year: 1968 },
        { title: "Searching for Bobby Fischer", year: 1993 },
        { title: "Harry Potter and the Sorcerer's Stone", year: 2001 },
        { title: "Fresh", year: 1994 },
      ]},
      { connection: "Films whose titles are a character's complete first and last name", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Forrest Gump", year: 1994 },
        { title: "Erin Brockovich", year: 2000 },
        { title: "Ed Wood", year: 1994 },
        { title: "Patch Adams", year: 1998 },
      ]},
    ],
  },
  // Puzzle 48
  {
    groups: [
      { connection: "Films adapted from Broadway musicals", connection_type: "adaptation", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Chicago", year: 2002 },
        { title: "Grease", year: 1978 },
        { title: "Les Misérables", year: 2012 },
        { title: "West Side Story", year: 1961 },
      ]},
      { connection: "A24 horror films", connection_type: "award", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hereditary", year: 2018 },
        { title: "Midsommar", year: 2019 },
        { title: "The Witch", year: 2015 },
        { title: "It Comes at Night", year: 2017 },
      ]},
      { connection: "Films featuring a red coat as a memorable visual motif", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Schindler's List", year: 1993 },
        { title: "Don't Look Now", year: 1973 },
        { title: "The Truman Show", year: 1998 },
        { title: "Paddington", year: 2014 },
      ]},
      { connection: "Films whose titles end with a four-digit year number", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "1984", year: 1984 },
        { title: "2001: A Space Odyssey", year: 1968 },
        { title: "1917", year: 2019 },
        { title: "Brave New World", year: 1998 },
      ]},
    ],
  },
  // Puzzle 49
  {
    groups: [
      { connection: "Fast & Furious main series entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Fast and the Furious", year: 2001 },
        { title: "Fast Five", year: 2011 },
        { title: "Furious 7", year: 2015 },
        { title: "F9", year: 2021 },
      ]},
      { connection: "Films based on true heist or con stories", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Catch Me If You Can", year: 2002 },
        { title: "American Animals", year: 2018 },
        { title: "Dog Day Afternoon", year: 1975 },
        { title: "The Great Train Robbery", year: 1978 },
      ]},
      { connection: "Films that won both the Palme d'Or at Cannes and the Oscar for Best Picture", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Marty", year: 1955 },
        { title: "The Lost Weekend", year: 1945 },
        { title: "All About Eve", year: 1950 },
        { title: "Around the World in 80 Days", year: 1956 },
      ]},
      { connection: "Films whose titles are a single-word imperative verb", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Breathe", year: 2017 },
        { title: "Sing", year: 2016 },
        { title: "Run", year: 2020 },
        { title: "Drive", year: 2011 },
      ]},
    ],
  },
  // Puzzle 50
  {
    groups: [
      { connection: "Pixar sequels that surpassed their originals at the box office", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Toy Story 2", year: 1999 },
        { title: "Finding Dory", year: 2016 },
        { title: "Incredibles 2", year: 2018 },
        { title: "Cars 2", year: 2011 },
      ]},
      { connection: "Films adapted from video games that are not in an action-blockbuster genre", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Pokémon Detective Pikachu", year: 2019 },
        { title: "The Angry Birds Movie", year: 2016 },
        { title: "Werewolves Within", year: 2021 },
        { title: "Rampage", year: 2018 },
      ]},
      { connection: "Sundance Grand Jury Prize winners in the US Dramatic Competition", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Whiplash", year: 2014 },
        { title: "Precious", year: 2009 },
        { title: "Reservoir Dogs", year: 1992 },
        { title: "Beasts of the Southern Wild", year: 2012 },
      ]},
      { connection: "Films featuring a talking animal as the central character", connection_type: "theme", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Babe", year: 1995 },
        { title: "Charlotte's Web", year: 2006 },
        { title: "Paddington 2", year: 2017 },
        { title: "The Jungle Book", year: 2016 },
      ]},
    ],
  },
  // Puzzle 51
  {
    groups: [
      { connection: "Planet of the Apes reboot trilogy entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Rise of the Planet of the Apes", year: 2011 },
        { title: "Dawn of the Planet of the Apes", year: 2014 },
        { title: "War for the Planet of the Apes", year: 2017 },
        { title: "Kingdom of the Planet of the Apes", year: 2024 },
      ]},
      { connection: "American remakes of South Korean films", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Lake House", year: 2006 },
        { title: "Oldboy", year: 2013 },
        { title: "The Uninvited", year: 2009 },
        { title: "I Saw the Devil", year: 2020 },
      ]},
      { connection: "Films that claimed the Palme d'Or at Cannes during the 2010s decade", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Tree of Life", year: 2011 },
        { title: "Amour", year: 2012 },
        { title: "Blue Is the Warmest Colour", year: 2013 },
        { title: "Dheepan", year: 2015 },
      ]},
      { connection: "Films featuring a heist crew that plans the job over food in a diner or restaurant", connection_type: "theme", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Reservoir Dogs", year: 1992 },
        { title: "Heat", year: 1995 },
        { title: "The Italian Job", year: 2003 },
        { title: "Inside Man", year: 2006 },
      ]},
    ],
  },
  // Puzzle 52
  {
    groups: [
      { connection: "Mission: Impossible franchise entries directed by different directors", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Mission: Impossible", year: 1996 },
        { title: "Mission: Impossible II", year: 2000 },
        { title: "Mission: Impossible – Ghost Protocol", year: 2011 },
        { title: "Mission: Impossible – Fallout", year: 2018 },
      ]},
      { connection: "Films adapted from Philip K. Dick short stories (not his novels)", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Total Recall", year: 1990 },
        { title: "Minority Report", year: 2002 },
        { title: "The Adjustment Bureau", year: 2011 },
        { title: "Paycheck", year: 2003 },
      ]},
      { connection: "Razzie Award for Worst Picture winners featuring a major Hollywood star", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Battlefield Earth", year: 2000 },
        { title: "Gigli", year: 2003 },
        { title: "Catwoman", year: 2004 },
        { title: "Jack and Jill", year: 2011 },
      ]},
      { connection: "Films whose first two prominent title words share an identical starting letter", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Dirty Dancing", year: 1987 },
        { title: "Barton Fink", year: 1991 },
        { title: "Bowfinger", year: 1999 },
        { title: "Panic Room", year: 2002 },
      ]},
    ],
  },
  // Puzzle 53
  {
    groups: [
      { connection: "James Bond franchise films starring Daniel Craig", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Casino Royale", year: 2006 },
        { title: "Quantum of Solace", year: 2008 },
        { title: "Skyfall", year: 2012 },
        { title: "No Time to Die", year: 2021 },
      ]},
      { connection: "Films adapted from Stephen King novellas (not full novels)", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Shawshank Redemption", year: 1994 },
        { title: "Stand by Me", year: 1986 },
        { title: "The Mist", year: 2007 },
        { title: "1408", year: 2007 },
      ]},
      { connection: "Films featuring a vintage muscle car as a central dramatic prop", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Bullitt", year: 1968 },
        { title: "Gone in 60 Seconds", year: 2000 },
        { title: "John Wick", year: 2014 },
        { title: "Baby Driver", year: 2017 },
      ]},
      { connection: "Best Picture Oscar losers that are now considered greater than the film that beat them", connection_type: "award", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Citizen Kane", year: 1941 },
        { title: "Goodfellas", year: 1990 },
        { title: "Saving Private Ryan", year: 1998 },
        { title: "The Social Network", year: 2010 },
      ]},
    ],
  },
  // Puzzle 54
  {
    groups: [
      { connection: "Alien franchise main saga films", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Alien", year: 1979 },
        { title: "Aliens", year: 1986 },
        { title: "Alien 3", year: 1992 },
        { title: "Alien: Resurrection", year: 1997 },
      ]},
      { connection: "American films adapted from French originals", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Three Men and a Baby", year: 1987 },
        { title: "The Birdcage", year: 1996 },
        { title: "Dinner for Schmucks", year: 2010 },
        { title: "The Valet", year: 2022 },
      ]},
      { connection: "Films where mirrors are used as a recurring visual storytelling device", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Black Swan", year: 2010 },
        { title: "The Lady from Shanghai", year: 1947 },
        { title: "Candyman", year: 1992 },
        { title: "Contact", year: 1997 },
      ]},
      { connection: "Films whose titles contain the name of a US state", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Mississippi Burning", year: 1988 },
        { title: "Georgia Rule", year: 2007 },
        { title: "Kansas City", year: 1996 },
        { title: "California Split", year: 1974 },
      ]},
    ],
  },
  // Puzzle 55
  {
    groups: [
      { connection: "Harry Potter film series entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Harry Potter and the Chamber of Secrets", year: 2002 },
        { title: "Harry Potter and the Prisoner of Azkaban", year: 2004 },
        { title: "Harry Potter and the Goblet of Fire", year: 2005 },
        { title: "Harry Potter and the Order of the Phoenix", year: 2007 },
      ]},
      { connection: "Films adapted from plays by Tennessee Williams", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Streetcar Named Desire", year: 1951 },
        { title: "Cat on a Hot Tin Roof", year: 1958 },
        { title: "Suddenly, Last Summer", year: 1959 },
        { title: "The Rose Tattoo", year: 1955 },
      ]},
      { connection: "Films featuring a cursed or haunted painting central to the plot", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Picture of Dorian Gray", year: 1945 },
        { title: "Velvet Buzzsaw", year: 2019 },
        { title: "Oculus", year: 2013 },
        { title: "What Dreams May Come", year: 1998 },
      ]},
      { connection: "Oscar Best Picture winners whose titles are exactly three words", connection_type: "award", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Hurt Locker", year: 2008 },
        { title: "The Artist", year: 2011 },
        { title: "The Revenant", year: 2015 },
        { title: "The Shape of Water", year: 2017 },
      ]},
    ],
  },
  // Puzzle 56
  {
    groups: [
      { connection: "DC Extended Universe founding-era films", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Man of Steel", year: 2013 },
        { title: "Wonder Woman", year: 2017 },
        { title: "Aquaman", year: 2018 },
        { title: "Shazam!", year: 2019 },
      ]},
      { connection: "Films adapted from video games released in the 1990s arcade era", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Street Fighter", year: 1994 },
        { title: "Mortal Kombat", year: 1995 },
        { title: "Super Mario Bros.", year: 1993 },
        { title: "Double Dragon", year: 1994 },
      ]},
      { connection: "Films featuring a typewriter as a central dramatic prop tied to a writer's obsession or breakdown", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Shining", year: 1980 },
        { title: "Misery", year: 1990 },
        { title: "Atonement", year: 2007 },
        { title: "Barton Fink", year: 1991 },
      ]},
      { connection: "Films whose titles are a number followed by a noun referring to people or warriors", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "12 Angry Men", year: 1957 },
        { title: "Seven Samurai", year: 1954 },
        { title: "300", year: 2006 },
        { title: "13 Assassins", year: 2010 },
      ]},
    ],
  },
  // Puzzle 57
  {
    groups: [
      { connection: "The Lord of the Rings trilogy films", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
        { title: "The Lord of the Rings: The Two Towers", year: 2002 },
        { title: "The Lord of the Rings: The Return of the King", year: 2003 },
        { title: "The Hobbit: An Unexpected Journey", year: 2012 },
      ]},
      { connection: "Films adapted from Shakespeare plays set in a modern or non-period setting", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "10 Things I Hate About You", year: 1999 },
        { title: "O", year: 2001 },
        { title: "She's the Man", year: 2006 },
        { title: "Romeo + Juliet", year: 1996 },
      ]},
      { connection: "A24 films that received an Academy Award Best Picture nomination", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Moonlight", year: 2016 },
        { title: "Lady Bird", year: 2017 },
        { title: "Minari", year: 2020 },
        { title: "Everything Everywhere All at Once", year: 2022 },
      ]},
      { connection: "Films whose titles name the exact number of major characters in the story", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Magnificent Seven", year: 1960 },
        { title: "Four Weddings and a Funeral", year: 1994 },
        { title: "The Hateful Eight", year: 2015 },
        { title: "Three Billboards Outside Ebbing, Missouri", year: 2017 },
      ]},
    ],
  },
  // Puzzle 58
  {
    groups: [
      { connection: "Terminator franchise main series installments", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Terminator", year: 1984 },
        { title: "Terminator 2: Judgment Day", year: 1991 },
        { title: "Terminator 3: Rise of the Machines", year: 2003 },
        { title: "Terminator Salvation", year: 2009 },
      ]},
      { connection: "Films based on true stories of real criminals or con artists", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Zodiac", year: 2007 },
        { title: "Monster", year: 2003 },
        { title: "Extremely Wicked, Shockingly Evil and Vile", year: 2019 },
        { title: "I, Tonya", year: 2017 },
      ]},
      { connection: "Films where a mysterious locked container whose contents are never fully revealed drives the plot", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Se7en", year: 1995 },
        { title: "Pulp Fiction", year: 1994 },
        { title: "No Country for Old Men", year: 2007 },
        { title: "Ronin", year: 1998 },
      ]},
      { connection: "Films whose titles contain a word meaning 'of or belonging to' a specific season", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Midsommar", year: 2019 },
        { title: "Winter's Bone", year: 2010 },
        { title: "Autumn Sonata", year: 1978 },
        { title: "Spring Breakers", year: 2012 },
      ]},
    ],
  },
  // Puzzle 59
  {
    groups: [
      { connection: "Rocky franchise boxing entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Rocky II", year: 1979 },
        { title: "Rocky III", year: 1982 },
        { title: "Rocky IV", year: 1985 },
        { title: "Creed", year: 2015 },
      ]},
      { connection: "Films adapted from celebrated non-superhero graphic novels", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A History of Violence", year: 2005 },
        { title: "Road to Perdition", year: 2002 },
        { title: "Ghost World", year: 2001 },
        { title: "American Splendor", year: 2003 },
      ]},
      { connection: "Sundance breakouts that catapulted their directors into major Hollywood careers", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Pi", year: 1998 },
        { title: "Napoleon Dynamite", year: 2004 },
        { title: "Little Miss Sunshine", year: 2006 },
        { title: "Primer", year: 2004 },
      ]},
      { connection: "Films with possessive apostrophe-s forms of a character's proper name in the title", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Schindler's List", year: 1993 },
        { title: "Sophie's Choice", year: 1982 },
        { title: "Rosemary's Baby", year: 1968 },
        { title: "Oskar's America", year: 2019 },
      ]},
    ],
  },
  // Puzzle 60
  {
    groups: [
      { connection: "Men in Black franchise entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Men in Black", year: 1997 },
        { title: "Men in Black II", year: 2002 },
        { title: "Men in Black 3", year: 2012 },
        { title: "Men in Black: International", year: 2019 },
      ]},
      { connection: "American films adapted from Japanese horror films", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Ring", year: 2002 },
        { title: "The Grudge", year: 2004 },
        { title: "Dark Water", year: 2005 },
        { title: "Pulse", year: 2006 },
      ]},
      { connection: "Films featuring a ticking clock or runaway vehicle as the primary tension engine", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Speed", year: 1994 },
        { title: "Nick of Time", year: 1995 },
        { title: "Unstoppable", year: 2010 },
        { title: "Source Code", year: 2011 },
      ]},
      { connection: "Films with a single-word title that doubles as a present-tense action verb", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Doubt", year: 2008 },
        { title: "Crash", year: 2004 },
        { title: "Split", year: 2016 },
        { title: "Flee", year: 2021 },
      ]},
    ],
  },
  // Puzzle 61
  {
    groups: [
      { connection: "Pirates of the Caribbean franchise entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Pirates of the Caribbean: The Curse of the Black Pearl", year: 2003 },
        { title: "Pirates of the Caribbean: Dead Man's Chest", year: 2006 },
        { title: "Pirates of the Caribbean: At World's End", year: 2007 },
        { title: "Pirates of the Caribbean: On Stranger Tides", year: 2011 },
      ]},
      { connection: "Films adapted from the novels of Roald Dahl", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Charlie and the Chocolate Factory", year: 2005 },
        { title: "James and the Giant Peach", year: 1996 },
        { title: "Matilda", year: 1996 },
        { title: "Fantastic Mr. Fox", year: 2009 },
      ]},
      { connection: "Films featuring a signature hat as the defining visual marker of a character's identity", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Raiders of the Lost Ark", year: 1981 },
        { title: "Midnight Cowboy", year: 1969 },
        { title: "The Blues Brothers", year: 1980 },
        { title: "Amélie", year: 2001 },
      ]},
      { connection: "Films whose titles are a number followed by a collective noun for a group of people", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Ocean's Eleven", year: 2001 },
        { title: "The Dirty Dozen", year: 1967 },
        { title: "The Usual Suspects", year: 1995 },
        { title: "The Wild Bunch", year: 1969 },
      ]},
    ],
  },
  // Puzzle 62
  {
    groups: [
      { connection: "X-Men franchise films featuring the original cast", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "X-Men", year: 2000 },
        { title: "X2", year: 2003 },
        { title: "X-Men: The Last Stand", year: 2006 },
        { title: "The Wolverine", year: 2013 },
      ]},
      { connection: "Films adapted from the novels of Jane Austen", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Sense and Sensibility", year: 1995 },
        { title: "Emma", year: 1996 },
        { title: "Mansfield Park", year: 1999 },
        { title: "Northanger Abbey", year: 2007 },
      ]},
      { connection: "Films that won the Academy Award for Best International Feature Film in the 2010s", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "A Separation", year: 2011 },
        { title: "Ida", year: 2014 },
        { title: "Son of Saul", year: 2015 },
        { title: "The Salesman", year: 2016 },
      ]},
      { connection: "Films whose titles are a single proper noun that is simultaneously a common English word with an entirely different meaning", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Babel", year: 2006 },
        { title: "Rushmore", year: 1998 },
        { title: "Magnolia", year: 1999 },
        { title: "Traffic", year: 2000 },
      ]},
    ],
  },
  // Puzzle 63
  {
    groups: [
      { connection: "Jurassic Park franchise entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Jurassic Park", year: 1993 },
        { title: "The Lost World: Jurassic Park", year: 1997 },
        { title: "Jurassic Park III", year: 2001 },
        { title: "Jurassic World", year: 2015 },
      ]},
      { connection: "Films adapted from plays by Arthur Miller", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "All My Sons", year: 1948 },
        { title: "Death of a Salesman", year: 1951 },
        { title: "The Crucible", year: 1996 },
        { title: "A View from the Bridge", year: 1962 },
      ]},
      { connection: "Films featuring a mask worn by the protagonist or villain as a central visual symbol", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "V for Vendetta", year: 2005 },
        { title: "Eyes Wide Shut", year: 1999 },
        { title: "The Mask of Zorro", year: 1998 },
        { title: "The Phantom of the Opera", year: 2004 },
      ]},
      { connection: "Films whose titles contain a season of the year used metaphorically", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Long Hot Summer", year: 1958 },
        { title: "Winter's Tale", year: 2014 },
        { title: "Blue Spring", year: 2001 },
        { title: "Autumn in New York", year: 2000 },
      ]},
    ],
  },
  // Puzzle 64
  {
    groups: [
      { connection: "Transformers live-action franchise entries directed by Michael Bay", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Transformers", year: 2007 },
        { title: "Transformers: Revenge of the Fallen", year: 2009 },
        { title: "Transformers: Dark of the Moon", year: 2011 },
        { title: "Transformers: Age of Extinction", year: 2014 },
      ]},
      { connection: "Films based on the real-life theft or recovery of stolen artworks", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Woman in Gold", year: 2015 },
        { title: "The Monuments Men", year: 2014 },
        { title: "Theft by Finding", year: 2017 },
        { title: "The Train", year: 1964 },
      ]},
      { connection: "Films where an iconic sword is central to the protagonist's quest or identity", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Excalibur", year: 1981 },
        { title: "Highlander", year: 1986 },
        { title: "The Princess Bride", year: 1987 },
        { title: "Crouching Tiger, Hidden Dragon", year: 2000 },
      ]},
      { connection: "Films whose titles are a past-tense verb standing alone as the complete title", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Frozen", year: 2013 },
        { title: "Wanted", year: 2008 },
        { title: "Gifted", year: 2017 },
        { title: "Gone", year: 2012 },
      ]},
    ],
  },
  // Puzzle 65
  {
    groups: [
      { connection: "The Hunger Games franchise films", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Hunger Games", year: 2012 },
        { title: "The Hunger Games: Catching Fire", year: 2013 },
        { title: "The Hunger Games: Mockingjay – Part 1", year: 2014 },
        { title: "The Hunger Games: Mockingjay – Part 2", year: 2015 },
      ]},
      { connection: "Films adapted from the novels of Philip Roth", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Goodbye, Columbus", year: 1969 },
        { title: "Portnoy's Complaint", year: 1972 },
        { title: "The Human Stain", year: 2003 },
        { title: "American Pastoral", year: 2016 },
      ]},
      { connection: "Films where a specific piece of jewelry drives the central conflict", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Uncut Gems", year: 2019 },
        { title: "The Pink Panther", year: 1963 },
        { title: "Titanic", year: 1997 },
        { title: "How to Steal a Million", year: 1966 },
      ]},
      { connection: "Films whose titles contain a compass direction used in a non-geographic sense", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "North by Northwest", year: 1959 },
        { title: "East of Eden", year: 1955 },
        { title: "True North", year: 2006 },
        { title: "West Side Story", year: 1961 },
      ]},
    ],
  },
  // Puzzle 66
  {
    groups: [
      { connection: "Toy Story franchise entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Toy Story", year: 1995 },
        { title: "Toy Story 2", year: 1999 },
        { title: "Toy Story 3", year: 2010 },
        { title: "Toy Story 4", year: 2019 },
      ]},
      { connection: "American adaptations of Scandinavian crime thrillers", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Girl with the Dragon Tattoo", year: 2011 },
        { title: "Insomnia", year: 2002 },
        { title: "The Snowman", year: 2017 },
        { title: "Head Above Water", year: 1996 },
      ]},
      { connection: "Films featuring a board game or strategy game that turns dangerous or real", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Jumanji", year: 1995 },
        { title: "WarGames", year: 1983 },
        { title: "Clue", year: 1985 },
        { title: "Zathura: A Space Adventure", year: 2005 },
      ]},
      { connection: "Films whose titles are a three-word imperative phrase starting with a verb", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Get Out", year: 2017 },
        { title: "Bring It On", year: 2000 },
        { title: "Step Up", year: 2006 },
        { title: "Think Like a Man", year: 2012 },
      ]},
    ],
  },
  // Puzzle 67
  {
    groups: [
      { connection: "Guardians of the Galaxy MCU entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Guardians of the Galaxy", year: 2014 },
        { title: "Guardians of the Galaxy Vol. 2", year: 2017 },
        { title: "Guardians of the Galaxy Vol. 3", year: 2023 },
        { title: "Thor: Ragnarok", year: 2017 },
      ]},
      { connection: "Films adapted from novels by Ernest Hemingway", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Farewell to Arms", year: 1957 },
        { title: "The Sun Also Rises", year: 1957 },
        { title: "For Whom the Bell Tolls", year: 1943 },
        { title: "The Old Man and the Sea", year: 1958 },
      ]},
      { connection: "Films that swept all five major Oscar categories (Picture, Director, Actor, Actress, Screenplay)", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "It Happened One Night", year: 1934 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: "The Silence of the Lambs", year: 1991 },
        { title: "Network", year: 1976 },
      ]},
      { connection: "Films whose titles are a common household tool or implement", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Saw", year: 2004 },
        { title: "Hook", year: 1991 },
        { title: "Rope", year: 1948 },
        { title: "Hammer", year: 2019 },
      ]},
    ],
  },
  // Puzzle 68
  {
    groups: [
      { connection: "Spider-Man live-action franchise entries across studios", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Spider-Man", year: 2002 },
        { title: "Spider-Man 2", year: 2004 },
        { title: "The Amazing Spider-Man", year: 2012 },
        { title: "Spider-Man: Homecoming", year: 2017 },
      ]},
      { connection: "Films adapted from Broadway plays by Neil Simon", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Odd Couple", year: 1968 },
        { title: "Barefoot in the Park", year: 1967 },
        { title: "The Goodbye Girl", year: 1977 },
        { title: "Biloxi Blues", year: 1988 },
      ]},
      { connection: "Films featuring a photograph that contains a hidden clue or secret central to the mystery", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Blow-Up", year: 1966 },
        { title: "Rear Window", year: 1954 },
        { title: "Memento", year: 2000 },
        { title: "The Others", year: 2001 },
      ]},
      { connection: "Films that won the Oscar for Best Picture and are also considered a 'sweep' of the top awards night", connection_type: "award", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Ben-Hur", year: 1959 },
        { title: "Titanic", year: 1997 },
        { title: "The Lord of the Rings: The Return of the King", year: 2003 },
        { title: "Everything Everywhere All at Once", year: 2022 },
      ]},
    ],
  },
  // Puzzle 69
  {
    groups: [
      { connection: "Indiana Jones franchise entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Raiders of the Lost Ark", year: 1981 },
        { title: "Indiana Jones and the Temple of Doom", year: 1984 },
        { title: "Indiana Jones and the Last Crusade", year: 1989 },
        { title: "Indiana Jones and the Kingdom of the Crystal Skull", year: 2008 },
      ]},
      { connection: "Films adapted from the novels of Cormac McCarthy", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "No Country for Old Men", year: 2007 },
        { title: "The Road", year: 2009 },
        { title: "All the Pretty Horses", year: 2000 },
        { title: "Child of God", year: 2013 },
      ]},
      { connection: "Films that swept the Oscar top four categories: Best Picture, Director, Actor, and Actress", connection_type: "award", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "It Happened One Night", year: 1934 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
        { title: "The Silence of the Lambs", year: 1991 },
        { title: "Cavalcade", year: 1933 },
      ]},
      { connection: "Films whose titles contain a word for a type of light or glow", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Moonlight", year: 2016 },
        { title: "Daylight", year: 1996 },
        { title: "Twilight", year: 2008 },
        { title: "Starlight", year: 2020 },
      ]},
    ],
  },
  // Puzzle 70
  {
    groups: [
      { connection: "Saw horror franchise entries", connection_type: "franchise", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Saw", year: 2004 },
        { title: "Saw II", year: 2005 },
        { title: "Saw III", year: 2006 },
        { title: "Jigsaw", year: 2017 },
      ]},
      { connection: "Films adapted from the works of John le Carré", connection_type: "adaptation", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Spy Who Came in from the Cold", year: 1965 },
        { title: "The Constant Gardener", year: 2005 },
        { title: "Tinker Tailor Soldier Spy", year: 2011 },
        { title: "The Night Manager", year: 2016 },
      ]},
      { connection: "Films featuring an iconic staircase sequence that defines a dramatic turning point", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Untouchables", year: 1987 },
        { title: "Parasite", year: 2019 },
        { title: "Gone with the Wind", year: 1939 },
        { title: "Joker", year: 2019 },
      ]},
      { connection: "Films whose titles contain an animal that is actually a slang term for a person", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Jackass", year: 2002 },
        { title: "Weasel", year: 2019 },
        { title: "Snake Eyes", year: 1998 },
        { title: "The Hawk", year: 1993 },
      ]},
    ],
  },
];
