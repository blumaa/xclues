import type { PuzzleDef } from './types';

export const musicPuzzles: PuzzleDef[] = [
  // Puzzle 1
  {
    groups: [
      { connection: 'Songs by Fleetwood Mac', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Dreams', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'The Chain', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'Go Your Own Way', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'Everywhere', artist: 'Fleetwood Mac', year: 1987 },
      ]},
      { connection: 'Songs with a day of the week in the title', connection_type: 'wordplay', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Friday', artist: 'Rebecca Black', year: 2011 },
        { title: 'Sunday Morning', artist: 'Maroon 5', year: 2002 },
        { title: 'Monday Morning', artist: 'Fleetwood Mac', year: 1975 },
        { title: 'Saturday Night', artist: 'Whigfield', year: 1994 },
      ]},
      { connection: 'Songs featured in Pulp Fiction', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Misirlou', artist: 'Dick Dale', year: 1962 },
        { title: 'Girl, You\'ll Be a Woman Soon', artist: 'Urge Overkill', year: 1992 },
        { title: 'Son of a Preacher Man', artist: 'Dusty Springfield', year: 1968 },
        { title: 'Jungle Boogie', artist: 'Kool & The Gang', year: 1973 },
      ]},
      { connection: 'Songs that are one word repeated', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Yeah!', artist: 'Usher', year: 2004 },
        { title: 'Stay', artist: 'Rihanna', year: 2012 },
        { title: 'Help!', artist: 'The Beatles', year: 1965 },
        { title: 'Hello', artist: 'Adele', year: 2015 },
      ]},
    ],
  },
  // Puzzle 2
  {
    groups: [
      { connection: 'Songs by Prince', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Purple Rain', artist: 'Prince', year: 1984 },
        { title: 'When Doves Cry', artist: 'Prince', year: 1984 },
        { title: 'Kiss', artist: 'Prince', year: 1986 },
        { title: 'Little Red Corvette', artist: 'Prince', year: 1982 },
      ]},
      { connection: 'Songs about dancing', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Dancing Queen', artist: 'ABBA', year: 1976 },
        { title: 'Dance With Somebody', artist: 'Whitney Houston', year: 1987 },
        { title: 'Footloose', artist: 'Kenny Loggins', year: 1984 },
        { title: 'Let\'s Dance', artist: 'David Bowie', year: 1983 },
      ]},
      { connection: 'Songs from the Grease soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Summer Nights', artist: 'John Travolta & Olivia Newton-John', year: 1978 },
        { title: 'Greased Lightnin\'', artist: 'John Travolta', year: 1978 },
        { title: 'Hopelessly Devoted to You', artist: 'Olivia Newton-John', year: 1978 },
        { title: 'You\'re the One That I Want', artist: 'John Travolta & Olivia Newton-John', year: 1978 },
      ]},
      { connection: 'Songs with a silent letter in the artist name', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Creep', artist: 'Radiohead', year: 1992 },
        { title: 'Take On Me', artist: 'a-ha', year: 1985 },
        { title: 'Midnight City', artist: 'M83', year: 2011 },
        { title: 'Somebody That I Used to Know', artist: 'Gotye', year: 2011 },
      ]},
    ],
  },
  // Puzzle 3
  {
    groups: [
      { connection: 'Songs by The Beatles', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Hey Jude', artist: 'The Beatles', year: 1968 },
        { title: 'Let It Be', artist: 'The Beatles', year: 1970 },
        { title: 'Come Together', artist: 'The Beatles', year: 1969 },
        { title: 'Yesterday', artist: 'The Beatles', year: 1965 },
      ]},
      { connection: 'Songs with a color in the title', connection_type: 'wordplay', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Blue Suede Shoes', artist: 'Elvis Presley', year: 1956 },
        { title: 'Yellow Submarine', artist: 'The Beatles', year: 1966 },
        { title: 'Black Dog', artist: 'Led Zeppelin', year: 1971 },
        { title: 'White Wedding', artist: 'Billy Idol', year: 1982 },
      ]},
      { connection: '90s one-hit wonders', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Macarena', artist: 'Los del Rio', year: 1995 },
        { title: 'Tubthumping', artist: 'Chumbawamba', year: 1997 },
        { title: 'Blue (Da Ba Dee)', artist: 'Eiffel 65', year: 1998 },
        { title: 'Mambo No. 5', artist: 'Lou Bega', year: 1999 },
      ]},
      { connection: 'Songs where the title is a person\'s name', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Roxanne', artist: 'The Police', year: 1978 },
        { title: 'Billie Jean', artist: 'Michael Jackson', year: 1982 },
        { title: 'Caroline', artist: 'Outkast', year: 2000 },
        { title: 'Jolene', artist: 'Dolly Parton', year: 1973 },
      ]},
    ],
  },
  // Puzzle 4
  {
    groups: [
      { connection: 'Songs by Queen', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975 },
        { title: 'We Will Rock You', artist: 'Queen', year: 1977 },
        { title: 'Somebody to Love', artist: 'Queen', year: 1976 },
        { title: 'Don\'t Stop Me Now', artist: 'Queen', year: 1978 },
      ]},
      { connection: 'Songs about money', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Money Money Money', artist: 'ABBA', year: 1976 },
        { title: 'Gold Digger', artist: 'Kanye West', year: 2005 },
        { title: 'Bills, Bills, Bills', artist: 'Destiny\'s Child', year: 1999 },
        { title: 'Mo Money Mo Problems', artist: 'The Notorious B.I.G.', year: 1997 },
      ]},
      { connection: 'Songs originally in a language other than English', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: '99 Luftballons', artist: 'Nena', year: 1983 },
        { title: 'La Bamba', artist: 'Ritchie Valens', year: 1958 },
        { title: 'Gangnam Style', artist: 'PSY', year: 2012 },
        { title: 'Despacito', artist: 'Luis Fonsi', year: 2017 },
      ]},
      { connection: 'Songs with exactly three words in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Smells Like Teen Spirit', artist: 'Nirvana', year: 1991 },
        { title: 'Hit Me Baby One More Time', artist: 'Britney Spears', year: 1998 },
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', year: 1971 },
        { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', year: 1986 },
      ]},
    ],
  },
  // Puzzle 5
  {
    groups: [
      { connection: 'Songs by Michael Jackson', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
        { title: 'Beat It', artist: 'Michael Jackson', year: 1982 },
        { title: 'Bad', artist: 'Michael Jackson', year: 1987 },
        { title: 'Smooth Criminal', artist: 'Michael Jackson', year: 1987 },
      ]},
      { connection: 'Songs about the rain', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Singin\' in the Rain', artist: 'Gene Kelly', year: 1952 },
        { title: 'It\'s Raining Men', artist: 'The Weather Girls', year: 1982 },
        { title: 'Umbrella', artist: 'Rihanna', year: 2007 },
        { title: 'Riders on the Storm', artist: 'The Doors', year: 1971 },
      ]},
      { connection: 'Songs used in car commercials', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Crazy Train', artist: 'Ozzy Osbourne', year: 1980 },
        { title: 'Lose Yourself', artist: 'Eminem', year: 2002 },
        { title: 'Renegades', artist: 'X Ambassadors', year: 2015 },
        { title: 'Start Me Up', artist: 'The Rolling Stones', year: 1981 },
      ]},
      { connection: 'Songs with an animal in the band name', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Karma Chameleon', artist: 'Culture Club', year: 1983 },
        { title: 'Barracuda', artist: 'Heart', year: 1977 },
        { title: 'Crocodile Rock', artist: 'Elton John', year: 1972 },
        { title: 'Buffalo Soldier', artist: 'Bob Marley', year: 1983 },
      ]},
    ],
  },
  // Puzzle 6
  {
    groups: [
      { connection: 'Songs by Stevie Wonder', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Superstition', artist: 'Stevie Wonder', year: 1972 },
        { title: 'Isn\'t She Lovely', artist: 'Stevie Wonder', year: 1976 },
        { title: 'I Just Called to Say I Love You', artist: 'Stevie Wonder', year: 1984 },
        { title: 'Sir Duke', artist: 'Stevie Wonder', year: 1976 },
      ]},
      { connection: 'Songs about cities', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'New York, New York', artist: 'Frank Sinatra', year: 1980 },
        { title: 'Viva Las Vegas', artist: 'Elvis Presley', year: 1964 },
        { title: 'London Calling', artist: 'The Clash', year: 1979 },
        { title: 'Empire State of Mind', artist: 'Jay-Z', year: 2009 },
      ]},
      { connection: 'Duets', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Under Pressure', artist: 'Queen & David Bowie', year: 1981 },
        { title: 'Islands in the Stream', artist: 'Dolly Parton & Kenny Rogers', year: 1983 },
        { title: 'Don\'t Go Breaking My Heart', artist: 'Elton John & Kiki Dee', year: 1976 },
        { title: 'Endless Love', artist: 'Diana Ross & Lionel Richie', year: 1981 },
      ]},
      { connection: 'Songs that start with "I"', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'I Will Always Love You', artist: 'Whitney Houston', year: 1992 },
        { title: 'I Gotta Feeling', artist: 'Black Eyed Peas', year: 2009 },
        { title: 'I Want It That Way', artist: 'Backstreet Boys', year: 1999 },
        { title: 'I Wanna Dance with Somebody', artist: 'Whitney Houston', year: 1987 },
      ]},
    ],
  },
  // Puzzle 7
  {
    groups: [
      { connection: 'Songs by Elton John', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Rocket Man', artist: 'Elton John', year: 1972 },
        { title: 'Tiny Dancer', artist: 'Elton John', year: 1971 },
        { title: 'Your Song', artist: 'Elton John', year: 1970 },
        { title: 'Bennie and the Jets', artist: 'Elton John', year: 1973 },
      ]},
      { connection: 'Songs about heartbreak', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Nothing Compares 2 U', artist: 'Sinead O\'Connor', year: 1990 },
        { title: 'Un-Break My Heart', artist: 'Toni Braxton', year: 1996 },
        { title: 'Somebody That I Used to Know', artist: 'Gotye', year: 2011 },
        { title: 'Tears in Heaven', artist: 'Eric Clapton', year: 1992 },
      ]},
      { connection: 'Songs from Disney animated films', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'A Whole New World', artist: 'Aladdin', year: 1992 },
        { title: 'Circle of Life', artist: 'The Lion King', year: 1994 },
        { title: 'Under the Sea', artist: 'The Little Mermaid', year: 1989 },
        { title: 'Let It Go', artist: 'Frozen', year: 2013 },
      ]},
      { connection: 'Songs with a number in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: '1999', artist: 'Prince', year: 1982 },
        { title: '7 Rings', artist: 'Ariana Grande', year: 2019 },
        { title: '500 Miles', artist: 'The Proclaimers', year: 1988 },
        { title: '21 Guns', artist: 'Green Day', year: 2009 },
      ]},
    ],
  },
  // Puzzle 8
  {
    groups: [
      { connection: 'Songs by Madonna', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Like a Virgin', artist: 'Madonna', year: 1984 },
        { title: 'Material Girl', artist: 'Madonna', year: 1984 },
        { title: 'Like a Prayer', artist: 'Madonna', year: 1989 },
        { title: 'Vogue', artist: 'Madonna', year: 1990 },
      ]},
      { connection: 'Songs about cars or driving', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Drive', artist: 'The Cars', year: 1984 },
        { title: 'Fast Car', artist: 'Tracy Chapman', year: 1988 },
        { title: 'Mustang Sally', artist: 'Wilson Pickett', year: 1966 },
        { title: 'Born to Run', artist: 'Bruce Springsteen', year: 1975 },
      ]},
      { connection: 'Songs that won the Grammy for Record of the Year in the 2000s', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Clocks', artist: 'Coldplay', year: 2002 },
        { title: 'Rehab', artist: 'Amy Winehouse', year: 2006 },
        { title: 'Rolling in the Deep', artist: 'Adele', year: 2010 },
        { title: 'Use Somebody', artist: 'Kings of Leon', year: 2008 },
      ]},
      { connection: 'Songs whose title contains a body part', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Heart of Glass', artist: 'Blondie', year: 1978 },
        { title: 'Heads Will Roll', artist: 'Yeah Yeah Yeahs', year: 2009 },
        { title: 'Eye of the Tiger', artist: 'Survivor', year: 1982 },
        { title: 'Hips Don\'t Lie', artist: 'Shakira', year: 2006 },
      ]},
    ],
  },
  // Puzzle 9
  {
    groups: [
      { connection: 'Songs by David Bowie', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Space Oddity', artist: 'David Bowie', year: 1969 },
        { title: 'Heroes', artist: 'David Bowie', year: 1977 },
        { title: 'Ziggy Stardust', artist: 'David Bowie', year: 1972 },
        { title: 'Starman', artist: 'David Bowie', year: 1972 },
      ]},
      { connection: 'Songs about the sun or sunshine', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Here Comes the Sun', artist: 'The Beatles', year: 1969 },
        { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', year: 1985 },
        { title: 'Ain\'t No Sunshine', artist: 'Bill Withers', year: 1971 },
        { title: 'Island in the Sun', artist: 'Weezer', year: 2001 },
      ]},
      { connection: 'Motown classics', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'My Girl', artist: 'The Temptations', year: 1964 },
        { title: 'Reach Out I\'ll Be There', artist: 'Four Tops', year: 1966 },
        { title: 'I Heard It Through the Grapevine', artist: 'Marvin Gaye', year: 1968 },
        { title: 'Stop! In the Name of Love', artist: 'The Supremes', year: 1965 },
      ]},
      { connection: 'Songs where the title is a question', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'What\'s Going On', artist: 'Marvin Gaye', year: 1971 },
        { title: 'Do You Really Want to Hurt Me', artist: 'Culture Club', year: 1982 },
        { title: 'How Deep Is Your Love', artist: 'Bee Gees', year: 1977 },
        { title: 'Who Let the Dogs Out', artist: 'Baha Men', year: 2000 },
      ]},
    ],
  },
  // Puzzle 10
  {
    groups: [
      { connection: 'Songs by Bob Marley', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'One Love', artist: 'Bob Marley', year: 1977 },
        { title: 'No Woman, No Cry', artist: 'Bob Marley', year: 1974 },
        { title: 'Three Little Birds', artist: 'Bob Marley', year: 1977 },
        { title: 'Redemption Song', artist: 'Bob Marley', year: 1980 },
      ]},
      { connection: 'Songs from the 1950s', connection_type: 'decade', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Johnny B. Goode', artist: 'Chuck Berry', year: 1958 },
        { title: 'Hound Dog', artist: 'Elvis Presley', year: 1956 },
        { title: 'Great Balls of Fire', artist: 'Jerry Lee Lewis', year: 1957 },
        { title: 'Tutti Frutti', artist: 'Little Richard', year: 1955 },
      ]},
      { connection: 'Songs covered by multiple famous artists', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Hallelujah', artist: 'Leonard Cohen', year: 1984 },
        { title: 'Respect', artist: 'Aretha Franklin', year: 1967 },
        { title: 'Hurt', artist: 'Nine Inch Nails', year: 1994 },
        { title: 'The Man Who Sold the World', artist: 'David Bowie', year: 1970 },
      ]},
      { connection: 'Songs that share a title with a movie', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Grease', artist: 'Frankie Valli', year: 1978 },
        { title: 'Fame', artist: 'Irene Cara', year: 1980 },
        { title: 'Flashdance...What a Feeling', artist: 'Irene Cara', year: 1983 },
        { title: 'Ghostbusters', artist: 'Ray Parker Jr.', year: 1984 },
      ]},
    ],
  },
  // Puzzle 11
  {
    groups: [
      { connection: 'Songs by ABBA', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Mamma Mia', artist: 'ABBA', year: 1975 },
        { title: 'Waterloo', artist: 'ABBA', year: 1974 },
        { title: 'Fernando', artist: 'ABBA', year: 1976 },
        { title: 'The Winner Takes It All', artist: 'ABBA', year: 1980 },
      ]},
      { connection: 'Punk rock anthems', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Blitzkrieg Bop', artist: 'Ramones', year: 1976 },
        { title: 'Anarchy in the U.K.', artist: 'Sex Pistols', year: 1976 },
        { title: 'Basket Case', artist: 'Green Day', year: 1994 },
        { title: 'Ever Fallen in Love', artist: 'Buzzcocks', year: 1978 },
      ]},
      { connection: 'Songs used at weddings', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'At Last', artist: 'Etta James', year: 1960 },
        { title: 'Can\'t Help Falling in Love', artist: 'Elvis Presley', year: 1961 },
        { title: 'Wonderful Tonight', artist: 'Eric Clapton', year: 1977 },
        { title: 'I Will Always Love You', artist: 'Whitney Houston', year: 1992 },
      ]},
      { connection: 'Songs with a direction (north/south/east/west) in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'South Side', artist: 'Moby', year: 2000 },
        { title: 'East Bound and Down', artist: 'Jerry Reed', year: 1977 },
        { title: 'Go West', artist: 'Pet Shop Boys', year: 1993 },
        { title: 'North Country Blues', artist: 'Bob Dylan', year: 1964 },
      ]},
    ],
  },
  // Puzzle 12
  {
    groups: [
      { connection: 'Songs by U2', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'With or Without You', artist: 'U2', year: 1987 },
        { title: 'One', artist: 'U2', year: 1991 },
        { title: 'Beautiful Day', artist: 'U2', year: 2000 },
        { title: 'Where the Streets Have No Name', artist: 'U2', year: 1987 },
      ]},
      { connection: 'Songs about fire or burning', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Ring of Fire', artist: 'Johnny Cash', year: 1963 },
        { title: 'Burning Down the House', artist: 'Talking Heads', year: 1983 },
        { title: 'Fire', artist: 'Jimi Hendrix', year: 1967 },
        { title: 'We Didn\'t Start the Fire', artist: 'Billy Joel', year: 1989 },
      ]},
      { connection: 'Songs from the Dirty Dancing soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: '(I\'ve Had) The Time of My Life', artist: 'Bill Medley & Jennifer Warnes', year: 1987 },
        { title: 'Hungry Eyes', artist: 'Eric Carmen', year: 1987 },
        { title: 'She\'s Like the Wind', artist: 'Patrick Swayze', year: 1987 },
        { title: 'Be My Baby', artist: 'The Ronettes', year: 1963 },
      ]},
      { connection: 'Songs whose title is also a greeting', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Hello', artist: 'Lionel Richie', year: 1984 },
        { title: 'Hey Ya!', artist: 'Outkast', year: 2003 },
        { title: 'Goodbye Yellow Brick Road', artist: 'Elton John', year: 1973 },
        { title: 'Aloha Oe', artist: 'Queen Liliuokalani', year: 1878 },
      ]},
    ],
  },
  // Puzzle 13
  {
    groups: [
      { connection: 'Songs by The Rolling Stones', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: '(I Can\'t Get No) Satisfaction', artist: 'The Rolling Stones', year: 1965 },
        { title: 'Paint It Black', artist: 'The Rolling Stones', year: 1966 },
        { title: 'Sympathy for the Devil', artist: 'The Rolling Stones', year: 1968 },
        { title: 'Gimme Shelter', artist: 'The Rolling Stones', year: 1969 },
      ]},
      { connection: 'Songs about the night', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'In the Still of the Night', artist: 'The Five Satins', year: 1956 },
        { title: 'Nightshift', artist: 'Commodores', year: 1985 },
        { title: 'The Night They Drove Old Dixie Down', artist: 'The Band', year: 1969 },
        { title: 'Tonight, Tonight', artist: 'The Smashing Pumpkins', year: 1995 },
      ]},
      { connection: 'Hip-hop songs that sample classic soul', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Regulate', artist: 'Warren G', year: 1994 },
        { title: 'Juicy', artist: 'The Notorious B.I.G.', year: 1994 },
        { title: 'California Love', artist: 'Tupac', year: 1995 },
        { title: 'Hard Knock Life', artist: 'Jay-Z', year: 1998 },
      ]},
      { connection: 'Songs with a food or drink in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Strawberry Fields Forever', artist: 'The Beatles', year: 1967 },
        { title: 'Cherry Bomb', artist: 'The Runaways', year: 1976 },
        { title: 'Peaches', artist: 'The Presidents of the United States of America', year: 1995 },
        { title: 'Champagne Supernova', artist: 'Oasis', year: 1996 },
      ]},
    ],
  },
  // Puzzle 14
  {
    groups: [
      { connection: 'Songs by Nirvana', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Smells Like Teen Spirit', artist: 'Nirvana', year: 1991 },
        { title: 'Come as You Are', artist: 'Nirvana', year: 1991 },
        { title: 'Lithium', artist: 'Nirvana', year: 1991 },
        { title: 'In Bloom', artist: 'Nirvana', year: 1991 },
      ]},
      { connection: 'Songs about freedom', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Free Bird', artist: 'Lynyrd Skynyrd', year: 1973 },
        { title: 'Born Free', artist: 'Matt Monro', year: 1966 },
        { title: 'Freedom! \'90', artist: 'George Michael', year: 1990 },
        { title: 'I\'m Free', artist: 'The Rolling Stones', year: 1965 },
      ]},
      { connection: 'Songs featured in The Guardians of the Galaxy', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Hooked on a Feeling', artist: 'Blue Swede', year: 1974 },
        { title: 'Come and Get Your Love', artist: 'Redbone', year: 1974 },
        { title: 'Mr. Blue Sky', artist: 'Electric Light Orchestra', year: 1977 },
        { title: 'The Chain', artist: 'Fleetwood Mac', year: 1977 },
      ]},
      { connection: 'Songs with weather in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Ice Ice Baby', artist: 'Vanilla Ice', year: 1990 },
        { title: 'Hazy Shade of Winter', artist: 'Simon & Garfunkel', year: 1966 },
        { title: 'Hurricane', artist: 'Bob Dylan', year: 1975 },
        { title: 'Thunder Road', artist: 'Bruce Springsteen', year: 1975 },
      ]},
    ],
  },
  // Puzzle 15
  {
    groups: [
      { connection: 'Songs by Taylor Swift', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Shake It Off', artist: 'Taylor Swift', year: 2014 },
        { title: 'Love Story', artist: 'Taylor Swift', year: 2008 },
        { title: 'Blank Space', artist: 'Taylor Swift', year: 2014 },
        { title: 'Anti-Hero', artist: 'Taylor Swift', year: 2022 },
      ]},
      { connection: 'Disco classics', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Stayin\' Alive', artist: 'Bee Gees', year: 1977 },
        { title: 'I Will Survive', artist: 'Gloria Gaynor', year: 1978 },
        { title: 'Le Freak', artist: 'Chic', year: 1978 },
        { title: 'Funkytown', artist: 'Lipps Inc', year: 1980 },
      ]},
      { connection: 'Songs from The Breakfast Club soundtrack era', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Don\'t You (Forget About Me)', artist: 'Simple Minds', year: 1985 },
        { title: 'Everybody Wants to Rule the World', artist: 'Tears for Fears', year: 1985 },
        { title: 'Take On Me', artist: 'a-ha', year: 1985 },
        { title: 'Shout', artist: 'Tears for Fears', year: 1984 },
      ]},
      { connection: 'Songs whose title is a command', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Jump', artist: 'Van Halen', year: 1983 },
        { title: 'Relax', artist: 'Frankie Goes to Hollywood', year: 1983 },
        { title: 'Stay', artist: 'Lisa Loeb', year: 1994 },
        { title: 'Run', artist: 'Snow Patrol', year: 2003 },
      ]},
    ],
  },
  // Puzzle 16
  {
    groups: [
      { connection: 'Songs by Beyonce', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Crazy in Love', artist: 'Beyonce', year: 2003 },
        { title: 'Single Ladies', artist: 'Beyonce', year: 2008 },
        { title: 'Halo', artist: 'Beyonce', year: 2008 },
        { title: 'Formation', artist: 'Beyonce', year: 2016 },
      ]},
      { connection: 'Songs about space or the cosmos', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Rocket Man', artist: 'Elton John', year: 1972 },
        { title: 'Space Oddity', artist: 'David Bowie', year: 1969 },
        { title: 'Supermassive Black Hole', artist: 'Muse', year: 2006 },
        { title: 'Across the Universe', artist: 'The Beatles', year: 1970 },
      ]},
      { connection: 'Songs from Saturday Night Fever', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Stayin\' Alive', artist: 'Bee Gees', year: 1977 },
        { title: 'Night Fever', artist: 'Bee Gees', year: 1977 },
        { title: 'How Deep Is Your Love', artist: 'Bee Gees', year: 1977 },
        { title: 'More Than a Woman', artist: 'Bee Gees', year: 1977 },
      ]},
      { connection: 'Songs that contain "baby" in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Baby One More Time', artist: 'Britney Spears', year: 1998 },
        { title: 'Baby Love', artist: 'The Supremes', year: 1964 },
        { title: 'Ice Ice Baby', artist: 'Vanilla Ice', year: 1990 },
        { title: 'Cry Me a River', artist: 'Justin Timberlake', year: 2002 },
      ]},
    ],
  },
  // Puzzle 17
  {
    groups: [
      { connection: 'Songs by Led Zeppelin', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', year: 1971 },
        { title: 'Whole Lotta Love', artist: 'Led Zeppelin', year: 1969 },
        { title: 'Kashmir', artist: 'Led Zeppelin', year: 1975 },
        { title: 'Immigrant Song', artist: 'Led Zeppelin', year: 1970 },
      ]},
      { connection: 'Songs about telephones or calling', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Call Me', artist: 'Blondie', year: 1980 },
        { title: 'Telephone', artist: 'Lady Gaga', year: 2009 },
        { title: 'Hanging on the Telephone', artist: 'Blondie', year: 1978 },
        { title: 'Hotline Bling', artist: 'Drake', year: 2015 },
      ]},
      { connection: 'Power ballads of the 80s', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Every Rose Has Its Thorn', artist: 'Poison', year: 1988 },
        { title: 'Is This Love', artist: 'Whitesnake', year: 1987 },
        { title: 'Heaven', artist: 'Bryan Adams', year: 1984 },
        { title: 'Alone', artist: 'Heart', year: 1987 },
      ]},
      { connection: 'Songs with a month or season in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'September', artist: 'Earth, Wind & Fire', year: 1978 },
        { title: 'November Rain', artist: 'Guns N\' Roses', year: 1991 },
        { title: 'Summertime', artist: 'DJ Jazzy Jeff & The Fresh Prince', year: 1991 },
        { title: 'Wake Me Up When September Ends', artist: 'Green Day', year: 2004 },
      ]},
    ],
  },
  // Puzzle 18
  {
    groups: [
      { connection: 'Songs by Bruce Springsteen', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Born in the U.S.A.', artist: 'Bruce Springsteen', year: 1984 },
        { title: 'Dancing in the Dark', artist: 'Bruce Springsteen', year: 1984 },
        { title: 'Glory Days', artist: 'Bruce Springsteen', year: 1984 },
        { title: 'The River', artist: 'Bruce Springsteen', year: 1980 },
      ]},
      { connection: 'Songs about dreams or dreaming', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Dream On', artist: 'Aerosmith', year: 1973 },
        { title: 'Sweet Dreams', artist: 'Eurythmics', year: 1983 },
        { title: 'California Dreamin\'', artist: 'The Mamas & the Papas', year: 1965 },
        { title: 'Daydream Believer', artist: 'The Monkees', year: 1967 },
      ]},
      { connection: 'Songs that were number one on the Billboard Hot 100 for 10+ weeks', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Old Town Road', artist: 'Lil Nas X', year: 2019 },
        { title: 'One Sweet Day', artist: 'Mariah Carey & Boyz II Men', year: 1995 },
        { title: 'Despacito', artist: 'Luis Fonsi', year: 2017 },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', year: 2014 },
      ]},
      { connection: 'Songs whose title contains a gemstone or mineral', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Diamond Dogs', artist: 'David Bowie', year: 1974 },
        { title: 'Ruby Tuesday', artist: 'The Rolling Stones', year: 1967 },
        { title: 'Gold', artist: 'Spandau Ballet', year: 1983 },
        { title: 'Emerald', artist: 'Thin Lizzy', year: 1976 },
      ]},
    ],
  },
  // Puzzle 19
  {
    groups: [
      { connection: 'Songs by Amy Winehouse', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Rehab', artist: 'Amy Winehouse', year: 2006 },
        { title: 'Back to Black', artist: 'Amy Winehouse', year: 2006 },
        { title: 'Valerie', artist: 'Amy Winehouse', year: 2007 },
        { title: 'Love Is a Losing Game', artist: 'Amy Winehouse', year: 2006 },
      ]},
      { connection: 'Songs about school', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'School\'s Out', artist: 'Alice Cooper', year: 1972 },
        { title: 'Another Brick in the Wall', artist: 'Pink Floyd', year: 1979 },
        { title: 'Hot for Teacher', artist: 'Van Halen', year: 1984 },
        { title: 'Rock \'n\' Roll High School', artist: 'Ramones', year: 1979 },
      ]},
      { connection: 'Songs interpolated by 2000s pop hits', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Under Pressure', artist: 'Queen & David Bowie', year: 1981 },
        { title: 'Bette Davis Eyes', artist: 'Kim Carnes', year: 1981 },
        { title: 'Tainted Love', artist: 'Soft Cell', year: 1981 },
        { title: 'Blue Monday', artist: 'New Order', year: 1983 },
      ]},
      { connection: 'Songs whose artist name is a first name only', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Royals', artist: 'Lorde', year: 2013 },
        { title: 'Chandelier', artist: 'Sia', year: 2014 },
        { title: 'Toxic', artist: 'Britney', year: 2003 },
        { title: 'Halo', artist: 'Beyonce', year: 2008 },
      ]},
    ],
  },
  // Puzzle 20
  {
    groups: [
      { connection: 'Songs by Radiohead', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Creep', artist: 'Radiohead', year: 1992 },
        { title: 'Karma Police', artist: 'Radiohead', year: 1997 },
        { title: 'No Surprises', artist: 'Radiohead', year: 1997 },
        { title: 'Fake Plastic Trees', artist: 'Radiohead', year: 1995 },
      ]},
      { connection: 'Songs about the road or traveling', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'On the Road Again', artist: 'Willie Nelson', year: 1980 },
        { title: 'Life Is a Highway', artist: 'Tom Cochrane', year: 1991 },
        { title: 'Take Me Home, Country Roads', artist: 'John Denver', year: 1971 },
        { title: 'Route 66', artist: 'Nat King Cole', year: 1946 },
      ]},
      { connection: 'Songs from The Bodyguard soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'I Will Always Love You', artist: 'Whitney Houston', year: 1992 },
        { title: 'I Have Nothing', artist: 'Whitney Houston', year: 1992 },
        { title: 'Run to You', artist: 'Whitney Houston', year: 1992 },
        { title: 'Queen of the Night', artist: 'Whitney Houston', year: 1992 },
      ]},
      { connection: 'Songs with "love" in the title but not about romance', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Tainted Love', artist: 'Soft Cell', year: 1981 },
        { title: 'What Is Love', artist: 'Haddaway', year: 1993 },
        { title: 'Love Will Tear Us Apart', artist: 'Joy Division', year: 1980 },
        { title: 'Whole Lotta Love', artist: 'Led Zeppelin', year: 1969 },
      ]},
    ],
  },
  // Puzzle 21
  {
    groups: [
      { connection: 'Songs by Aretha Franklin', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Respect', artist: 'Aretha Franklin', year: 1967 },
        { title: '(You Make Me Feel Like) A Natural Woman', artist: 'Aretha Franklin', year: 1967 },
        { title: 'Chain of Fools', artist: 'Aretha Franklin', year: 1967 },
        { title: 'Think', artist: 'Aretha Franklin', year: 1968 },
      ]},
      { connection: 'Songs about working or jobs', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Working for the Weekend', artist: 'Loverboy', year: 1981 },
        { title: '9 to 5', artist: 'Dolly Parton', year: 1980 },
        { title: 'Take This Job and Shove It', artist: 'Johnny Paycheck', year: 1977 },
        { title: 'Career Opportunities', artist: 'The Clash', year: 1977 },
      ]},
      { connection: 'British Invasion hits', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'House of the Rising Sun', artist: 'The Animals', year: 1964 },
        { title: 'You Really Got Me', artist: 'The Kinks', year: 1964 },
        { title: 'For Your Love', artist: 'The Yardbirds', year: 1965 },
        { title: 'Time Is on My Side', artist: 'The Rolling Stones', year: 1964 },
      ]},
      { connection: 'Songs that reference another artist by name', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Ballad of John and Yoko', artist: 'The Beatles', year: 1969 },
        { title: 'Song for Bob Dylan', artist: 'David Bowie', year: 1971 },
        { title: 'Killing Me Softly with His Song', artist: 'Roberta Flack', year: 1973 },
        { title: 'Bette Davis Eyes', artist: 'Kim Carnes', year: 1981 },
      ]},
    ],
  },
  // Puzzle 22
  {
    groups: [
      { connection: 'Songs by The Cure', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Friday I\'m in Love', artist: 'The Cure', year: 1992 },
        { title: 'Just Like Heaven', artist: 'The Cure', year: 1987 },
        { title: 'Lovesong', artist: 'The Cure', year: 1989 },
        { title: 'Boys Don\'t Cry', artist: 'The Cure', year: 1979 },
      ]},
      { connection: 'Songs about flowers', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Kiss from a Rose', artist: 'Seal', year: 1994 },
        { title: 'Tulips from Amsterdam', artist: 'Max Bygraves', year: 1958 },
        { title: 'Build Me Up Buttercup', artist: 'The Foundations', year: 1968 },
        { title: 'Lily of the Valley', artist: 'Queen', year: 1974 },
      ]},
      { connection: 'Songs from the Top Gun soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Danger Zone', artist: 'Kenny Loggins', year: 1986 },
        { title: 'Take My Breath Away', artist: 'Berlin', year: 1986 },
        { title: 'Playing with the Boys', artist: 'Kenny Loggins', year: 1986 },
        { title: 'Mighty Wings', artist: 'Cheap Trick', year: 1986 },
      ]},
      { connection: 'Songs by bands named after places', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Hotel California', artist: 'Eagles', year: 1976 },
        { title: 'Africa', artist: 'Toto', year: 1982 },
        { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', year: 1986 },
        { title: 'Pour Some Sugar on Me', artist: 'Def Leppard', year: 1987 },
      ]},
    ],
  },
  // Puzzle 23
  {
    groups: [
      { connection: 'Songs by Coldplay', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Yellow', artist: 'Coldplay', year: 2000 },
        { title: 'The Scientist', artist: 'Coldplay', year: 2002 },
        { title: 'Fix You', artist: 'Coldplay', year: 2005 },
        { title: 'Viva la Vida', artist: 'Coldplay', year: 2008 },
      ]},
      { connection: 'Songs about angels', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Angel', artist: 'Sarah McLachlan', year: 1997 },
        { title: 'Angel of the Morning', artist: 'Juice Newton', year: 1981 },
        { title: 'Calling All Angels', artist: 'Train', year: 2003 },
        { title: 'Teen Angel', artist: 'Mark Dinning', year: 1959 },
      ]},
      { connection: 'Grunge era anthems', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Black Hole Sun', artist: 'Soundgarden', year: 1994 },
        { title: 'Jeremy', artist: 'Pearl Jam', year: 1991 },
        { title: 'Man in the Box', artist: 'Alice in Chains', year: 1990 },
        { title: 'Plush', artist: 'Stone Temple Pilots', year: 1992 },
      ]},
      { connection: 'Songs whose title spells out a word with initials', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'YMCA', artist: 'Village People', year: 1978 },
        { title: 'SOS', artist: 'ABBA', year: 1975 },
        { title: 'TNT', artist: 'AC/DC', year: 1975 },
        { title: 'MMMBop', artist: 'Hanson', year: 1997 },
      ]},
    ],
  },
  // Puzzle 24
  {
    groups: [
      { connection: 'Songs by R.E.M.', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Losing My Religion', artist: 'R.E.M.', year: 1991 },
        { title: 'Everybody Hurts', artist: 'R.E.M.', year: 1992 },
        { title: 'Shiny Happy People', artist: 'R.E.M.', year: 1991 },
        { title: 'It\'s the End of the World as We Know It', artist: 'R.E.M.', year: 1987 },
      ]},
      { connection: 'Songs about rivers or the sea', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Bridge over Troubled Water', artist: 'Simon & Garfunkel', year: 1970 },
        { title: 'Sittin\' on the Dock of the Bay', artist: 'Otis Redding', year: 1968 },
        { title: 'Beyond the Sea', artist: 'Bobby Darin', year: 1959 },
        { title: 'Proud Mary', artist: 'Creedence Clearwater Revival', year: 1969 },
      ]},
      { connection: 'Songs by artists who died at age 27', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Purple Haze', artist: 'Jimi Hendrix', year: 1967 },
        { title: 'Piece of My Heart', artist: 'Janis Joplin', year: 1968 },
        { title: 'Love Buzz', artist: 'Nirvana', year: 1988 },
        { title: 'Rehab', artist: 'Amy Winehouse', year: 2006 },
      ]},
      { connection: 'Songs with a repeated word in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Bye Bye Bye', artist: 'NSYNC', year: 2000 },
        { title: 'New York, New York', artist: 'Frank Sinatra', year: 1980 },
        { title: 'Money Money Money', artist: 'ABBA', year: 1976 },
        { title: 'Bam Bam', artist: 'Sister Nancy', year: 1982 },
      ]},
    ],
  },
  // Puzzle 25
  {
    groups: [
      { connection: 'Songs by Johnny Cash', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Ring of Fire', artist: 'Johnny Cash', year: 1963 },
        { title: 'Folsom Prison Blues', artist: 'Johnny Cash', year: 1955 },
        { title: 'Walk the Line', artist: 'Johnny Cash', year: 1956 },
        { title: 'A Boy Named Sue', artist: 'Johnny Cash', year: 1969 },
      ]},
      { connection: 'Songs about loneliness', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Eleanor Rigby', artist: 'The Beatles', year: 1966 },
        { title: 'Only the Lonely', artist: 'Roy Orbison', year: 1960 },
        { title: 'All by Myself', artist: 'Eric Carmen', year: 1975 },
        { title: 'Lonely Boy', artist: 'The Black Keys', year: 2011 },
      ]},
      { connection: 'Songs from the Rocky soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Eye of the Tiger', artist: 'Survivor', year: 1982 },
        { title: 'Gonna Fly Now', artist: 'Bill Conti', year: 1976 },
        { title: 'Burning Heart', artist: 'Survivor', year: 1985 },
        { title: 'No Easy Way Out', artist: 'Robert Tepper', year: 1985 },
      ]},
      { connection: 'Songs with a double meaning title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Like a Rolling Stone', artist: 'Bob Dylan', year: 1965 },
        { title: 'Every Breath You Take', artist: 'The Police', year: 1983 },
        { title: 'Born in the U.S.A.', artist: 'Bruce Springsteen', year: 1984 },
        { title: 'Pumped Up Kicks', artist: 'Foster the People', year: 2010 },
      ]},
    ],
  },
  // Puzzle 26
  {
    groups: [
      { connection: 'Songs by Adele', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Rolling in the Deep', artist: 'Adele', year: 2010 },
        { title: 'Someone Like You', artist: 'Adele', year: 2011 },
        { title: 'Set Fire to the Rain', artist: 'Adele', year: 2011 },
        { title: 'Easy On Me', artist: 'Adele', year: 2021 },
      ]},
      { connection: 'Songs about shoes or boots', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Blue Suede Shoes', artist: 'Elvis Presley', year: 1956 },
        { title: 'These Boots Are Made for Walkin\'', artist: 'Nancy Sinatra', year: 1966 },
        { title: 'Goody Two Shoes', artist: 'Adam Ant', year: 1982 },
        { title: 'Shoes', artist: 'Tori Amos', year: 1994 },
      ]},
      { connection: 'New wave hits of the early 80s', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Whip It', artist: 'Devo', year: 1980 },
        { title: 'Once in a Lifetime', artist: 'Talking Heads', year: 1981 },
        { title: 'Love Will Tear Us Apart', artist: 'Joy Division', year: 1980 },
        { title: 'Just Can\'t Get Enough', artist: 'Depeche Mode', year: 1981 },
      ]},
      { connection: 'Songs containing a planet name in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Venus', artist: 'Shocking Blue', year: 1969 },
        { title: 'Life on Mars?', artist: 'David Bowie', year: 1971 },
        { title: 'Jupiter', artist: 'Gustav Holst', year: 1916 },
        { title: 'Mercury Poisoning', artist: 'Graham Parker', year: 1979 },
      ]},
    ],
  },
  // Puzzle 27
  {
    groups: [
      { connection: 'Songs by The Clash', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'London Calling', artist: 'The Clash', year: 1979 },
        { title: 'Rock the Casbah', artist: 'The Clash', year: 1982 },
        { title: 'Should I Stay or Should I Go', artist: 'The Clash', year: 1982 },
        { title: 'Train in Vain', artist: 'The Clash', year: 1979 },
      ]},
      { connection: 'Songs about hair', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Bald Headed Woman', artist: 'The Kinks', year: 1966 },
        { title: 'Whip My Hair', artist: 'Willow Smith', year: 2010 },
        { title: 'Hair', artist: 'Lady Gaga', year: 2011 },
        { title: 'Short People', artist: 'Randy Newman', year: 1977 },
      ]},
      { connection: 'Songs from the Footloose soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Footloose', artist: 'Kenny Loggins', year: 1984 },
        { title: 'Let\'s Hear It for the Boy', artist: 'Deniece Williams', year: 1984 },
        { title: 'Holding Out for a Hero', artist: 'Bonnie Tyler', year: 1984 },
        { title: 'Almost Paradise', artist: 'Mike Reno & Ann Wilson', year: 1984 },
      ]},
      { connection: 'Songs with a silent or parenthetical subtitle', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Crazy in Love (feat. Jay-Z)', artist: 'Beyonce', year: 2003 },
        { title: '(Don\'t Fear) The Reaper', artist: 'Blue Oyster Cult', year: 1976 },
        { title: 'Walk This Way (Run-D.M.C. version)', artist: 'Aerosmith', year: 1986 },
        { title: '(Sittin\' On) The Dock of the Bay', artist: 'Otis Redding', year: 1968 },
      ]},
    ],
  },
  // Puzzle 28
  {
    groups: [
      { connection: 'Songs by Oasis', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Wonderwall', artist: 'Oasis', year: 1995 },
        { title: 'Don\'t Look Back in Anger', artist: 'Oasis', year: 1995 },
        { title: 'Live Forever', artist: 'Oasis', year: 1994 },
        { title: 'Champagne Supernova', artist: 'Oasis', year: 1996 },
      ]},
      { connection: 'Songs about mothers', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Mama Said Knock You Out', artist: 'LL Cool J', year: 1990 },
        { title: 'Mother', artist: 'Pink Floyd', year: 1979 },
        { title: 'Dear Mama', artist: 'Tupac', year: 1995 },
        { title: 'Mama', artist: 'Genesis', year: 1983 },
      ]},
      { connection: 'Songs from the Shrek soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'All Star', artist: 'Smash Mouth', year: 1999 },
        { title: 'I\'m a Believer', artist: 'Smash Mouth', year: 2001 },
        { title: 'Hallelujah', artist: 'Rufus Wainwright', year: 2001 },
        { title: 'Accidentally in Love', artist: 'Counting Crows', year: 2004 },
      ]},
      { connection: 'Songs whose title contains exactly two letters', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'If', artist: 'Bread', year: 1971 },
        { title: 'Go', artist: 'Pearl Jam', year: 1993 },
        { title: 'No', artist: 'Meghan Trainor', year: 2016 },
        { title: 'Up', artist: 'Cardi B', year: 2021 },
      ]},
    ],
  },
  // Puzzle 29
  {
    groups: [
      { connection: 'Songs by Whitney Houston', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Greatest Love of All', artist: 'Whitney Houston', year: 1985 },
        { title: 'How Will I Know', artist: 'Whitney Houston', year: 1985 },
        { title: 'I Wanna Dance with Somebody', artist: 'Whitney Houston', year: 1987 },
        { title: 'Saving All My Love for You', artist: 'Whitney Houston', year: 1985 },
      ]},
      { connection: 'Songs about parties', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Party in the U.S.A.', artist: 'Miley Cyrus', year: 2009 },
        { title: 'Fight for Your Right', artist: 'Beastie Boys', year: 1986 },
        { title: 'Celebration', artist: 'Kool & the Gang', year: 1980 },
        { title: '1999', artist: 'Prince', year: 1982 },
      ]},
      { connection: 'Songs from a James Bond film', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Goldfinger', artist: 'Shirley Bassey', year: 1964 },
        { title: 'Live and Let Die', artist: 'Wings', year: 1973 },
        { title: 'A View to a Kill', artist: 'Duran Duran', year: 1985 },
        { title: 'Skyfall', artist: 'Adele', year: 2012 },
      ]},
      { connection: 'Songs where the title rhymes', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Shake and Bake', artist: 'N/A', year: 2006 },
        { title: 'Lean on Me', artist: 'Bill Withers', year: 1972 },
        { title: 'In Da Club', artist: '50 Cent', year: 2003 },
        { title: 'Wake and Bake', artist: 'N/A', year: 2010 },
      ]},
    ],
  },
  // Puzzle 30
  {
    groups: [
      { connection: 'Songs by Pink Floyd', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Comfortably Numb', artist: 'Pink Floyd', year: 1979 },
        { title: 'Wish You Were Here', artist: 'Pink Floyd', year: 1975 },
        { title: 'Money', artist: 'Pink Floyd', year: 1973 },
        { title: 'Time', artist: 'Pink Floyd', year: 1973 },
      ]},
      { connection: 'Songs about colors (not in the title)', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 6, items: [
        { title: 'Ebony and Ivory', artist: 'Paul McCartney & Stevie Wonder', year: 1982 },
        { title: 'A Whiter Shade of Pale', artist: 'Procol Harum', year: 1967 },
        { title: 'Lady in Red', artist: 'Chris de Burgh', year: 1986 },
        { title: 'Paint It Black', artist: 'The Rolling Stones', year: 1966 },
      ]},
      { connection: 'Songs that were originally B-sides', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'I Will Survive', artist: 'Gloria Gaynor', year: 1978 },
        { title: 'Maggie May', artist: 'Rod Stewart', year: 1971 },
        { title: 'Under Pressure', artist: 'Queen & David Bowie', year: 1981 },
        { title: 'I Am the Walrus', artist: 'The Beatles', year: 1967 },
      ]},
      { connection: 'Songs whose title starts and ends with the same letter', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'Dancing in the Dark', artist: 'Bruce Springsteen', year: 1984 },
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', year: 1971 },
        { title: 'Another One Bites the Dust', artist: 'Queen', year: 1980 },
        { title: 'Enter Sandman', artist: 'Metallica', year: 1991 },
      ]},
    ],
  },
  // Puzzles 31-60: More variety in connection types
  // Puzzle 31
  {
    groups: [
      { connection: 'Songs by Marvin Gaye', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Let\'s Get It On', artist: 'Marvin Gaye', year: 1973 },
        { title: 'Sexual Healing', artist: 'Marvin Gaye', year: 1982 },
        { title: 'What\'s Going On', artist: 'Marvin Gaye', year: 1971 },
        { title: 'Ain\'t No Mountain High Enough', artist: 'Marvin Gaye', year: 1967 },
      ]},
      { connection: 'Songs from the 1960s folk revival', connection_type: 'genre_link', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Blowin\' in the Wind', artist: 'Bob Dylan', year: 1963 },
        { title: 'Where Have All the Flowers Gone', artist: 'Pete Seeger', year: 1961 },
        { title: 'If I Had a Hammer', artist: 'Peter, Paul and Mary', year: 1962 },
        { title: 'Turn! Turn! Turn!', artist: 'The Byrds', year: 1965 },
      ]},
      { connection: 'One-hit wonders of the 1980s', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Come On Eileen', artist: 'Dexys Midnight Runners', year: 1982 },
        { title: 'Tainted Love', artist: 'Soft Cell', year: 1981 },
        { title: 'Safety Dance', artist: 'Men Without Hats', year: 1982 },
        { title: 'I Ran (So Far Away)', artist: 'A Flock of Seagulls', year: 1982 },
      ]},
      { connection: 'Songs where the artist\'s name is in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Billie Jean', artist: 'Michael Jackson', year: 1982 },
        { title: 'Stan', artist: 'Eminem', year: 2000 },
        { title: 'Hey Jude', artist: 'The Beatles', year: 1968 },
        { title: 'Baba O\'Riley', artist: 'The Who', year: 1971 },
      ]},
    ],
  },
  // Puzzle 32
  {
    groups: [
      { connection: 'Songs by Eagles', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Hotel California', artist: 'Eagles', year: 1976 },
        { title: 'Take It Easy', artist: 'Eagles', year: 1972 },
        { title: 'Desperado', artist: 'Eagles', year: 1973 },
        { title: 'Life in the Fast Lane', artist: 'Eagles', year: 1976 },
      ]},
      { connection: 'Songs about wanting to be loved', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Lovefool', artist: 'The Cardigans', year: 1996 },
        { title: 'I Want You to Want Me', artist: 'Cheap Trick', year: 1977 },
        { title: 'Somebody to Love', artist: 'Jefferson Airplane', year: 1967 },
        { title: 'You Oughta Know', artist: 'Alanis Morissette', year: 1995 },
      ]},
      { connection: 'Songs that feature a prominent piano riff', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Piano Man', artist: 'Billy Joel', year: 1973 },
        { title: 'Clocks', artist: 'Coldplay', year: 2002 },
        { title: 'Bennie and the Jets', artist: 'Elton John', year: 1973 },
        { title: 'Great Balls of Fire', artist: 'Jerry Lee Lewis', year: 1957 },
      ]},
      { connection: 'Songs with a military rank or title in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Sgt. Pepper\'s Lonely Hearts Club Band', artist: 'The Beatles', year: 1967 },
        { title: 'Private Eyes', artist: 'Hall & Oates', year: 1981 },
        { title: 'Major Tom', artist: 'Peter Schilling', year: 1983 },
        { title: 'Captain Jack', artist: 'Billy Joel', year: 1973 },
      ]},
    ],
  },
  // Puzzle 33
  {
    groups: [
      { connection: 'Songs by Dolly Parton', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Jolene', artist: 'Dolly Parton', year: 1973 },
        { title: '9 to 5', artist: 'Dolly Parton', year: 1980 },
        { title: 'I Will Always Love You', artist: 'Dolly Parton', year: 1973 },
        { title: 'Coat of Many Colors', artist: 'Dolly Parton', year: 1971 },
      ]},
      { connection: 'Songs about the moon', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', year: 1964 },
        { title: 'Bad Moon Rising', artist: 'Creedence Clearwater Revival', year: 1969 },
        { title: 'Moondance', artist: 'Van Morrison', year: 1970 },
        { title: 'Dancing in the Moonlight', artist: 'King Harvest', year: 1972 },
      ]},
      { connection: 'Songs from 8 Mile', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Lose Yourself', artist: 'Eminem', year: 2002 },
        { title: '8 Mile', artist: 'Eminem', year: 2002 },
        { title: 'Rabbit Run', artist: 'Eminem', year: 2002 },
        { title: 'Lose Yourself (Demo)', artist: 'Eminem', year: 2002 },
      ]},
      { connection: 'Songs with clothing in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Blue Jean', artist: 'David Bowie', year: 1984 },
        { title: 'Raspberry Beret', artist: 'Prince', year: 1985 },
        { title: 'Dress You Up', artist: 'Madonna', year: 1984 },
        { title: 'Sharp Dressed Man', artist: 'ZZ Top', year: 1983 },
      ]},
    ],
  },
  // Puzzle 34
  {
    groups: [
      { connection: 'Songs by AC/DC', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Back in Black', artist: 'AC/DC', year: 1980 },
        { title: 'Thunderstruck', artist: 'AC/DC', year: 1990 },
        { title: 'Highway to Hell', artist: 'AC/DC', year: 1979 },
        { title: 'You Shook Me All Night Long', artist: 'AC/DC', year: 1980 },
      ]},
      { connection: 'Songs about waiting', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Waiting for a Girl Like You', artist: 'Foreigner', year: 1981 },
        { title: 'The Waiting', artist: 'Tom Petty', year: 1981 },
        { title: 'Right Here Waiting', artist: 'Richard Marx', year: 1989 },
        { title: 'I Still Haven\'t Found What I\'m Looking For', artist: 'U2', year: 1987 },
      ]},
      { connection: 'Songs featured in Grand Theft Auto games', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Danger Zone', artist: 'Kenny Loggins', year: 1986 },
        { title: 'I Ran (So Far Away)', artist: 'A Flock of Seagulls', year: 1982 },
        { title: 'Radio Ga Ga', artist: 'Queen', year: 1984 },
        { title: 'Cult of Personality', artist: 'Living Colour', year: 1988 },
      ]},
      { connection: 'Songs with a time of day in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: '3 AM', artist: 'Matchbox Twenty', year: 1996 },
        { title: 'Midnight Rambler', artist: 'The Rolling Stones', year: 1969 },
        { title: 'Six O\'Clock', artist: 'The Lovin\' Spoonful', year: 1967 },
        { title: 'Quarter to Three', artist: 'Gary U.S. Bonds', year: 1961 },
      ]},
    ],
  },
  // Puzzle 35
  {
    groups: [
      { connection: 'Songs by Blondie', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Heart of Glass', artist: 'Blondie', year: 1978 },
        { title: 'Call Me', artist: 'Blondie', year: 1980 },
        { title: 'Rapture', artist: 'Blondie', year: 1981 },
        { title: 'One Way or Another', artist: 'Blondie', year: 1978 },
      ]},
      { connection: 'Songs about sleep or waking up', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Wake Me Up Before You Go-Go', artist: 'Wham!', year: 1984 },
        { title: 'Good Morning', artist: 'Kanye West', year: 2007 },
        { title: 'Dream a Little Dream of Me', artist: 'The Mamas & the Papas', year: 1968 },
        { title: 'Mr. Sandman', artist: 'The Chordettes', year: 1954 },
      ]},
      { connection: 'Songs from the Trainspotting soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Lust for Life', artist: 'Iggy Pop', year: 1977 },
        { title: 'Born Slippy .NUXX', artist: 'Underworld', year: 1995 },
        { title: 'Perfect Day', artist: 'Lou Reed', year: 1972 },
        { title: 'Atomic', artist: 'Blondie', year: 1979 },
      ]},
      { connection: 'Songs with a state or country in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Georgia on My Mind', artist: 'Ray Charles', year: 1960 },
        { title: 'Africa', artist: 'Toto', year: 1982 },
        { title: 'California Gurls', artist: 'Katy Perry', year: 2010 },
        { title: 'Born in the U.S.A.', artist: 'Bruce Springsteen', year: 1984 },
      ]},
    ],
  },
  // Puzzle 36
  {
    groups: [
      { connection: 'Songs by Bee Gees', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Stayin\' Alive', artist: 'Bee Gees', year: 1977 },
        { title: 'How Deep Is Your Love', artist: 'Bee Gees', year: 1977 },
        { title: 'Tragedy', artist: 'Bee Gees', year: 1979 },
        { title: 'Jive Talkin\'', artist: 'Bee Gees', year: 1975 },
      ]},
      { connection: 'Songs about growing old', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'When I\'m Sixty-Four', artist: 'The Beatles', year: 1967 },
        { title: 'Forever Young', artist: 'Alphaville', year: 1984 },
        { title: 'Old Man', artist: 'Neil Young', year: 1972 },
        { title: 'My Generation', artist: 'The Who', year: 1965 },
      ]},
      { connection: 'Songs produced by Phil Spector', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Be My Baby', artist: 'The Ronettes', year: 1963 },
        { title: 'Da Doo Ron Ron', artist: 'The Crystals', year: 1963 },
        { title: 'River Deep - Mountain High', artist: 'Ike & Tina Turner', year: 1966 },
        { title: 'You\'ve Lost That Lovin\' Feelin\'', artist: 'The Righteous Brothers', year: 1964 },
      ]},
      { connection: 'Songs with an animal sound or noise in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Roar', artist: 'Katy Perry', year: 2013 },
        { title: 'Bark at the Moon', artist: 'Ozzy Osbourne', year: 1983 },
        { title: 'Hound Dog', artist: 'Elvis Presley', year: 1956 },
        { title: 'Crocodile Rock', artist: 'Elton John', year: 1972 },
      ]},
    ],
  },
  // Puzzle 37
  {
    groups: [
      { connection: 'Songs by Billy Joel', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Piano Man', artist: 'Billy Joel', year: 1973 },
        { title: 'Uptown Girl', artist: 'Billy Joel', year: 1983 },
        { title: 'We Didn\'t Start the Fire', artist: 'Billy Joel', year: 1989 },
        { title: 'Just the Way You Are', artist: 'Billy Joel', year: 1977 },
      ]},
      { connection: 'Songs about being young', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Young Americans', artist: 'David Bowie', year: 1975 },
        { title: 'Kids in America', artist: 'Kim Wilde', year: 1981 },
        { title: 'We Are Young', artist: 'fun.', year: 2011 },
        { title: 'Teenage Dirtbag', artist: 'Wheatus', year: 2000 },
      ]},
      { connection: 'Songs from the Purple Rain album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'When Doves Cry', artist: 'Prince', year: 1984 },
        { title: 'Let\'s Go Crazy', artist: 'Prince', year: 1984 },
        { title: 'I Would Die 4 U', artist: 'Prince', year: 1984 },
        { title: 'Purple Rain', artist: 'Prince', year: 1984 },
      ]},
      { connection: 'Songs whose title is also a sport or game', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Poker Face', artist: 'Lady Gaga', year: 2008 },
        { title: 'Pinball Wizard', artist: 'The Who', year: 1969 },
        { title: 'Pool Shark', artist: 'Sublime', year: 1996 },
        { title: 'Dodgeball', artist: 'Various', year: 2004 },
      ]},
    ],
  },
  // Puzzle 38
  {
    groups: [
      { connection: 'Songs by Tina Turner', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'What\'s Love Got to Do with It', artist: 'Tina Turner', year: 1984 },
        { title: 'Simply the Best', artist: 'Tina Turner', year: 1991 },
        { title: 'Private Dancer', artist: 'Tina Turner', year: 1984 },
        { title: 'Proud Mary', artist: 'Tina Turner', year: 1971 },
      ]},
      { connection: 'Songs that were banned from radio', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 6, items: [
        { title: 'God Save the Queen', artist: 'Sex Pistols', year: 1977 },
        { title: 'Relax', artist: 'Frankie Goes to Hollywood', year: 1983 },
        { title: 'Lola', artist: 'The Kinks', year: 1970 },
        { title: 'Louie Louie', artist: 'The Kingsmen', year: 1963 },
      ]},
      { connection: 'Songs from the Rumours album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Dreams', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'Go Your Own Way', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'The Chain', artist: 'Fleetwood Mac', year: 1977 },
        { title: 'Don\'t Stop', artist: 'Fleetwood Mac', year: 1977 },
      ]},
      { connection: 'Songs whose title is also a girl\'s name that\'s not about a girl', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'Gloria', artist: 'Them', year: 1964 },
        { title: 'Roxanne', artist: 'The Police', year: 1978 },
        { title: 'Sara', artist: 'Fleetwood Mac', year: 1979 },
        { title: 'Jolene', artist: 'Dolly Parton', year: 1973 },
      ]},
    ],
  },
  // Puzzle 39
  {
    groups: [
      { connection: 'Songs by The Smiths', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'There Is a Light That Never Goes Out', artist: 'The Smiths', year: 1986 },
        { title: 'How Soon Is Now?', artist: 'The Smiths', year: 1984 },
        { title: 'This Charming Man', artist: 'The Smiths', year: 1983 },
        { title: 'Girlfriend in a Coma', artist: 'The Smiths', year: 1987 },
      ]},
      { connection: 'Songs about returning home', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Homeward Bound', artist: 'Simon & Garfunkel', year: 1966 },
        { title: 'Take Me Home, Country Roads', artist: 'John Denver', year: 1971 },
        { title: 'Coming Home', artist: 'Diddy', year: 2006 },
        { title: 'Sweet Home Alabama', artist: 'Lynyrd Skynyrd', year: 1974 },
      ]},
      { connection: 'Synthpop classics', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Enjoy the Silence', artist: 'Depeche Mode', year: 1990 },
        { title: 'Don\'t You Want Me', artist: 'The Human League', year: 1981 },
        { title: 'Bizarre Love Triangle', artist: 'New Order', year: 1986 },
        { title: 'West End Girls', artist: 'Pet Shop Boys', year: 1985 },
      ]},
      { connection: 'Songs that contain a country music instrument in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Guitar Town', artist: 'Steve Earle', year: 1986 },
        { title: 'The Devil Went Down to Georgia', artist: 'Charlie Daniels Band', year: 1979 },
        { title: 'Banjo', artist: 'Rascal Flatts', year: 2012 },
        { title: 'Mandolin Rain', artist: 'Bruce Hornsby', year: 1986 },
      ]},
    ],
  },
  // Puzzle 40
  {
    groups: [
      { connection: 'Songs by Guns N\' Roses', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'Welcome to the Jungle', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'Paradise City', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'November Rain', artist: 'Guns N\' Roses', year: 1991 },
      ]},
      { connection: 'Songs about running away', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Runaway', artist: 'Bon Jovi', year: 1984 },
        { title: 'Running Up That Hill', artist: 'Kate Bush', year: 1985 },
        { title: 'Run to the Hills', artist: 'Iron Maiden', year: 1982 },
        { title: 'Runaway Train', artist: 'Soul Asylum', year: 1992 },
      ]},
      { connection: 'Songs from the Thriller album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
        { title: 'Beat It', artist: 'Michael Jackson', year: 1982 },
        { title: 'Billie Jean', artist: 'Michael Jackson', year: 1982 },
        { title: 'Wanna Be Startin\' Somethin\'', artist: 'Michael Jackson', year: 1982 },
      ]},
      { connection: 'Songs where the title contains a dance move', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'The Twist', artist: 'Chubby Checker', year: 1960 },
        { title: 'Walk Like an Egyptian', artist: 'The Bangles', year: 1986 },
        { title: 'The Hustle', artist: 'Van McCoy', year: 1975 },
        { title: 'Cha Cha Slide', artist: 'DJ Casper', year: 2000 },
      ]},
    ],
  },
  // Puzzle 41
  {
    groups: [
      { connection: 'Songs by Depeche Mode', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Personal Jesus', artist: 'Depeche Mode', year: 1989 },
        { title: 'Enjoy the Silence', artist: 'Depeche Mode', year: 1990 },
        { title: 'Just Can\'t Get Enough', artist: 'Depeche Mode', year: 1981 },
        { title: 'Policy of Truth', artist: 'Depeche Mode', year: 1990 },
      ]},
      { connection: 'Songs about flying or wings', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Fly Away', artist: 'Lenny Kravitz', year: 1998 },
        { title: 'Learning to Fly', artist: 'Tom Petty', year: 1991 },
        { title: 'Wind Beneath My Wings', artist: 'Bette Midler', year: 1989 },
        { title: 'Fly Like an Eagle', artist: 'Steve Miller Band', year: 1976 },
      ]},
      { connection: 'Country crossover hits', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Jolene', artist: 'Dolly Parton', year: 1973 },
        { title: 'Friends in Low Places', artist: 'Garth Brooks', year: 1990 },
        { title: 'The Gambler', artist: 'Kenny Rogers', year: 1978 },
        { title: 'Crazy', artist: 'Patsy Cline', year: 1961 },
      ]},
      { connection: 'Songs where the title begins with "Don\'t"', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Don\'t Stop Believin\'', artist: 'Journey', year: 1981 },
        { title: 'Don\'t Speak', artist: 'No Doubt', year: 1995 },
        { title: 'Don\'t You (Forget About Me)', artist: 'Simple Minds', year: 1985 },
        { title: 'Don\'t Look Back in Anger', artist: 'Oasis', year: 1995 },
      ]},
    ],
  },
  // Puzzle 42
  {
    groups: [
      { connection: 'Songs by Tom Petty', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Free Fallin\'', artist: 'Tom Petty', year: 1989 },
        { title: 'American Girl', artist: 'Tom Petty', year: 1976 },
        { title: 'I Won\'t Back Down', artist: 'Tom Petty', year: 1989 },
        { title: 'Runnin\' Down a Dream', artist: 'Tom Petty', year: 1989 },
      ]},
      { connection: 'Songs about ghosts or the supernatural', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Ghostbusters', artist: 'Ray Parker Jr.', year: 1984 },
        { title: 'Somebody\'s Watching Me', artist: 'Rockwell', year: 1984 },
        { title: 'Superstition', artist: 'Stevie Wonder', year: 1972 },
        { title: 'Thriller', artist: 'Michael Jackson', year: 1982 },
      ]},
      { connection: 'Songs from the Dark Side of the Moon', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Money', artist: 'Pink Floyd', year: 1973 },
        { title: 'Time', artist: 'Pink Floyd', year: 1973 },
        { title: 'Us and Them', artist: 'Pink Floyd', year: 1973 },
        { title: 'Brain Damage', artist: 'Pink Floyd', year: 1973 },
      ]},
      { connection: 'Songs with a building or structure in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Hotel California', artist: 'Eagles', year: 1976 },
        { title: 'Brick House', artist: 'Commodores', year: 1977 },
        { title: 'House of the Rising Sun', artist: 'The Animals', year: 1964 },
        { title: 'Stairway to Heaven', artist: 'Led Zeppelin', year: 1971 },
      ]},
    ],
  },
  // Puzzle 43
  {
    groups: [
      { connection: 'Songs by The Who', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Baba O\'Riley', artist: 'The Who', year: 1971 },
        { title: 'My Generation', artist: 'The Who', year: 1965 },
        { title: 'Pinball Wizard', artist: 'The Who', year: 1969 },
        { title: 'Won\'t Get Fooled Again', artist: 'The Who', year: 1971 },
      ]},
      { connection: 'Songs about war and peace', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'War', artist: 'Edwin Starr', year: 1970 },
        { title: 'Imagine', artist: 'John Lennon', year: 1971 },
        { title: 'Give Peace a Chance', artist: 'John Lennon', year: 1969 },
        { title: 'Fortunate Son', artist: 'Creedence Clearwater Revival', year: 1969 },
      ]},
      { connection: 'Songs from the Nevermind album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Smells Like Teen Spirit', artist: 'Nirvana', year: 1991 },
        { title: 'Come as You Are', artist: 'Nirvana', year: 1991 },
        { title: 'In Bloom', artist: 'Nirvana', year: 1991 },
        { title: 'Polly', artist: 'Nirvana', year: 1991 },
      ]},
      { connection: 'Songs whose title is an exclamation or interjection', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Oops!...I Did It Again', artist: 'Britney Spears', year: 2000 },
        { title: 'Shout', artist: 'Tears for Fears', year: 1984 },
        { title: 'Whoomp! (There It Is)', artist: 'Tag Team', year: 1993 },
        { title: 'Oh! Darling', artist: 'The Beatles', year: 1969 },
      ]},
    ],
  },
  // Puzzle 44
  {
    groups: [
      { connection: 'Songs by The Doors', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Light My Fire', artist: 'The Doors', year: 1967 },
        { title: 'Riders on the Storm', artist: 'The Doors', year: 1971 },
        { title: 'Break On Through', artist: 'The Doors', year: 1967 },
        { title: 'People Are Strange', artist: 'The Doors', year: 1967 },
      ]},
      { connection: 'Songs about forgiveness', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Sorry', artist: 'Justin Bieber', year: 2015 },
        { title: 'Apologize', artist: 'OneRepublic', year: 2006 },
        { title: 'Forgive Me', artist: 'Leona Lewis', year: 2008 },
        { title: 'Hard to Say I\'m Sorry', artist: 'Chicago', year: 1982 },
      ]},
      { connection: 'Reggae classics', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'No Woman, No Cry', artist: 'Bob Marley', year: 1974 },
        { title: 'Many Rivers to Cross', artist: 'Jimmy Cliff', year: 1969 },
        { title: 'Red Red Wine', artist: 'UB40', year: 1983 },
        { title: '54-46 That\'s My Number', artist: 'Toots & The Maytals', year: 1968 },
      ]},
      { connection: 'Songs with a family member in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Papa Was a Rollin\' Stone', artist: 'The Temptations', year: 1972 },
        { title: 'Mother and Child Reunion', artist: 'Paul Simon', year: 1972 },
        { title: 'Brother, Can You Spare a Dime?', artist: 'Bing Crosby', year: 1932 },
        { title: 'Sister Golden Hair', artist: 'America', year: 1975 },
      ]},
    ],
  },
  // Puzzle 45
  {
    groups: [
      { connection: 'Songs by Talking Heads', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Psycho Killer', artist: 'Talking Heads', year: 1977 },
        { title: 'Once in a Lifetime', artist: 'Talking Heads', year: 1981 },
        { title: 'Burning Down the House', artist: 'Talking Heads', year: 1983 },
        { title: 'This Must Be the Place', artist: 'Talking Heads', year: 1983 },
      ]},
      { connection: 'Songs about eyes or seeing', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'I Only Have Eyes for You', artist: 'The Flamingos', year: 1959 },
        { title: 'In Your Eyes', artist: 'Peter Gabriel', year: 1986 },
        { title: 'Brown Eyed Girl', artist: 'Van Morrison', year: 1967 },
        { title: 'Private Eyes', artist: 'Hall & Oates', year: 1981 },
      ]},
      { connection: 'Brit pop anthems', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Wonderwall', artist: 'Oasis', year: 1995 },
        { title: 'Common People', artist: 'Pulp', year: 1995 },
        { title: 'Girls & Boys', artist: 'Blur', year: 1994 },
        { title: 'Bittersweet Symphony', artist: 'The Verve', year: 1997 },
      ]},
      { connection: 'Songs whose title contains a musical instrument', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Piano Man', artist: 'Billy Joel', year: 1973 },
        { title: 'Trumpet Voluntary', artist: 'Jeremiah Clarke', year: 1700 },
        { title: 'Drums of Peace', artist: 'Various', year: 1980 },
        { title: 'While My Guitar Gently Weeps', artist: 'The Beatles', year: 1968 },
      ]},
    ],
  },
  // Puzzle 46
  {
    groups: [
      { connection: 'Songs by Jimi Hendrix', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Purple Haze', artist: 'Jimi Hendrix', year: 1967 },
        { title: 'All Along the Watchtower', artist: 'Jimi Hendrix', year: 1968 },
        { title: 'Voodoo Child', artist: 'Jimi Hendrix', year: 1968 },
        { title: 'Hey Joe', artist: 'Jimi Hendrix', year: 1966 },
      ]},
      { connection: 'Songs about kings, queens, or royalty', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Killer Queen', artist: 'Queen', year: 1974 },
        { title: 'King of the Road', artist: 'Roger Miller', year: 1964 },
        { title: 'Royals', artist: 'Lorde', year: 2013 },
        { title: 'Dancing Queen', artist: 'ABBA', year: 1976 },
      ]},
      { connection: 'Songs from the Abbey Road album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Come Together', artist: 'The Beatles', year: 1969 },
        { title: 'Something', artist: 'The Beatles', year: 1969 },
        { title: 'Here Comes the Sun', artist: 'The Beatles', year: 1969 },
        { title: 'Octopus\'s Garden', artist: 'The Beatles', year: 1969 },
      ]},
      { connection: 'Songs whose title includes a type of street or road', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Penny Lane', artist: 'The Beatles', year: 1967 },
        { title: 'Boulevard of Broken Dreams', artist: 'Green Day', year: 2004 },
        { title: 'Thunder Road', artist: 'Bruce Springsteen', year: 1975 },
        { title: 'Electric Avenue', artist: 'Eddy Grant', year: 1982 },
      ]},
    ],
  },
  // Puzzle 47
  {
    groups: [
      { connection: 'Songs by Daft Punk', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Get Lucky', artist: 'Daft Punk', year: 2013 },
        { title: 'Around the World', artist: 'Daft Punk', year: 1997 },
        { title: 'One More Time', artist: 'Daft Punk', year: 2000 },
        { title: 'Harder, Better, Faster, Stronger', artist: 'Daft Punk', year: 2001 },
      ]},
      { connection: 'Songs about rebellion or protest', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Fight the Power', artist: 'Public Enemy', year: 1989 },
        { title: 'Killing in the Name', artist: 'Rage Against the Machine', year: 1992 },
        { title: 'Get Up, Stand Up', artist: 'Bob Marley', year: 1973 },
        { title: 'Alright', artist: 'Kendrick Lamar', year: 2015 },
      ]},
      { connection: 'Songs from the Stranger Things soundtrack', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Running Up That Hill', artist: 'Kate Bush', year: 1985 },
        { title: 'Should I Stay or Should I Go', artist: 'The Clash', year: 1982 },
        { title: 'Every Breath You Take', artist: 'The Police', year: 1983 },
        { title: 'Africa', artist: 'Toto', year: 1982 },
      ]},
      { connection: 'Songs whose title is one syllable', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'Fame', artist: 'David Bowie', year: 1975 },
        { title: 'Cars', artist: 'Gary Numan', year: 1979 },
        { title: 'Gold', artist: 'Spandau Ballet', year: 1983 },
        { title: 'Shout', artist: 'Tears for Fears', year: 1984 },
      ]},
    ],
  },
  // Puzzle 48
  {
    groups: [
      { connection: 'Songs by Red Hot Chili Peppers', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Under the Bridge', artist: 'Red Hot Chili Peppers', year: 1991 },
        { title: 'Californication', artist: 'Red Hot Chili Peppers', year: 1999 },
        { title: 'Can\'t Stop', artist: 'Red Hot Chili Peppers', year: 2002 },
        { title: 'Scar Tissue', artist: 'Red Hot Chili Peppers', year: 1999 },
      ]},
      { connection: 'Songs about magical or supernatural women', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Black Magic Woman', artist: 'Fleetwood Mac', year: 1968 },
        { title: 'Witchy Woman', artist: 'Eagles', year: 1972 },
        { title: 'Gypsy', artist: 'Fleetwood Mac', year: 1982 },
        { title: 'Devil Woman', artist: 'Cliff Richard', year: 1976 },
      ]},
      { connection: 'Songs from the OK Computer album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'Paranoid Android', artist: 'Radiohead', year: 1997 },
        { title: 'Karma Police', artist: 'Radiohead', year: 1997 },
        { title: 'No Surprises', artist: 'Radiohead', year: 1997 },
        { title: 'Lucky', artist: 'Radiohead', year: 1997 },
      ]},
      { connection: 'Songs where the title contains a type of water', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Waterfalls', artist: 'TLC', year: 1995 },
        { title: 'Red Rain', artist: 'Peter Gabriel', year: 1986 },
        { title: 'River of Dreams', artist: 'Billy Joel', year: 1993 },
        { title: 'Smoke on the Water', artist: 'Deep Purple', year: 1972 },
      ]},
    ],
  },
  // Puzzle 49
  {
    groups: [
      { connection: 'Songs by The Police', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Every Breath You Take', artist: 'The Police', year: 1983 },
        { title: 'Roxanne', artist: 'The Police', year: 1978 },
        { title: 'Message in a Bottle', artist: 'The Police', year: 1979 },
        { title: 'Every Little Thing She Does Is Magic', artist: 'The Police', year: 1981 },
      ]},
      { connection: 'Songs about walking', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Walk This Way', artist: 'Aerosmith', year: 1975 },
        { title: 'Walking on Sunshine', artist: 'Katrina and the Waves', year: 1985 },
        { title: 'I Walk the Line', artist: 'Johnny Cash', year: 1956 },
        { title: 'Walk Like an Egyptian', artist: 'The Bangles', year: 1986 },
      ]},
      { connection: 'Songs from the Back in Black album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Back in Black', artist: 'AC/DC', year: 1980 },
        { title: 'You Shook Me All Night Long', artist: 'AC/DC', year: 1980 },
        { title: 'Hells Bells', artist: 'AC/DC', year: 1980 },
        { title: 'Rock and Roll Ain\'t Noise Pollution', artist: 'AC/DC', year: 1980 },
      ]},
      { connection: 'Songs that mention a specific year in the lyrics', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'In the Year 2525', artist: 'Zager and Evans', year: 1969 },
        { title: 'Summer of \'69', artist: 'Bryan Adams', year: 1984 },
        { title: '1999', artist: 'Prince', year: 1982 },
        { title: 'Party Like It\'s 1999', artist: 'Prince', year: 1982 },
      ]},
    ],
  },
  // Puzzle 50
  {
    groups: [
      { connection: 'Songs by Eminem', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Lose Yourself', artist: 'Eminem', year: 2002 },
        { title: 'The Real Slim Shady', artist: 'Eminem', year: 2000 },
        { title: 'Stan', artist: 'Eminem', year: 2000 },
        { title: 'Without Me', artist: 'Eminem', year: 2002 },
      ]},
      { connection: 'Songs about the devil or hell', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Sympathy for the Devil', artist: 'The Rolling Stones', year: 1968 },
        { title: 'Highway to Hell', artist: 'AC/DC', year: 1979 },
        { title: 'The Devil Went Down to Georgia', artist: 'Charlie Daniels Band', year: 1979 },
        { title: 'Friend of the Devil', artist: 'Grateful Dead', year: 1970 },
      ]},
      { connection: 'Songs from the Born to Run album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Born to Run', artist: 'Bruce Springsteen', year: 1975 },
        { title: 'Thunder Road', artist: 'Bruce Springsteen', year: 1975 },
        { title: 'Jungleland', artist: 'Bruce Springsteen', year: 1975 },
        { title: 'Tenth Avenue Freeze-Out', artist: 'Bruce Springsteen', year: 1975 },
      ]},
      { connection: 'Songs whose title sounds like a complete sentence', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'We Are the Champions', artist: 'Queen', year: 1977 },
        { title: 'I Shot the Sheriff', artist: 'Bob Marley', year: 1973 },
        { title: 'She Loves You', artist: 'The Beatles', year: 1963 },
        { title: 'They Don\'t Care About Us', artist: 'Michael Jackson', year: 1995 },
      ]},
    ],
  },
  // Puzzle 51
  {
    groups: [
      { connection: 'Songs by Foo Fighters', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Everlong', artist: 'Foo Fighters', year: 1997 },
        { title: 'Learn to Fly', artist: 'Foo Fighters', year: 1999 },
        { title: 'Best of You', artist: 'Foo Fighters', year: 2005 },
        { title: 'The Pretender', artist: 'Foo Fighters', year: 2007 },
      ]},
      { connection: 'Songs about jealousy', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Jealous Guy', artist: 'John Lennon', year: 1971 },
        { title: 'Mr. Brightside', artist: 'The Killers', year: 2003 },
        { title: 'You\'re So Vain', artist: 'Carly Simon', year: 1972 },
        { title: 'Jessie\'s Girl', artist: 'Rick Springfield', year: 1981 },
      ]},
      { connection: 'R&B hits of the 1990s', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'No Scrubs', artist: 'TLC', year: 1999 },
        { title: 'Waterfalls', artist: 'TLC', year: 1995 },
        { title: 'End of the Road', artist: 'Boyz II Men', year: 1992 },
        { title: 'Creep', artist: 'TLC', year: 1994 },
      ]},
      { connection: 'Songs whose title is also a verb in the past tense', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Wanted Dead or Alive', artist: 'Bon Jovi', year: 1986 },
        { title: 'Wrecked', artist: 'Imagine Dragons', year: 2021 },
        { title: 'Paranoid', artist: 'Black Sabbath', year: 1970 },
        { title: 'Complicated', artist: 'Avril Lavigne', year: 2002 },
      ]},
    ],
  },
  // Puzzle 52
  {
    groups: [
      { connection: 'Songs by The Weeknd', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Blinding Lights', artist: 'The Weeknd', year: 2020 },
        { title: 'Starboy', artist: 'The Weeknd', year: 2016 },
        { title: 'Can\'t Feel My Face', artist: 'The Weeknd', year: 2015 },
        { title: 'Save Your Tears', artist: 'The Weeknd', year: 2020 },
      ]},
      { connection: 'Songs about secrets', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Secret', artist: 'Madonna', year: 1994 },
        { title: 'Dirty Little Secret', artist: 'The All-American Rejects', year: 2005 },
        { title: 'Everybody\'s Got Something to Hide', artist: 'The Beatles', year: 1968 },
        { title: 'Secret Agent Man', artist: 'Johnny Rivers', year: 1966 },
      ]},
      { connection: 'Songs written by Carole King', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 8, items: [
        { title: 'You\'ve Got a Friend', artist: 'James Taylor', year: 1971 },
        { title: 'Will You Love Me Tomorrow', artist: 'The Shirelles', year: 1960 },
        { title: '(You Make Me Feel Like) A Natural Woman', artist: 'Aretha Franklin', year: 1967 },
        { title: 'It\'s Too Late', artist: 'Carole King', year: 1971 },
      ]},
      { connection: 'Songs whose title is a two-word alliteration', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Dancing Days', artist: 'Led Zeppelin', year: 1973 },
        { title: 'Killer Queen', artist: 'Queen', year: 1974 },
        { title: 'Bennie and the Jets', artist: 'Elton John', year: 1973 },
        { title: 'Burning Bridges', artist: 'Status Quo', year: 1988 },
      ]},
    ],
  },
  // Puzzle 53
  {
    groups: [
      { connection: 'Songs by Kendrick Lamar', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'HUMBLE.', artist: 'Kendrick Lamar', year: 2017 },
        { title: 'Alright', artist: 'Kendrick Lamar', year: 2015 },
        { title: 'Swimming Pools', artist: 'Kendrick Lamar', year: 2012 },
        { title: 'DNA.', artist: 'Kendrick Lamar', year: 2017 },
      ]},
      { connection: 'Songs about moving to a new place', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Movin\' Out', artist: 'Billy Joel', year: 1977 },
        { title: 'Fast Car', artist: 'Tracy Chapman', year: 1988 },
        { title: 'The Promised Land', artist: 'Bruce Springsteen', year: 1978 },
        { title: 'Go West', artist: 'Pet Shop Boys', year: 1993 },
      ]},
      { connection: 'Songs by sibling groups or duos', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Shout', artist: 'Tears for Fears', year: 1984 },
        { title: 'Jump', artist: 'Van Halen', year: 1983 },
        { title: 'ABC', artist: 'The Jackson 5', year: 1970 },
        { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', year: 1986 },
      ]},
      { connection: 'Songs whose title is palindromic', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 10, items: [
        { title: 'SOS', artist: 'ABBA', year: 1975 },
        { title: 'Kayak', artist: 'Various', year: 2000 },
        { title: 'Abba', artist: 'Various', year: 1975 },
        { title: 'Elle', artist: 'Various', year: 1990 },
      ]},
    ],
  },
  // Puzzle 54
  {
    groups: [
      { connection: 'Songs by Green Day', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Basket Case', artist: 'Green Day', year: 1994 },
        { title: 'American Idiot', artist: 'Green Day', year: 2004 },
        { title: 'Boulevard of Broken Dreams', artist: 'Green Day', year: 2004 },
        { title: 'Wake Me Up When September Ends', artist: 'Green Day', year: 2004 },
      ]},
      { connection: 'Songs about letters or mail', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Return to Sender', artist: 'Elvis Presley', year: 1962 },
        { title: 'Please Mr. Postman', artist: 'The Marvelettes', year: 1961 },
        { title: 'Message in a Bottle', artist: 'The Police', year: 1979 },
        { title: 'Signed, Sealed, Delivered', artist: 'Stevie Wonder', year: 1970 },
      ]},
      { connection: 'Songs from the Joshua Tree album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'With or Without You', artist: 'U2', year: 1987 },
        { title: 'Where the Streets Have No Name', artist: 'U2', year: 1987 },
        { title: 'I Still Haven\'t Found What I\'m Looking For', artist: 'U2', year: 1987 },
        { title: 'Bullet the Blue Sky', artist: 'U2', year: 1987 },
      ]},
      { connection: 'Songs whose title begins with "Sweet"', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'Sweet Caroline', artist: 'Neil Diamond', year: 1969 },
        { title: 'Sweet Home Alabama', artist: 'Lynyrd Skynyrd', year: 1974 },
        { title: 'Sweet Dreams', artist: 'Eurythmics', year: 1983 },
      ]},
    ],
  },
  // Puzzle 55
  {
    groups: [
      { connection: 'Songs by Metallica', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Enter Sandman', artist: 'Metallica', year: 1991 },
        { title: 'Nothing Else Matters', artist: 'Metallica', year: 1991 },
        { title: 'Master of Puppets', artist: 'Metallica', year: 1986 },
        { title: 'One', artist: 'Metallica', year: 1988 },
      ]},
      { connection: 'Songs about gambling or luck', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'The Gambler', artist: 'Kenny Rogers', year: 1978 },
        { title: 'Poker Face', artist: 'Lady Gaga', year: 2008 },
        { title: 'Luck Be a Lady', artist: 'Frank Sinatra', year: 1965 },
        { title: 'Ace of Spades', artist: 'Motorhead', year: 1980 },
      ]},
      { connection: 'Songs from the Legend album (Bob Marley)', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'One Love', artist: 'Bob Marley', year: 1977 },
        { title: 'Jamming', artist: 'Bob Marley', year: 1977 },
        { title: 'Could You Be Loved', artist: 'Bob Marley', year: 1980 },
        { title: 'Stir It Up', artist: 'Bob Marley', year: 1972 },
      ]},
      { connection: 'Songs that are also common English idioms', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Break the Ice', artist: 'Britney Spears', year: 2007 },
        { title: 'Under the Bridge', artist: 'Red Hot Chili Peppers', year: 1991 },
        { title: 'Against the Wind', artist: 'Bob Seger', year: 1980 },
        { title: 'On Thin Ice', artist: 'Yoko Ono', year: 1981 },
      ]},
    ],
  },
  // Puzzle 56
  {
    groups: [
      { connection: 'Songs by Pearl Jam', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Alive', artist: 'Pearl Jam', year: 1991 },
        { title: 'Jeremy', artist: 'Pearl Jam', year: 1991 },
        { title: 'Even Flow', artist: 'Pearl Jam', year: 1991 },
        { title: 'Black', artist: 'Pearl Jam', year: 1991 },
      ]},
      { connection: 'Songs about technology or machines', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Computer Love', artist: 'Kraftwerk', year: 1981 },
        { title: 'Video Killed the Radio Star', artist: 'The Buggles', year: 1979 },
        { title: 'Trans-Europe Express', artist: 'Kraftwerk', year: 1977 },
        { title: 'The Robots', artist: 'Kraftwerk', year: 1978 },
      ]},
      { connection: 'Songs that topped charts in both US and UK', connection_type: 'theme', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Bohemian Rhapsody', artist: 'Queen', year: 1975 },
        { title: 'Billie Jean', artist: 'Michael Jackson', year: 1982 },
        { title: 'Hey Jude', artist: 'The Beatles', year: 1968 },
        { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', year: 2014 },
      ]},
      { connection: 'Songs with a fruit in the title', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Strawberry Fields Forever', artist: 'The Beatles', year: 1967 },
        { title: 'Raspberry Beret', artist: 'Prince', year: 1985 },
        { title: 'Lemon', artist: 'U2', year: 1993 },
        { title: 'Peach', artist: 'Prince', year: 1993 },
      ]},
    ],
  },
  // Puzzle 57
  {
    groups: [
      { connection: 'Songs by Janis Joplin', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Piece of My Heart', artist: 'Janis Joplin', year: 1968 },
        { title: 'Me and Bobby McGee', artist: 'Janis Joplin', year: 1971 },
        { title: 'Mercedes Benz', artist: 'Janis Joplin', year: 1970 },
        { title: 'Cry Baby', artist: 'Janis Joplin', year: 1971 },
      ]},
      { connection: 'Songs about colors of the rainbow', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Purple Rain', artist: 'Prince', year: 1984 },
        { title: 'Yellow', artist: 'Coldplay', year: 2000 },
        { title: 'Blue Monday', artist: 'New Order', year: 1983 },
        { title: 'Red Red Wine', artist: 'UB40', year: 1983 },
      ]},
      { connection: 'Songs from the Sgt. Pepper\'s album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Lucy in the Sky with Diamonds', artist: 'The Beatles', year: 1967 },
        { title: 'With a Little Help from My Friends', artist: 'The Beatles', year: 1967 },
        { title: 'A Day in the Life', artist: 'The Beatles', year: 1967 },
        { title: 'Getting Better', artist: 'The Beatles', year: 1967 },
      ]},
      { connection: 'Songs whose artist name is a color', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'SexyBack', artist: 'Justin Timberlake', year: 2006 },
        { title: 'Kiss', artist: 'Prince', year: 1986 },
        { title: 'Cornflake Girl', artist: 'Tori Amos', year: 1994 },
        { title: 'Raspberry Beret', artist: 'Prince', year: 1985 },
      ]},
    ],
  },
  // Puzzle 58
  {
    groups: [
      { connection: 'Songs by Bruno Mars', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Just the Way You Are', artist: 'Bruno Mars', year: 2010 },
        { title: 'Grenade', artist: 'Bruno Mars', year: 2010 },
        { title: '24K Magic', artist: 'Bruno Mars', year: 2016 },
        { title: 'Locked Out of Heaven', artist: 'Bruno Mars', year: 2012 },
      ]},
      { connection: 'Songs about mirrors or reflections', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Man in the Mirror', artist: 'Michael Jackson', year: 1988 },
        { title: 'Mirrors', artist: 'Justin Timberlake', year: 2013 },
        { title: 'Reflection', artist: 'Christina Aguilera', year: 1998 },
        { title: 'Mirror Mirror', artist: 'Blind Melon', year: 1993 },
      ]},
      { connection: 'Songs from the Appetite for Destruction album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Welcome to the Jungle', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'Paradise City', artist: 'Guns N\' Roses', year: 1987 },
        { title: 'Nightrain', artist: 'Guns N\' Roses', year: 1987 },
      ]},
      { connection: 'Songs with a surname that is also a common noun', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Paranoid', artist: 'Black Sabbath', year: 1970 },
        { title: 'Creep', artist: 'Radiohead', year: 1992 },
        { title: 'Everlong', artist: 'Foo Fighters', year: 1997 },
        { title: 'Rooster', artist: 'Alice in Chains', year: 1992 },
      ]},
    ],
  },
  // Puzzle 59
  {
    groups: [
      { connection: 'Songs by Lady Gaga', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 2, items: [
        { title: 'Bad Romance', artist: 'Lady Gaga', year: 2009 },
        { title: 'Poker Face', artist: 'Lady Gaga', year: 2008 },
        { title: 'Born This Way', artist: 'Lady Gaga', year: 2011 },
        { title: 'Shallow', artist: 'Lady Gaga', year: 2018 },
      ]},
      { connection: 'Songs about nostalgia for the past', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Glory Days', artist: 'Bruce Springsteen', year: 1984 },
        { title: 'Yesterday', artist: 'The Beatles', year: 1965 },
        { title: 'Those Were the Days', artist: 'Mary Hopkin', year: 1968 },
        { title: 'Summer of \'69', artist: 'Bryan Adams', year: 1984 },
      ]},
      { connection: 'Songs from the Ziggy Stardust album', connection_type: 'album', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Starman', artist: 'David Bowie', year: 1972 },
        { title: 'Ziggy Stardust', artist: 'David Bowie', year: 1972 },
        { title: 'Suffragette City', artist: 'David Bowie', year: 1972 },
        { title: 'Moonage Daydream', artist: 'David Bowie', year: 1972 },
      ]},
      { connection: 'Songs whose title ends with an exclamation mark', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'Yeah!', artist: 'Usher', year: 2004 },
        { title: 'Help!', artist: 'The Beatles', year: 1965 },
        { title: 'Hey Ya!', artist: 'Outkast', year: 2003 },
        { title: 'Wham!', artist: 'Various', year: 1982 },
      ]},
    ],
  },
  // Puzzle 60
  {
    groups: [
      { connection: 'Songs by Gorillaz', connection_type: 'artist', color: 'yellow', difficulty: 'easy', difficulty_score: 3, items: [
        { title: 'Feel Good Inc.', artist: 'Gorillaz', year: 2005 },
        { title: 'Clint Eastwood', artist: 'Gorillaz', year: 2001 },
        { title: 'On Melancholy Hill', artist: 'Gorillaz', year: 2010 },
        { title: 'Dare', artist: 'Gorillaz', year: 2005 },
      ]},
      { connection: 'Songs about heroes and villains', connection_type: 'theme', color: 'green', difficulty: 'medium', difficulty_score: 5, items: [
        { title: 'Holding Out for a Hero', artist: 'Bonnie Tyler', year: 1984 },
        { title: 'Heroes', artist: 'David Bowie', year: 1977 },
        { title: 'Smooth Criminal', artist: 'Michael Jackson', year: 1987 },
        { title: 'Bad Guy', artist: 'Billie Eilish', year: 2019 },
      ]},
      { connection: 'Electronic music milestones', connection_type: 'genre_link', color: 'blue', difficulty: 'hard', difficulty_score: 7, items: [
        { title: 'Blue Monday', artist: 'New Order', year: 1983 },
        { title: 'Windowlicker', artist: 'Aphex Twin', year: 1999 },
        { title: 'Born Slippy .NUXX', artist: 'Underworld', year: 1995 },
        { title: 'Halcyon + On + On', artist: 'Orbital', year: 1992 },
      ]},
      { connection: 'Songs whose title has exactly five words', connection_type: 'wordplay', color: 'purple', difficulty: 'hardest', difficulty_score: 9, items: [
        { title: 'I Want to Hold Your Hand', artist: 'The Beatles', year: 1963 },
        { title: 'Another One Bites the Dust', artist: 'Queen', year: 1980 },
        { title: 'Don\'t Stop Me Now', artist: 'Queen', year: 1978 },
        { title: 'Smells Like Teen Spirit', artist: 'Nirvana', year: 1991 },
      ]},
    ],
  },
];
