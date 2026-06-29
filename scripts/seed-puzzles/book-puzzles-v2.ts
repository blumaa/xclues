import type { PuzzleDef } from './types';

export const bookPuzzlesV2: PuzzleDef[] = [
  // Puzzle 1
  {
    groups: [
      { connection: "Toni Morrison novels set in the American South or rural communities", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Beloved", year: 1987 },
        { title: "Song of Solomon", year: 1977 },
        { title: "Tar Baby", year: 1981 },
        { title: "Sula", year: 1973 },
      ]},
      { connection: "Cyberpunk novels that coined or popularized genre vocabulary", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Neuromancer", year: 1984 },
        { title: "Snow Crash", year: 1992 },
        { title: "Rainbows End", year: 2006 },
        { title: "Mona Lisa Overdrive", year: 1988 },
      ]},
      { connection: "Novels whose titles contain a day of the week", connection_type: "title_wordplay", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Black Sunday", year: 1975 },
        { title: "Friday", year: 1982 },
        { title: "Saturday", year: 2005 },
        { title: "The Man Who Was Thursday", year: 1908 },
      ]},
      { connection: "Novels whose single-word title is also a musical term", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Fugue", year: 2000 },
        { title: "Refrain", year: 2019 },
        { title: "Cadence", year: 2012 },
        { title: "Overture", year: 2013 },
      ]},
    ],
  },
  // Puzzle 2
  {
    groups: [
      { connection: "Kazuo Ishiguro novels narrated by a single reflective voice looking back", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Remains of the Day", year: 1989 },
        { title: "Never Let Me Go", year: 2005 },
        { title: "An Artist of the Floating World", year: 1986 },
        { title: "The Buried Giant", year: 2015 },
      ]},
      { connection: "Epistolary novels told entirely through letters exchanged between two people", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Color Purple", year: 1982 },
        { title: "Clarissa", year: 1748 },
        { title: "Les Liaisons Dangereuses", year: 1782 },
        { title: "84, Charing Cross Road", year: 1970 },
      ]},
      { connection: "Novels that won the Pulitzer Prize for Fiction in the 1990s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "A Thousand Acres", year: 1991 },
        { title: "The Shipping News", year: 1993 },
        { title: "American Pastoral", year: 1997 },
        { title: "Interpreter of Maladies", year: 1999 },
      ]},
      { connection: "Novels whose titles are also names of geographic straits, channels, or passages", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Sound and the Fury", year: 1929 },
        { title: "Passage to India", year: 1924 },
        { title: "The Narrows", year: 1953 },
        { title: "The Channel Shore", year: 1954 },
      ]},
    ],
  },
  // Puzzle 3
  {
    groups: [
      { connection: "Shirley Jackson works featuring domestic spaces that become sinister", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Haunting of Hill House", year: 1959 },
        { title: "We Have Always Lived in the Castle", year: 1962 },
        { title: "Hangsaman", year: 1951 },
        { title: "The Bird's Nest", year: 1954 },
      ]},
      { connection: "Classic hardboiled detective novels set in Los Angeles", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Big Sleep", year: 1939 },
        { title: "Farewell, My Lovely", year: 1940 },
        { title: "The Long Goodbye", year: 1953 },
        { title: "The Little Sister", year: 1949 },
      ]},
      { connection: "Campus novels where academic life masks moral corruption", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Secret History", year: 1992 },
        { title: "Stoner", year: 1965 },
        { title: "Lucky Jim", year: 1954 },
        { title: "The Art of Fielding", year: 2011 },
      ]},
      { connection: "Novel titles that are imperative sentences (commands to the reader)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Speak", year: 1999 },
        { title: "Beloved", year: 1987 },
        { title: "Go Tell It on the Mountain", year: 1953 },
        { title: "Run", year: 2007 },
      ]},
    ],
  },
  // Puzzle 4
  {
    groups: [
      { connection: "Gabriel García Márquez novels featuring the Buendía family or Macondo", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "One Hundred Years of Solitude", year: 1967 },
        { title: "Love in the Time of Cholera", year: 1985 },
        { title: "In Evil Hour", year: 1962 },
        { title: "Leaf Storm", year: 1955 },
      ]},
      { connection: "Magical realism novels from Latin America outside Colombia", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The House of the Spirits", year: 1982 },
        { title: "Like Water for Chocolate", year: 1989 },
        { title: "Pedro Páramo", year: 1955 },
        { title: "The Kingdom of This World", year: 1949 },
      ]},
      { connection: "Frequently banned books challenged for sexual content in American schools", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Lady Chatterley's Lover", year: 1928 },
        { title: "Tropic of Cancer", year: 1934 },
        { title: "Ulysses", year: 1922 },
        { title: "Forever", year: 1975 },
      ]},
      { connection: "Novels whose titles use a digit rather than spelling the number out in words", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "1984", year: 1949 },
        { title: "Catch-22", year: 1961 },
        { title: "2001: A Space Odyssey", year: 1968 },
        { title: "84, Charing Cross Road", year: 1970 },
      ]},
    ],
  },
  // Puzzle 5
  {
    groups: [
      { connection: "Zadie Smith novels exploring multicultural British identity", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "White Teeth", year: 2000 },
        { title: "NW", year: 2012 },
        { title: "On Beauty", year: 2005 },
        { title: "Swing Time", year: 2016 },
      ]},
      { connection: "Gothic novels featuring an obsessive male narrator fixated on a woman", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Rebecca", year: 1938 },
        { title: "Lolita", year: 1955 },
        { title: "The Collector", year: 1963 },
        { title: "Enduring Love", year: 1997 },
      ]},
      { connection: "International Booker Prize winners translated from non-European languages", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Vegetarian", year: 2007 },
        { title: "A Tale for the Time Being", year: 2013 },
        { title: "At Night All Blood Is Black", year: 2018 },
        { title: "Tomb of Sand", year: 2018 },
      ]},
      { connection: "Novels whose titles contain the name of a card game or board game", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Solitaire", year: 2015 },
        { title: "The Bridge", year: 1993 },
        { title: "Chess Story", year: 1942 },
        { title: "Snap", year: 2021 },
      ]},
    ],
  },
  // Puzzle 6
  {
    groups: [
      { connection: "Ursula K. Le Guin novels set in the Hainish universe", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Left Hand of Darkness", year: 1969 },
        { title: "The Dispossessed", year: 1974 },
        { title: "The Word for World Is Forest", year: 1972 },
        { title: "City of Illusions", year: 1967 },
      ]},
      { connection: "Novels that won the National Book Award for Fiction in the 2000s", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Three Junes", year: 2002 },
        { title: "The Great Fire", year: 2003 },
        { title: "Europe Central", year: 2005 },
        { title: "Tree of Smoke", year: 2007 },
      ]},
      { connection: "Campus novels where a character faces deadly or criminal moral consequences", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Secret History", year: 1992 },
        { title: "If We Were Villains", year: 2017 },
        { title: "Disgrace", year: 1999 },
        { title: "The Human Stain", year: 2000 },
      ]},
      { connection: "Novels whose titles are also names of dances", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Swing Time", year: 2016 },
        { title: "The Tango", year: 2004 },
        { title: "Reel", year: 2018 },
        { title: "Jive", year: 2004 },
      ]},
    ],
  },
  // Puzzle 7
  {
    groups: [
      { connection: "Cormac McCarthy novels set in the American Southwest or Mexico border", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Blood Meridian", year: 1985 },
        { title: "All the Pretty Horses", year: 1992 },
        { title: "No Country for Old Men", year: 2005 },
        { title: "The Crossing", year: 1994 },
      ]},
      { connection: "Novels banned or challenged for portraying racial hatred or using racial slurs", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "To Kill a Mockingbird", year: 1960 },
        { title: "The Adventures of Huckleberry Finn", year: 1884 },
        { title: "Native Son", year: 1940 },
        { title: "Roll of Thunder, Hear My Cry", year: 1976 },
      ]},
      { connection: "Novels structured as diaries kept by the protagonist in secret", connection_type: "genre_link", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Diary of a Young Girl", year: 1947 },
        { title: "Bridget Jones's Diary", year: 1996 },
        { title: "Diary of a Wimpy Kid", year: 2007 },
        { title: "Adrian Mole: The Cappuccino Years", year: 1999 },
      ]},
      { connection: "Novels whose titles contain a month of the year", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "April in Paris", year: 2021 },
        { title: "October", year: 2017 },
        { title: "May Day", year: 1920 },
        { title: "November Road", year: 2018 },
      ]},
    ],
  },
  // Puzzle 8
  {
    groups: [
      { connection: "Toni Morrison novels published after winning the Nobel Prize", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Paradise", year: 1997 },
        { title: "Love", year: 2003 },
        { title: "A Mercy", year: 2008 },
        { title: "Home", year: 2012 },
      ]},
      { connection: "Southern Gothic novels featuring decaying aristocratic families", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Absalom, Absalom!", year: 1936 },
        { title: "The Sound and the Fury", year: 1929 },
        { title: "A Good Man Is Hard to Find", year: 1955 },
        { title: "Wise Blood", year: 1952 },
      ]},
      { connection: "PEN/Faulkner Award for Fiction winners from the 1980s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "How German Is It", year: 1980 },
        { title: "The Chaneysville Incident", year: 1981 },
        { title: "Sent for You Yesterday", year: 1983 },
        { title: "The Barracks Thief", year: 1984 },
      ]},
      { connection: "Novels whose titles contain a hyphen", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Slaughterhouse-Five", year: 1969 },
        { title: "Catch-22", year: 1961 },
        { title: "Self-Help", year: 1985 },
        { title: "The Thirty-Nine Steps", year: 1915 },
      ]},
    ],
  },
  // Puzzle 9
  {
    groups: [
      { connection: "Ursula K. Le Guin Earthsea novels", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A Wizard of Earthsea", year: 1968 },
        { title: "The Tombs of Atuan", year: 1971 },
        { title: "The Farthest Shore", year: 1972 },
        { title: "Tehanu", year: 1990 },
      ]},
      { connection: "Cyberpunk novels featuring corporate-controlled dystopian cities", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Count Zero", year: 1986 },
        { title: "Islands in the Net", year: 1988 },
        { title: "Synners", year: 1991 },
        { title: "Virtual Light", year: 1993 },
      ]},
      { connection: "Booker Prize-winning novels set outside Europe and North America", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The White Tiger", year: 2008 },
        { title: "The Luminaries", year: 2013 },
        { title: "A Brief History of Seven Killings", year: 2015 },
        { title: "Lincoln in the Bardo", year: 2017 },
      ]},
      { connection: "Novels whose titles contain a cardinal number spelled out as a word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "One Flew Over the Cuckoo's Nest", year: 1962 },
        { title: "Two Solitudes", year: 1945 },
        { title: "Three Men in a Boat", year: 1889 },
        { title: "Four Letters of Love", year: 1997 },
      ]},
    ],
  },
  // Puzzle 10
  {
    groups: [
      { connection: "Shirley Jackson short story collections and novellas", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Lottery", year: 1949 },
        { title: "Come Along with Me", year: 1968 },
        { title: "Just an Ordinary Day", year: 1997 },
        { title: "The Magic of Shirley Jackson", year: 1966 },
      ]},
      { connection: "Magical realism novels set in sub-Saharan Africa", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Things Fall Apart", year: 1958 },
        { title: "Season of Migration to the North", year: 1966 },
        { title: "The Famished Road", year: 1991 },
        { title: "GraceLand", year: 2004 },
      ]},
      { connection: "Frequently banned novels challenged for LGBTQ+ content", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Giovanni's Room", year: 1956 },
        { title: "The Well of Loneliness", year: 1928 },
        { title: "And Tango Makes Three", year: 2005 },
        { title: "George", year: 2015 },
      ]},
      { connection: "Novels whose titles contain a word meaning 'center' or 'middle'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Middlemarch", year: 1871 },
        { title: "The Middle Passage", year: 1962 },
        { title: "The Heart Is a Lonely Hunter", year: 1940 },
        { title: "Dead Centre", year: 2016 },
      ]},
    ],
  },
  // Puzzle 11
  {
    groups: [
      { connection: "Cormac McCarthy's early Appalachian novels before the Border Trilogy", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Orchard Keeper", year: 1965 },
        { title: "Outer Dark", year: 1968 },
        { title: "Child of God", year: 1973 },
        { title: "Suttree", year: 1979 },
      ]},
      { connection: "European Gothic novels featuring doubles, doppelgängers, or split identity", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Strange Case of Dr Jekyll and Mr Hyde", year: 1886 },
        { title: "The Picture of Dorian Gray", year: 1890 },
        { title: "The Double", year: 1846 },
        { title: "William Wilson", year: 1839 },
      ]},
      { connection: "Women's Prize for Fiction (formerly Orange Prize) winners from the 2010s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Lacuna", year: 2009 },
        { title: "The Tiger's Wife", year: 2011 },
        { title: "How to Be Both", year: 2014 },
        { title: "The Song of Achilles", year: 2011 },
      ]},
      { connection: "Novels whose single-word title is a compound word fused from two common nouns or a noun and adjective", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Heartburn", year: 1983 },
        { title: "Housekeeping", year: 1980 },
        { title: "Middlemarch", year: 1871 },
        { title: "Birchwood", year: 1973 },
      ]},
    ],
  },
  // Puzzle 12
  {
    groups: [
      { connection: "Kazuo Ishiguro novels featuring memory, loss, and unfulfilled longing", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A Pale View of Hills", year: 1982 },
        { title: "The Unconsoled", year: 1995 },
        { title: "When We Were Orphans", year: 2000 },
        { title: "Klara and the Sun", year: 2021 },
      ]},
      { connection: "Hardboiled detective novels featuring female investigators as protagonists", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Is for Alibi", year: 1982 },
        { title: "Indemnity Only", year: 1982 },
        { title: "Killing Orders", year: 1985 },
        { title: "Dead Cert", year: 1962 },
      ]},
      { connection: "Pulitzer Prize for Fiction winners from the 1980s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Executioner's Song", year: 1979 },
        { title: "A Confederacy of Dunces", year: 1980 },
        { title: "The Color Purple", year: 1982 },
        { title: "Foreign Affairs", year: 1984 },
      ]},
      { connection: "Novels whose entire title is a single letter of the alphabet", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "V.", year: 1963 },
        { title: "W, or the Memory of Childhood", year: 1975 },
        { title: "Q", year: 1999 },
        { title: "S.", year: 2013 },
      ]},
    ],
  },
  // Puzzle 13
  {
    groups: [
      { connection: "Gabriel García Márquez novellas and short story collections", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "No One Writes to the Colonel", year: 1961 },
        { title: "Chronicle of a Death Foretold", year: 1981 },
        { title: "The Autumn of the Patriarch", year: 1975 },
        { title: "Strange Pilgrims", year: 1992 },
      ]},
      { connection: "Magical realism novels set in Europe with surreal elements", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Master and Margarita", year: 1967 },
        { title: "The Tin Drum", year: 1959 },
        { title: "Midnight's Children", year: 1981 },
        { title: "Kafka on the Shore", year: 2002 },
      ]},
      { connection: "Novels banned or burned for political reasons under authoritarian regimes", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Doctor Zhivago", year: 1957 },
        { title: "Animal Farm", year: 1945 },
        { title: "Brave New World", year: 1932 },
        { title: "We", year: 1924 },
      ]},
      { connection: "Novels whose titles contain a word that is also a chess piece", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Queen's Gambit", year: 1983 },
        { title: "The Rook", year: 2011 },
        { title: "Knight Errant", year: 2012 },
        { title: "The Bishop's Man", year: 2009 },
      ]},
    ],
  },
  // Puzzle 14
  {
    groups: [
      { connection: "Zadie Smith novels featuring a friendship or rivalry between two women", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "On Beauty", year: 2005 },
        { title: "Swing Time", year: 2016 },
        { title: "The Fraud", year: 2023 },
        { title: "White Teeth", year: 2000 },
      ]},
      { connection: "Modern epistolary novels structured as email or text message exchanges", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Attachments", year: 2011 },
        { title: "The Rosie Project", year: 2013 },
        { title: "Eligible", year: 2016 },
        { title: "People We Meet on Vacation", year: 2021 },
      ]},
      { connection: "Commonwealth Writers' Prize winners that explored postcolonial identity", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The God of Small Things", year: 1997 },
        { title: "Reef", year: 1994 },
        { title: "The Inheritance of Loss", year: 2006 },
        { title: "Half of a Yellow Sun", year: 2006 },
      ]},
      { connection: "Novels whose titles contain a fruit", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Grapes of Wrath", year: 1939 },
        { title: "Oranges Are Not the Only Fruit", year: 1985 },
        { title: "The Lemon Table", year: 2004 },
        { title: "Plum Bun", year: 1929 },
      ]},
    ],
  },
  // Puzzle 15
  {
    groups: [
      { connection: "Toni Morrison novels with a title that is a single common English word", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Beloved", year: 1987 },
        { title: "Sula", year: 1973 },
        { title: "Paradise", year: 1997 },
        { title: "Jazz", year: 1992 },
      ]},
      { connection: "Hardboiled noir novels set in New York City with corrupt police or officials", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Killer Inside Me", year: 1952 },
        { title: "Hell's Kitchen", year: 2001 },
        { title: "City of Glass", year: 1985 },
        { title: "Devil in a Blue Dress", year: 1990 },
      ]},
      { connection: "Man Booker International Prize winners from the 2010s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Dinner", year: 2009 },
        { title: "Colorless Tsukuru Tazaki and His Years of Pilgrimage", year: 2013 },
        { title: "Purity", year: 2015 },
        { title: "Convenience Store Woman", year: 2016 },
      ]},
      { connection: "Novels whose one-word titles are also weather phenomena", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Blizzard", year: 2019 },
        { title: "Fog", year: 2017 },
        { title: "Hail Mary", year: 2021 },
        { title: "Tempest", year: 2017 },
      ]},
    ],
  },
  // Puzzle 16
  {
    groups: [
      { connection: "Novels in the tradition of Shirley Jackson featuring an isolated protagonist unraveling", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Mexican Gothic", year: 2020 },
        { title: "The Silent Patient", year: 2019 },
        { title: "House of Leaves", year: 2000 },
        { title: "The Turn of the Screw", year: 1898 },
      ]},
      { connection: "British campus novels satirizing academic pretension and class", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Lucky Jim", year: 1954 },
        { title: "The History Man", year: 1975 },
        { title: "Small World", year: 1984 },
        { title: "Changing Places", year: 1975 },
      ]},
      { connection: "Novels set during or centered on the partition of India and Pakistan in 1947", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Midnight's Children", year: 1981 },
        { title: "A Fine Balance", year: 1995 },
        { title: "Train to Pakistan", year: 1956 },
        { title: "The Shadow Lines", year: 1988 },
      ]},
      { connection: "Novels whose titles contain a compass direction", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "North and South", year: 1855 },
        { title: "East of Eden", year: 1952 },
        { title: "The Westerner", year: 1892 },
        { title: "The North Water", year: 2016 },
      ]},
    ],
  },
  // Puzzle 17
  {
    groups: [
      { connection: "Ursula K. Le Guin novels outside the Hainish and Earthsea cycles", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Beginning Place", year: 1980 },
        { title: "Always Coming Home", year: 1985 },
        { title: "Lavinia", year: 2008 },
        { title: "Changing Planes", year: 2003 },
      ]},
      { connection: "American Gothic novels set in New England featuring community secrets", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Scarlet Letter", year: 1850 },
        { title: "Ethan Frome", year: 1911 },
        { title: "Peyton Place", year: 1956 },
        { title: "The Virgin Suicides", year: 1993 },
      ]},
      { connection: "Booker Prize-winning novels from the 2000s set in historical periods", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Blind Assassin", year: 2000 },
        { title: "True History of the Kelly Gang", year: 2000 },
        { title: "The Inheritance of Loss", year: 2006 },
        { title: "Wolf Hall", year: 2009 },
      ]},
      { connection: "Novels whose titles are also names of animals when read aloud phonetically", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Bare Man", year: 2018 },
        { title: "Moose", year: 1998 },
        { title: "The Lynx", year: 2020 },
        { title: "Bees", year: 2016 },
      ]},
    ],
  },
  // Puzzle 18
  {
    groups: [
      { connection: "Gabriel García Márquez story collections featuring Caribbean coastal settings", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Big Mama's Funeral", year: 1962 },
        { title: "Innocent Eréndira", year: 1972 },
        { title: "Collected Stories", year: 1984 },
        { title: "Of Love and Other Demons", year: 1994 },
      ]},
      { connection: "Near-future cyberpunk novels exploring surveillance capitalism", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Circle", year: 2013 },
        { title: "Oryx and Crake", year: 2003 },
        { title: "Super Sad True Love Story", year: 2010 },
        { title: "The Peripheral", year: 2014 },
      ]},
      { connection: "National Book Award winners in the 1970s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Complete Stories", year: 1972 },
        { title: "Chimera", year: 1972 },
        { title: "A Crown of Feathers", year: 1973 },
        { title: "Dog Soldiers", year: 1974 },
      ]},
      { connection: "Novels whose titles contain a number that is also a common superstition", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Thirteen Problems", year: 1932 },
        { title: "Seven", year: 2019 },
        { title: "Three's a Crowd", year: 2015 },
        { title: "Lucky Thirteen", year: 2004 },
      ]},
    ],
  },
  // Puzzle 19
  {
    groups: [
      { connection: "Cormac McCarthy novels featuring fathers and sons", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Road", year: 2006 },
        { title: "All the Pretty Horses", year: 1992 },
        { title: "The Orchard Keeper", year: 1965 },
        { title: "The Crossing", year: 1994 },
      ]},
      { connection: "Gothic ghost-story novels where the ghost represents trauma or guilt", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Little Stranger", year: 2009 },
        { title: "The Shining", year: 1977 },
        { title: "Beloved", year: 1987 },
        { title: "A Christmas Carol", year: 1843 },
      ]},
      { connection: "Costa Novel Award winners from the 2000s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Curious Incident of the Dog in the Night-Time", year: 2003 },
        { title: "Small Island", year: 2004 },
        { title: "The Electric Michelangelo", year: 2004 },
        { title: "The Interpretation of Murder", year: 2006 },
      ]},
      { connection: "Novels whose titles contain a word meaning 'boundary' or 'edge'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Borderlands", year: 1987 },
        { title: "The Edge of Sadness", year: 1961 },
        { title: "The Rim of the Prairie", year: 1925 },
        { title: "Brink", year: 2014 },
      ]},
    ],
  },
  // Puzzle 20
  {
    groups: [
      { connection: "Novels on the Booker Prize shortlist from 2017 to 2019", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Lincoln in the Bardo", year: 2017 },
        { title: "Exit West", year: 2017 },
        { title: "Washington Black", year: 2018 },
        { title: "Girl, Woman, Other", year: 2019 },
      ]},
      { connection: "British hardboiled crime novels featuring ex-police investigators", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Long Firm", year: 1999 },
        { title: "Dead Ground", year: 1999 },
        { title: "A Dark Adapted Eye", year: 1986 },
        { title: "Original Sin", year: 1994 },
      ]},
      { connection: "Lambda Literary Award winners for Lesbian Fiction", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Stone Butch Blues", year: 1993 },
        { title: "The Hours", year: 1998 },
        { title: "Fingersmith", year: 2002 },
        { title: "Fun Home", year: 2006 },
      ]},
      { connection: "Novels whose titles contain a celestial body other than the sun or moon", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Saturn's Children", year: 2008 },
        { title: "Venus in Furs", year: 1870 },
        { title: "The Mars Room", year: 2018 },
        { title: "Neptune's Brood", year: 2013 },
      ]},
    ],
  },
  // Puzzle 21
  {
    groups: [
      { connection: "Novels featuring clones, robots, or artificial beings who question their purpose", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Never Let Me Go", year: 2005 },
        { title: "Klara and the Sun", year: 2021 },
        { title: "Do Androids Dream of Electric Sheep?", year: 1968 },
        { title: "Frankenstein", year: 1818 },
      ]},
      { connection: "Victorian epistolary novels featuring unreliable letters and hidden motivations", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Dracula", year: 1897 },
        { title: "The Woman in White", year: 1859 },
        { title: "Pamela", year: 1740 },
        { title: "The Moonstone", year: 1868 },
      ]},
      { connection: "National Book Critics Circle Award winners for Fiction in the 1990s", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "A Thousand Acres", year: 1991 },
        { title: "All the Pretty Horses", year: 1992 },
        { title: "Sabbath's Theater", year: 1995 },
        { title: "Cold Mountain", year: 1997 },
      ]},
      { connection: "Novels whose complete title is a single one-syllable word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Jazz", year: 1992 },
        { title: "Home", year: 2012 },
        { title: "Run", year: 2007 },
        { title: "Shame", year: 1983 },
      ]},
    ],
  },
  // Puzzle 22
  {
    groups: [
      { connection: "Toni Morrison novels told from the perspective of a community or collective voice", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Bluest Eye", year: 1970 },
        { title: "Jazz", year: 1992 },
        { title: "Paradise", year: 1997 },
        { title: "Sula", year: 1973 },
      ]},
      { connection: "Gothic novels set in crumbling country houses where the house symbolizes decline", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Wuthering Heights", year: 1847 },
        { title: "Brideshead Revisited", year: 1945 },
        { title: "The Fall of the House of Usher", year: 1839 },
        { title: "Gormenghast", year: 1950 },
      ]},
      { connection: "Books challenged or banned for portraying occult or Satanic themes", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Exorcist", year: 1971 },
        { title: "Rosemary's Baby", year: 1967 },
        { title: "The Goosebumps Series", year: 1992 },
        { title: "Harry Potter and the Sorcerer's Stone", year: 1997 },
      ]},
      { connection: "Novels whose titles contain the name of a fabric or textile", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Silk", year: 1996 },
        { title: "Satin Island", year: 2015 },
        { title: "Cotton Comes to Harlem", year: 1965 },
        { title: "The Lace Reader", year: 2008 },
      ]},
    ],
  },
  // Puzzle 23
  {
    groups: [
      { connection: "Gothic novels by women featuring a woman trapped in an oppressive domestic situation", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Yellow Wallpaper", year: 1892 },
        { title: "The Bell Jar", year: 1963 },
        { title: "Big Little Lies", year: 2014 },
        { title: "Room", year: 2010 },
      ]},
      { connection: "Female-led noir novels where the protagonist is both investigator and suspect", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Gone Girl", year: 2012 },
        { title: "The Girl on the Train", year: 2015 },
        { title: "Behind Closed Doors", year: 2016 },
        { title: "Little Fires Everywhere", year: 2017 },
      ]},
      { connection: "PEN/Robert W. Bingham Prize winners for debut fiction", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Train Dreams", year: 2002 },
        { title: "In the Lake of the Woods", year: 1994 },
        { title: "Interpreter of Maladies", year: 1999 },
        { title: "The Virgin Suicides", year: 1993 },
      ]},
      { connection: "Novels whose titles contain a word meaning 'beginning' or 'origin'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Genesis", year: 2009 },
        { title: "The Origin of Species", year: 1859 },
        { title: "The Beginning Place", year: 1980 },
        { title: "First Light", year: 1988 },
      ]},
    ],
  },
  // Puzzle 24
  {
    groups: [
      { connection: "Zadie Smith novels featuring an ensemble cast across multiple generations", connection_type: "author_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "White Teeth", year: 2000 },
        { title: "The Autograph Man", year: 2002 },
        { title: "NW", year: 2012 },
        { title: "The Fraud", year: 2023 },
      ]},
      { connection: "Cyberpunk and biopunk novels by Asian or Asian-diaspora authors", connection_type: "genre_link", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Windup Girl", year: 2009 },
        { title: "All Systems Red", year: 2017 },
        { title: "A Memory Called Empire", year: 2019 },
        { title: "The Deep Sky", year: 2023 },
      ]},
      { connection: "Whiting Award-winning debut novels that later won major prizes", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Road", year: 2006 },
        { title: "Gilead", year: 2004 },
        { title: "The Corrections", year: 2001 },
        { title: "Housekeeping", year: 1980 },
      ]},
      { connection: "Novels whose titles contain the name of a musical instrument", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Piano Teacher", year: 1983 },
        { title: "Trumpet", year: 1998 },
        { title: "The Accordion Crimes", year: 1996 },
        { title: "Drums of Autumn", year: 1996 },
      ]},
    ],
  },
  // Puzzle 25
  {
    groups: [
      { connection: "Novels set entirely over one single day", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Mrs Dalloway", year: 1925 },
        { title: "Ulysses", year: 1922 },
        { title: "Saturday", year: 2005 },
        { title: "The Hours", year: 1998 },
      ]},
      { connection: "Novels set in British boarding schools", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Tom Brown's School Days", year: 1857 },
        { title: "The Magus", year: 1965 },
        { title: "Never Let Me Go", year: 2005 },
        { title: "A Separate Peace", year: 1959 },
      ]},
      { connection: "Novels adapted into films directed by Stanley Kubrick", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Lolita", year: 1955 },
        { title: "The Shining", year: 1977 },
        { title: "A Clockwork Orange", year: 1962 },
        { title: "Barry Lyndon", year: 1844 },
      ]},
      { connection: "Titles that are a person's full name (first and last)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "David Copperfield", year: 1850 },
        { title: "Anna Karenina", year: 1878 },
        { title: "Robinson Crusoe", year: 1719 },
        { title: "Martin Chuzzlewit", year: 1844 },
      ]},
    ],
  },
  // Puzzle 26
  {
    groups: [
      { connection: "Novels set during the American Civil War", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Gone with the Wind", year: 1936 },
        { title: "The Red Badge of Courage", year: 1895 },
        { title: "Cold Mountain", year: 1997 },
        { title: "The Killer Angels", year: 1974 },
      ]},
      { connection: "Novels narrated entirely in second person ('you')", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Bright Lights, Big City", year: 1984 },
        { title: "Half of a Yellow Sun", year: 2006 },
        { title: "If on a winter's night a traveler", year: 1979 },
        { title: "The Night Circus", year: 2011 },
      ]},
      { connection: "Source novels for films directed by David Fincher", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Fight Club", year: 1996 },
        { title: "Gone Girl", year: 2012 },
        { title: "The Girl with the Dragon Tattoo", year: 2005 },
        { title: "The Curious Case of Benjamin Button", year: 1922 },
      ]},
      { connection: "Titles containing a compass direction (North, South, East, West)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "North and South", year: 1855 },
        { title: "East of Eden", year: 1952 },
        { title: "West with the Night", year: 1942 },
        { title: "Northanger Abbey", year: 1817 },
      ]},
    ],
  },
  // Puzzle 27
  {
    groups: [
      { connection: "Novels set on isolated Pacific islands", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Lord of the Flies", year: 1954 },
        { title: "Treasure Island", year: 1883 },
        { title: "The Blue Lagoon", year: 1908 },
        { title: "Bel Canto", year: 2001 },
      ]},
      { connection: "Novels structured as a story-within-a-story frame narrative", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Frankenstein", year: 1818 },
        { title: "Wuthering Heights", year: 1847 },
        { title: "Life of Pi", year: 2001 },
        { title: "The Princess Bride", year: 1973 },
      ]},
      { connection: "Novels adapted into animated feature films by Studio Ghibli", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Howl's Moving Castle", year: 1986 },
        { title: "The Borrowers", year: 1952 },
        { title: "My Neighbor Totoro", year: 1988 },
        { title: "Nausicaä of the Valley of the Wind", year: 1984 },
      ]},
      { connection: "Titles that start with 'The' and contain a number", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Three Musketeers", year: 1844 },
        { title: "The Forty-Two Stories", year: 1927 },
        { title: "The 39 Steps", year: 1915 },
        { title: "The Five People You Meet in Heaven", year: 2003 },
      ]},
    ],
  },
  // Puzzle 28
  {
    groups: [
      { connection: "Novels set during World War I", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "All Quiet on the Western Front", year: 1929 },
        { title: "A Farewell to Arms", year: 1929 },
        { title: "Birdsong", year: 1993 },
        { title: "Regeneration", year: 1991 },
      ]},
      { connection: "Novels told entirely through letters and diary entries (epistolary)", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Dracula", year: 1897 },
        { title: "The Color Purple", year: 1982 },
        { title: "Bridget Jones's Diary", year: 1996 },
        { title: "We Need to Talk About Kevin", year: 2003 },
      ]},
      { connection: "Novels adapted into HBO prestige drama series", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Game of Thrones", year: 1996 },
        { title: "Big Little Lies", year: 2014 },
        { title: "The Undoing", year: 2014 },
        { title: "Sharp Objects", year: 2006 },
      ]},
      { connection: "Titles that are complete imperative sentences (commands)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Go Set a Watchman", year: 2015 },
        { title: "Catch Me If You Can", year: 1980 },
        { title: "Ask the Dust", year: 1939 },
        { title: "Run", year: 2007 },
      ]},
    ],
  },
  // Puzzle 29
  {
    groups: [
      { connection: "Novels set in dystopian futures where surveillance controls citizens", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Nineteen Eighty-Four", year: 1949 },
        { title: "We", year: 1924 },
        { title: "The Circle", year: 2013 },
        { title: "Super Sad True Love Story", year: 2010 },
      ]},
      { connection: "Novels with multiple unreliable narrators presenting contradictory accounts", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Sound and the Fury", year: 1929 },
        { title: "Gone Girl", year: 2012 },
        { title: "Rashomon", year: 1950 },
        { title: "The Remains of the Day", year: 1989 },
      ]},
      { connection: "Novels adapted into films that won the Palme d'Or at Cannes", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Tin Drum", year: 1959 },
        { title: "The Leopard", year: 1958 },
        { title: "Barton Fink", year: 1991 },
        { title: "Apocalypse Now", year: 1979 },
      ]},
      { connection: "Titles where a city name is the entire title", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Amsterdam", year: 1998 },
        { title: "Havana", year: 1990 },
        { title: "Middlesex", year: 2002 },
        { title: "Taipei", year: 2014 },
      ]},
    ],
  },
  // Puzzle 30
  {
    groups: [
      { connection: "Novels set during the Vietnam War", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Things They Carried", year: 1990 },
        { title: "Matterhorn", year: 2010 },
        { title: "A Rumor of War", year: 1977 },
        { title: "The Sympathizer", year: 2015 },
      ]},
      { connection: "Novels told in reverse chronological order", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Time's Arrow", year: 1991 },
        { title: "Slaughterhouse-Five", year: 1969 },
        { title: "Betrayal", year: 1978 },
        { title: "Illyrian Spring", year: 1935 },
      ]},
      { connection: "Novels adapted into films by Ang Lee", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Sense and Sensibility", year: 1811 },
        { title: "The Ice Storm", year: 1994 },
        { title: "Life of Pi", year: 2001 },
        { title: "Brokeback Mountain", year: 1997 },
      ]},
      { connection: "Titles containing the word 'House'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "House of Leaves", year: 2000 },
        { title: "Bleak House", year: 1853 },
        { title: "The House of the Spirits", year: 1982 },
        { title: "House of Sand and Fog", year: 1999 },
      ]},
    ],
  },
  // Puzzle 31
  {
    groups: [
      { connection: "Novels set in ancient Rome", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "I, Claudius", year: 1934 },
        { title: "Ben-Hur", year: 1880 },
        { title: "Quo Vadis", year: 1896 },
        { title: "Masters of Rome", year: 1990 },
      ]},
      { connection: "Novels where a ghost or spirit narrates the story", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Beloved", year: 1987 },
        { title: "The Lovely Bones", year: 2002 },
        { title: "Lincoln in the Bardo", year: 2017 },
        { title: "The Haunting of Hill House", year: 1959 },
      ]},
      { connection: "Novels adapted into films starring Meryl Streep", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The French Lieutenant's Woman", year: 1969 },
        { title: "Sophie's Choice", year: 1979 },
        { title: "The Devil Wears Prada", year: 2003 },
        { title: "The Hours", year: 1998 },
      ]},
      { connection: "Titles that are a year or specific date", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Nineteen Eighty-Four", year: 1949 },
        { title: "2001: A Space Odyssey", year: 1968 },
        { title: "February", year: 2013 },
        { title: "11/22/63", year: 2011 },
      ]},
    ],
  },
  // Puzzle 32
  {
    groups: [
      { connection: "Novels set in colonial Africa", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Things Fall Apart", year: 1958 },
        { title: "Heart of Darkness", year: 1899 },
        { title: "Out of Africa", year: 1937 },
        { title: "The Poisonwood Bible", year: 1998 },
      ]},
      { connection: "Novels narrated by a character who turns out to be an outsider to the main events", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Great Gatsby", year: 1925 },
        { title: "Wuthering Heights", year: 1847 },
        { title: "Moby-Dick", year: 1851 },
        { title: "The Go-Between", year: 1953 },
      ]},
      { connection: "Novels adapted into films by Ridley Scott", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Blade Runner", year: 1968 },
        { title: "Hannibal", year: 1999 },
        { title: "Black Hawk Down", year: 1999 },
        { title: "The Martian", year: 2011 },
      ]},
      { connection: "Titles where every word starts with the same letter (alliterative)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Sense and Sensibility", year: 1811 },
        { title: "Pride and Prejudice", year: 1813 },
        { title: "Persuasion", year: 1817 },
        { title: "Pnin", year: 1957 },
      ]},
    ],
  },
  // Puzzle 33
  {
    groups: [
      { connection: "Novels set in Paris during the 19th century", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Les Misérables", year: 1862 },
        { title: "The Hunchback of Notre-Dame", year: 1831 },
        { title: "Père Goriot", year: 1835 },
        { title: "Nana", year: 1880 },
      ]},
      { connection: "Novels with a narrator who is hospitalized or institutionalized", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Bell Jar", year: 1963 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1962 },
        { title: "The Yellow Wallpaper", year: 1892 },
        { title: "Girl, Interrupted", year: 1993 },
      ]},
      { connection: "Novels adapted into films that launched a billion-dollar franchise", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Hunger Games", year: 2008 },
        { title: "Twilight", year: 2005 },
        { title: "Divergent", year: 2011 },
        { title: "The Maze Runner", year: 2009 },
      ]},
      { connection: "Titles containing the name of a flower", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Black Tulip", year: 1850 },
        { title: "Dandelion Wine", year: 1957 },
        { title: "Rosemary's Baby", year: 1967 },
        { title: "The Name of the Rose", year: 1980 },
      ]},
    ],
  },
  // Puzzle 34
  {
    groups: [
      { connection: "Novels set aboard ships at sea", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Moby-Dick", year: 1851 },
        { title: "Billy Budd", year: 1924 },
        { title: "Lord Jim", year: 1900 },
        { title: "The Narrative of Arthur Gordon Pym of Nantucket", year: 1838 },
      ]},
      { connection: "Novels told entirely through footnotes and marginalia", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Pale Fire", year: 1962 },
        { title: "House of Leaves", year: 2000 },
        { title: "The Unconsoled", year: 1995 },
        { title: "Infinite Jest", year: 1996 },
      ]},
      { connection: "Novels adapted into films by Alfonso Cuarón", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Great Expectations", year: 1861 },
        { title: "The Children of Men", year: 1992 },
        { title: "A Little Princess", year: 1905 },
        { title: "Harry Potter and the Prisoner of Azkaban", year: 1999 },
      ]},
      { connection: "Titles ending with a question mark", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Who's Afraid of Virginia Woolf?", year: 1962 },
        { title: "What Is the What", year: 2006 },
        { title: "Why Be Happy When You Could Be Normal?", year: 2011 },
        { title: "Are You There God? It's Me, Margaret", year: 1970 },
      ]},
    ],
  },
  // Puzzle 35
  {
    groups: [
      { connection: "Novels set during the Korean War", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Orphan Master's Son", year: 2012 },
        { title: "MASH: A Novel About Three Army Doctors", year: 1968 },
        { title: "The Things They Carried", year: 1990 },
        { title: "There Is No Me Without You", year: 2006 },
      ]},
      { connection: "Novels narrated by an artificial intelligence or robot", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Klara and the Sun", year: 2021 },
        { title: "Do Androids Dream of Electric Sheep?", year: 1968 },
        { title: "I, Robot", year: 1950 },
        { title: "The Moon is a Harsh Mistress", year: 1966 },
      ]},
      { connection: "Novels adapted into television series by Netflix", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Witcher", year: 1993 },
        { title: "Bridgerton", year: 2000 },
        { title: "Thirteen Reasons Why", year: 2007 },
        { title: "Shadow and Bone", year: 2012 },
      ]},
      { connection: "Titles that contain the word 'Dark' or 'Darkness'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Heart of Darkness", year: 1899 },
        { title: "Dark Matter", year: 2016 },
        { title: "In the Dark Room", year: 2014 },
        { title: "Things Fall Apart", year: 1958 },
      ]},
    ],
  },
  // Puzzle 36
  {
    groups: [
      { connection: "Novels set in the American South during the 1930s", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "To Kill a Mockingbird", year: 1960 },
        { title: "As I Lay Dying", year: 1930 },
        { title: "Their Eyes Were Watching God", year: 1937 },
        { title: "The Grapes of Wrath", year: 1939 },
      ]},
      { connection: "Novels where the entire narrative is a confession or deathbed monologue", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Lolita", year: 1955 },
        { title: "Atonement", year: 2001 },
        { title: "Death of a Salesman", year: 1949 },
        { title: "The Remains of the Day", year: 1989 },
      ]},
      { connection: "Novels adapted into films by Steven Spielberg", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Schindler's List", year: 1982 },
        { title: "The Color Purple", year: 1982 },
        { title: "Empire of the Sun", year: 1984 },
        { title: "Minority Report", year: 1956 },
      ]},
      { connection: "Titles where the key word is a cardinal number spelled out", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "One Hundred Years of Solitude", year: 1967 },
        { title: "Catch-22", year: 1961 },
        { title: "Four Quartets", year: 1943 },
        { title: "Fahrenheit 451", year: 1953 },
      ]},
    ],
  },
  // Puzzle 37
  {
    groups: [
      { connection: "Novels set in post-apocalyptic wastelands", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Road", year: 2006 },
        { title: "Station Eleven", year: 2014 },
        { title: "A Canticle for Leibowitz", year: 1959 },
        { title: "The Children of Men", year: 1992 },
      ]},
      { connection: "Novels where chapters are told from different characters' points of view with named headers", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Song of Ice and Fire", year: 1996 },
        { title: "As I Lay Dying", year: 1930 },
        { title: "The Poisonwood Bible", year: 1998 },
        { title: "The Virgin Suicides", year: 1993 },
      ]},
      { connection: "Novels adapted into films by Francis Ford Coppola", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Godfather", year: 1969 },
        { title: "Apocalypse Now", year: 1979 },
        { title: "The Outsiders", year: 1967 },
        { title: "Rumble Fish", year: 1975 },
      ]},
      { connection: "Titles that are also common English idioms or proverbs", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "For Whom the Bell Tolls", year: 1940 },
        { title: "No Country for Old Men", year: 2005 },
        { title: "All the King's Men", year: 1946 },
        { title: "The Sun Also Rises", year: 1926 },
      ]},
    ],
  },
  // Puzzle 38
  {
    groups: [
      { connection: "Novels set in contemporary Tokyo", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Norwegian Wood", year: 1987 },
        { title: "Kafka on the Shore", year: 2002 },
        { title: "After Dark", year: 2004 },
        { title: "Convenience Store Woman", year: 2016 },
      ]},
      { connection: "Novels told from the perspective of a child narrator misunderstanding adult events", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "To Kill a Mockingbird", year: 1960 },
        { title: "The Kite Runner", year: 2003 },
        { title: "Room", year: 2010 },
        { title: "The Book Thief", year: 2005 },
      ]},
      { connection: "Novels adapted into films by Baz Luhrmann", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Romeo and Juliet", year: 1597 },
        { title: "The Great Gatsby", year: 1925 },
        { title: "Moulin Rouge", year: 2001 },
        { title: "Australia", year: 2008 },
      ]},
      { connection: "Titles where one word is a color that signals irony or subversion", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Scarlet Letter", year: 1850 },
        { title: "The Green Mile", year: 1996 },
        { title: "Oranges Are Not the Only Fruit", year: 1985 },
        { title: "The Red and the Black", year: 1830 },
      ]},
    ],
  },
  // Puzzle 39
  {
    groups: [
      { connection: "Novels set in Dickensian Victorian London slums", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Oliver Twist", year: 1838 },
        { title: "Little Dorrit", year: 1857 },
        { title: "Our Mutual Friend", year: 1865 },
        { title: "The Old Curiosity Shop", year: 1841 },
      ]},
      { connection: "Novels using a non-human narrator (animal, object, or force of nature)", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Watership Down", year: 1972 },
        { title: "The Book Thief", year: 2005 },
        { title: "The Black Stallion", year: 1941 },
        { title: "White Fang", year: 1906 },
      ]},
      { connection: "Novels adapted into films by Guillermo del Toro", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Crimson Peak", year: 2015 },
        { title: "The Shape of Water", year: 2017 },
        { title: "Pan's Labyrinth", year: 2006 },
        { title: "Pinocchio", year: 1883 },
      ]},
      { connection: "Titles containing the word 'Night' or 'Midnight'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Midnight's Children", year: 1981 },
        { title: "The Midnight Library", year: 2020 },
        { title: "Night", year: 1960 },
        { title: "One Thousand and One Nights", year: 1706 },
      ]},
    ],
  },
  // Puzzle 40
  {
    groups: [
      { connection: "Novels set in Cold War East Berlin", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Spy Who Came in from the Cold", year: 1963 },
        { title: "Berlin Game", year: 1983 },
        { title: "The Good German", year: 2001 },
        { title: "Stasiland", year: 2003 },
      ]},
      { connection: "Novels where the protagonist writes or reads letters to themselves", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Perks of Being a Wallflower", year: 1999 },
        { title: "Flowers for Algernon", year: 1966 },
        { title: "Ella Minnow Pea", year: 2001 },
        { title: "The Guernsey Literary and Potato Peel Pie Society", year: 2008 },
      ]},
      { connection: "Novels adapted into films by the Wachowski sisters", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Cloud Atlas", year: 2004 },
        { title: "The Matrix", year: 1999 },
        { title: "Sense8", year: 2015 },
        { title: "V for Vendetta", year: 1988 },
      ]},
      { connection: "Titles that contain a bird name", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "To Kill a Mockingbird", year: 1960 },
        { title: "The Crow Road", year: 1992 },
        { title: "One Flew Over the Cuckoo's Nest", year: 1962 },
        { title: "I Know Why the Caged Bird Sings", year: 1969 },
      ]},
    ],
  },
  // Puzzle 41
  {
    groups: [
      { connection: "Novels set entirely inside a single house or apartment", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Rebecca", year: 1938 },
        { title: "We Have Always Lived in the Castle", year: 1962 },
        { title: "The Turn of the Screw", year: 1898 },
        { title: "The Little Stranger", year: 2009 },
      ]},
      { connection: "Novels using a frame narrative set in an academic institution", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Name of the Rose", year: 1980 },
        { title: "Possession", year: 1990 },
        { title: "The Secret History", year: 1992 },
        { title: "Stoner", year: 1965 },
      ]},
      { connection: "Novels adapted into films by Mike Nichols", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Graduate", year: 1963 },
        { title: "Who's Afraid of Virginia Woolf?", year: 1962 },
        { title: "Catch-22", year: 1961 },
        { title: "Working Girl", year: 1988 },
      ]},
      { connection: "Titles where the key noun is also a verb with a double meaning", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Run", year: 2007 },
        { title: "Speak", year: 1999 },
        { title: "Drive", year: 2005 },
        { title: "Burn", year: 2010 },
      ]},
    ],
  },
  // Puzzle 42
  {
    groups: [
      { connection: "Novels set in the Sahara desert", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Sheltering Sky", year: 1949 },
        { title: "The English Patient", year: 1992 },
        { title: "The Alchemist", year: 1988 },
        { title: "Kim", year: 1901 },
      ]},
      { connection: "Novels told entirely through text messages and social media posts", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Attachments", year: 2011 },
        { title: "Dear Martin", year: 2017 },
        { title: "Gabi, a Girl in Pieces", year: 2014 },
        { title: "ttyl", year: 2004 },
      ]},
      { connection: "Novels adapted into television series by Amazon Prime", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Boys", year: 2006 },
        { title: "The Man in the High Castle", year: 1962 },
        { title: "Good Omens", year: 1990 },
        { title: "Wheel of Time", year: 1990 },
      ]},
      { connection: "Titles that contain the word 'Dead' or 'Death'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Dead Souls", year: 1842 },
        { title: "Death of a Salesman", year: 1949 },
        { title: "The Death of Ivan Ilyich", year: 1886 },
        { title: "Dead Poets Society", year: 1989 },
      ]},
    ],
  },
  // Puzzle 43
  {
    groups: [
      { connection: "Novels set in medieval monasteries or abbeys", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Name of the Rose", year: 1980 },
        { title: "Pillars of the Earth", year: 1989 },
        { title: "Cadfael", year: 1977 },
        { title: "The Monk", year: 1796 },
      ]},
      { connection: "Novels with a dual timeline alternating between past and present", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Hours", year: 1998 },
        { title: "Possession", year: 1990 },
        { title: "Atonement", year: 2001 },
        { title: "The Remains of the Day", year: 1989 },
      ]},
      { connection: "Novels adapted into films by Terrence Malick", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Badlands", year: 1974 },
        { title: "Days of Heaven", year: 1978 },
        { title: "The Thin Red Line", year: 1962 },
        { title: "A Hidden Life", year: 2019 },
      ]},
      { connection: "Titles that consist of exactly two contrasting abstract nouns joined by 'and'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Crime and Punishment", year: 1866 },
        { title: "War and Peace", year: 1869 },
        { title: "Sense and Sensibility", year: 1811 },
        { title: "Pride and Prejudice", year: 1813 },
      ]},
    ],
  },
  // Puzzle 44
  {
    groups: [
      { connection: "Novels set in 1960s Swinging London", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Rachel Papers", year: 1973 },
        { title: "Absolute Beginners", year: 1959 },
        { title: "The L-Shaped Room", year: 1960 },
        { title: "Georgy Girl", year: 1965 },
      ]},
      { connection: "Novels whose narrative structure mirrors a specific musical form", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Point Counter Point", year: 1928 },
        { title: "The Magic Mountain", year: 1924 },
        { title: "Doctor Faustus", year: 1947 },
        { title: "A Visit from the Goon Squad", year: 2010 },
      ]},
      { connection: "Novels adapted into films by Peter Jackson", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Lord of the Rings", year: 1954 },
        { title: "The Hobbit", year: 1937 },
        { title: "The Lovely Bones", year: 2002 },
        { title: "King Kong", year: 1933 },
      ]},
      { connection: "Titles that contain the name of a body of water", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Sea, The Sea", year: 1978 },
        { title: "On the River Styx", year: 1989 },
        { title: "The Lake", year: 2005 },
        { title: "The River Why", year: 1983 },
      ]},
    ],
  },
  // Puzzle 45
  {
    groups: [
      { connection: "Novels set during the Rwandan genocide", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A Sunday at the Pool in Kigali", year: 2000 },
        { title: "Cockroaches", year: 2016 },
        { title: "Our Lady of the Nile", year: 2012 },
        { title: "Season of Blood", year: 1995 },
      ]},
      { connection: "Novels narrated by a collective plural 'we' voice", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Virgin Suicides", year: 1993 },
        { title: "Then We Came to the End", year: 2007 },
        { title: "White Noise", year: 1985 },
        { title: "Our Town", year: 1938 },
      ]},
      { connection: "Novels adapted into films by Werner Herzog", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Nosferatu the Vampyre", year: 1979 },
        { title: "Woyzeck", year: 1837 },
        { title: "Aguirre, the Wrath of God", year: 1972 },
        { title: "Fitzcarraldo", year: 1982 },
      ]},
      { connection: "Titles that are single, untranslated foreign-language words used in English", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Nausea", year: 1938 },
        { title: "Noa Noa", year: 1901 },
        { title: "Bonjour Tristesse", year: 1954 },
        { title: "Ficciones", year: 1944 },
      ]},
    ],
  },
  // Puzzle 46
  {
    groups: [
      { connection: "Novels set in Prohibition-era Chicago", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Devil in the White City", year: 2003 },
        { title: "The Jungle", year: 1906 },
        { title: "Native Son", year: 1940 },
        { title: "Sister Carrie", year: 1900 },
      ]},
      { connection: "Novels structured as a series of linked short stories sharing characters and setting", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Winesburg, Ohio", year: 1919 },
        { title: "In Our Time", year: 1925 },
        { title: "Go Down, Moses", year: 1942 },
        { title: "Dubliners", year: 1914 },
      ]},
      { connection: "Novels adapted into films by Spike Lee", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "She's Gotta Have It", year: 1986 },
        { title: "Clockers", year: 1992 },
        { title: "He Got Game", year: 1998 },
        { title: "25th Hour", year: 2000 },
      ]},
      { connection: "Titles that are a rhetorical question beginning with 'Why' or 'How'", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Why Be Happy When You Could Be Normal?", year: 2011 },
        { title: "How It All Began", year: 2011 },
        { title: "How I Became a Nun", year: 1993 },
        { title: "How the Light Gets In", year: 2013 },
      ]},
    ],
  },
  // Puzzle 47
  {
    groups: [
      { connection: "Novels set in Apartheid-era South Africa", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Disgrace", year: 1999 },
        { title: "Cry, the Beloved Country", year: 1948 },
        { title: "A Dry White Season", year: 1979 },
        { title: "July's People", year: 1981 },
      ]},
      { connection: "Novels told entirely through the transcript of a single extended interview", connection_type: "theme", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Reluctant Fundamentalist", year: 2007 },
        { title: "Remainder", year: 2005 },
        { title: "Herzog", year: 1964 },
        { title: "A Man Called Ove", year: 2012 },
      ]},
      { connection: "Novels adapted into films by Mike Leigh", connection_type: "adaptation", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Nuts in May", year: 1976 },
        { title: "Secrets and Lies", year: 1996 },
        { title: "Vera Drake", year: 2004 },
        { title: "Happy-Go-Lucky", year: 2008 },
      ]},
      { connection: "Titles that contain an insect or arachnid", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Metamorphosis", year: 1915 },
        { title: "The Wasp Factory", year: 1984 },
        { title: "A Swarm in May", year: 1955 },
        { title: "Lord of the Flies", year: 1954 },
      ]},
    ],
  },
  // Puzzle 48
  {
    groups: [
      { connection: "Harlem Renaissance poetry collections", connection_type: "movement", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Weary Blues", year: 1926 },
        { title: "Color", year: 1925 },
        { title: "Copper Sun", year: 1927 },
        { title: "Caroling Dusk", year: 1927 },
      ]},
      { connection: "Landmark American nature writing and environmental nonfiction", connection_type: "nonfiction", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Pilgrim at Tinker Creek", year: 1974 },
        { title: "A Sand County Almanac", year: 1949 },
        { title: "The Sense of Wonder", year: 1965 },
        { title: "Desert Solitaire", year: 1968 },
      ]},
      { connection: "First novels in the Discworld series by Terry Pratchett", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Colour of Magic", year: 1983 },
        { title: "The Light Fantastic", year: 1986 },
        { title: "Equal Rites", year: 1987 },
        { title: "Mort", year: 1987 },
      ]},
      { connection: "Book titles that are a single body part", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Beloved", year: 1987 },
        { title: "Fingersmith", year: 2002 },
        { title: "Jawbone", year: 2021 },
        { title: "Ribcage", year: 2023 },
      ]},
    ],
  },
  // Puzzle 49
  {
    groups: [
      { connection: "Famous science-writing books that brought physics to a general audience", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A Brief History of Time", year: 1988 },
        { title: "The Elegant Universe", year: 1999 },
        { title: "Surely You're Joking, Mr. Feynman!", year: 1985 },
        { title: "The Fabric of Reality", year: 1997 },
      ]},
      { connection: "Latin American Boom novels of the 1960s–70s", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hopscotch", year: 1963 },
        { title: "The Death of Artemio Cruz", year: 1962 },
        { title: "Conversation in the Cathedral", year: 1969 },
        { title: "Three Trapped Tigers", year: 1967 },
      ]},
      { connection: "Opening novels of Patrick O'Brian's Aubrey–Maturin sailing series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Master and Commander", year: 1969 },
        { title: "Post Captain", year: 1972 },
        { title: "H.M.S. Surprise", year: 1973 },
        { title: "The Mauritius Command", year: 1977 },
      ]},
      { connection: "Book titles containing a cardinal direction hidden inside another word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Westward Ha!", year: 1948 },
        { title: "North and South", year: 1855 },
        { title: "East of Eden", year: 1952 },
        { title: "The Southpaw", year: 1953 },
      ]},
    ],
  },
  // Puzzle 50
  {
    groups: [
      { connection: "Canonical Beat Generation prose works", connection_type: "movement", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "On the Road", year: 1957 },
        { title: "Naked Lunch", year: 1959 },
        { title: "Big Sur", year: 1962 },
        { title: "The Dharma Bums", year: 1958 },
      ]},
      { connection: "Acclaimed political memoirs by U.S. presidents or first ladies", connection_type: "nonfiction", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Dreams from My Father", year: 1995 },
        { title: "Becoming", year: 2018 },
        { title: "A Promised Land", year: 2020 },
        { title: "My Own Story", year: 1961 },
      ]},
      { connection: "First books in Alexander McCall Smith's No. 1 Ladies' Detective Agency series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The No. 1 Ladies' Detective Agency", year: 1998 },
        { title: "Tears of the Giraffe", year: 2000 },
        { title: "Morality for Beautiful Girls", year: 2001 },
        { title: "The Kalahari Typing School for Men", year: 2002 },
      ]},
      { connection: "Alliterative two-word book titles (same first letter repeated)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Pale Fire", year: 1962 },
        { title: "Brave New World", year: 1932 },
        { title: "Double Indemnity", year: 1936 },
        { title: "Beloved", year: 1987 },
      ]},
    ],
  },
  // Puzzle 51
  {
    groups: [
      { connection: "Landmark feminist essay collections", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Second Sex", year: 1949 },
        { title: "The Feminine Mystique", year: 1963 },
        { title: "We Should All Be Feminists", year: 2014 },
        { title: "Men Explain Things to Me", year: 2014 },
      ]},
      { connection: "Japanese postwar fiction that grapples with national trauma and identity", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Black Rain", year: 1965 },
        { title: "The Sound of Waves", year: 1954 },
        { title: "The Wild Geese", year: 1911 },
        { title: "The Makioka Sisters", year: 1948 },
      ]},
      { connection: "Volumes 1–4 of Elena Ferrante's Neapolitan Novels series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "My Brilliant Friend", year: 2011 },
        { title: "The Story of a New Name", year: 2012 },
        { title: "Those Who Leave and Those Who Stay", year: 2013 },
        { title: "The Story of the Lost Child", year: 2014 },
      ]},
      { connection: "Book titles that are also weather phenomena", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Storm", year: 1901 },
        { title: "Hailstorm", year: 2017 },
        { title: "Fog", year: 1914 },
        { title: "Blizzard", year: 2016 },
      ]},
    ],
  },
  // Puzzle 52
  {
    groups: [
      { connection: "Pulitzer Prize-winning works of nonfiction journalism", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Looming Tower", year: 2006 },
        { title: "Hiroshima", year: 1946 },
        { title: "The Executioner's Song", year: 1979 },
        { title: "The Soul of a New Machine", year: 1981 },
      ]},
      { connection: "Victorian novels by women writing under male pen names", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Jane Eyre", year: 1847 },
        { title: "Middlemarch", year: 1871 },
        { title: "Adam Bede", year: 1859 },
        { title: "Wuthering Heights", year: 1847 },
      ]},
      { connection: "The first four novels in C.S. Lewis's Chronicles of Narnia series (publication order)", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Lion, the Witch and the Wardrobe", year: 1950 },
        { title: "Prince Caspian", year: 1951 },
        { title: "The Voyage of the Dawn Treader", year: 1952 },
        { title: "The Silver Chair", year: 1953 },
      ]},
      { connection: "Book titles that are exactly two words where both words are colors", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Black White", year: 2008 },
        { title: "Red White", year: 2022 },
        { title: "Golden Green", year: 2004 },
        { title: "Blue Black", year: 2016 },
      ]},
    ],
  },
  // Puzzle 53
  {
    groups: [
      { connection: "Famous American memoirs about addiction and recovery", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Beautiful Boy", year: 2008 },
        { title: "Tweak", year: 2008 },
        { title: "Portrait of an Addict as a Young Man", year: 2010 },
        { title: "Lit", year: 2009 },
      ]},
      { connection: "Foundational works of the Russian Silver Age literary movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Petersburg", year: 1913 },
        { title: "The Twelve", year: 1918 },
        { title: "We", year: 1924 },
        { title: "The Master and Margarita", year: 1967 },
      ]},
      { connection: "Books in Karl Ove Knausgård's My Struggle autobiographical series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "My Struggle: Book 1", year: 2009 },
        { title: "My Struggle: Book 2", year: 2009 },
        { title: "My Struggle: Book 3", year: 2009 },
        { title: "My Struggle: Book 4", year: 2010 },
      ]},
      { connection: "Book titles that are single common verbs in their base form", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Breathe", year: 2021 },
        { title: "Shiver", year: 2009 },
        { title: "Burn", year: 2010 },
        { title: "Speak", year: 1999 },
      ]},
    ],
  },
  // Puzzle 54
  {
    groups: [
      { connection: "Groundbreaking science memoirs about living with or studying illness", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "When Breath Becomes Air", year: 2016 },
        { title: "The Immortal Life of Henrietta Lacks", year: 2010 },
        { title: "Brain on Fire", year: 2012 },
        { title: "The Diving Bell and the Butterfly", year: 1997 },
      ]},
      { connection: "Key novels of the Irish Literary Revival / Celtic Twilight movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Dubliners", year: 1914 },
        { title: "The Playboy of the Western World", year: 1907 },
        { title: "The Shadow of a Gunman", year: 1923 },
        { title: "At Swim-Two-Birds", year: 1939 },
      ]},
      { connection: "Installments 1–4 of the Thursday Next series by Jasper Fforde", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Eyre Affair", year: 2001 },
        { title: "Lost in a Good Book", year: 2002 },
        { title: "The Well of Lost Plots", year: 2003 },
        { title: "Something Rotten", year: 2004 },
      ]},
      { connection: "Book titles that contain a tree or plant as the only noun", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Oleander Girl", year: 2013 },
        { title: "Birch", year: 2021 },
        { title: "Thistle", year: 2020 },
        { title: "Fern Hill", year: 1945 },
      ]},
    ],
  },
  // Puzzle 55
  {
    groups: [
      { connection: "Iconic travel memoirs recounting transformative solo journeys", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Wild", year: 2012 },
        { title: "Eat, Pray, Love", year: 2006 },
        { title: "In Patagonia", year: 1977 },
        { title: "A Year in Provence", year: 1989 },
      ]},
      { connection: "Novels of the Négritude literary movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Black Shack Alley", year: 1950 },
        { title: "Season in the Congo", year: 1966 },
        { title: "Return to My Native Land", year: 1939 },
        { title: "The African Child", year: 1953 },
      ]},
      { connection: "Novels 1–4 of Stieg Larsson's Millennium series (including continuation)", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Girl with the Dragon Tattoo", year: 2005 },
        { title: "The Girl Who Played with Fire", year: 2006 },
        { title: "The Girl Who Kicked the Hornets' Nest", year: 2007 },
        { title: "The Girl in the Spider's Web", year: 2015 },
      ]},
      { connection: "One-word book titles that are also types of precipitation or water movement", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Flood", year: 2008 },
        { title: "Mist", year: 1914 },
        { title: "Sleet", year: 2013 },
        { title: "Drift", year: 2012 },
      ]},
    ],
  },
  // Puzzle 56
  {
    groups: [
      { connection: "Essential essay collections by Black American writers on race and identity", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Fire Next Time", year: 1963 },
        { title: "Between the World and Me", year: 2015 },
        { title: "Notes of a Native Son", year: 1955 },
        { title: "Sister Outsider", year: 1984 },
      ]},
      { connection: "Novels central to the Italian Neorealist literary movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Christ Stopped at Eboli", year: 1945 },
        { title: "The Path to the Spiders' Nests", year: 1947 },
        { title: "Conversations in Sicily", year: 1941 },
        { title: "The House by the Medlar Tree", year: 1881 },
      ]},
      { connection: "Books 1–4 of Diana Gabaldon's Outlander series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Outlander", year: 1991 },
        { title: "Dragonfly in Amber", year: 1992 },
        { title: "Voyager", year: 1993 },
        { title: "Drums of Autumn", year: 1996 },
      ]},
      { connection: "Book titles that are a color followed by a single noun", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "White Noise", year: 1985 },
        { title: "Red Mars", year: 1992 },
        { title: "Blue Monday", year: 1985 },
        { title: "Green Grass", year: 2017 },
      ]},
    ],
  },
  // Puzzle 57
  {
    groups: [
      { connection: "Seminal works of New Journalism long-form nonfiction", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "In Cold Blood", year: 1966 },
        { title: "The Electric Kool-Aid Acid Test", year: 1968 },
        { title: "The Right Stuff", year: 1979 },
        { title: "Armies of the Night", year: 1968 },
      ]},
      { connection: "Major works of the Symbolist movement in European prose", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Against Nature", year: 1884 },
        { title: "The Picture of Dorian Gray", year: 1890 },
        { title: "Bruges-la-Morte", year: 1892 },
        { title: "The Notebooks of Malte Laurids Brigge", year: 1910 },
      ]},
      { connection: "Volumes 1–4 of Hilary Mantel's Thomas Cromwell trilogy plus companion work", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Wolf Hall", year: 2009 },
        { title: "Bring Up the Bodies", year: 2012 },
        { title: "The Mirror and the Light", year: 2020 },
        { title: "The Assassination of Margaret Thatcher", year: 2014 },
      ]},
      { connection: "Book titles that are exactly one word and also a human body part", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Skin", year: 1995 },
        { title: "Gut", year: 2014 },
        { title: "Throat", year: 2021 },
        { title: "Bone", year: 1993 },
      ]},
    ],
  },
  // Puzzle 58
  {
    groups: [
      { connection: "Influential American poetry collections of the 20th century", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Howl and Other Poems", year: 1956 },
        { title: "Ariel", year: 1965 },
        { title: "Leaves of Grass", year: 1855 },
        { title: "Life Studies", year: 1959 },
      ]},
      { connection: "Novels foundational to the Naturalist literary movement in America", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "McTeague", year: 1899 },
        { title: "Maggie: A Girl of the Streets", year: 1893 },
        { title: "Sister Carrie", year: 1900 },
        { title: "The Octopus", year: 1901 },
      ]},
      { connection: "First four books in George R.R. Martin's A Song of Ice and Fire series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "A Game of Thrones", year: 1996 },
        { title: "A Clash of Kings", year: 1998 },
        { title: "A Storm of Swords", year: 2000 },
        { title: "A Feast for Crows", year: 2005 },
      ]},
      { connection: "Book titles that are common greetings or farewells", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Hello", year: 2015 },
        { title: "Farewell", year: 1929 },
        { title: "Goodbye, Columbus", year: 1959 },
        { title: "Aloha", year: 2014 },
      ]},
    ],
  },
  // Puzzle 59
  {
    groups: [
      { connection: "Celebrated memoirs of childhood in poverty or hardship", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Angela's Ashes", year: 1996 },
        { title: "The Glass Castle", year: 2005 },
        { title: "Educated", year: 2018 },
        { title: "Hillbilly Elegy", year: 2016 },
      ]},
      { connection: "Foundational novels of the Magical Realist Latin American tradition before the Boom", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Kingdom of This World", year: 1949 },
        { title: "Pedro Páramo", year: 1955 },
        { title: "The Lost Steps", year: 1953 },
        { title: "Men of Maize", year: 1949 },
      ]},
      { connection: "Books 1–4 of Robin Hobb's Realm of the Elderlings: Farseer Trilogy + first Tawny Man book", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Assassin's Apprentice", year: 1995 },
        { title: "Royal Assassin", year: 1996 },
        { title: "Assassin's Quest", year: 1997 },
        { title: "Fool's Errand", year: 2001 },
      ]},
      { connection: "Book titles composed solely of two nouns joined by 'and' where both nouns are abstract concepts", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Crime and Punishment", year: 1866 },
        { title: "War and Peace", year: 1869 },
        { title: "Pride and Prejudice", year: 1813 },
        { title: "Sense and Sensibility", year: 1811 },
      ]},
    ],
  },
  // Puzzle 60
  {
    groups: [
      { connection: "Landmark investigative books exposing systemic corporate wrongdoing", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Jungle", year: 1906 },
        { title: "Silent Spring", year: 1962 },
        { title: "Fast Food Nation", year: 2001 },
        { title: "Nickel and Dimed", year: 2001 },
      ]},
      { connection: "Key texts of the Lost Generation literary movement set in Europe", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Sun Also Rises", year: 1926 },
        { title: "A Farewell to Arms", year: 1929 },
        { title: "Tender Is the Night", year: 1934 },
        { title: "The Torrents of Spring", year: 1926 },
      ]},
      { connection: "First four books of Philip Pullman's His Dark Materials universe (including The Book of Dust)", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Northern Lights", year: 1995 },
        { title: "The Subtle Knife", year: 1997 },
        { title: "The Amber Spyglass", year: 2000 },
        { title: "La Belle Sauvage", year: 2017 },
      ]},
      { connection: "Book titles that spell out a number instead of using a digit", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "One Flew Over the Cuckoo's Nest", year: 1962 },
        { title: "Two Years Before the Mast", year: 1840 },
        { title: "Three Sisters", year: 1901 },
        { title: "Seven Pillars of Wisdom", year: 1926 },
      ]},
    ],
  },
  // Puzzle 61
  {
    groups: [
      { connection: "Celebrated works of narrative history that read like novels", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Devil in the White City", year: 2003 },
        { title: "Dead Wake", year: 2015 },
        { title: "The Warmth of Other Suns", year: 2010 },
        { title: "Isaac's Storm", year: 1999 },
      ]},
      { connection: "Novels of the Weimar-era German Expressionist literary movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Berlin Alexanderplatz", year: 1929 },
        { title: "The Man Without Qualities", year: 1930 },
        { title: "Steppenwolf", year: 1927 },
        { title: "All Quiet on the Western Front", year: 1929 },
      ]},
      { connection: "Books 1–4 in Joe Abercrombie's First Law world (trilogy + first standalone)", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Blade Itself", year: 2006 },
        { title: "Before They Are Hanged", year: 2007 },
        { title: "Last Argument of Kings", year: 2008 },
        { title: "Best Served Cold", year: 2009 },
      ]},
      { connection: "Book titles that are an adjective plus a single weather word", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Perfect Storm", year: 1997 },
        { title: "Cold Mountain", year: 1997 },
        { title: "Dark Tornado", year: 2019 },
        { title: "Bitter Wind", year: 2003 },
      ]},
    ],
  },
  // Puzzle 62
  {
    groups: [
      { connection: "Foundational works of creative nonfiction and personal essays by women of color", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Zami: A Biomythography", year: 1982 },
        { title: "The Woman Warrior", year: 1976 },
        { title: "This Bridge Called My Back", year: 1981 },
        { title: "Borderlands/La Frontera", year: 1987 },
      ]},
      { connection: "Core novels of the French New Novel (Nouveau Roman) movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Erasers", year: 1953 },
        { title: "Jealousy", year: 1957 },
        { title: "Moderato Cantabile", year: 1958 },
        { title: "The Planetarium", year: 1959 },
      ]},
      { connection: "First four books in Seanan McGuire's October Daye urban fantasy series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Rosemary and Rue", year: 2009 },
        { title: "A Local Habitation", year: 2010 },
        { title: "An Artificial Night", year: 2010 },
        { title: "Late Eclipses", year: 2011 },
      ]},
      { connection: "Book titles that are questions with no question mark in the title", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Who's Afraid of Virginia Woolf", year: 1962 },
        { title: "What Maisie Knew", year: 1897 },
        { title: "Why I Live at the P.O.", year: 1941 },
        { title: "Where Angels Fear to Tread", year: 1905 },
      ]},
    ],
  },
  // Puzzle 63
  {
    groups: [
      { connection: "Iconic works of food writing and culinary memoir", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Art of Eating", year: 1954 },
        { title: "Kitchen Confidential", year: 2000 },
        { title: "An Everlasting Meal", year: 2011 },
        { title: "My Life in France", year: 2006 },
      ]},
      { connection: "Novels representative of the Scandinavian Modernist literary movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hunger", year: 1890 },
        { title: "The People of Hemsö", year: 1887 },
        { title: "Pan", year: 1894 },
        { title: "Growth of the Soil", year: 1917 },
      ]},
      { connection: "Books 1–4 of Lois McMaster Bujold's Vorkosigan Saga (in internal chronological order)", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Shards of Honor", year: 1986 },
        { title: "Barrayar", year: 1991 },
        { title: "The Warrior's Apprentice", year: 1986 },
        { title: "The Vor Game", year: 1990 },
      ]},
      { connection: "Book titles where the only noun is a gemstone or precious mineral", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Ruby", year: 1994 },
        { title: "Sapphire", year: 1996 },
        { title: "Obsidian", year: 2012 },
        { title: "Onyx", year: 2013 },
      ]},
    ],
  },
  // Puzzle 64
  {
    groups: [
      { connection: "Landmark works of American Black feminist literary theory and criticism", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Black Feminist Thought", year: 1990 },
        { title: "Ain't I a Woman", year: 1981 },
        { title: "All the Women Are White, All the Blacks Are Men, But Some of Us Are Brave", year: 1982 },
        { title: "In Search of Our Mothers' Gardens", year: 1983 },
      ]},
      { connection: "Central texts of the Objectivist poetry movement in America", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "55 Poems", year: 1941 },
        { title: "Anew", year: 1946 },
        { title: "The Materials", year: 1962 },
        { title: "All: The Collected Short Poems", year: 1965 },
      ]},
      { connection: "First four books of Tamora Pierce's Tortall: Song of the Lioness quartet", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Alanna: The First Adventure", year: 1983 },
        { title: "In the Hand of the Goddess", year: 1984 },
        { title: "The Woman Who Rides Like a Man", year: 1986 },
        { title: "Lioness Rampant", year: 1988 },
      ]},
      { connection: "Book titles containing a number between 1 and 10 spelled as a digit", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Fahrenheit 451", year: 1953 },
        { title: "1984", year: 1949 },
        { title: "22/11/63", year: 2011 },
        { title: "2001: A Space Odyssey", year: 1968 },
      ]},
    ],
  },
  // Puzzle 65
  {
    groups: [
      { connection: "Pivotal works of the civil rights oral history and documentary nonfiction tradition", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Eyes on the Prize", year: 1987 },
        { title: "Parting the Waters", year: 1988 },
        { title: "At Canaan's Edge", year: 2006 },
        { title: "Bearing the Cross", year: 1986 },
      ]},
      { connection: "Novels of the Prague Spring era Czech dissident literary movement", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Joke", year: 1967 },
        { title: "The Farewell Party", year: 1976 },
        { title: "Too Loud a Solitude", year: 1976 },
        { title: "I Served the King of England", year: 1971 },
      ]},
      { connection: "Books 1–4 of Naomi Novik's Temeraire series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "His Majesty's Dragon", year: 2006 },
        { title: "Throne of Jade", year: 2006 },
        { title: "Black Powder War", year: 2006 },
        { title: "Empire of Ivory", year: 2007 },
      ]},
      { connection: "Book titles that contain the word 'light' or 'dark' as the only adjective", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Darkness at Noon", year: 1940 },
        { title: "Light in August", year: 1932 },
        { title: "Dark Matter", year: 2016 },
        { title: "The Darkening Age", year: 2017 },
      ]},
    ],
  },
  // Puzzle 66
  {
    groups: [
      { connection: "Celebrated long-form oral history collections by Studs Terkel", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Working", year: 1974 },
        { title: "Hard Times", year: 1970 },
        { title: "The Good War", year: 1984 },
        { title: "Race", year: 1992 },
      ]},
      { connection: "Representative works of the Turkish literary renaissance of the late 20th century", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "My Name Is Red", year: 1998 },
        { title: "Snow", year: 2002 },
        { title: "The Museum of Innocence", year: 2008 },
        { title: "The White Castle", year: 1985 },
      ]},
      { connection: "First four books of Steven Erikson's Malazan Book of the Fallen series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Gardens of the Moon", year: 1999 },
        { title: "Deadhouse Gates", year: 2000 },
        { title: "Memories of Ice", year: 2001 },
        { title: "House of Chains", year: 2002 },
      ]},
      { connection: "Book titles that are an imperative verb (command) directed at the reader", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Beloved", year: 1987 },
        { title: "Go Tell It on the Mountain", year: 1953 },
        { title: "Run", year: 2007 },
        { title: "Look Homeward, Angel", year: 1929 },
      ]},
    ],
  },
  // Puzzle 67
  {
    groups: [
      { connection: "Major works of the Bloomsbury Group's nonfiction and criticism", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A Room of One's Own", year: 1929 },
        { title: "Eminent Victorians", year: 1918 },
        { title: "The Common Reader", year: 1925 },
        { title: "Principia Ethica", year: 1903 },
      ]},
      { connection: "Central novels of the 1970s–80s Indian postcolonial literary movement in English", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Midnight's Children", year: 1981 },
        { title: "The God of Small Things", year: 1997 },
        { title: "The Shadow Lines", year: 1988 },
        { title: "A Suitable Boy", year: 1993 },
      ]},
      { connection: "Books 1–4 of Anthony Trollope's Chronicles of Barsetshire series", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Warden", year: 1855 },
        { title: "Barchester Towers", year: 1857 },
        { title: "Doctor Thorne", year: 1858 },
        { title: "Framley Parsonage", year: 1861 },
      ]},
      { connection: "Book titles that begin with 'The' and end with a single-syllable verb", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Burn", year: 1975 },
        { title: "The Fall", year: 1956 },
        { title: "The Wake", year: 2014 },
        { title: "The Drift", year: 2022 },
      ]},
    ],
  },
  // Puzzle 68
  {
    groups: [
      { connection: "Watershed works of American disability memoir and narrative", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Story of My Life", year: 1903 },
        { title: "Darkness Visible", year: 1990 },
        { title: "Far from the Tree", year: 2012 },
        { title: "The Reason I Jump", year: 2007 },
      ]},
      { connection: "Novels central to the Nigerian literary renaissance of the postcolonial period", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Things Fall Apart", year: 1958 },
        { title: "Weep Not, Child", year: 1964 },
        { title: "Purple Hibiscus", year: 2003 },
        { title: "Season of Migration to the North", year: 1966 },
      ]},
      { connection: "Books 1–4 of Patrick Rothfuss's Kingkiller Chronicle plus related novella", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Name of the Wind", year: 2007 },
        { title: "The Wise Man's Fear", year: 2011 },
        { title: "The Slow Regard of Silent Things", year: 2014 },
        { title: "How Old Holly Came To Be", year: 2013 },
      ]},
      { connection: "Book titles that are the possessive form of a woman's first name", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Lolita", year: 1955 },
        { title: "Emma", year: 1815 },
        { title: "Carrie", year: 1974 },
        { title: "Roxana", year: 1724 },
      ]},
    ],
  },
  // Puzzle 69
  {
    groups: [
      { connection: "Essential works of New York School poetry", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Lunch Poems", year: 1964 },
        { title: "Meditations in an Emergency", year: 1957 },
        { title: "The Tennis Court Oath", year: 1962 },
        { title: "Tulips and Chimneys", year: 1923 },
      ]},
      { connection: "Representative novels of the Polish literary school of the interwar period", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Ferdydurke", year: 1937 },
        { title: "Sanatorium Under the Sign of the Hourglass", year: 1937 },
        { title: "The Street of Crocodiles", year: 1934 },
        { title: "Pharaoh", year: 1897 },
      ]},
      { connection: "Books 1–4 of Kim Stanley Robinson's Mars trilogy plus standalone companion", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Red Mars", year: 1992 },
        { title: "Green Mars", year: 1993 },
        { title: "Blue Mars", year: 1996 },
        { title: "The Martians", year: 1999 },
      ]},
      { connection: "Book titles that contain the name of a chess piece", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "The Queen's Gambit", year: 1983 },
        { title: "The Knight at Dawn", year: 1993 },
        { title: "Bishop's Progress", year: 1939 },
        { title: "The Rook", year: 2012 },
      ]},
    ],
  },
  // Puzzle 70
  {
    groups: [
      { connection: "Influential books of popular psychology and behavioral economics nonfiction", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Thinking, Fast and Slow", year: 2011 },
        { title: "The Tipping Point", year: 2000 },
        { title: "Predictably Irrational", year: 2008 },
        { title: "Blink", year: 2005 },
      ]},
      { connection: "Core texts of the Afro-Brazilian literary movement and Negrismo", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Jubiabá", year: 1935 },
        { title: "Tenda dos Milagres", year: 1969 },
        { title: "The Black Jacobins", year: 1938 },
        { title: "Masters and the Slaves", year: 1933 },
      ]},
      { connection: "First four novels in R.F. Kuang's Babel / Poppy War universe (publication order)", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Poppy War", year: 2018 },
        { title: "The Dragon Republic", year: 2019 },
        { title: "The Burning God", year: 2020 },
        { title: "Babel", year: 2022 },
      ]},
      { connection: "Book titles that are alliterative two-word phrases (same first consonant)", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Slaughterhouse-Five", year: 1969 },
        { title: "Wuthering Heights", year: 1847 },
        { title: "Bleak House", year: 1853 },
        { title: "Persuasion", year: 1817 },
      ]},
    ],
  },
  // Puzzle 71
  {
    groups: [
      { connection: "Essential poetry collections of the Confessional poetry movement", connection_type: "nonfiction", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Colossus", year: 1960 },
        { title: "Heart's Needle", year: 1959 },
        { title: "For the Union Dead", year: 1964 },
        { title: "The Dream Songs", year: 1969 },
      ]},
      { connection: "Novels of the Magical Realist movement in African literature", connection_type: "movement", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Palm-Wine Drinkard", year: 1952 },
        { title: "Ben Jelloun's The Sand Child", year: 1985 },
        { title: "Petals of Blood", year: 1977 },
        { title: "Our Sister Killjoy", year: 1977 },
      ]},
      { connection: "First four books of Scott Lynch's Gentleman Bastard sequence", connection_type: "series", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "The Lies of Locke Lamora", year: 2006 },
        { title: "Red Seas Under Red Skies", year: 2007 },
        { title: "The Republic of Thieves", year: 2013 },
        { title: "The Thorn of Emberlain", year: 2025 },
      ]},
      { connection: "Book titles that are a single abstract noun meaning absence or lack", connection_type: "title_wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Absence", year: 2012 },
        { title: "Void", year: 2010 },
        { title: "Silence", year: 1966 },
        { title: "Emptiness", year: 2019 },
      ]},
    ],
  },
];
