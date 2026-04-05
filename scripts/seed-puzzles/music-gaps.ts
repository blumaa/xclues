import type { PuzzleDef } from './types';

// Replacement puzzles for the 16 gaps in music coverage
export const musicGapPuzzles: PuzzleDef[] = [
  // Gap 1: 2026-04-07
  {
    groups: [
      { connection: 'Songs by Sting as a solo artist', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Fields of Gold', artist: 'Sting', year: 1993 },
        { title: 'Englishman in New York', artist: 'Sting', year: 1987 },
        { title: 'If You Love Somebody Set Them Free', artist: 'Sting', year: 1985 },
        { title: 'Desert Rose', artist: 'Sting', year: 1999 },
      ]},
      { connection: 'Songs that sample or interpolate classical music', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'All By Myself', artist: 'Eric Carmen', year: 1975 },
        { title: 'A Lover\'s Concerto', artist: 'The Toys', year: 1965 },
        { title: 'Could It Be Magic', artist: 'Barry Manilow', year: 1971 },
        { title: 'Because', artist: 'The Beatles', year: 1969 },
      ]},
      { connection: 'Songs from the Wayne\'s World soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975 },
        { title: 'Dream Weaver', artist: 'Gary Wright', year: 1975 },
        { title: 'Foxy Lady', artist: 'Jimi Hendrix', year: 1967 },
        { title: 'Feed My Frankenstein', artist: 'Alice Cooper', year: 1991 },
      ]},
      { connection: 'Songs with a type of dance in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Rock and Roll All Nite', artist: 'KISS', year: 1975 },
        { title: 'Tango in the Night', artist: 'Fleetwood Mac', year: 1987 },
        { title: 'Waltz #2', artist: 'Elliott Smith', year: 1998 },
        { title: 'Samba Pa Ti', artist: 'Santana', year: 1970 },
      ]},
    ],
  },
  // Gap 2: 2026-04-09
  {
    groups: [
      { connection: 'Songs by Stevie Nicks solo', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Edge of Seventeen', artist: 'Stevie Nicks', year: 1981 },
        { title: 'Stop Draggin\' My Heart Around', artist: 'Stevie Nicks', year: 1981 },
        { title: 'Leather and Lace', artist: 'Stevie Nicks', year: 1981 },
        { title: 'Stand Back', artist: 'Stevie Nicks', year: 1983 },
      ]},
      { connection: 'Songs about wealth and luxury', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Diamonds Are a Girl\'s Best Friend', artist: 'Marilyn Monroe', year: 1953 },
        { title: 'Material Girl', artist: 'Madonna', year: 1984 },
        { title: 'If I Were a Rich Man', artist: 'Zero Mostel', year: 1964 },
        { title: 'Rich Girl', artist: 'Hall & Oates', year: 1977 },
      ]},
      { connection: 'Songs released on Christmas Day or as holiday singles', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'All I Want for Christmas Is You', artist: 'Mariah Carey', year: 1994 },
        { title: 'Last Christmas', artist: 'Wham!', year: 1984 },
        { title: 'Happy Xmas (War Is Over)', artist: 'John Lennon', year: 1971 },
        { title: 'Do They Know It\'s Christmas?', artist: 'Band Aid', year: 1984 },
      ]},
      { connection: 'Songs whose title contains a room in a house', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Bedroom Floor', artist: 'Liam Payne', year: 2017 },
        { title: 'Kitchen Sink', artist: 'Twenty One Pilots', year: 2011 },
        { title: 'Living Room', artist: 'Tegan and Sara', year: 2009 },
        { title: 'Bathroom Window', artist: 'The Beatles', year: 1969 },
      ]},
    ],
  },
  // Gap 3: 2026-04-10
  {
    groups: [
      { connection: 'Songs by Phil Collins', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'In the Air Tonight', artist: 'Phil Collins', year: 1981 },
        { title: 'Against All Odds', artist: 'Phil Collins', year: 1984 },
        { title: 'Another Day in Paradise', artist: 'Phil Collins', year: 1989 },
        { title: 'One More Night', artist: 'Phil Collins', year: 1985 },
      ]},
      { connection: 'Songs about blue collar life', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Working Class Hero', artist: 'John Lennon', year: 1970 },
        { title: 'Allentown', artist: 'Billy Joel', year: 1982 },
        { title: 'Factory', artist: 'Bruce Springsteen', year: 1978 },
        { title: 'Sixteen Tons', artist: 'Tennessee Ernie Ford', year: 1955 },
      ]},
      { connection: 'Songs featured in The Simpsons', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Baby on Board', artist: 'The Be Sharps', year: 1993 },
        { title: 'Happy Birthday', artist: 'Traditional', year: 1893 },
        { title: 'Close to You', artist: 'The Carpenters', year: 1970 },
        { title: 'Dr. Zaius', artist: 'Troy McClure', year: 1996 },
      ]},
      { connection: 'Songs with a vehicle other than a car in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Bicycle Race', artist: 'Queen', year: 1978 },
        { title: 'Magic Carpet Ride', artist: 'Steppenwolf', year: 1968 },
        { title: 'Yellow Submarine', artist: 'The Beatles', year: 1966 },
        { title: 'Rocket Man', artist: 'Elton John', year: 1972 },
      ]},
    ],
  },
  // Gap 4: 2026-04-14
  {
    groups: [
      { connection: 'Songs by The Temptations', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'My Girl', artist: 'The Temptations', year: 1964 },
        { title: 'Just My Imagination', artist: 'The Temptations', year: 1971 },
        { title: 'Papa Was a Rollin\' Stone', artist: 'The Temptations', year: 1972 },
        { title: 'Ain\'t Too Proud to Beg', artist: 'The Temptations', year: 1966 },
      ]},
      { connection: 'Songs about being on top of the world', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'On Top of the World', artist: 'Imagine Dragons', year: 2012 },
        { title: 'Feeling Good', artist: 'Nina Simone', year: 1965 },
        { title: 'Best Day of My Life', artist: 'American Authors', year: 2013 },
        { title: 'Beautiful Day', artist: 'U2', year: 2000 },
      ]},
      { connection: 'Soul music legends\' signature songs', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'A Change Is Gonna Come', artist: 'Sam Cooke', year: 1964 },
        { title: 'Try a Little Tenderness', artist: 'Otis Redding', year: 1966 },
        { title: 'Lean on Me', artist: 'Bill Withers', year: 1972 },
        { title: 'Stand by Me', artist: 'Ben E. King', year: 1961 },
      ]},
      { connection: 'Songs with a type of hat in the title or artist name', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Top Hat, White Tie and Tails', artist: 'Fred Astaire', year: 1935 },
        { title: 'Raspberry Beret', artist: 'Prince', year: 1985 },
        { title: 'Mexican Hat Dance', artist: 'Traditional', year: 1919 },
        { title: 'Ten Gallon Hat', artist: 'The Gourds', year: 2007 },
      ]},
    ],
  },
  // Gap 5: 2026-04-16
  {
    groups: [
      { connection: 'Songs by The Ramones', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Blitzkrieg Bop', artist: 'Ramones', year: 1976 },
        { title: 'I Wanna Be Sedated', artist: 'Ramones', year: 1978 },
        { title: 'Sheena Is a Punk Rocker', artist: 'Ramones', year: 1977 },
        { title: 'Rock \'n\' Roll High School', artist: 'Ramones', year: 1979 },
      ]},
      { connection: 'Songs that went viral on TikTok', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Dreams', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'Beggin\'', artist: 'Maneskin', year: 2017 },
        { title: 'Savage Love', artist: 'Jawsh 685', year: 2020 },
        { title: 'Say So', artist: 'Doja Cat', year: 2019 },
      ]},
      { connection: 'Alternative rock breakthrough hits of the 90s', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Creep', artist: 'Radiohead', year: 1992 },
        { title: 'Loser', artist: 'Beck', year: 1993 },
        { title: 'No Rain', artist: 'Blind Melon', year: 1992 },
        { title: 'Mmm Mmm Mmm Mmm', artist: 'Crash Test Dummies', year: 1993 },
      ]},
      { connection: 'Songs whose title has exactly one letter', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'O', artist: 'Omarion', year: 2004 },
        { title: 'U', artist: 'Kendrick Lamar', year: 2015 },
        { title: 'X', artist: 'Chris Brown', year: 2014 },
        { title: 'S', artist: 'SZA', year: 2022 },
      ]},
    ],
  },
  // Gap 6: 2026-04-19
  {
    groups: [
      { connection: 'Songs by George Michael', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Careless Whisper', artist: 'George Michael', year: 1984 },
        { title: 'Faith', artist: 'George Michael', year: 1987 },
        { title: 'Father Figure', artist: 'George Michael', year: 1987 },
        { title: 'Freedom! \'90', artist: 'George Michael', year: 1990 },
      ]},
      { connection: 'Songs about escape and liberation', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Born to Run', artist: 'Bruce Springsteen', year: 1975 },
        { title: 'Breakout', artist: 'Swing Out Sister', year: 1986 },
        { title: 'I Want to Break Free', artist: 'Queen', year: 1984 },
        { title: 'Escape (The Pina Colada Song)', artist: 'Rupert Holmes', year: 1979 },
      ]},
      { connection: 'Songs from the O Brother, Where Art Thou? soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Man of Constant Sorrow', artist: 'The Soggy Bottom Boys', year: 2000 },
        { title: 'I Am a Man of Constant Sorrow', artist: 'Dick Burnett', year: 1913 },
        { title: 'Down to the River to Pray', artist: 'Alison Krauss', year: 2000 },
        { title: 'Big Rock Candy Mountain', artist: 'Harry McClintock', year: 1928 },
      ]},
      { connection: 'Songs with a mathematical term in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Multiply', artist: 'A$AP Rocky', year: 2013 },
        { title: 'The Divide', artist: 'Ed Sheeran', year: 2017 },
        { title: 'Adding Up the Damage', artist: 'Lydia Loveless', year: 2016 },
        { title: 'Square One', artist: 'Coldplay', year: 2005 },
      ]},
    ],
  },
  // Gap 7: 2026-04-23
  {
    groups: [
      { connection: 'Songs by Aerosmith', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Dream On', artist: 'Aerosmith', year: 1973 },
        { title: 'Walk This Way', artist: 'Aerosmith', year: 1975 },
        { title: 'I Don\'t Want to Miss a Thing', artist: 'Aerosmith', year: 1998 },
        { title: 'Crazy', artist: 'Aerosmith', year: 1993 },
      ]},
      { connection: 'Songs about fantasy and imagination', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Imagine', artist: 'John Lennon', year: 1971 },
        { title: 'Pure Imagination', artist: 'Gene Wilder', year: 1971 },
        { title: 'Fantasy', artist: 'Mariah Carey', year: 1995 },
        { title: 'Magic', artist: 'The Cars', year: 1984 },
      ]},
      { connection: 'Songs from the Forrest Gump soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Fortunate Son', artist: 'Creedence Clearwater Revival', year: 1969 },
        { title: 'Free Bird', artist: 'Lynyrd Skynyrd', year: 1973 },
        { title: 'For What It\'s Worth', artist: 'Buffalo Springfield', year: 1967 },
        { title: 'Mrs. Robinson', artist: 'Simon & Garfunkel', year: 1968 },
      ]},
      { connection: 'Songs where the chorus is mostly one word repeated', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Around the World', artist: 'Daft Punk', year: 1997 },
        { title: 'Barbara Ann', artist: 'The Beach Boys', year: 1965 },
        { title: 'Na Na Hey Hey Kiss Him Goodbye', artist: 'Steam', year: 1969 },
        { title: 'Whoomp! (There It Is)', artist: 'Tag Team', year: 1993 },
      ]},
    ],
  },
  // Gap 8: 2026-04-24
  {
    groups: [
      { connection: 'Songs by Van Halen', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Jump', artist: 'Van Halen', year: 1983 },
        { title: 'Panama', artist: 'Van Halen', year: 1984 },
        { title: 'Hot for Teacher', artist: 'Van Halen', year: 1984 },
        { title: 'Runnin\' with the Devil', artist: 'Van Halen', year: 1978 },
      ]},
      { connection: 'Songs about education and learning', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Another Brick in the Wall', artist: 'Pink Floyd', year: 1979 },
        { title: 'ABC', artist: 'The Jackson 5', year: 1970 },
        { title: 'Don\'t Stand So Close to Me', artist: 'The Police', year: 1980 },
        { title: 'Teach Your Children', artist: 'Crosby, Stills, Nash & Young', year: 1970 },
      ]},
      { connection: 'Songs from The Breakfast Club era of John Hughes films', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'If You Leave', artist: 'Orchestral Manoeuvres in the Dark', year: 1986 },
        { title: 'Oh Yeah', artist: 'Yello', year: 1985 },
        { title: 'Danke Schoen', artist: 'Wayne Newton', year: 1963 },
        { title: 'Twist and Shout', artist: 'The Beatles', year: 1963 },
      ]},
      { connection: 'Songs whose title contains a time measurement word', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Seconds', artist: 'U2', year: 1983 },
        { title: 'Minutes to Midnight', artist: 'Linkin Park', year: 2007 },
        { title: 'Hour Glass', artist: 'Squeeze', year: 1987 },
        { title: 'Seven Nation Army', artist: 'The White Stripes', year: 2003 },
      ]},
    ],
  },
  // Gap 9: 2026-04-26
  {
    groups: [
      { connection: 'Songs by The Beach Boys', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Good Vibrations', artist: 'The Beach Boys', year: 1966 },
        { title: 'Surfin\' U.S.A.', artist: 'The Beach Boys', year: 1963 },
        { title: 'God Only Knows', artist: 'The Beach Boys', year: 1966 },
        { title: 'Kokomo', artist: 'The Beach Boys', year: 1988 },
      ]},
      { connection: 'Songs inspired by real historical events', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Hurricane', artist: 'Bob Dylan', year: 1975 },
        { title: 'Ohio', artist: 'Crosby, Stills, Nash & Young', year: 1970 },
        { title: 'Sunday Bloody Sunday', artist: 'U2', year: 1983 },
        { title: 'Pride (In the Name of Love)', artist: 'U2', year: 1984 },
      ]},
      { connection: 'Invasion of the British second wave (post-punk/new wave)', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Love Cats', artist: 'The Cure', year: 1983 },
        { title: 'Temptation', artist: 'New Order', year: 1982 },
        { title: 'She Sells Sanctuary', artist: 'The Cult', year: 1985 },
        { title: 'How Soon Is Now?', artist: 'The Smiths', year: 1984 },
      ]},
      { connection: 'Songs whose title is a proper name that is also a common word', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Grace', artist: 'Jeff Buckley', year: 1994 },
        { title: 'Faith', artist: 'George Michael', year: 1987 },
        { title: 'Joy', artist: 'Teddy Pendergrass', year: 1988 },
        { title: 'Hope', artist: 'R.E.M.', year: 1998 },
      ]},
    ],
  },
  // Gap 10: 2026-04-30
  {
    groups: [
      { connection: 'Songs by Creedence Clearwater Revival', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Fortunate Son', artist: 'Creedence Clearwater Revival', year: 1969 },
        { title: 'Bad Moon Rising', artist: 'Creedence Clearwater Revival', year: 1969 },
        { title: 'Proud Mary', artist: 'Creedence Clearwater Revival', year: 1969 },
        { title: 'Have You Ever Seen the Rain?', artist: 'Creedence Clearwater Revival', year: 1971 },
      ]},
      { connection: 'Songs about missing someone who has passed', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Tears in Heaven', artist: 'Eric Clapton', year: 1992 },
        { title: 'See You Again', artist: 'Wiz Khalifa', year: 2015 },
        { title: 'Candle in the Wind', artist: 'Elton John', year: 1973 },
        { title: 'I\'ll Be Missing You', artist: 'Puff Daddy', year: 1997 },
      ]},
      { connection: 'Songs used in famous TV show opening credits', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Won\'t Get Fooled Again', artist: 'The Who', year: 1971 },
        { title: 'I\'ll Be There for You', artist: 'The Rembrandts', year: 1995 },
        { title: 'Woke Up This Morning', artist: 'Alabama 3', year: 1997 },
        { title: 'Boss of Me', artist: 'They Might Be Giants', year: 2000 },
      ]},
      { connection: 'Songs with a mode of communication in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Radio Ga Ga', artist: 'Queen', year: 1984 },
        { title: 'Video Killed the Radio Star', artist: 'The Buggles', year: 1979 },
        { title: 'Telephone Line', artist: 'Electric Light Orchestra', year: 1976 },
        { title: 'Message in a Bottle', artist: 'The Police', year: 1979 },
      ]},
    ],
  },
  // Gap 11: 2026-05-03
  {
    groups: [
      { connection: 'Songs by Tupac Shakur', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'California Love', artist: 'Tupac', year: 1995 },
        { title: 'Changes', artist: 'Tupac', year: 1998 },
        { title: 'Dear Mama', artist: 'Tupac', year: 1995 },
        { title: 'Hit \'Em Up', artist: 'Tupac', year: 1996 },
      ]},
      { connection: 'Songs about family bonds', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'We Are Family', artist: 'Sister Sledge', year: 1979 },
        { title: 'Lean on Me', artist: 'Bill Withers', year: 1972 },
        { title: 'He Ain\'t Heavy, He\'s My Brother', artist: 'The Hollies', year: 1969 },
        { title: 'You\'ve Got a Friend', artist: 'James Taylor', year: 1971 },
      ]},
      { connection: 'Songs from the Guardians of the Galaxy Vol. 2 soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'The Chain', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'Brandy (You\'re a Fine Girl)', artist: 'Looking Glass', year: 1972 },
        { title: 'Surrender', artist: 'Cheap Trick', year: 1978 },
        { title: 'My Sweet Lord', artist: 'George Harrison', year: 1970 },
      ]},
      { connection: 'Songs whose title starts with "Mr." or "Mrs."', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Mr. Brightside', artist: 'The Killers', year: 2003 },
        { title: 'Mrs. Robinson', artist: 'Simon & Garfunkel', year: 1968 },
        { title: 'Mr. Sandman', artist: 'The Chordettes', year: 1954 },
        { title: 'Mr. Jones', artist: 'Counting Crows', year: 1993 },
      ]},
    ],
  },
  // Gap 12: 2026-05-09
  {
    groups: [
      { connection: 'Songs by No Doubt', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Don\'t Speak', artist: 'No Doubt', year: 1995 },
        { title: 'Just a Girl', artist: 'No Doubt', year: 1995 },
        { title: 'Spiderweb', artist: 'No Doubt', year: 1995 },
        { title: 'Hella Good', artist: 'No Doubt', year: 2001 },
      ]},
      { connection: 'Songs about going crazy or losing your mind', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Crazy', artist: 'Gnarls Barkley', year: 2006 },
        { title: 'Basket Case', artist: 'Green Day', year: 1994 },
        { title: 'Going Under', artist: 'Evanescence', year: 2003 },
        { title: 'Insane in the Brain', artist: 'Cypress Hill', year: 1993 },
      ]},
      { connection: 'Songs that are over 7 minutes long', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', year: 1971 },
        { title: 'Free Bird', artist: 'Lynyrd Skynyrd', year: 1973 },
        { title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975 },
        { title: 'American Pie', artist: 'Don McLean', year: 1971 },
      ]},
      { connection: 'Songs whose title is also a board game', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'Risk', artist: 'Deftones', year: 2010 },
        { title: 'Monopoly', artist: 'Ariana Grande', year: 2019 },
        { title: 'Clue', artist: 'The Coasters', year: 1961 },
        { title: 'Operation', artist: 'Tonex', year: 2004 },
      ]},
    ],
  },
  // Gap 13: 2026-05-14
  {
    groups: [
      { connection: 'Songs by Pet Shop Boys', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'West End Girls', artist: 'Pet Shop Boys', year: 1985 },
        { title: 'It\'s a Sin', artist: 'Pet Shop Boys', year: 1987 },
        { title: 'Always on My Mind', artist: 'Pet Shop Boys', year: 1987 },
        { title: 'Go West', artist: 'Pet Shop Boys', year: 1993 },
      ]},
      { connection: 'Songs popular at karaoke nights', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Don\'t Stop Believin\'', artist: 'Journey', year: 1981 },
        { title: 'Sweet Caroline', artist: 'Neil Diamond', year: 1969 },
        { title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975 },
        { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', year: 1986 },
      ]},
      { connection: 'Synth-driven 80s chart toppers', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Take On Me', artist: 'a-ha', year: 1985 },
        { title: 'Tainted Love', artist: 'Soft Cell', year: 1981 },
        { title: 'Sweet Dreams', artist: 'Eurythmics', year: 1983 },
        { title: 'Blue Monday', artist: 'New Order', year: 1983 },
      ]},
      { connection: 'Songs with a material or fabric in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Velvet Underground', artist: 'The Velvet Underground', year: 1967 },
        { title: 'Leather and Lace', artist: 'Stevie Nicks', year: 1981 },
        { title: 'Silk', artist: 'Wolf Alice', year: 2015 },
        { title: 'Satin Doll', artist: 'Duke Ellington', year: 1953 },
      ]},
    ],
  },
  // Gap 14: 2026-05-15
  {
    groups: [
      { connection: 'Songs by Weezer', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Buddy Holly', artist: 'Weezer', year: 1994 },
        { title: 'Say It Ain\'t So', artist: 'Weezer', year: 1994 },
        { title: 'Island in the Sun', artist: 'Weezer', year: 2001 },
        { title: 'Beverly Hills', artist: 'Weezer', year: 2005 },
      ]},
      { connection: 'Songs about a desire to escape the city', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Big Yellow Taxi', artist: 'Joni Mitchell', year: 1970 },
        { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', year: 1964 },
        { title: 'Rockaway Beach', artist: 'Ramones', year: 1977 },
        { title: 'Country Road', artist: 'James Taylor', year: 1970 },
      ]},
      { connection: 'Songs that were covered on the show Glee', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Don\'t Stop Believin\'', artist: 'Journey', year: 1981 },
        { title: 'Somebody to Love', artist: 'Queen', year: 1976 },
        { title: 'Defying Gravity', artist: 'Wicked', year: 2003 },
        { title: 'Total Eclipse of the Heart', artist: 'Bonnie Tyler', year: 1983 },
      ]},
      { connection: 'Songs whose title is a two-word compound word', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Blackbird', artist: 'The Beatles', year: 1968 },
        { title: 'Thunderstruck', artist: 'AC/DC', year: 1990 },
        { title: 'Heartbreaker', artist: 'Led Zeppelin', year: 1969 },
        { title: 'Waterfall', artist: 'The Stone Roses', year: 1989 },
      ]},
    ],
  },
  // Gap 15: 2026-05-26
  {
    groups: [
      { connection: 'Songs by Simon & Garfunkel', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'The Sound of Silence', artist: 'Simon & Garfunkel', year: 1964 },
        { title: 'Bridge over Troubled Water', artist: 'Simon & Garfunkel', year: 1970 },
        { title: 'Mrs. Robinson', artist: 'Simon & Garfunkel', year: 1968 },
        { title: 'Scarborough Fair', artist: 'Simon & Garfunkel', year: 1966 },
      ]},
      { connection: 'Songs about not giving up', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Don\'t Stop Believin\'', artist: 'Journey', year: 1981 },
        { title: 'Tubthumping', artist: 'Chumbawamba', year: 1997 },
        { title: 'Fight Song', artist: 'Rachel Platten', year: 2015 },
        { title: 'Stronger', artist: 'Kelly Clarkson', year: 2011 },
      ]},
      { connection: 'Songs from the La La Land soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'City of Stars', artist: 'Ryan Gosling & Emma Stone', year: 2016 },
        { title: 'Another Day of Sun', artist: 'La La Land Cast', year: 2016 },
        { title: 'A Lovely Night', artist: 'Ryan Gosling & Emma Stone', year: 2016 },
        { title: 'Audition (The Fools Who Dream)', artist: 'Emma Stone', year: 2016 },
      ]},
      { connection: 'Songs with a nationality or ethnicity in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'American Girl', artist: 'Tom Petty', year: 1976 },
        { title: 'Spanish Harlem', artist: 'Ben E. King', year: 1960 },
        { title: 'Irish Rover', artist: 'The Pogues', year: 1987 },
        { title: 'Japanese Boy', artist: 'Aneka', year: 1981 },
      ]},
    ],
  },
  // Gap 16: 2026-05-27
  {
    groups: [
      { connection: 'Songs by Kraftwerk', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Autobahn', artist: 'Kraftwerk', year: 1974 },
        { title: 'The Model', artist: 'Kraftwerk', year: 1978 },
        { title: 'Computer Love', artist: 'Kraftwerk', year: 1981 },
        { title: 'Trans-Europe Express', artist: 'Kraftwerk', year: 1977 },
      ]},
      { connection: 'Songs about hidden truths and deception', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Liar', artist: 'Rollins Band', year: 1994 },
        { title: 'Little Lies', artist: 'Fleetwood Mac', year: 1987 },
        { title: 'Lies', artist: 'Thompson Twins', year: 1983 },
        { title: 'Two Faced', artist: 'Rancid', year: 1994 },
      ]},
      { connection: 'Songs from the Garden State soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'New Slang', artist: 'The Shins', year: 2001 },
        { title: 'Such Great Heights', artist: 'The Postal Service', year: 2003 },
        { title: 'Let Go', artist: 'Frou Frou', year: 2002 },
        { title: 'Don\'t Panic', artist: 'Coldplay', year: 2000 },
      ]},
      { connection: 'Songs whose title contains a piece of jewelry', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Diamond Dogs', artist: 'David Bowie', year: 1974 },
        { title: 'Ring of Fire', artist: 'Johnny Cash', year: 1963 },
        { title: 'Gold Chains', artist: 'Frank Ocean', year: 2017 },
        { title: 'Pearl Necklace', artist: 'ZZ Top', year: 1981 },
      ]},
    ],
  },
];
