import type { PuzzleDef } from './types';

export const bookPuzzles: PuzzleDef[] = [
  // Puzzle 1
  {
    groups: [
      { connection: 'Novels by Jane Austen', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Pride and Prejudice', year: 1813 },
        { title: 'Sense and Sensibility', year: 1811 },
        { title: 'Emma', year: 1815 },
        { title: 'Persuasion', year: 1817 },
      ]},
      { connection: 'Dystopian novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: '1984', year: 1949 },
        { title: 'Brave New World', year: 1932 },
        { title: 'Fahrenheit 451', year: 1953 },
        { title: 'The Handmaid\'s Tale', year: 1985 },
      ]},
      { connection: 'Books with a color in the title', connection_type: 'title_wordplay', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Color Purple', year: 1982 },
        { title: 'A Clockwork Orange', year: 1962 },
        { title: 'The Scarlet Letter', year: 1850 },
        { title: 'Anne of Green Gables', year: 1908 },
      ]},
      { connection: 'Books whose title is a single name', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Beloved', year: 1987 },
        { title: 'Rebecca', year: 1938 },
        { title: 'Dracula', year: 1897 },
        { title: 'Frankenstein', year: 1818 },
      ]},
    ],
  },
  // Puzzle 2
  {
    groups: [
      { connection: 'Novels by Charles Dickens', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Great Expectations', year: 1861 },
        { title: 'A Tale of Two Cities', year: 1859 },
        { title: 'Oliver Twist', year: 1838 },
        { title: 'David Copperfield', year: 1850 },
      ]},
      { connection: 'Books set in World War II', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Book Thief', year: 2005 },
        { title: 'Catch-22', year: 1961 },
        { title: 'Slaughterhouse-Five', year: 1969 },
        { title: 'The Diary of a Young Girl', year: 1947 },
      ]},
      { connection: 'Books adapted into Best Picture Oscar winners', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Silence of the Lambs', year: 1988 },
        { title: 'No Country for Old Men', year: 2005 },
        { title: 'Gone with the Wind', year: 1936 },
        { title: 'One Flew Over the Cuckoo\'s Nest', year: 1962 },
      ]},
      { connection: 'Books with a number in the title', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Three Musketeers', year: 1844 },
        { title: 'The Five People You Meet in Heaven', year: 2003 },
        { title: '1984', year: 1949 },
        { title: 'The 39 Steps', year: 1915 },
      ]},
    ],
  },
  // Puzzle 3
  {
    groups: [
      { connection: 'Novels by Ernest Hemingway', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Old Man and the Sea', year: 1952 },
        { title: 'A Farewell to Arms', year: 1929 },
        { title: 'The Sun Also Rises', year: 1926 },
        { title: 'For Whom the Bell Tolls', year: 1940 },
      ]},
      { connection: 'Coming-of-age novels', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Catcher in the Rye', year: 1951 },
        { title: 'To Kill a Mockingbird', year: 1960 },
        { title: 'A Tree Grows in Brooklyn', year: 1943 },
        { title: 'The Perks of Being a Wallflower', year: 1999 },
      ]},
      { connection: 'Books that begin with "The Great"', connection_type: 'title_wordplay', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'The Great Alone', year: 2018 },
        { title: 'The Great Train Robbery', year: 1975 },
        { title: 'The Great Divorce', year: 1945 },
      ]},
      { connection: 'Books whose title sounds like a weather report', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Cold Mountain', year: 1997 },
        { title: 'Snow Falling on Cedars', year: 1994 },
        { title: 'The Winds of War', year: 1971 },
        { title: 'Cloudy with a Chance of Meatballs', year: 1978 },
      ]},
    ],
  },
  // Puzzle 4
  {
    groups: [
      { connection: 'Novels by Stephen King', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Shining', year: 1977 },
        { title: 'It', year: 1986 },
        { title: 'Carrie', year: 1974 },
        { title: 'Misery', year: 1987 },
      ]},
      { connection: 'Books about the ocean or sailing', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Moby-Dick', year: 1851 },
        { title: 'Life of Pi', year: 2001 },
        { title: 'The Old Man and the Sea', year: 1952 },
        { title: '20,000 Leagues Under the Sea', year: 1870 },
      ]},
      { connection: 'Debut novels that became classics', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'To Kill a Mockingbird', year: 1960 },
        { title: 'The Bell Jar', year: 1963 },
        { title: 'Frankenstein', year: 1818 },
        { title: 'Wuthering Heights', year: 1847 },
      ]},
      { connection: 'Books whose title contains an animal', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Call of the Wild', year: 1903 },
        { title: 'One Flew Over the Cuckoo\'s Nest', year: 1962 },
        { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 },
        { title: 'Of Mice and Men', year: 1937 },
      ]},
    ],
  },
  // Puzzle 5
  {
    groups: [
      { connection: 'Novels by F. Scott Fitzgerald', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Tender Is the Night', year: 1934 },
        { title: 'This Side of Paradise', year: 1920 },
        { title: 'The Beautiful and Damned', year: 1922 },
      ]},
      { connection: 'Gothic novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Jane Eyre', year: 1847 },
        { title: 'Wuthering Heights', year: 1847 },
        { title: 'The Picture of Dorian Gray', year: 1890 },
        { title: 'Rebecca', year: 1938 },
      ]},
      { connection: 'Pulitzer Prize winners for Fiction', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Road', year: 2006 },
        { title: 'Beloved', year: 1987 },
        { title: 'The Color Purple', year: 1982 },
        { title: 'The Grapes of Wrath', year: 1939 },
      ]},
      { connection: 'Books whose title is "The ___ of ___"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'The Phantom of the Opera', year: 1910 },
        { title: 'The Temple of the Golden Pavilion', year: 1956 },
        { title: 'The Count of Monte Cristo', year: 1844 },
      ]},
    ],
  },
  // Puzzle 6
  {
    groups: [
      { connection: 'Novels by Agatha Christie', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Murder on the Orient Express', year: 1934 },
        { title: 'And Then There Were None', year: 1939 },
        { title: 'The Murder of Roger Ackroyd', year: 1926 },
        { title: 'Death on the Nile', year: 1937 },
      ]},
      { connection: 'Books set in India', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The God of Small Things', year: 1997 },
        { title: 'A Passage to India', year: 1924 },
        { title: 'Midnight\'s Children', year: 1981 },
        { title: 'The White Tiger', year: 2008 },
      ]},
      { connection: 'Books that inspired TV series', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Handmaid\'s Tale', year: 1985 },
        { title: 'Big Little Lies', year: 2014 },
        { title: 'Game of Thrones', year: 1996 },
        { title: 'Outlander', year: 1991 },
      ]},
      { connection: 'Books with a possessive name in the title', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Alice\'s Adventures in Wonderland', year: 1865 },
        { title: 'Gulliver\'s Travels', year: 1726 },
        { title: 'Sophie\'s Choice', year: 1979 },
        { title: 'Bridget Jones\'s Diary', year: 1996 },
      ]},
    ],
  },
  // Puzzle 7
  {
    groups: [
      { connection: 'Novels by George Orwell', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: '1984', year: 1949 },
        { title: 'Animal Farm', year: 1945 },
        { title: 'Down and Out in Paris and London', year: 1933 },
        { title: 'Burmese Days', year: 1934 },
      ]},
      { connection: 'Southern Gothic novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'To Kill a Mockingbird', year: 1960 },
        { title: 'A Streetcar Named Desire', year: 1947 },
        { title: 'Wise Blood', year: 1952 },
        { title: 'The Sound and the Fury', year: 1929 },
      ]},
      { connection: 'Books that take place in a single day', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Mrs Dalloway', year: 1925 },
        { title: 'Ulysses', year: 1922 },
        { title: 'One Day in the Life of Ivan Denisovich', year: 1962 },
        { title: 'Saturday', year: 2005 },
      ]},
      { connection: 'Books whose title begins with a preposition', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Of Mice and Men', year: 1937 },
        { title: 'In Cold Blood', year: 1966 },
        { title: 'Under the Volcano', year: 1947 },
        { title: 'Between the World and Me', year: 2015 },
      ]},
    ],
  },
  // Puzzle 8
  {
    groups: [
      { connection: 'Novels by Toni Morrison', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Beloved', year: 1987 },
        { title: 'Song of Solomon', year: 1977 },
        { title: 'The Bluest Eye', year: 1970 },
        { title: 'Sula', year: 1973 },
      ]},
      { connection: 'Science fiction classics', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Dune', year: 1965 },
        { title: 'Ender\'s Game', year: 1985 },
        { title: 'The Left Hand of Darkness', year: 1969 },
        { title: 'Neuromancer', year: 1984 },
      ]},
      { connection: 'Books narrated by children', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Room', year: 2010 },
        { title: 'The Lovely Bones', year: 2002 },
        { title: 'Extremely Loud and Incredibly Close', year: 2005 },
        { title: 'The Adventures of Huckleberry Finn', year: 1884 },
      ]},
      { connection: 'Books whose title contains a body of water', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Old Man and the Sea', year: 1952 },
        { title: 'Walden', year: 1854 },
        { title: 'The River Why', year: 1983 },
        { title: 'Death on the Nile', year: 1937 },
      ]},
    ],
  },
  // Puzzle 9
  {
    groups: [
      { connection: 'Novels by Mark Twain', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Adventures of Tom Sawyer', year: 1876 },
        { title: 'The Adventures of Huckleberry Finn', year: 1884 },
        { title: 'A Connecticut Yankee in King Arthur\'s Court', year: 1889 },
        { title: 'The Prince and the Pauper', year: 1881 },
      ]},
      { connection: 'Magical realism novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'Like Water for Chocolate', year: 1989 },
        { title: 'The House of the Spirits', year: 1982 },
        { title: 'Midnight\'s Children', year: 1981 },
      ]},
      { connection: 'Man Booker Prize winners', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Remains of the Day', year: 1989 },
        { title: 'Life of Pi', year: 2001 },
        { title: 'Wolf Hall', year: 2009 },
        { title: 'The English Patient', year: 1992 },
      ]},
      { connection: 'Books whose title mentions a time of day', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Night Circus', year: 2011 },
        { title: 'Twilight of the Idols', year: 1889 },
        { title: 'Breakfast at Tiffany\'s', year: 1958 },
        { title: 'One Morning in Maine', year: 1952 },
      ]},
    ],
  },
  // Puzzle 10
  {
    groups: [
      { connection: 'Novels by J.K. Rowling', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 1, items: [
        { title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
        { title: 'Harry Potter and the Chamber of Secrets', year: 1998 },
        { title: 'Harry Potter and the Prisoner of Azkaban', year: 1999 },
        { title: 'Harry Potter and the Goblet of Fire', year: 2000 },
      ]},
      { connection: 'Books about artificial intelligence or robots', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'I, Robot', year: 1950 },
        { title: 'Do Androids Dream of Electric Sheep?', year: 1968 },
        { title: 'Klara and the Sun', year: 2021 },
        { title: '2001: A Space Odyssey', year: 1968 },
      ]},
      { connection: 'Books banned in schools or libraries', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Catcher in the Rye', year: 1951 },
        { title: 'Brave New World', year: 1932 },
        { title: 'Lord of the Flies', year: 1954 },
        { title: 'The Adventures of Huckleberry Finn', year: 1884 },
      ]},
      { connection: 'Books whose title is a question', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Can You Forgive Her?', year: 1865 },
        { title: 'Are You There God? It\'s Me, Margaret', year: 1970 },
        { title: 'Who Moved My Cheese?', year: 1998 },
        { title: 'Where the Wild Things Are', year: 1963 },
      ]},
    ],
  },
  // Puzzle 11
  {
    groups: [
      { connection: 'Novels by Gabriel Garcia Marquez', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'Love in the Time of Cholera', year: 1985 },
        { title: 'Chronicle of a Death Foretold', year: 1981 },
        { title: 'The Autumn of the Patriarch', year: 1975 },
      ]},
      { connection: 'Books set in prisons', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Count of Monte Cristo', year: 1844 },
        { title: 'The Shawshank Redemption', year: 1982 },
        { title: 'One Day in the Life of Ivan Denisovich', year: 1962 },
        { title: 'Papillon', year: 1969 },
      ]},
      { connection: 'Books with unreliable narrators', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Gone Girl', year: 2012 },
        { title: 'The Catcher in the Rye', year: 1951 },
        { title: 'Atonement', year: 2001 },
        { title: 'We Need to Talk About Kevin', year: 2003 },
      ]},
      { connection: 'Books whose title contains "and"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Pride and Prejudice', year: 1813 },
        { title: 'Crime and Punishment', year: 1866 },
        { title: 'War and Peace', year: 1869 },
        { title: 'Sense and Sensibility', year: 1811 },
      ]},
    ],
  },
  // Puzzle 12
  {
    groups: [
      { connection: 'Novels by Roald Dahl', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Charlie and the Chocolate Factory', year: 1964 },
        { title: 'Matilda', year: 1988 },
        { title: 'James and the Giant Peach', year: 1961 },
        { title: 'The BFG', year: 1982 },
      ]},
      { connection: 'Books about plagues or pandemics', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Plague', year: 1947 },
        { title: 'Station Eleven', year: 2014 },
        { title: 'The Stand', year: 1978 },
        { title: 'The Decameron', year: 1353 },
      ]},
      { connection: 'Books written in the second person', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'If on a Winter\'s Night a Traveler', year: 1979 },
        { title: 'Bright Lights, Big City', year: 1984 },
        { title: 'You', year: 2014 },
        { title: 'Half Asleep in Frog Pajamas', year: 1994 },
      ]},
      { connection: 'Books with a food or drink in the title', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'A Clockwork Orange', year: 1962 },
        { title: 'The Grapes of Wrath', year: 1939 },
        { title: 'Like Water for Chocolate', year: 1989 },
        { title: 'Breakfast at Tiffany\'s', year: 1958 },
      ]},
    ],
  },
  // Puzzle 13
  {
    groups: [
      { connection: 'Novels by Leo Tolstoy', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'War and Peace', year: 1869 },
        { title: 'Anna Karenina', year: 1878 },
        { title: 'The Death of Ivan Ilyich', year: 1886 },
        { title: 'Resurrection', year: 1899 },
      ]},
      { connection: 'Books set on islands', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Lord of the Flies', year: 1954 },
        { title: 'Treasure Island', year: 1883 },
        { title: 'Robinson Crusoe', year: 1719 },
        { title: 'The Tempest', year: 1611 },
      ]},
      { connection: 'Books that begin with an epigraph from another work', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Sun Also Rises', year: 1926 },
        { title: 'Beloved', year: 1987 },
        { title: 'The Waste Land', year: 1922 },
        { title: 'Brideshead Revisited', year: 1945 },
      ]},
      { connection: 'Books whose title has alliteration', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Pride and Prejudice', year: 1813 },
        { title: 'Sense and Sensibility', year: 1811 },
        { title: 'Peter Pan', year: 1911 },
        { title: 'The Great Gatsby', year: 1925 },
      ]},
    ],
  },
  // Puzzle 14
  {
    groups: [
      { connection: 'Novels by Haruki Murakami', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Norwegian Wood', year: 1987 },
        { title: 'Kafka on the Shore', year: 2002 },
        { title: '1Q84', year: 2009 },
        { title: 'The Wind-Up Bird Chronicle', year: 1994 },
      ]},
      { connection: 'Courtroom or legal novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'To Kill a Mockingbird', year: 1960 },
        { title: 'A Time to Kill', year: 1989 },
        { title: 'The Firm', year: 1991 },
        { title: 'Anatomy of a Murder', year: 1958 },
      ]},
      { connection: 'Books published posthumously', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Trial', year: 1925 },
        { title: 'A Confederacy of Dunces', year: 1980 },
        { title: 'The Girl with the Dragon Tattoo', year: 2005 },
        { title: 'Go Set a Watchman', year: 2015 },
      ]},
      { connection: 'Books whose title contains a relative direction (north/south/east/west)', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'East of Eden', year: 1952 },
        { title: 'North and South', year: 1855 },
        { title: 'West with the Night', year: 1942 },
        { title: 'South of the Border, West of the Sun', year: 1992 },
      ]},
    ],
  },
  // Puzzle 15
  {
    groups: [
      { connection: 'Novels by Virginia Woolf', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Mrs Dalloway', year: 1925 },
        { title: 'To the Lighthouse', year: 1927 },
        { title: 'Orlando', year: 1928 },
        { title: 'The Waves', year: 1931 },
      ]},
      { connection: 'Spy or espionage novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Spy Who Came in from the Cold', year: 1963 },
        { title: 'Tinker Tailor Soldier Spy', year: 1974 },
        { title: 'Casino Royale', year: 1953 },
        { title: 'The Bourne Identity', year: 1980 },
      ]},
      { connection: 'Books told in epistolary form (letters or documents)', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Dracula', year: 1897 },
        { title: 'The Color Purple', year: 1982 },
        { title: 'Frankenstein', year: 1818 },
        { title: 'We Need to Talk About Kevin', year: 2003 },
      ]},
      { connection: 'Books whose title starts with "The" followed by a profession', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Alchemist', year: 1988 },
        { title: 'The Magician', year: 2021 },
        { title: 'The Goldfinch', year: 2013 },
        { title: 'The Physician', year: 1986 },
      ]},
    ],
  },
  // Puzzle 16
  {
    groups: [
      { connection: 'Novels by Oscar Wilde', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Picture of Dorian Gray', year: 1890 },
        { title: 'The Importance of Being Earnest', year: 1895 },
        { title: 'An Ideal Husband', year: 1895 },
        { title: 'The Canterville Ghost', year: 1887 },
      ]},
      { connection: 'Survival and adventure novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Robinson Crusoe', year: 1719 },
        { title: 'The Call of the Wild', year: 1903 },
        { title: 'Into the Wild', year: 1996 },
        { title: 'Hatchet', year: 1987 },
      ]},
      { connection: 'Books with a twist ending', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Gone Girl', year: 2012 },
        { title: 'Rebecca', year: 1938 },
        { title: 'The Murder of Roger Ackroyd', year: 1926 },
        { title: 'Atonement', year: 2001 },
      ]},
      { connection: 'Books whose title is a location that doesn\'t exist', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Hogwarts', year: 1997 },
        { title: 'Narnia', year: 1950 },
        { title: 'Neverland', year: 1911 },
        { title: 'Wonderland', year: 1865 },
      ]},
    ],
  },
  // Puzzle 17
  {
    groups: [
      { connection: 'Novels by Fyodor Dostoevsky', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Crime and Punishment', year: 1866 },
        { title: 'The Brothers Karamazov', year: 1880 },
        { title: 'The Idiot', year: 1869 },
        { title: 'Notes from Underground', year: 1864 },
      ]},
      { connection: 'Postmodern novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 6, items: [
        { title: 'Catch-22', year: 1961 },
        { title: 'Slaughterhouse-Five', year: 1969 },
        { title: 'White Noise', year: 1985 },
        { title: 'If on a Winter\'s Night a Traveler', year: 1979 },
      ]},
      { connection: 'Books that are part of a trilogy', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'The Hunger Games', year: 2008 },
        { title: 'The Girl with the Dragon Tattoo', year: 2005 },
        { title: 'Fifty Shades of Grey', year: 2011 },
      ]},
      { connection: 'Books whose title is a person\'s full name', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Anna Karenina', year: 1878 },
        { title: 'David Copperfield', year: 1850 },
        { title: 'Jane Eyre', year: 1847 },
        { title: 'Robinson Crusoe', year: 1719 },
      ]},
    ],
  },
  // Puzzle 18
  {
    groups: [
      { connection: 'Novels by Kurt Vonnegut', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Slaughterhouse-Five', year: 1969 },
        { title: 'Cat\'s Cradle', year: 1963 },
        { title: 'Breakfast of Champions', year: 1973 },
        { title: 'The Sirens of Titan', year: 1959 },
      ]},
      { connection: 'Books about obsession', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Moby-Dick', year: 1851 },
        { title: 'Lolita', year: 1955 },
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Wuthering Heights', year: 1847 },
      ]},
      { connection: 'National Book Award winners', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Corrections', year: 2001 },
        { title: 'Invisible Man', year: 1952 },
        { title: 'A Good Man Is Hard to Find', year: 1955 },
        { title: 'The Shipping News', year: 1993 },
      ]},
      { connection: 'Books whose title contains a piece of furniture or household object', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Bell Jar', year: 1963 },
        { title: 'The Glass Menagerie', year: 1944 },
        { title: 'A Room with a View', year: 1908 },
        { title: 'The Pillars of the Earth', year: 1989 },
      ]},
    ],
  },
  // Puzzle 19
  {
    groups: [
      { connection: 'Novels by John Steinbeck', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Of Mice and Men', year: 1937 },
        { title: 'The Grapes of Wrath', year: 1939 },
        { title: 'East of Eden', year: 1952 },
        { title: 'Cannery Row', year: 1945 },
      ]},
      { connection: 'Fantasy novels with maps in the front', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'The Hobbit', year: 1937 },
        { title: 'A Game of Thrones', year: 1996 },
        { title: 'The Name of the Wind', year: 2007 },
      ]},
      { connection: 'Books that are primarily set in a school', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Secret History', year: 1992 },
        { title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
        { title: 'Lord of the Flies', year: 1954 },
        { title: 'A Separate Peace', year: 1959 },
      ]},
      { connection: 'Books whose title is also a song title', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Norwegian Wood', year: 1987 },
        { title: 'Beloved', year: 1987 },
        { title: 'Eleanor Rigby', year: 2004 },
        { title: 'Stardust', year: 1999 },
      ]},
    ],
  },
  // Puzzle 20
  {
    groups: [
      { connection: 'Novels by Margaret Atwood', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Handmaid\'s Tale', year: 1985 },
        { title: 'The Blind Assassin', year: 2000 },
        { title: 'Oryx and Crake', year: 2003 },
        { title: 'Cat\'s Eye', year: 1988 },
      ]},
      { connection: 'Books about immigrants or immigration', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Americanah', year: 2013 },
        { title: 'The Namesake', year: 2003 },
        { title: 'The Joy Luck Club', year: 1989 },
        { title: 'Brooklyn', year: 2009 },
      ]},
      { connection: 'Books with an animal on the cover (iconic editions)', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Animal Farm', year: 1945 },
        { title: 'The Hitchhiker\'s Guide to the Galaxy', year: 1979 },
        { title: 'Life of Pi', year: 2001 },
        { title: 'Watership Down', year: 1972 },
      ]},
      { connection: 'Books whose title is two words connected by "and"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'War and Peace', year: 1869 },
        { title: 'Crime and Punishment', year: 1866 },
        { title: 'Sense and Sensibility', year: 1811 },
        { title: 'Pride and Prejudice', year: 1813 },
      ]},
    ],
  },
  // Puzzle 21
  {
    groups: [
      { connection: 'Novels by Ray Bradbury', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Fahrenheit 451', year: 1953 },
        { title: 'The Martian Chronicles', year: 1950 },
        { title: 'Something Wicked This Way Comes', year: 1962 },
        { title: 'Dandelion Wine', year: 1957 },
      ]},
      { connection: 'Books about love triangles', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Wuthering Heights', year: 1847 },
        { title: 'Anna Karenina', year: 1878 },
        { title: 'The Age of Innocence', year: 1920 },
        { title: 'Atonement', year: 2001 },
      ]},
      { connection: 'Books translated from Spanish', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'Don Quixote', year: 1605 },
        { title: 'The Shadow of the Wind', year: 2001 },
        { title: 'Like Water for Chocolate', year: 1989 },
      ]},
      { connection: 'Books whose title contains a gemstone or metal', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Goldfinch', year: 2013 },
        { title: 'The Silver Chair', year: 1953 },
        { title: 'Diamonds Are Forever', year: 1956 },
        { title: 'The Iron Heel', year: 1908 },
      ]},
    ],
  },
  // Puzzle 22
  {
    groups: [
      { connection: 'Novels by J.R.R. Tolkien', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 1, items: [
        { title: 'The Hobbit', year: 1937 },
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'The Silmarillion', year: 1977 },
        { title: 'The Children of Hurin', year: 2007 },
      ]},
      { connection: 'Books set in Paris', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Les Miserables', year: 1862 },
        { title: 'A Moveable Feast', year: 1964 },
        { title: 'The Hunchback of Notre-Dame', year: 1831 },
        { title: 'The Phantom of the Opera', year: 1910 },
      ]},
      { connection: 'Books with an opening line everyone knows', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'A Tale of Two Cities', year: 1859 },
        { title: 'Moby-Dick', year: 1851 },
        { title: 'Pride and Prejudice', year: 1813 },
        { title: 'Anna Karenina', year: 1878 },
      ]},
      { connection: 'Books whose title contains a tree or plant', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'A Tree Grows in Brooklyn', year: 1943 },
        { title: 'The Giving Tree', year: 1964 },
        { title: 'Dandelion Wine', year: 1957 },
        { title: 'The Secret Garden', year: 1911 },
      ]},
    ],
  },
  // Puzzle 23
  {
    groups: [
      { connection: 'Southern Gothic novels', connection_type: 'genre_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'To Kill a Mockingbird', year: 1960 },
        { title: 'Go Set a Watchman', year: 2015 },
        { title: 'Beloved', year: 1987 },
        { title: 'Midnight in the Garden of Good and Evil', year: 1994 },
      ]},
      { connection: 'Books about revolution', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'A Tale of Two Cities', year: 1859 },
        { title: 'Animal Farm', year: 1945 },
        { title: 'Les Miserables', year: 1862 },
        { title: 'Doctor Zhivago', year: 1957 },
      ]},
      { connection: 'Books that were originally self-published', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Martian', year: 2011 },
        { title: 'Fifty Shades of Grey', year: 2011 },
        { title: 'Eragon', year: 2003 },
        { title: 'Still Alice', year: 2007 },
      ]},
      { connection: 'Books whose title contains a weapon', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Sword in the Stone', year: 1938 },
        { title: 'A Farewell to Arms', year: 1929 },
        { title: 'The Knife of Never Letting Go', year: 2008 },
        { title: 'The Gun', year: 1952 },
      ]},
    ],
  },
  // Puzzle 24
  {
    groups: [
      { connection: 'Novels by Kazuo Ishiguro', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Remains of the Day', year: 1989 },
        { title: 'Never Let Me Go', year: 2005 },
        { title: 'Klara and the Sun', year: 2021 },
        { title: 'An Artist of the Floating World', year: 1986 },
      ]},
      { connection: 'Horror novels', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Exorcist', year: 1971 },
        { title: 'Dracula', year: 1897 },
        { title: 'Frankenstein', year: 1818 },
        { title: 'The Haunting of Hill House', year: 1959 },
      ]},
      { connection: 'Books where the protagonist is a writer', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Misery', year: 1987 },
        { title: 'The Shining', year: 1977 },
        { title: 'Wonder Boys', year: 1995 },
        { title: 'Atonement', year: 2001 },
      ]},
      { connection: 'Books whose title ends with a verb in the infinitive', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Let the Right One In', year: 2004 },
        { title: 'Born to Run', year: 2009 },
        { title: 'The Power of One', year: 1989 },
        { title: 'A Time to Kill', year: 1989 },
      ]},
    ],
  },
  // Puzzle 25
  {
    groups: [
      { connection: 'Novels by Paulo Coelho', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Alchemist', year: 1988 },
        { title: 'Brida', year: 1990 },
        { title: 'Eleven Minutes', year: 2003 },
        { title: 'The Pilgrimage', year: 1987 },
      ]},
      { connection: 'Books about food or cooking', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Like Water for Chocolate', year: 1989 },
        { title: 'Kitchen Confidential', year: 2000 },
        { title: 'Julie and Julia', year: 2005 },
        { title: 'The Joy of Cooking', year: 1931 },
      ]},
      { connection: 'Books with a female detective or investigator protagonist', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Girl with the Dragon Tattoo', year: 2005 },
        { title: 'Big Little Lies', year: 2014 },
        { title: 'Gone Girl', year: 2012 },
        { title: 'The No. 1 Ladies\' Detective Agency', year: 1998 },
      ]},
      { connection: 'Books whose title is a place + a noun', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Wuthering Heights', year: 1847 },
        { title: 'Mansfield Park', year: 1814 },
        { title: 'Cannery Row', year: 1945 },
        { title: 'Cold Mountain', year: 1997 },
      ]},
    ],
  },
  // Puzzle 26
  {
    groups: [
      { connection: 'Novels by Cormac McCarthy', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Road', year: 2006 },
        { title: 'No Country for Old Men', year: 2005 },
        { title: 'Blood Meridian', year: 1985 },
        { title: 'All the Pretty Horses', year: 1992 },
      ]},
      { connection: 'Books about identity and self-discovery', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Alchemist', year: 1988 },
        { title: 'Siddhartha', year: 1922 },
        { title: 'The Bell Jar', year: 1963 },
        { title: 'Invisible Man', year: 1952 },
      ]},
      { connection: 'Books turned into musicals', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Les Miserables', year: 1862 },
        { title: 'Wicked', year: 1995 },
        { title: 'The Phantom of the Opera', year: 1910 },
        { title: 'The Color Purple', year: 1982 },
      ]},
      { connection: 'Books whose title contains a celestial body', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Sun Also Rises', year: 1926 },
        { title: 'The Fault in Our Stars', year: 2012 },
        { title: 'Klara and the Sun', year: 2021 },
        { title: 'East of the Sun and West of the Moon', year: 1914 },
      ]},
    ],
  },
  // Puzzle 27
  {
    groups: [
      { connection: 'Novels by Herman Melville', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Moby-Dick', year: 1851 },
        { title: 'Bartleby, the Scrivener', year: 1853 },
        { title: 'Billy Budd', year: 1924 },
        { title: 'Typee', year: 1846 },
      ]},
      { connection: 'Books about family sagas', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'East of Eden', year: 1952 },
        { title: 'The House of the Spirits', year: 1982 },
        { title: 'The Corrections', year: 2001 },
      ]},
      { connection: 'Penguin Classics with orange spines', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Great Expectations', year: 1861 },
        { title: 'The Odyssey', year: -800 },
        { title: 'Don Quixote', year: 1605 },
        { title: 'Middlemarch', year: 1871 },
      ]},
      { connection: 'Books whose title contains a season', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Autumn of the Patriarch', year: 1975 },
        { title: 'A Winter\'s Tale', year: 1623 },
        { title: 'Summer', year: 2017 },
        { title: 'Spring Snow', year: 1969 },
      ]},
    ],
  },
  // Puzzle 28
  {
    groups: [
      { connection: 'Novels by Aldous Huxley', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Brave New World', year: 1932 },
        { title: 'Island', year: 1962 },
        { title: 'Point Counter Point', year: 1928 },
        { title: 'The Doors of Perception', year: 1954 },
      ]},
      { connection: 'Books about music or musicians', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Norwegian Wood', year: 1987 },
        { title: 'High Fidelity', year: 1995 },
        { title: 'The Goldberg Variations', year: 2002 },
        { title: 'Song of Solomon', year: 1977 },
      ]},
      { connection: 'Books whose protagonist goes on a physical journey', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'On the Road', year: 1957 },
        { title: 'The Odyssey', year: -800 },
        { title: 'Life of Pi', year: 2001 },
      ]},
      { connection: 'Books whose title contains a type of building', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The House of the Spirits', year: 1982 },
        { title: 'Brideshead Revisited', year: 1945 },
        { title: 'The Castle', year: 1926 },
        { title: 'Mansfield Park', year: 1814 },
      ]},
    ],
  },
  // Puzzle 29
  {
    groups: [
      { connection: 'Bronte sisters novels', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Wuthering Heights', year: 1847 },
        { title: 'Jane Eyre', year: 1847 },
        { title: 'Agnes Grey', year: 1847 },
        { title: 'The Tenant of Wildfell Hall', year: 1848 },
      ]},
      { connection: 'Books about memory and forgetting', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Remains of the Day', year: 1989 },
        { title: 'Still Alice', year: 2007 },
        { title: 'Never Let Me Go', year: 2005 },
        { title: 'The Giver', year: 1993 },
      ]},
      { connection: 'Books set in the future', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: '1984', year: 1949 },
        { title: 'Brave New World', year: 1932 },
        { title: 'The Hunger Games', year: 2008 },
        { title: 'The Time Machine', year: 1895 },
      ]},
      { connection: 'Books whose title contains a verb of motion', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Gone with the Wind', year: 1936 },
        { title: 'Running with Scissors', year: 2002 },
        { title: 'Falling Man', year: 2007 },
        { title: 'The Kite Runner', year: 2003 },
      ]},
    ],
  },
  // Puzzle 30
  {
    groups: [
      { connection: 'Novels by Albert Camus', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Stranger', year: 1942 },
        { title: 'The Plague', year: 1947 },
        { title: 'The Fall', year: 1956 },
        { title: 'The Myth of Sisyphus', year: 1942 },
      ]},
      { connection: 'Books about wealth and class', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Great Expectations', year: 1861 },
        { title: 'The Age of Innocence', year: 1920 },
        { title: 'Crazy Rich Asians', year: 2013 },
      ]},
      { connection: 'Books that take place mostly in one room', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Room', year: 2010 },
        { title: 'No Exit', year: 1944 },
        { title: 'Twelve Angry Men', year: 1954 },
        { title: 'Misery', year: 1987 },
      ]},
      { connection: 'Books whose title starts with "The" and ends with a vowel', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'The White Castle', year: 1985 },
        { title: 'The Castle', year: 1926 },
        { title: 'The Kite Runner', year: 2003 },
        { title: 'The Passage', year: 2010 },
      ]},
    ],
  },
  // Puzzles 31-60
  // Puzzle 31
  {
    groups: [
      { connection: 'Novels by James Joyce', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Ulysses', year: 1922 },
        { title: 'Dubliners', year: 1914 },
        { title: 'A Portrait of the Artist as a Young Man', year: 1916 },
        { title: 'Finnegans Wake', year: 1939 },
      ]},
      { connection: 'Books about artificial worlds or simulations', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Ready Player One', year: 2011 },
        { title: 'The Matrix', year: 1999 },
        { title: 'Neuromancer', year: 1984 },
        { title: 'Snow Crash', year: 1992 },
      ]},
      { connection: 'Costa (formerly Whitbread) Book Award winners', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Curious Incident of the Dog in the Night-Time', year: 2003 },
        { title: 'Life of Pi', year: 2001 },
        { title: 'The Remains of the Day', year: 1989 },
        { title: 'Behind the Scenes at the Museum', year: 1995 },
      ]},
      { connection: 'Books whose title contains a time period', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'A Thousand Splendid Suns', year: 2007 },
        { title: 'Twenty Thousand Leagues Under the Sea', year: 1870 },
        { title: 'The Hundred-Year-Old Man Who Climbed Out the Window', year: 2009 },
      ]},
    ],
  },
  // Puzzle 32
  {
    groups: [
      { connection: 'Novels by Ian Fleming', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Casino Royale', year: 1953 },
        { title: 'From Russia, with Love', year: 1957 },
        { title: 'Goldfinger', year: 1959 },
        { title: 'Dr. No', year: 1958 },
      ]},
      { connection: 'Books about addiction', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'A Million Little Pieces', year: 2003 },
        { title: 'Trainspotting', year: 1993 },
        { title: 'Requiem for a Dream', year: 1978 },
        { title: 'The Basketball Diaries', year: 1978 },
      ]},
      { connection: 'Books with exactly one word as the title', connection_type: 'title_wordplay', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Beloved', year: 1987 },
        { title: 'Dune', year: 1965 },
        { title: 'Atonement', year: 2001 },
        { title: 'Middlesex', year: 2002 },
      ]},
      { connection: 'Books whose title rhymes', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Green Eggs and Ham', year: 1960 },
        { title: 'Fox in Socks', year: 1965 },
        { title: 'Goodnight Moon', year: 1947 },
        { title: 'The Cat in the Hat', year: 1957 },
      ]},
    ],
  },
  // Puzzle 33
  {
    groups: [
      { connection: 'Novels by Victor Hugo', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Les Miserables', year: 1862 },
        { title: 'The Hunchback of Notre-Dame', year: 1831 },
        { title: 'The Man Who Laughs', year: 1869 },
        { title: 'Ninety-Three', year: 1874 },
      ]},
      { connection: 'Books about time travel', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Time Machine', year: 1895 },
        { title: 'Slaughterhouse-Five', year: 1969 },
        { title: 'Outlander', year: 1991 },
        { title: 'The Time Traveler\'s Wife', year: 2003 },
      ]},
      { connection: 'Books with numbers as page-count gimmicks (very long or very short)', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'War and Peace', year: 1869 },
        { title: 'Infinite Jest', year: 1996 },
        { title: 'The Old Man and the Sea', year: 1952 },
        { title: 'Animal Farm', year: 1945 },
      ]},
      { connection: 'Books whose title contains a piece of clothing', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Scarlet Letter', year: 1850 },
        { title: 'The Sisterhood of the Traveling Pants', year: 2001 },
        { title: 'Coat of Many Colors', year: 1994 },
        { title: 'The Red Tent', year: 1997 },
      ]},
    ],
  },
  // Puzzle 34
  {
    groups: [
      { connection: 'Novels by Franz Kafka', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Trial', year: 1925 },
        { title: 'The Metamorphosis', year: 1915 },
        { title: 'The Castle', year: 1926 },
        { title: 'Amerika', year: 1927 },
      ]},
      { connection: 'Books set in Victorian England', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Great Expectations', year: 1861 },
        { title: 'Jane Eyre', year: 1847 },
        { title: 'The Picture of Dorian Gray', year: 1890 },
        { title: 'Middlemarch', year: 1871 },
      ]},
      { connection: 'Books whose author used a pen name', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: '1984', year: 1949 },
        { title: 'The Bell Jar', year: 1963 },
        { title: 'Alice\'s Adventures in Wonderland', year: 1865 },
        { title: 'The Adventures of Tom Sawyer', year: 1876 },
      ]},
      { connection: 'Books whose title ends in "s"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Dubliners', year: 1914 },
        { title: 'The Corrections', year: 2001 },
        { title: 'Middlesex', year: 2002 },
        { title: 'Atonement', year: 2001 },
      ]},
    ],
  },
  // Puzzle 35
  {
    groups: [
      { connection: 'Novels by Daphne du Maurier', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Rebecca', year: 1938 },
        { title: 'Jamaica Inn', year: 1936 },
        { title: 'My Cousin Rachel', year: 1951 },
        { title: 'The Birds', year: 1952 },
      ]},
      { connection: 'Books about the American Dream', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Death of a Salesman', year: 1949 },
        { title: 'American Pastoral', year: 1997 },
        { title: 'The Jungle', year: 1906 },
      ]},
      { connection: 'Books originally published in installments', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Great Expectations', year: 1861 },
        { title: 'The Count of Monte Cristo', year: 1844 },
        { title: 'Anna Karenina', year: 1878 },
        { title: 'Middlemarch', year: 1871 },
      ]},
      { connection: 'Books whose title is a contradiction or oxymoron', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'Brave New World', year: 1932 },
        { title: 'Living Dead Girl', year: 2008 },
        { title: 'True Lies', year: 1991 },
        { title: 'Beautiful Disaster', year: 2012 },
      ]},
    ],
  },
  // Puzzle 36
  {
    groups: [
      { connection: 'Novels by Dan Brown', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 1, items: [
        { title: 'The Da Vinci Code', year: 2003 },
        { title: 'Angels & Demons', year: 2000 },
        { title: 'Inferno', year: 2013 },
        { title: 'The Lost Symbol', year: 2009 },
      ]},
      { connection: 'Books set in ancient Rome or Greece', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Odyssey', year: -800 },
        { title: 'I, Claudius', year: 1934 },
        { title: 'The Song of Achilles', year: 2011 },
        { title: 'Circe', year: 2018 },
      ]},
      { connection: 'Books about colonialism', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Heart of Darkness', year: 1899 },
        { title: 'Things Fall Apart', year: 1958 },
        { title: 'A Passage to India', year: 1924 },
        { title: 'Wide Sargasso Sea', year: 1966 },
      ]},
      { connection: 'Books whose title contains an article of faith or religion', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Paradise Lost', year: 1667 },
        { title: 'The Pilgrim\'s Progress', year: 1678 },
        { title: 'The Monk', year: 1796 },
        { title: 'The Name of the Rose', year: 1980 },
      ]},
    ],
  },
  // Puzzle 37
  {
    groups: [
      { connection: 'Novels by Alexandre Dumas', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Three Musketeers', year: 1844 },
        { title: 'The Count of Monte Cristo', year: 1844 },
        { title: 'The Man in the Iron Mask', year: 1850 },
        { title: 'Twenty Years After', year: 1845 },
      ]},
      { connection: 'Books set in a boarding school', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'A Separate Peace', year: 1959 },
        { title: 'Never Let Me Go', year: 2005 },
        { title: 'The Secret History', year: 1992 },
        { title: 'Lord of the Flies', year: 1954 },
      ]},
      { connection: 'Books by Nobel Prize in Literature winners', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'The Old Man and the Sea', year: 1952 },
        { title: 'Beloved', year: 1987 },
        { title: 'The Remains of the Day', year: 1989 },
      ]},
      { connection: 'Books whose title starts with a number', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: '1984', year: 1949 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: 'Eleven Minutes', year: 2003 },
        { title: 'Twenty Thousand Leagues Under the Sea', year: 1870 },
      ]},
    ],
  },
  // Puzzle 38
  {
    groups: [
      { connection: 'Novels by Arthur Conan Doyle', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Hound of the Baskervilles', year: 1902 },
        { title: 'A Study in Scarlet', year: 1887 },
        { title: 'The Sign of the Four', year: 1890 },
        { title: 'The Lost World', year: 1912 },
      ]},
      { connection: 'Books about forbidden love', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Anna Karenina', year: 1878 },
        { title: 'Lolita', year: 1955 },
        { title: 'Romeo and Juliet', year: 1597 },
        { title: 'The English Patient', year: 1992 },
      ]},
      { connection: 'Books whose author died before publication', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'A Confederacy of Dunces', year: 1980 },
        { title: 'The Trial', year: 1925 },
        { title: 'The Girl with the Dragon Tattoo', year: 2005 },
        { title: 'Persuasion', year: 1817 },
      ]},
      { connection: 'Books whose title contains "of the"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Lord of the Flies', year: 1954 },
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'The Silence of the Lambs', year: 1988 },
        { title: 'The Grapes of Wrath', year: 1939 },
      ]},
    ],
  },
  // Puzzle 39
  {
    groups: [
      { connection: 'Novels by Khaled Hosseini', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Kite Runner', year: 2003 },
        { title: 'A Thousand Splendid Suns', year: 2007 },
        { title: 'And the Mountains Echoed', year: 2013 },
        { title: 'Sea Prayer', year: 2018 },
      ]},
      { connection: 'Books about political power', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Animal Farm', year: 1945 },
        { title: 'The Prince', year: 1532 },
        { title: 'Lord of the Flies', year: 1954 },
        { title: 'The Handmaid\'s Tale', year: 1985 },
      ]},
      { connection: 'Books first published in French', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Little Prince', year: 1943 },
        { title: 'The Stranger', year: 1942 },
        { title: 'Les Miserables', year: 1862 },
        { title: 'Madame Bovary', year: 1857 },
      ]},
      { connection: 'Books whose title contains a color and an object', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Scarlet Letter', year: 1850 },
        { title: 'The Red Badge of Courage', year: 1895 },
        { title: 'The Bluest Eye', year: 1970 },
        { title: 'The White Tiger', year: 2008 },
      ]},
    ],
  },
  // Puzzle 40
  {
    groups: [
      { connection: 'Novels by Chinua Achebe', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Things Fall Apart', year: 1958 },
        { title: 'No Longer at Ease', year: 1960 },
        { title: 'Arrow of God', year: 1964 },
        { title: 'A Man of the People', year: 1966 },
      ]},
      { connection: 'Books about survival in nature', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Call of the Wild', year: 1903 },
        { title: 'Into the Wild', year: 1996 },
        { title: 'Hatchet', year: 1987 },
        { title: 'My Side of the Mountain', year: 1959 },
      ]},
      { connection: 'Books that spawned entire fictional universes', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'Dune', year: 1965 },
        { title: 'Foundation', year: 1951 },
        { title: 'The Hitchhiker\'s Guide to the Galaxy', year: 1979 },
      ]},
      { connection: 'Books whose title starts with an adverb', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Extremely Loud and Incredibly Close', year: 2005 },
        { title: 'Never Let Me Go', year: 2005 },
        { title: 'Already Dead', year: 1997 },
        { title: 'Sometimes a Great Notion', year: 1964 },
      ]},
    ],
  },
  // Puzzle 41
  {
    groups: [
      { connection: 'Novels by Philip Roth', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'American Pastoral', year: 1997 },
        { title: 'Portnoy\'s Complaint', year: 1969 },
        { title: 'The Human Stain', year: 2000 },
        { title: 'The Plot Against America', year: 2004 },
      ]},
      { connection: 'Books about friendship', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Charlotte\'s Web', year: 1952 },
        { title: 'The Kite Runner', year: 2003 },
        { title: 'Of Mice and Men', year: 1937 },
        { title: 'A Separate Peace', year: 1959 },
      ]},
      { connection: 'Books written by a pair of authors', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Good Omens', year: 1990 },
        { title: 'The Talisman', year: 1984 },
        { title: 'Freakonomics', year: 2005 },
        { title: 'The Communist Manifesto', year: 1848 },
      ]},
      { connection: 'Books whose title is a common phrase people say', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Things Fall Apart', year: 1958 },
        { title: 'No Country for Old Men', year: 2005 },
        { title: 'Something Wicked This Way Comes', year: 1962 },
        { title: 'The Road Not Taken', year: 1916 },
      ]},
    ],
  },
  // Puzzle 42
  {
    groups: [
      { connection: 'Novels by William Faulkner', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Sound and the Fury', year: 1929 },
        { title: 'As I Lay Dying', year: 1930 },
        { title: 'Absalom, Absalom!', year: 1936 },
        { title: 'Light in August', year: 1932 },
      ]},
      { connection: 'Books about totalitarian regimes', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: '1984', year: 1949 },
        { title: 'The Handmaid\'s Tale', year: 1985 },
        { title: 'Fahrenheit 451', year: 1953 },
        { title: 'We', year: 1924 },
      ]},
      { connection: 'Books that have been translated into more than 50 languages', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Little Prince', year: 1943 },
        { title: 'The Alchemist', year: 1988 },
        { title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
        { title: 'Don Quixote', year: 1605 },
      ]},
      { connection: 'Books whose title is a metaphor', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Catcher in the Rye', year: 1951 },
        { title: 'Heart of Darkness', year: 1899 },
        { title: 'Grapes of Wrath', year: 1939 },
        { title: 'Lord of the Flies', year: 1954 },
      ]},
    ],
  },
  // Puzzle 43
  {
    groups: [
      { connection: 'Novels by Neil Gaiman', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'American Gods', year: 2001 },
        { title: 'Coraline', year: 2002 },
        { title: 'The Graveyard Book', year: 2008 },
        { title: 'Stardust', year: 1999 },
      ]},
      { connection: 'Books about racial injustice', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'To Kill a Mockingbird', year: 1960 },
        { title: 'Invisible Man', year: 1952 },
        { title: 'The Color Purple', year: 1982 },
        { title: 'Native Son', year: 1940 },
      ]},
      { connection: 'Books that begin in medias res', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Odyssey', year: -800 },
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'Beloved', year: 1987 },
        { title: 'The Catcher in the Rye', year: 1951 },
      ]},
      { connection: 'Books whose title contains a natural disaster', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Perfect Storm', year: 1997 },
        { title: 'Flood', year: 2007 },
        { title: 'Earthquake', year: 2010 },
        { title: 'Firestarter', year: 1980 },
      ]},
    ],
  },
  // Puzzle 44
  {
    groups: [
      { connection: 'Novels by Sylvia Plath', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Bell Jar', year: 1963 },
        { title: 'Ariel', year: 1965 },
        { title: 'The Colossus', year: 1960 },
        { title: 'Johnny Panic and the Bible of Dreams', year: 1977 },
      ]},
      { connection: 'Books set in New York City', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Catcher in the Rye', year: 1951 },
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'A Tree Grows in Brooklyn', year: 1943 },
        { title: 'Breakfast at Tiffany\'s', year: 1958 },
      ]},
      { connection: 'Books adapted into Hitchcock films', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Rebecca', year: 1938 },
        { title: 'The Birds', year: 1952 },
        { title: 'Psycho', year: 1959 },
        { title: 'Rear Window', year: 1942 },
      ]},
      { connection: 'Books whose title contains two contrasting words', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'War and Peace', year: 1869 },
        { title: 'Crime and Punishment', year: 1866 },
        { title: 'Pride and Prejudice', year: 1813 },
        { title: 'Sense and Sensibility', year: 1811 },
      ]},
    ],
  },
  // Puzzle 45
  {
    groups: [
      { connection: 'Novels by Michael Crichton', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Jurassic Park', year: 1990 },
        { title: 'The Andromeda Strain', year: 1969 },
        { title: 'Congo', year: 1980 },
        { title: 'Sphere', year: 1987 },
      ]},
      { connection: 'Books about art or artists', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Girl with a Pearl Earring', year: 1999 },
        { title: 'The Goldfinch', year: 2013 },
        { title: 'The Picture of Dorian Gray', year: 1890 },
        { title: 'A Portrait of the Artist as a Young Man', year: 1916 },
      ]},
      { connection: 'Books with an epilogue set years in the future', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Harry Potter and the Deathly Hallows', year: 2007 },
        { title: 'The Hunger Games: Mockingjay', year: 2010 },
        { title: 'Atonement', year: 2001 },
        { title: 'Gone with the Wind', year: 1936 },
      ]},
      { connection: 'Books whose title is an occupation or job', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Alchemist', year: 1988 },
        { title: 'The Spy Who Came in from the Cold', year: 1963 },
        { title: 'The Physician', year: 1986 },
        { title: 'The Interpreter of Maladies', year: 1999 },
      ]},
    ],
  },
  // Puzzle 46
  {
    groups: [
      { connection: 'Novels by Gabriel Garcia Marquez', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Love in the Time of Cholera', year: 1985 },
        { title: 'One Hundred Years of Solitude', year: 1967 },
        { title: 'Chronicle of a Death Foretold', year: 1981 },
        { title: 'No One Writes to the Colonel', year: 1961 },
      ]},
      { connection: 'Books about the afterlife or death', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Lovely Bones', year: 2002 },
        { title: 'Lincoln in the Bardo', year: 2017 },
        { title: 'The Book Thief', year: 2005 },
        { title: 'The Five People You Meet in Heaven', year: 2003 },
      ]},
      { connection: 'Books whose first edition cover is iconic', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Catch-22', year: 1961 },
        { title: 'A Clockwork Orange', year: 1962 },
        { title: 'The Catcher in the Rye', year: 1951 },
      ]},
      { connection: 'Books whose title has exactly three words', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Brave New World', year: 1932 },
        { title: 'Lord of the Flies', year: 1954 },
        { title: 'East of Eden', year: 1952 },
        { title: 'Heart of Darkness', year: 1899 },
      ]},
    ],
  },
  // Puzzle 47
  {
    groups: [
      { connection: 'Novels by Mary Shelley', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Frankenstein', year: 1818 },
        { title: 'The Last Man', year: 1826 },
        { title: 'Mathilda', year: 1959 },
        { title: 'Valperga', year: 1823 },
      ]},
      { connection: 'Books about war veterans', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Things They Carried', year: 1990 },
        { title: 'All Quiet on the Western Front', year: 1929 },
        { title: 'The Sun Also Rises', year: 1926 },
        { title: 'Slaughterhouse-Five', year: 1969 },
      ]},
      { connection: 'Books whose cover has been redesigned more than 20 times', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Pride and Prejudice', year: 1813 },
        { title: '1984', year: 1949 },
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Jane Eyre', year: 1847 },
      ]},
      { connection: 'Books whose title is a single abstract noun', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Atonement', year: 2001 },
        { title: 'Beloved', year: 1987 },
        { title: 'Persuasion', year: 1817 },
        { title: 'Disgrace', year: 1999 },
      ]},
    ],
  },
  // Puzzle 48
  {
    groups: [
      { connection: 'Dark academia novels', connection_type: 'genre_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Secret History', year: 1992 },
        { title: 'The Goldfinch', year: 2013 },
        { title: 'If We Were Villains', year: 2017 },
        { title: 'Ninth House', year: 2019 },
      ]},
      { connection: 'Books about the meaning of life', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Hitchhiker\'s Guide to the Galaxy', year: 1979 },
        { title: 'Siddhartha', year: 1922 },
        { title: 'The Alchemist', year: 1988 },
        { title: 'Man\'s Search for Meaning', year: 1946 },
      ]},
      { connection: 'Books whose movie adaptation is widely considered better', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'The Godfather', year: 1969 },
        { title: 'Jaws', year: 1974 },
        { title: 'Forrest Gump', year: 1986 },
        { title: 'The Shawshank Redemption', year: 1982 },
      ]},
      { connection: 'Books whose title starts with "Never"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Never Let Me Go', year: 2005 },
        { title: 'Neverland', year: 2011 },
        { title: 'Never Cry Wolf', year: 1963 },
        { title: 'The Neverending Story', year: 1979 },
      ]},
    ],
  },
  // Puzzle 49
  {
    groups: [
      { connection: 'Novels by Jack London', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Call of the Wild', year: 1903 },
        { title: 'White Fang', year: 1906 },
        { title: 'The Sea-Wolf', year: 1904 },
        { title: 'Martin Eden', year: 1909 },
      ]},
      { connection: 'Books about space travel', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: 'The Martian', year: 2011 },
        { title: 'Dune', year: 1965 },
        { title: 'Ender\'s Game', year: 1985 },
      ]},
      { connection: 'Books whose last chapter is famous', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: '1984', year: 1949 },
        { title: 'A Tale of Two Cities', year: 1859 },
        { title: 'Of Mice and Men', year: 1937 },
      ]},
      { connection: 'Books whose title mentions light or darkness', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Heart of Darkness', year: 1899 },
        { title: 'The Book of Night Women', year: 2009 },
        { title: 'Light in August', year: 1932 },
        { title: 'All the Light We Cannot See', year: 2014 },
      ]},
    ],
  },
  // Puzzle 50
  {
    groups: [
      { connection: 'Novels by Zadie Smith', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'White Teeth', year: 2000 },
        { title: 'On Beauty', year: 2005 },
        { title: 'NW', year: 2012 },
        { title: 'Swing Time', year: 2016 },
      ]},
      { connection: 'Books about cults or communes', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Girls', year: 2016 },
        { title: 'Helter Skelter', year: 1974 },
        { title: 'The Handmaid\'s Tale', year: 1985 },
        { title: 'The Secret History', year: 1992 },
      ]},
      { connection: 'Books that won both Hugo and Nebula Awards', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Dune', year: 1965 },
        { title: 'The Left Hand of Darkness', year: 1969 },
        { title: 'Neuromancer', year: 1984 },
        { title: 'American Gods', year: 2001 },
      ]},
      { connection: 'Books whose title contains a body part', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Heart of Darkness', year: 1899 },
        { title: 'The Bluest Eye', year: 1970 },
        { title: 'Skeleton Crew', year: 1985 },
        { title: 'The Heart Is a Lonely Hunter', year: 1940 },
      ]},
    ],
  },
  // Puzzle 51
  {
    groups: [
      { connection: 'Novels by C.S. Lewis', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Lion, the Witch and the Wardrobe', year: 1950 },
        { title: 'The Screwtape Letters', year: 1942 },
        { title: 'Out of the Silent Planet', year: 1938 },
        { title: 'The Silver Chair', year: 1953 },
      ]},
      { connection: 'Books about loneliness and isolation', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Robinson Crusoe', year: 1719 },
        { title: 'The Stranger', year: 1942 },
        { title: 'Eleanor Oliphant Is Completely Fine', year: 2017 },
        { title: 'Stoner', year: 1965 },
      ]},
      { connection: 'Books made into iconic children\'s films', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Charlie and the Chocolate Factory', year: 1964 },
        { title: 'The Wizard of Oz', year: 1900 },
        { title: 'Alice\'s Adventures in Wonderland', year: 1865 },
        { title: 'James and the Giant Peach', year: 1961 },
      ]},
      { connection: 'Books whose title contains punctuation (dash, colon, semicolon)', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Catch-22', year: 1961 },
        { title: 'Slaughterhouse-Five', year: 1969 },
        { title: '2001: A Space Odyssey', year: 1968 },
        { title: 'Moby-Dick', year: 1851 },
      ]},
    ],
  },
  // Puzzle 52
  {
    groups: [
      { connection: 'Novels by George R.R. Martin', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'A Game of Thrones', year: 1996 },
        { title: 'A Clash of Kings', year: 1998 },
        { title: 'A Storm of Swords', year: 2000 },
        { title: 'A Feast for Crows', year: 2005 },
      ]},
      { connection: 'Books about the publishing industry', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Devil Wears Prada', year: 2003 },
        { title: 'Wonder Boys', year: 1995 },
        { title: 'The Corrections', year: 2001 },
        { title: 'Bright Lights, Big City', year: 1984 },
      ]},
      { connection: 'Books that start with a prologue set in a different time period', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Outlander', year: 1991 },
        { title: 'The Name of the Wind', year: 2007 },
        { title: 'The Kite Runner', year: 2003 },
        { title: 'Rebecca', year: 1938 },
      ]},
      { connection: 'Books whose title starts with "A" followed by a noun', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'A Confederacy of Dunces', year: 1980 },
        { title: 'A Clockwork Orange', year: 1962 },
        { title: 'A Farewell to Arms', year: 1929 },
        { title: 'A Room with a View', year: 1908 },
      ]},
    ],
  },
  // Puzzle 53
  {
    groups: [
      { connection: 'Novels by Joseph Conrad', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Heart of Darkness', year: 1899 },
        { title: 'Lord Jim', year: 1900 },
        { title: 'Nostromo', year: 1904 },
        { title: 'The Secret Agent', year: 1907 },
      ]},
      { connection: 'Books about mental illness', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Bell Jar', year: 1963 },
        { title: 'One Flew Over the Cuckoo\'s Nest', year: 1962 },
        { title: 'Girl, Interrupted', year: 1993 },
        { title: 'It\'s Kind of a Funny Story', year: 2006 },
      ]},
      { connection: 'Books adapted by the Coen Brothers', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'No Country for Old Men', year: 2005 },
        { title: 'True Grit', year: 1968 },
        { title: 'The Big Lebowski', year: 1998 },
        { title: 'O Brother, Where Art Thou?', year: 2000 },
      ]},
      { connection: 'Books whose title is a complete declarative statement', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Things Fall Apart', year: 1958 },
        { title: 'The Sun Also Rises', year: 1926 },
        { title: 'All Quiet on the Western Front', year: 1929 },
        { title: 'The World Is Flat', year: 2005 },
      ]},
    ],
  },
  // Puzzle 54
  {
    groups: [
      { connection: 'Millennium trilogy novels', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Girl with the Dragon Tattoo', year: 2005 },
        { title: 'The Girl Who Played with Fire', year: 2006 },
        { title: 'The Girl Who Kicked the Hornets\' Nest', year: 2007 },
        { title: 'The Girl in the Spider\'s Web', year: 2015 },
      ]},
      { connection: 'Books about pirates or treasure hunting', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Treasure Island', year: 1883 },
        { title: 'The Count of Monte Cristo', year: 1844 },
        { title: 'Pirate Latitudes', year: 2009 },
        { title: 'The Princess Bride', year: 1973 },
      ]},
      { connection: 'Books written in prison', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Don Quixote', year: 1605 },
        { title: 'The Pilgrim\'s Progress', year: 1678 },
        { title: 'Mein Kampf', year: 1925 },
        { title: 'Letters from Birmingham Jail', year: 1963 },
      ]},
      { connection: 'Books whose title starts with "The Girl"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Gone Girl', year: 2012 },
        { title: 'The Girl on the Train', year: 2015 },
        { title: 'The Girl with All the Gifts', year: 2014 },
        { title: 'Girl with a Pearl Earring', year: 1999 },
      ]},
    ],
  },
  // Puzzle 55
  {
    groups: [
      { connection: 'Novels by Salman Rushdie', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Midnight\'s Children', year: 1981 },
        { title: 'The Satanic Verses', year: 1988 },
        { title: 'The Moor\'s Last Sigh', year: 1995 },
        { title: 'Shame', year: 1983 },
      ]},
      { connection: 'Books about dogs', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Call of the Wild', year: 1903 },
        { title: 'White Fang', year: 1906 },
        { title: 'The Art of Racing in the Rain', year: 2008 },
        { title: 'Marley & Me', year: 2005 },
      ]},
      { connection: 'Books whose plot hinges on a letter', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Atonement', year: 2001 },
        { title: 'The Scarlet Letter', year: 1850 },
        { title: 'Persuasion', year: 1817 },
        { title: 'The Color Purple', year: 1982 },
      ]},
      { connection: 'Books whose title is a genitive (possessive) phrase', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Time Traveler\'s Wife', year: 2003 },
        { title: 'Sophie\'s Choice', year: 1979 },
        { title: 'Charlotte\'s Web', year: 1952 },
        { title: 'The Handmaid\'s Tale', year: 1985 },
      ]},
    ],
  },
  // Puzzle 56
  {
    groups: [
      { connection: 'Novels by Chimamanda Ngozi Adichie', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Americanah', year: 2013 },
        { title: 'Half of a Yellow Sun', year: 2006 },
        { title: 'Purple Hibiscus', year: 2003 },
        { title: 'The Thing Around Your Neck', year: 2009 },
      ]},
      { connection: 'Books about aging', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Remains of the Day', year: 1989 },
        { title: 'Stoner', year: 1965 },
        { title: 'A Man Called Ove', year: 2012 },
        { title: 'The Old Man and the Sea', year: 1952 },
      ]},
      { connection: 'Books whose chapters are named rather than numbered', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Moby-Dick', year: 1851 },
        { title: 'Catch-22', year: 1961 },
        { title: 'Pride and Prejudice', year: 1813 },
        { title: 'Ulysses', year: 1922 },
      ]},
      { connection: 'Books whose title is a paradox', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Invisible Man', year: 1952 },
        { title: 'The Sound and the Fury', year: 1929 },
        { title: 'All Quiet on the Western Front', year: 1929 },
        { title: 'Extremely Loud and Incredibly Close', year: 2005 },
      ]},
    ],
  },
  // Puzzle 57
  {
    groups: [
      { connection: 'Novels by H.G. Wells', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The Time Machine', year: 1895 },
        { title: 'The War of the Worlds', year: 1898 },
        { title: 'The Invisible Man', year: 1897 },
        { title: 'The Island of Doctor Moreau', year: 1896 },
      ]},
      { connection: 'Books about revenge', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Count of Monte Cristo', year: 1844 },
        { title: 'Moby-Dick', year: 1851 },
        { title: 'Carrie', year: 1974 },
        { title: 'Gone Girl', year: 2012 },
      ]},
      { connection: 'Books that influenced an entire genre', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Frankenstein', year: 1818 },
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'Neuromancer', year: 1984 },
        { title: 'And Then There Were None', year: 1939 },
      ]},
      { connection: 'Books whose title contains "man" or "men"', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Of Mice and Men', year: 1937 },
        { title: 'Invisible Man', year: 1952 },
        { title: 'The Old Man and the Sea', year: 1952 },
        { title: 'No Country for Old Men', year: 2005 },
      ]},
    ],
  },
  // Puzzle 58
  {
    groups: [
      { connection: 'Novels by Isabel Allende', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'The House of the Spirits', year: 1982 },
        { title: 'Eva Luna', year: 1987 },
        { title: 'Daughter of Fortune', year: 1999 },
        { title: 'City of the Beasts', year: 2002 },
      ]},
      { connection: 'Books about a journey to find someone', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Odyssey', year: -800 },
        { title: 'True Grit', year: 1968 },
        { title: 'Cold Mountain', year: 1997 },
        { title: 'Looking for Alaska', year: 2005 },
      ]},
      { connection: 'Books that were written in under a month', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'A Christmas Carol', year: 1843 },
        { title: 'Frankenstein', year: 1818 },
        { title: 'On the Road', year: 1957 },
        { title: 'Casino Royale', year: 1953 },
      ]},
      { connection: 'Books whose title contains "the" three or more times', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'The Lord of the Rings', year: 1954 },
        { title: 'The Phantom of the Opera', year: 1910 },
        { title: 'The Silence of the Lambs', year: 1988 },
        { title: 'The Hound of the Baskervilles', year: 1902 },
      ]},
    ],
  },
  // Puzzle 59
  {
    groups: [
      { connection: 'Novels by Bram Stoker', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Dracula', year: 1897 },
        { title: 'The Lair of the White Worm', year: 1911 },
        { title: 'The Jewel of Seven Stars', year: 1903 },
        { title: 'The Lady of the Shroud', year: 1909 },
      ]},
      { connection: 'Books about apartheid or segregation', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Cry, the Beloved Country', year: 1948 },
        { title: 'Disgrace', year: 1999 },
        { title: 'Born a Crime', year: 2016 },
        { title: 'The Help', year: 2009 },
      ]},
      { connection: 'Books that were initially rejected by publishers more than 10 times', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Harry Potter and the Sorcerer\'s Stone', year: 1997 },
        { title: 'Carrie', year: 1974 },
        { title: 'The Diary of a Young Girl', year: 1947 },
        { title: 'Dune', year: 1965 },
      ]},
      { connection: 'Books whose title sounds like it could be a horror movie', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Shining', year: 1977 },
        { title: 'It', year: 1986 },
        { title: 'The Haunting of Hill House', year: 1959 },
        { title: 'Something Wicked This Way Comes', year: 1962 },
      ]},
    ],
  },
  // Puzzle 60
  {
    groups: [
      { connection: 'Novels by Douglas Adams', connection_type: 'author_link', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Hitchhiker\'s Guide to the Galaxy', year: 1979 },
        { title: 'The Restaurant at the End of the Universe', year: 1980 },
        { title: 'Life, the Universe and Everything', year: 1982 },
        { title: 'So Long, and Thanks for All the Fish', year: 1984 },
      ]},
      { connection: 'Books about unrequited love', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Great Gatsby', year: 1925 },
        { title: 'Cyrano de Bergerac', year: 1897 },
        { title: 'One Day', year: 2009 },
        { title: 'Norwegian Wood', year: 1987 },
      ]},
      { connection: 'Books whose ending is debated or ambiguous', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Life of Pi', year: 2001 },
        { title: 'The Turn of the Screw', year: 1898 },
        { title: 'American Psycho', year: 1991 },
        { title: 'Gone Girl', year: 2012 },
      ]},
      { connection: 'Books whose title is a farewell or goodbye', connection_type: 'title_wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'A Farewell to Arms', year: 1929 },
        { title: 'Never Let Me Go', year: 2005 },
        { title: 'The Long Goodbye', year: 1953 },
        { title: 'Goodbye, Mr. Chips', year: 1934 },
      ]},
    ],
  },
];
