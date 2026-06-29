import type { PuzzleDef } from './types';

export const musicPuzzlesV2: PuzzleDef[] = [
  // Puzzle 1
  {
    groups: [
      { connection: "Songs by Kate Bush", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Running Up That Hill (A Deal with God)", artist: "Kate Bush", year: 1985 },
        { title: "Wuthering Heights", artist: "Kate Bush", year: 1978 },
        { title: "Babooshka", artist: "Kate Bush", year: 1980 },
        { title: "The Hounds of Love", artist: "Kate Bush", year: 1986 },
      ]},
      { connection: "UK #1 singles of 1994", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Without You", artist: "Mariah Carey", year: 1994 },
        { title: "Saturday Night", artist: "Whigfield", year: 1994 },
        { title: "Stay Another Day", artist: "East 17", year: 1994 },
        { title: "Love Is All Around", artist: "Wet Wet Wet", year: 1994 },
      ]},
      { connection: "Songs by members of Destiny's Child after the group disbanded", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Crazy in Love", artist: "Beyoncé ft. Jay-Z", year: 2003 },
        { title: "Dilemma", artist: "Nelly ft. Kelly Rowland", year: 2002 },
        { title: "Soldier", artist: "Destiny's Child", year: 2004 },
        { title: "Say My Name", artist: "Destiny's Child", year: 1999 },
      ]},
      { connection: "Song titles that are full questions ending with a question mark", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "What's Going On?", artist: "Marvin Gaye", year: 1971 },
        { title: "Is This It", artist: "The Strokes", year: 2001 },
        { title: "Should I Stay or Should I Go", artist: "The Clash", year: 1982 },
        { title: "Do You Really Want to Hurt Me", artist: "Culture Club", year: 1982 },
      ]},
    ],
  },
  // Puzzle 2
  {
    groups: [
      { connection: "Songs by Outkast", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Hey Ya!", artist: "Outkast", year: 2003 },
        { title: "Ms. Jackson", artist: "Outkast", year: 2000 },
        { title: "B.O.B. (Bombs Over Baghdad)", artist: "Outkast", year: 2000 },
        { title: "Rosa Parks", artist: "Outkast", year: 1998 },
      ]},
      { connection: "US #1 pop singles of 1977", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "You Light Up My Life", artist: "Debby Boone", year: 1977 },
        { title: "Tonight's the Night (Gonna Be Alright)", artist: "Rod Stewart", year: 1977 },
        { title: "Best of My Love", artist: "Emotions", year: 1977 },
        { title: "I Just Want to Be Your Everything", artist: "Andy Gibb", year: 1977 },
      ]},
      { connection: "Solo hits by former members of The Police", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Roxanne", artist: "The Police", year: 1978 },
        { title: "Fields of Gold", artist: "Sting", year: 1993 },
        { title: "Englishman in New York", artist: "Sting", year: 1987 },
        { title: "If You Love Somebody Set Them Free", artist: "Sting", year: 1985 },
      ]},
      { connection: "Song titles containing a misspelled word (intentional spelling error in official title)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Fergalicious", artist: "Fergie", year: 2006 },
        { title: "Holla Atcha Boy", artist: "Young Jeezy", year: 2005 },
        { title: "Summertime Sadness", artist: "Lana Del Rey", year: 2012 },
        { title: "Waterfalls", artist: "TLC", year: 1995 },
      ]},
    ],
  },
  // Puzzle 3
  {
    groups: [
      { connection: "Songs by Fontaines D.C.", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Boys in the Better Land", artist: "Fontaines D.C.", year: 2019 },
        { title: "Sha Sha Sha", artist: "Fontaines D.C.", year: 2019 },
        { title: "I Love You", artist: "Fontaines D.C.", year: 2019 },
        { title: "Big Shot", artist: "Fontaines D.C.", year: 2024 },
      ]},
      { connection: "Breakthrough debut singles of the 2010s that reached #1 in the UK", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Somebody That I Used to Know", artist: "Gotye ft. Kimbra", year: 2011 },
        { title: "Thrift Shop", artist: "Macklemore & Ryan Lewis ft. Wanz", year: 2012 },
        { title: "Happy", artist: "Pharrell Williams", year: 2013 },
        { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", year: 2014 },
      ]},
      { connection: "Songs by artists who are siblings performing together", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Don't You Worry Child", artist: "Swedish House Mafia ft. John Martin", year: 2012 },
        { title: "Reach Out I'll Be There", artist: "Four Tops", year: 1966 },
        { title: "I Want You Back", artist: "The Jackson 5", year: 1969 },
        { title: "Shout", artist: "Tears for Fears", year: 1984 },
      ]},
      { connection: "Song titles where every word starts with the same letter", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Pretty Pimpin", artist: "Kurt Vile", year: 2015 },
        { title: "Born Broken", artist: "Badly Drawn Boy", year: 2002 },
        { title: "Bidi Bidi Bom Bom", artist: "Selena", year: 1994 },
        { title: "Come Clean", artist: "Hilary Duff", year: 2003 },
      ]},
    ],
  },
  // Puzzle 4
  {
    groups: [
      { connection: "Songs by SZA", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Good Days", artist: "SZA", year: 2020 },
        { title: "Kill Bill", artist: "SZA", year: 2022 },
        { title: "Love Galore", artist: "SZA ft. Travis Scott", year: 2017 },
        { title: "Supermodel", artist: "SZA", year: 2017 },
      ]},
      { connection: "US Hot 100 #1 hits from the year 2000", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Breathe", artist: "Faith Hill", year: 2000 },
        { title: "Maria Maria", artist: "Santana ft. The Product G&B", year: 2000 },
        { title: "Say My Name", artist: "Destiny's Child", year: 2000 },
        { title: "Kryptonite", artist: "3 Doors Down", year: 2000 },
      ]},
      { connection: "Songs from supergroups formed by members of Beatles-era bands", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "My Sweet Lord", artist: "George Harrison", year: 1970 },
        { title: "Imagine", artist: "John Lennon", year: 1971 },
        { title: "Maybe I'm Amazed", artist: "Paul McCartney", year: 1970 },
        { title: "It Don't Come Easy", artist: "Ringo Starr", year: 1971 },
      ]},
      { connection: "Song titles where the title is a single letter of the alphabet followed by other words", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "A-Punk", artist: "Vampire Weekend", year: 2008 },
        { title: "E-Pro", artist: "Beck", year: 2005 },
        { title: "C Moon", artist: "Paul McCartney & Wings", year: 1972 },
        { title: "B Boys in the Cut", artist: "Cold War Kids", year: 2014 },
      ]},
    ],
  },
  // Puzzle 5
  {
    groups: [
      { connection: "Songs by Sade", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Smooth Operator", artist: "Sade", year: 1984 },
        { title: "Your Love Is King", artist: "Sade", year: 1984 },
        { title: "No Ordinary Love", artist: "Sade", year: 1992 },
        { title: "By Your Side", artist: "Sade", year: 2000 },
      ]},
      { connection: "UK number one singles from 1988", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Perfect", artist: "Fairground Attraction", year: 1988 },
        { title: "A Groovy Kind of Love", artist: "Phil Collins", year: 1988 },
        { title: "The Only Way Is Up", artist: "Yazz & the Plastic Population", year: 1988 },
        { title: "I Should Be So Lucky", artist: "Kylie Minogue", year: 1988 },
      ]},
      { connection: "Songs by artists who performed under a group name but were essentially solo projects", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Breakfast at Tiffany's", artist: "Deep Blue Something", year: 1995 },
        { title: "Counting Blue Cars", artist: "Dishwalla", year: 1995 },
        { title: "Sunflower", artist: "Post Malone & Swae Lee", year: 2018 },
        { title: "Somebody That I Used to Know", artist: "Gotye ft. Kimbra", year: 2011 },
      ]},
      { connection: "Song titles that contain a color AND a number", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "99 Red Balloons", artist: "Nena", year: 1983 },
        { title: "Little Red Corvette", artist: "Prince", year: 1982 },
        { title: "Blue (Da Ba Dee)", artist: "Eiffel 65", year: 1998 },
        { title: "Green Green Grass of Home", artist: "Tom Jones", year: 1966 },
      ]},
    ],
  },
  // Puzzle 6
  {
    groups: [
      { connection: "Songs by TLC", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Waterfalls", artist: "TLC", year: 1995 },
        { title: "No Scrubs", artist: "TLC", year: 1999 },
        { title: "Creep", artist: "TLC", year: 1994 },
        { title: "Ain't 2 Proud 2 Beg", artist: "TLC", year: 1992 },
      ]},
      { connection: "One-hit wonders of the 1990s with an animal in the title", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Who Let the Dogs Out", artist: "Baha Men", year: 2000 },
        { title: "The Fox (What Does the Fox Say?)", artist: "Ylvis", year: 2013 },
        { title: "Horse Outside", artist: "Rubberbandits", year: 2010 },
        { title: "Eye of the Tiger", artist: "Survivor", year: 1982 },
      ]},
      { connection: "Songs by artists who formed a supergroup after leaving their original band", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Suite: Judy Blue Eyes", artist: "Crosby, Stills & Nash", year: 1969 },
        { title: "Teach Your Children", artist: "Crosby, Stills, Nash & Young", year: 1970 },
        { title: "Ohio", artist: "Crosby, Stills, Nash & Young", year: 1970 },
        { title: "Woodstock", artist: "Crosby, Stills, Nash & Young", year: 1970 },
      ]},
      { connection: "Song titles that are also types of weather phenomena", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Thunderstruck", artist: "AC/DC", year: 1990 },
        { title: "Blizzard of Ozz", artist: "Ozzy Osbourne", year: 1980 },
        { title: "Hurricane", artist: "Bob Dylan", year: 1975 },
        { title: "Lightning Crashes", artist: "Live", year: 1994 },
      ]},
    ],
  },
  // Puzzle 7
  {
    groups: [
      { connection: "Songs by Arctic Monkeys", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "I Bet You Look Good on the Dancefloor", artist: "Arctic Monkeys", year: 2005 },
        { title: "R U Mine?", artist: "Arctic Monkeys", year: 2012 },
        { title: "Do I Wanna Know?", artist: "Arctic Monkeys", year: 2013 },
        { title: "505", artist: "Arctic Monkeys", year: 2007 },
      ]},
      { connection: "UK number ones from the summer of 1969", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Honky Tonk Women", artist: "The Rolling Stones", year: 1969 },
        { title: "In the Ghetto", artist: "Elvis Presley", year: 1969 },
        { title: "Get Back", artist: "The Beatles", year: 1969 },
        { title: "Saved by the Bell", artist: "Robin Gibb", year: 1969 },
      ]},
      { connection: "Songs by the Wilburys (Traveling Wilburys)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Handle with Care", artist: "Traveling Wilburys", year: 1988 },
        { title: "End of the Line", artist: "Traveling Wilburys", year: 1988 },
        { title: "She's My Baby", artist: "Traveling Wilburys", year: 1990 },
        { title: "Inside Out", artist: "Traveling Wilburys", year: 1990 },
      ]},
      { connection: "Song titles that are also names of days of the week", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Friday I'm in Love", artist: "The Cure", year: 1992 },
        { title: "Come On Eileen", artist: "Dexys Midnight Runners", year: 1982 },
        { title: "Manic Monday", artist: "The Bangles", year: 1986 },
        { title: "Sunday Bloody Sunday", artist: "U2", year: 1983 },
      ]},
    ],
  },
  // Puzzle 8
  {
    groups: [
      { connection: "Songs by Kate Bush from the album 'Hounds of Love'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Running Up That Hill (A Deal with God)", artist: "Kate Bush", year: 1985 },
        { title: "Cloudbusting", artist: "Kate Bush", year: 1985 },
        { title: "The Big Sky", artist: "Kate Bush", year: 1986 },
        { title: "Hounds of Love", artist: "Kate Bush", year: 1986 },
      ]},
      { connection: "UK #1 singles that spent the most weeks at #1 in the 1980s", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Don't You Want Me", artist: "The Human League", year: 1981 },
        { title: "Relax", artist: "Frankie Goes to Hollywood", year: 1984 },
        { title: "I Just Called to Say I Love You", artist: "Stevie Wonder", year: 1984 },
        { title: "Two Tribes", artist: "Frankie Goes to Hollywood", year: 1984 },
      ]},
      { connection: "Songs by members of Radiohead released outside of Radiohead", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Harrowdown Hill", artist: "Thom Yorke", year: 2006 },
        { title: "Suspirium", artist: "Thom Yorke", year: 2018 },
        { title: "I Froze Up", artist: "Jonny Greenwood", year: 2021 },
        { title: "Open the Floodgates", artist: "The Smile", year: 2022 },
      ]},
      { connection: "Song titles that contain a month of the year", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "November Rain", artist: "Guns N' Roses", year: 1991 },
        { title: "April Come She Will", artist: "Simon & Garfunkel", year: 1966 },
        { title: "September", artist: "Earth, Wind & Fire", year: 1978 },
        { title: "October Song", artist: "Amy Winehouse", year: 2003 },
      ]},
    ],
  },
  // Puzzle 9
  {
    groups: [
      { connection: "Songs by Stevie Wonder from the 'Classic Period' (1972–1976)", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Living for the City", artist: "Stevie Wonder", year: 1974 },
        { title: "Higher Ground", artist: "Stevie Wonder", year: 1973 },
        { title: "I Wish", artist: "Stevie Wonder", year: 1976 },
        { title: "You Are the Sunshine of My Life", artist: "Stevie Wonder", year: 1972 },
      ]},
      { connection: "US Hot 100 #1 singles from 1984", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Jump", artist: "Van Halen", year: 1984 },
        { title: "When Doves Cry", artist: "Prince", year: 1984 },
        { title: "Ghostbusters", artist: "Ray Parker Jr.", year: 1984 },
        { title: "Like a Virgin", artist: "Madonna", year: 1984 },
      ]},
      { connection: "Songs by Crosby, Stills & Nash / CSNY as members' subsequent band", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Our House", artist: "Crosby, Stills, Nash & Young", year: 1970 },
        { title: "Love the One You're With", artist: "Stephen Stills", year: 1970 },
        { title: "Just a Song Before I Go", artist: "Crosby, Stills & Nash", year: 1977 },
        { title: "Southern Cross", artist: "Crosby, Stills & Nash", year: 1982 },
      ]},
      { connection: "Song titles containing parentheses with a subtitle that contradicts or reframes the main title", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Forget You (Cee Lo Green)", artist: "Cee Lo Green", year: 2010 },
        { title: "Crazy (Gnarls Barkley)", artist: "Gnarls Barkley", year: 2006 },
        { title: "Gold Digger (We Want Prenup)", artist: "Kanye West ft. Jamie Foxx", year: 2005 },
        { title: "Beautiful Day (It's a Beautiful Day)", artist: "U2", year: 2000 },
      ]},
    ],
  },
  // Puzzle 10
  {
    groups: [
      { connection: "Songs by The Cure from their gothic post-punk era (1979–1982)", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Killing Me Softly", artist: "The Fugees", year: 1996 },
        { title: "A Forest", artist: "The Cure", year: 1980 },
        { title: "Primary", artist: "The Cure", year: 1981 },
        { title: "Charlotte Sometimes", artist: "The Cure", year: 1981 },
      ]},
      { connection: "US number one singles from the year 1991", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Gonna Make You Sweat (Everybody Dance Now)", artist: "C+C Music Factory", year: 1990 },
        { title: "Rush Rush", artist: "Paula Abdul", year: 1991 },
        { title: "Everything I Do (I Do It for You)", artist: "Bryan Adams", year: 1991 },
        { title: "More Than Words", artist: "Extreme", year: 1991 },
      ]},
      { connection: "Side projects and solo tracks by members of U2", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "In the Name of the Father", artist: "Bono & Gavin Friday", year: 1993 },
        { title: "She's a Mystery to Me", artist: "Roy Orbison", year: 1989 },
        { title: "Falling at Your Feet", artist: "Bono & Daniel Lanois", year: 2001 },
        { title: "Hold Me, Thrill Me, Kiss Me, Kill Me", artist: "U2", year: 1995 },
      ]},
      { connection: "Song titles that are also names of card suits", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Black Heart", artist: "Stooshe", year: 2012 },
        { title: "Club Foot", artist: "Kasabian", year: 2004 },
        { title: "Diamond Dogs", artist: "David Bowie", year: 1974 },
        { title: "Spade", artist: "John Mark McMillan", year: 2014 },
      ]},
    ],
  },
  // Puzzle 11
  {
    groups: [
      { connection: "Songs by Outkast from the album 'Speakerboxxx/The Love Below'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Hey Ya!", artist: "Outkast", year: 2003 },
        { title: "The Way You Move", artist: "Outkast ft. Sleepy Brown", year: 2003 },
        { title: "Roses", artist: "Outkast", year: 2003 },
        { title: "Speakerboxxx", artist: "Outkast", year: 2003 },
      ]},
      { connection: "Debut UK #1 singles from artists who broke through in 1983", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Total Eclipse of the Heart", artist: "Bonnie Tyler", year: 1983 },
        { title: "Every Breath You Take", artist: "The Police", year: 1983 },
        { title: "Karma Chameleon", artist: "Culture Club", year: 1983 },
        { title: "Billie Jean", artist: "Michael Jackson", year: 1983 },
      ]},
      { connection: "Songs recorded by supergroup Temple of the Dog (members of Pearl Jam and Soundgarden)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Hunger Strike", artist: "Temple of the Dog", year: 1991 },
        { title: "Say Hello 2 Heaven", artist: "Temple of the Dog", year: 1991 },
        { title: "Pushin Forward Back", artist: "Temple of the Dog", year: 1991 },
        { title: "Call Me a Dog", artist: "Temple of the Dog", year: 1991 },
      ]},
      { connection: "Song titles that contain a body part used as a verb", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Shoulda Known Better", artist: "Richard Marx", year: 1989 },
        { title: "Elbow Room", artist: "Schoolhouse Rock", year: 1977 },
        { title: "Face Down", artist: "The Red Jumpsuit Apparatus", year: 2006 },
        { title: "Kneedeep", artist: "Zac Brown Band ft. Jimmy Buffett", year: 2010 },
      ]},
    ],
  },
  // Puzzle 12
  {
    groups: [
      { connection: "Songs by Sade from the 1980s", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Smooth Operator", artist: "Sade", year: 1984 },
        { title: "Your Love Is King", artist: "Sade", year: 1984 },
        { title: "Hang On to Your Love", artist: "Sade", year: 1984 },
        { title: "The Sweetest Taboo", artist: "Sade", year: 1985 },
      ]},
      { connection: "UK #1 hits of 1979 from the punk/new wave era", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hit Me with Your Rhythm Stick", artist: "Ian Dury & the Blockheads", year: 1979 },
        { title: "Heart of Glass", artist: "Blondie", year: 1979 },
        { title: "Message in a Bottle", artist: "The Police", year: 1979 },
        { title: "My Sharona", artist: "The Knack", year: 1979 },
      ]},
      { connection: "Songs by former members of The Smiths after the band's split", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Everyday Is Like Sunday", artist: "Morrissey", year: 1988 },
        { title: "The More You Ignore Me, the Closer I Get", artist: "Morrissey", year: 1994 },
        { title: "First of the Gang to Die", artist: "Morrissey", year: 2004 },
        { title: "Viva Hate", artist: "Morrissey", year: 1988 },
      ]},
      { connection: "Song titles that contain a compass direction (north, south, east, or west)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Go West", artist: "Pet Shop Boys", year: 1993 },
        { title: "North Star", artist: "Ghostface Killah & Adrian Younge", year: 2013 },
        { title: "South of the Border", artist: "Frank Sinatra", year: 1939 },
        { title: "East Bound and Down", artist: "Jerry Reed", year: 1977 },
      ]},
    ],
  },
  // Puzzle 13
  {
    groups: [
      { connection: "Songs by TLC from the album 'CrazySexyCool'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Waterfalls", artist: "TLC", year: 1995 },
        { title: "Red Light Special", artist: "TLC", year: 1995 },
        { title: "Creep", artist: "TLC", year: 1994 },
        { title: "Diggin' on You", artist: "TLC", year: 1995 },
      ]},
      { connection: "US #1 hip-hop singles from 1998", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Gettin' Jiggy Wit It", artist: "Will Smith", year: 1998 },
        { title: "My Way", artist: "Usher", year: 1997 },
        { title: "Ruff Ryders' Anthem", artist: "DMX", year: 1998 },
        { title: "Ghetto Supastar (That Is What You Are)", artist: "Pras Michel ft. Ol' Dirty Bastard & Mya", year: 1998 },
      ]},
      { connection: "Songs from the supergroup Audioslave (members of Soundgarden and Rage Against the Machine)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Like a Stone", artist: "Audioslave", year: 2002 },
        { title: "Show Me How to Live", artist: "Audioslave", year: 2002 },
        { title: "Be Yourself", artist: "Audioslave", year: 2005 },
        { title: "Cochise", artist: "Audioslave", year: 2002 },
      ]},
      { connection: "Song titles that are also types of fabric or material", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Velvet Underground", artist: "The Velvet Underground", year: 1967 },
        { title: "Satin Doll", artist: "Duke Ellington", year: 1953 },
        { title: "Lace and Leather", artist: "Britney Spears", year: 2009 },
        { title: "Denim and Diamonds", artist: "Shania Twain", year: 1992 },
      ]},
    ],
  },
  // Puzzle 14
  {
    groups: [
      { connection: "Songs by Fontaines D.C. featuring signature Dublin storytelling", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "A Hero's Death", artist: "Fontaines D.C.", year: 2020 },
        { title: "Televised Mind", artist: "Fontaines D.C.", year: 2020 },
        { title: "I Don't Belong", artist: "Fontaines D.C.", year: 2019 },
        { title: "Hurricane Laughter", artist: "Fontaines D.C.", year: 2019 },
      ]},
      { connection: "Breakout alt-rock singles of 1994 that were not grunge", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Basket Case", artist: "Green Day", year: 1994 },
        { title: "Stay (I Missed You)", artist: "Lisa Loeb & Nine Stories", year: 1994 },
        { title: "Linger", artist: "The Cranberries", year: 1993 },
        { title: "Black Hole Sun", artist: "Soundgarden", year: 1994 },
      ]},
      { connection: "Songs by Velvet Revolver (supergroup of ex-Guns N' Roses and ex-Stone Temple Pilots members)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Slither", artist: "Velvet Revolver", year: 2004 },
        { title: "Fall to Pieces", artist: "Velvet Revolver", year: 2004 },
        { title: "Dirty Little Thing", artist: "Velvet Revolver", year: 2004 },
        { title: "She Builds Quick Machines", artist: "Velvet Revolver", year: 2007 },
      ]},
      { connection: "Song titles that are also common greetings or farewells in languages other than English", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Ciao Adios", artist: "Anne-Marie", year: 2017 },
        { title: "Bonjour", artist: "Yelle", year: 2007 },
        { title: "Aloha", artist: "Beck", year: 2014 },
        { title: "Hola Hovito", artist: "Jay-Z", year: 2001 },
      ]},
    ],
  },
  // Puzzle 15
  {
    groups: [
      { connection: "Songs by SZA from the album 'SOS'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Kill Bill", artist: "SZA", year: 2022 },
        { title: "Shirt", artist: "SZA", year: 2022 },
        { title: "Blind", artist: "SZA", year: 2022 },
        { title: "Nobody Gets Me", artist: "SZA", year: 2022 },
      ]},
      { connection: "US Hot 100 #1 singles from 2019", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Without Me", artist: "Halsey", year: 2019 },
        { title: "Sunflower", artist: "Post Malone & Swae Lee", year: 2018 },
        { title: "7 Rings", artist: "Ariana Grande", year: 2019 },
        { title: "Old Town Road", artist: "Lil Nas X ft. Billy Ray Cyrus", year: 2019 },
      ]},
      { connection: "Songs from the supergroup ABBA", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Dancing Queen", artist: "ABBA", year: 1976 },
        { title: "The Winner Takes It All", artist: "ABBA", year: 1980 },
        { title: "Fernando", artist: "ABBA", year: 1976 },
        { title: "Knowing Me, Knowing You", artist: "ABBA", year: 1977 },
      ]},
      { connection: "Song titles that contain the name of a gemstone or precious stone", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Ruby Tuesday", artist: "The Rolling Stones", year: 1967 },
        { title: "Lucy in the Sky with Diamonds", artist: "The Beatles", year: 1967 },
        { title: "Jade", artist: "Beyoncé", year: 2008 },
        { title: "Sapphire", artist: "John Lennon", year: 1974 },
      ]},
    ],
  },
  // Puzzle 16
  {
    groups: [
      { connection: "Songs by Talking Heads from the album 'Remain in Light'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Once in a Lifetime", artist: "Talking Heads", year: 1981 },
        { title: "Houses in Motion", artist: "Talking Heads", year: 1981 },
        { title: "Born Under Punches (The Heat Goes On)", artist: "Talking Heads", year: 1980 },
        { title: "Crosseyed and Painless", artist: "Talking Heads", year: 1980 },
      ]},
      { connection: "Songs that were US #1 in the first week of January 2010", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Empire State of Mind", artist: "Jay-Z ft. Alicia Keys", year: 2009 },
        { title: "We Belong Together", artist: "Mariah Carey", year: 2005 },
        { title: "Don't Stop Believin'", artist: "Journey", year: 1981 },
        { title: "Use Somebody", artist: "Kings of Leon", year: 2008 },
      ]},
      { connection: "Songs by the supergroup The Highwaymen (Cash, Nelson, Kristofferson, Jennings)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Highwayman", artist: "The Highwaymen", year: 1985 },
        { title: "Desperados Waiting for a Train", artist: "The Highwaymen", year: 1985 },
        { title: "Welfare Line", artist: "The Highwaymen", year: 1985 },
        { title: "Big River", artist: "The Highwaymen", year: 1990 },
      ]},
      { connection: "Song titles that are also the names of classic board games or playground games", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Monopoly", artist: "Ariana Grande & Victoria Monét", year: 2019 },
        { title: "Operation", artist: "Jack Johnson", year: 2017 },
        { title: "Tag", artist: "Jhené Aiko", year: 2014 },
        { title: "Snakes & Ladders", artist: "Kylie Minogue", year: 2010 },
      ]},
    ],
  },
  // Puzzle 17
  {
    groups: [
      { connection: "Songs by The Cure from their pop-friendly era (1985–1992)", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "In Between Days", artist: "The Cure", year: 1985 },
        { title: "Catch", artist: "The Cure", year: 1987 },
        { title: "Lullaby", artist: "The Cure", year: 1989 },
        { title: "High", artist: "The Cure", year: 1992 },
      ]},
      { connection: "UK number ones of 1966 from the Swinging Sixties pop era", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Paperback Writer", artist: "The Beatles", year: 1966 },
        { title: "Strangers in the Night", artist: "Frank Sinatra", year: 1966 },
        { title: "Yellow Submarine", artist: "The Beatles", year: 1966 },
        { title: "Good Day Sunshine", artist: "The Beatles", year: 1966 },
      ]},
      { connection: "Songs from supergroup Bad Company (members of Free and Mott the Hoople)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Feel Like Makin' Love", artist: "Bad Company", year: 1975 },
        { title: "Can't Get Enough", artist: "Bad Company", year: 1974 },
        { title: "Ready for Love", artist: "Bad Company", year: 1974 },
        { title: "Rock 'n' Roll Fantasy", artist: "Bad Company", year: 1979 },
      ]},
      { connection: "Song titles that are also names of specific rooms in a house", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Living Room", artist: "Tegan and Sara", year: 2007 },
        { title: "In the Attic", artist: "Paul Weller", year: 2010 },
        { title: "Basement Jaxx", artist: "Basement Jaxx", year: 1997 },
        { title: "Hallway", artist: "Torres", year: 2015 },
      ]},
    ],
  },
  // Puzzle 18
  {
    groups: [
      { connection: "Songs by Stevie Wonder with a social or political message", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Living for the City", artist: "Stevie Wonder", year: 1974 },
        { title: "Happy Birthday", artist: "Stevie Wonder", year: 1980 },
        { title: "We Are the World", artist: "USA for Africa", year: 1985 },
        { title: "Black Man", artist: "Stevie Wonder", year: 1976 },
      ]},
      { connection: "Songs that debuted at number one on the UK charts in 2007", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Umbrella", artist: "Rihanna ft. Jay-Z", year: 2007 },
        { title: "Bleeding Love", artist: "Leona Lewis", year: 2007 },
        { title: "Beautiful Girls", artist: "Sean Kingston", year: 2007 },
        { title: "About You Now", artist: "Sugababes", year: 2007 },
      ]},
      { connection: "Songs by Blind Faith — the 1969 supergroup (Clapton, Winwood, Baker, Grech)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Can't Find My Way Home", artist: "Blind Faith", year: 1969 },
        { title: "Well All Right", artist: "Blind Faith", year: 1969 },
        { title: "Sea of Joy", artist: "Blind Faith", year: 1969 },
        { title: "Had to Cry Today", artist: "Blind Faith", year: 1969 },
      ]},
      { connection: "Song titles that are also terms used in mathematics", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Imaginary", artist: "Evanescence", year: 2003 },
        { title: "Constant Craving", artist: "k.d. lang", year: 1992 },
        { title: "Zero", artist: "Yeah Yeah Yeahs", year: 2009 },
        { title: "Infinity", artist: "One Direction", year: 2015 },
      ]},
    ],
  },
  // Puzzle 19
  {
    groups: [
      { connection: "Songs by Arctic Monkeys from their debut album 'Whatever People Say I Am, That's What I'm Not'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "I Bet You Look Good on the Dancefloor", artist: "Arctic Monkeys", year: 2005 },
        { title: "Fake Tales of San Francisco", artist: "Arctic Monkeys", year: 2006 },
        { title: "Mardy Bum", artist: "Arctic Monkeys", year: 2006 },
        { title: "A Certain Romance", artist: "Arctic Monkeys", year: 2006 },
      ]},
      { connection: "US #1 country hits of 2002", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "The Good Stuff", artist: "Kenny Chesney", year: 2002 },
        { title: "Have You Forgotten?", artist: "Darryl Worley", year: 2003 },
        { title: "Long Black Train", artist: "Josh Turner", year: 2003 },
        { title: "Whiskey Lullaby", artist: "Brad Paisley ft. Alison Krauss", year: 2003 },
      ]},
      { connection: "Songs by supergroup Them Crooked Vultures (members of Foo Fighters, Led Zeppelin, QOTSA)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "No One Loves Me & Neither Do I", artist: "Them Crooked Vultures", year: 2009 },
        { title: "Mind Eraser, No Chaser", artist: "Them Crooked Vultures", year: 2009 },
        { title: "New Fang", artist: "Them Crooked Vultures", year: 2009 },
        { title: "Highway One", artist: "Them Crooked Vultures", year: 2009 },
      ]},
      { connection: "Song titles that sound like a complete declarative sentence in five words or fewer", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", year: 1983 },
        { title: "I Will Always Love You", artist: "Whitney Houston", year: 1992 },
        { title: "We Are the Champions", artist: "Queen", year: 1977 },
        { title: "Love Is All Around", artist: "Wet Wet Wet", year: 1994 },
      ]},
    ],
  },
  // Puzzle 20
  {
    groups: [
      { connection: "Songs by Outkast from the album 'Aquemini'", connection_type: "artist", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Rosa Parks", artist: "Outkast", year: 1998 },
        { title: "Aquemini", artist: "Outkast", year: 1998 },
        { title: "Skew It on the Bar-B", artist: "Outkast ft. Raekwon", year: 1998 },
        { title: "Synthesizer", artist: "Outkast ft. George Clinton", year: 1998 },
      ]},
      { connection: "UK #1 debut singles by acts who broke in 2001", connection_type: "decade", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hanging by a Moment", artist: "Lifehouse", year: 2001 },
        { title: "Shaggy", artist: "It Wasn't Me", year: 2001 },
        { title: "Clocks", artist: "Coldplay", year: 2002 },
        { title: "Get the Party Started", artist: "Pink", year: 2001 },
      ]},
      { connection: "Songs by supergroup Asia (members of Yes, ELP, King Crimson, and The Buggles)", connection_type: "theme", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Heat of the Moment", artist: "Asia", year: 1982 },
        { title: "Only Time Will Tell", artist: "Asia", year: 1982 },
        { title: "Don't Cry", artist: "Asia", year: 1983 },
        { title: "Go", artist: "Asia", year: 1985 },
      ]},
      { connection: "Song titles that contain a punctuation mark replacing a letter (intentional stylized spelling)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "R U Mine?", artist: "Arctic Monkeys", year: 2012 },
        { title: "U + Ur Hand", artist: "Pink", year: 2006 },
        { title: "Luv(sic)", artist: "Nujabes ft. Shing02", year: 2002 },
        { title: "B*tch", artist: "Meredith Brooks", year: 1997 },
      ]},
    ],
  },
  // Puzzle 21
  {
    groups: [
      { connection: "Songs about New York City", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "New York, New York", artist: "Frank Sinatra", year: 1980 },
        { title: "Empire State of Mind", artist: "Jay-Z ft. Alicia Keys", year: 2009 },
        { title: "New York State of Mind", artist: "Billy Joel", year: 1976 },
        { title: "Welcome to New York", artist: "Taylor Swift", year: 2014 },
      ]},
      { connection: "Songs from the Grease (1978) soundtrack", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Summer Nights", artist: "John Travolta & Olivia Newton-John", year: 1978 },
        { title: "You're the One That I Want", artist: "John Travolta & Olivia Newton-John", year: 1978 },
        { title: "Grease", artist: "Frankie Valli", year: 1978 },
        { title: "Hopelessly Devoted to You", artist: "Olivia Newton-John", year: 1978 },
      ]},
      { connection: "Songs that famously sample Chic's 'Good Times'", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Rapper's Delight", artist: "The Sugarhill Gang", year: 1979 },
        { title: "Another One Bites the Dust", artist: "Queen", year: 1980 },
        { title: "Jump to the Beat", artist: "Stacy Lattisaw", year: 1980 },
        { title: "Lost in Music (Fade to Grey mix)", artist: "Sister Sledge", year: 1984 },
      ]},
      { connection: "Song titles that are a single word ending in '-tion'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Satisfaction", artist: "The Rolling Stones", year: 1965 },
        { title: "Celebration", artist: "Kool & the Gang", year: 1980 },
        { title: "Temptation", artist: "Heaven 17", year: 1983 },
        { title: "Elevation", artist: "U2", year: 2001 },
      ]},
    ],
  },
  // Puzzle 22
  {
    groups: [
      { connection: "Songs about insomnia or not being able to sleep", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Can't Sleep", artist: "Lil Peep", year: 2017 },
        { title: "3 AM", artist: "Matchbox Twenty", year: 1996 },
        { title: "Wide Awake", artist: "Katy Perry", year: 2012 },
        { title: "I Can't Sleep", artist: "Clay Walker", year: 1993 },
      ]},
      { connection: "Bond theme songs performed by British female artists", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Skyfall", artist: "Adele", year: 2012 },
        { title: "Writing's on the Wall", artist: "Sam Smith", year: 2015 },
        { title: "Nobody Does It Better", artist: "Carly Simon", year: 1977 },
        { title: "For Your Eyes Only", artist: "Sheena Easton", year: 1981 },
      ]},
      { connection: "Famous covers that became more iconic than the originals", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Hound Dog", artist: "Elvis Presley", year: 1956 },
        { title: "All Along the Watchtower", artist: "Jimi Hendrix", year: 1968 },
        { title: "Hurt", artist: "Johnny Cash", year: 2002 },
        { title: "I Will Always Love You", artist: "Whitney Houston", year: 1992 },
      ]},
      { connection: "Song titles containing the word 'Don't' as the first word", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Don't Stop Believin'", artist: "Journey", year: 1981 },
        { title: "Don't You (Forget About Me)", artist: "Simple Minds", year: 1985 },
        { title: "Don't Look Back in Anger", artist: "Oasis", year: 1996 },
        { title: "Don't Speak", artist: "No Doubt", year: 1996 },
      ]},
    ],
  },
  // Puzzle 23
  {
    groups: [
      { connection: "Songs about London", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "London Calling", artist: "The Clash", year: 1979 },
        { title: "Waterloo Sunset", artist: "The Kinks", year: 1967 },
        { title: "Baker Street", artist: "Gerry Rafferty", year: 1978 },
        { title: "A Rainy Night in Soho", artist: "The Pogues", year: 1986 },
      ]},
      { connection: "Songs from the Pretty Woman (1990) soundtrack", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Oh, Pretty Woman", artist: "Roy Orbison", year: 1964 },
        { title: "King of Wishful Thinking", artist: "Go West", year: 1990 },
        { title: "Fame '90", artist: "David Bowie", year: 1990 },
        { title: "Wild Women Do", artist: "Natalie Cole", year: 1990 },
      ]},
      { connection: "Songs built around a sample of Lyn Collins' 'Think (About It)'", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "It Takes Two", artist: "Rob Base & DJ E-Z Rock", year: 1988 },
        { title: "Pump Up the Jam", artist: "Technotronic", year: 1989 },
        { title: "Do You Want It Right Now", artist: "Degrees of Motion", year: 1992 },
        { title: "Jump", artist: "Kris Kross", year: 1992 },
      ]},
      { connection: "Song titles that are exclamations consisting of a single repeated syllable", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Na Na Na", artist: "My Chemical Romance", year: 2010 },
        { title: "La La La", artist: "Naughty Boy ft. Sam Smith", year: 2013 },
        { title: "Ha", artist: "Juvenile", year: 1998 },
        { title: "Nah Nah Honey I'm Good", artist: "Andy Grammer", year: 2014 },
      ]},
    ],
  },
  // Puzzle 24
  {
    groups: [
      { connection: "Songs about heartbreak and lost love", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Someone Like You", artist: "Adele", year: 2011 },
        { title: "The Night We Met", artist: "Lord Huron", year: 2015 },
        { title: "Nothing Compares 2 U", artist: "Sinéad O'Connor", year: 1990 },
        { title: "Back to December", artist: "Taylor Swift", year: 2010 },
      ]},
      { connection: "Songs from the Top Gun (1986) soundtrack", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Danger Zone", artist: "Kenny Loggins", year: 1986 },
        { title: "Take My Breath Away", artist: "Berlin", year: 1986 },
        { title: "Playing with the Boys", artist: "Kenny Loggins", year: 1986 },
        { title: "Mighty Wings", artist: "Cheap Trick", year: 1986 },
      ]},
      { connection: "Songs that interpolate the melody of 'My Girl' by The Temptations", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "I Got You (I Feel Good)", artist: "James Brown", year: 1965 },
        { title: "My Boy", artist: "Elvis Presley", year: 1975 },
        { title: "Rockin' Robin", artist: "Bobby Day", year: 1958 },
        { title: "Any Day Now", artist: "Chuck Jackson", year: 1962 },
      ]},
      { connection: "Song titles that are a single verb in the imperative form (one word commands)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Shout", artist: "Tears for Fears", year: 1984 },
        { title: "Run", artist: "Snow Patrol", year: 2003 },
        { title: "Smile", artist: "Lily Allen", year: 2006 },
        { title: "Jump", artist: "Van Halen", year: 1984 },
      ]},
    ],
  },
  // Puzzle 25
  {
    groups: [
      { connection: "Songs about money and wealth", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Material Girl", artist: "Madonna", year: 1984 },
        { title: "For the Love of Money", artist: "The O'Jays", year: 1973 },
        { title: "Mo Money Mo Problems", artist: "The Notorious B.I.G. ft. Puff Daddy & Mase", year: 1997 },
        { title: "Rich Girl", artist: "Hall & Oates", year: 1977 },
      ]},
      { connection: "Songs from the Bodyguard (1992) soundtrack not by Whitney Houston", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Trust in Me", artist: "Joe Cocker", year: 1992 },
        { title: "Waiting for You", artist: "Lisa Stansfield", year: 1992 },
        { title: "Even If My Heart Would Break", artist: "Kenny G & Aaron Neville", year: 1992 },
        { title: "It's Gonna Be a Lovely Day", artist: "The S.O.U.L. S.Y.S.T.E.M.", year: 1993 },
      ]},
      { connection: "Famous covers of songs originally written by Bob Dylan", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Mr. Tambourine Man", artist: "The Byrds", year: 1965 },
        { title: "Blowin' in the Wind", artist: "Peter, Paul and Mary", year: 1963 },
        { title: "Knockin' on Heaven's Door", artist: "Guns N' Roses", year: 1992 },
        { title: "Make You Feel My Love", artist: "Adele", year: 2008 },
      ]},
      { connection: "Song titles that name a specific foreign city (not in the USA)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Vienna", artist: "Ultravox", year: 1980 },
        { title: "Budapest", artist: "George Ezra", year: 2014 },
        { title: "Barcelona", artist: "Freddie Mercury", year: 1987 },
        { title: "Istanbul (Not Constantinople)", artist: "They Might Be Giants", year: 1990 },
      ]},
    ],
  },
  // Puzzle 26
  {
    groups: [
      { connection: "Songs about summer", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Summer of '69", artist: "Bryan Adams", year: 1985 },
        { title: "Summer Nights", artist: "John Travolta & Olivia Newton-John", year: 1978 },
        { title: "Summertime", artist: "DJ Jazzy Jeff & The Fresh Prince", year: 1991 },
        { title: "In the Summertime", artist: "Mungo Jerry", year: 1970 },
      ]},
      { connection: "Songs from the Purple Rain (1984) soundtrack not from the original album", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Purple Rain", artist: "Prince & The Revolution", year: 1984 },
        { title: "When Doves Cry", artist: "Prince", year: 1984 },
        { title: "Let's Go Crazy", artist: "Prince & The Revolution", year: 1984 },
        { title: "I Would Die 4 U", artist: "Prince & The Revolution", year: 1984 },
      ]},
      { connection: "Songs that sample James Brown's 'Cold Sweat'", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Paid in Full", artist: "Eric B. & Rakim", year: 1987 },
        { title: "Impeach the President", artist: "The Honeydrippers", year: 1973 },
        { title: "Bust a Move", artist: "Young MC", year: 1989 },
        { title: "Insane in the Brain", artist: "Cypress Hill", year: 1993 },
      ]},
      { connection: "Song titles that are two words where the second word rhymes with the first", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Mellow Yellow", artist: "Donovan", year: 1966 },
        { title: "Crocodile Rock", artist: "Elton John", year: 1972 },
        { title: "Blue Suede", artist: "Elvis Presley", year: 1956 },
        { title: "Itsy Bitsy Teenie Weenie Yellow Polkadot Bikini", artist: "Brian Hyland", year: 1960 },
      ]},
    ],
  },
  // Puzzle 27
  {
    groups: [
      { connection: "Songs about phone calls or calling someone", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Call Me", artist: "Blondie", year: 1980 },
        { title: "Telephone Line", artist: "Electric Light Orchestra", year: 1976 },
        { title: "Jenny (867-5309)", artist: "Tommy Tutone", year: 1981 },
        { title: "Hotline Bling", artist: "Drake", year: 2015 },
      ]},
      { connection: "Songs from the Saturday Night Fever (1977) soundtrack not by the Bee Gees", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Open Sesame", artist: "Kool & the Gang", year: 1977 },
        { title: "Disco Inferno", artist: "The Trammps", year: 1976 },
        { title: "A Fifth of Beethoven", artist: "Walter Murphy", year: 1976 },
        { title: "If I Can't Have You", artist: "Yvonne Elliman", year: 1977 },
      ]},
      { connection: "Songs built on the Amen break drumloop", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Keep It Rollin'", artist: "N.W.A.", year: 1991 },
        { title: "Intergalactic", artist: "Beastie Boys", year: 1998 },
        { title: "Think About It", artist: "Lyn Collins", year: 1972 },
        { title: "Come and Get Your Love", artist: "Redbone", year: 1973 },
      ]},
      { connection: "Song titles that contain a number spelled out as a word", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "One", artist: "U2", year: 1991 },
        { title: "Two Princes", artist: "Spin Doctors", year: 1991 },
        { title: "Three Times a Lady", artist: "Commodores", year: 1978 },
        { title: "Five Hundred Miles", artist: "The Proclaimers", year: 1988 },
      ]},
    ],
  },
  // Puzzle 28
  {
    groups: [
      { connection: "Songs about dreams and dreaming", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Dream On", artist: "Aerosmith", year: 1973 },
        { title: "California Dreamin'", artist: "The Mamas & the Papas", year: 1965 },
        { title: "Mr. Sandman", artist: "The Chordettes", year: 1954 },
        { title: "Just a Dream", artist: "Carrie Underwood", year: 2005 },
      ]},
      { connection: "Songs from the Moulin Rouge! (2001) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Come What May", artist: "Ewan McGregor & Nicole Kidman", year: 2001 },
        { title: "Elephant Love Medley", artist: "Ewan McGregor & Nicole Kidman", year: 2001 },
        { title: "Lady Marmalade", artist: "Christina Aguilera, Lil' Kim, Mýa & Pink", year: 2001 },
        { title: "Your Song", artist: "Ewan McGregor", year: 2001 },
      ]},
      { connection: "Famous covers of songs originally by Leonard Cohen", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Hallelujah", artist: "Jeff Buckley", year: 1994 },
        { title: "Bird on the Wire", artist: "Joe Cocker", year: 1969 },
        { title: "Suzanne", artist: "Nina Simone", year: 1969 },
        { title: "So Long, Marianne", artist: "Judy Collins", year: 1967 },
      ]},
      { connection: "Song titles that are questions ending in a question mark", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "What's Going On?", artist: "Marvin Gaye", year: 1971 },
        { title: "Do You Really Want to Hurt Me?", artist: "Culture Club", year: 1982 },
        { title: "Should I Stay or Should I Go?", artist: "The Clash", year: 1982 },
        { title: "What Is Love?", artist: "Haddaway", year: 1993 },
      ]},
    ],
  },
  // Puzzle 29
  {
    groups: [
      { connection: "Songs about Paris", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "La Vie en Rose", artist: "Édith Piaf", year: 1946 },
        { title: "Paris", artist: "Jay-Z & Kanye West", year: 2011 },
        { title: "The Last Time I Saw Paris", artist: "Ella Fitzgerald", year: 1941 },
        { title: "April in Paris", artist: "Doris Day", year: 1952 },
      ]},
      { connection: "Songs from Christmas films that charted as standalone singles", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "White Christmas", artist: "Bing Crosby", year: 1942 },
        { title: "All I Want for Christmas Is You", artist: "Mariah Carey", year: 1994 },
        { title: "Last Christmas", artist: "Wham!", year: 1984 },
        { title: "Fairytale of New York", artist: "The Pogues ft. Kirsty MacColl", year: 1987 },
      ]},
      { connection: "Songs that use a sample from Shirley Bassey's recordings", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "History Repeating", artist: "Propellerheads ft. Miss Shirley Bassey", year: 1997 },
        { title: "Big Pimpin'", artist: "Jay-Z", year: 2000 },
        { title: "Get It Right", artist: "Freemasons", year: 2007 },
        { title: "Diamonds Are Forever", artist: "Kanye West", year: 2005 },
      ]},
      { connection: "Song titles that contain the word 'night' or 'nights'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Nights in White Satin", artist: "The Moody Blues", year: 1967 },
        { title: "Night Fever", artist: "Bee Gees", year: 1977 },
        { title: "One More Night", artist: "Phil Collins", year: 1984 },
        { title: "Dancing in the Night", artist: "Bruce Springsteen", year: 1984 },
      ]},
    ],
  },
  // Puzzle 30
  {
    groups: [
      { connection: "Songs about the sun or sunshine", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Here Comes the Sun", artist: "The Beatles", year: 1969 },
        { title: "You Are the Sunshine of My Life", artist: "Stevie Wonder", year: 1972 },
        { title: "Walking on Sunshine", artist: "Katrina and the Waves", year: 1985 },
        { title: "Don't Let the Sun Go Down on Me", artist: "Elton John", year: 1974 },
      ]},
      { connection: "Songs from the Bohemian Rhapsody (2018) film not from the original Queen catalog", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Bohemian Rhapsody", artist: "Queen", year: 1975 },
        { title: "Somebody to Love", artist: "Queen", year: 1976 },
        { title: "Don't Stop Me Now", artist: "Queen", year: 1978 },
        { title: "We Will Rock You", artist: "Queen", year: 1977 },
      ]},
      { connection: "Songs built on a sample of Barry White's recordings", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Can't Get Enough", artist: "Diddy", year: 1997 },
        { title: "A Song for Mama", artist: "Boyz II Men", year: 1997 },
        { title: "You're the First, the Last, My Everything", artist: "Barry White", year: 1974 },
        { title: "Secret Garden", artist: "Quincy Jones ft. Barry White", year: 1995 },
      ]},
      { connection: "Song titles that consist of exactly three words where each word is one syllable", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Here Comes Rain", artist: "Depeche Mode", year: 1984 },
        { title: "Born This Way", artist: "Lady Gaga", year: 2011 },
        { title: "Just Like Heaven", artist: "The Cure", year: 1987 },
        { title: "Hit Me Baby", artist: "Britney Spears", year: 1999 },
      ]},
    ],
  },
  // Puzzle 31
  {
    groups: [
      { connection: "Songs about Chicago", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Chicago", artist: "Frank Sinatra", year: 1957 },
        { title: "Sweet Home Chicago", artist: "Robert Johnson", year: 1936 },
        { title: "Bad, Bad Leroy Brown", artist: "Jim Croce", year: 1973 },
        { title: "My Kind of Town (Chicago Is)", artist: "Frank Sinatra", year: 1964 },
      ]},
      { connection: "Songs from the Pulp Fiction (1994) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Misirlou", artist: "Dick Dale & His Del-Tones", year: 1962 },
        { title: "Son of a Preacher Man", artist: "Dusty Springfield", year: 1968 },
        { title: "Girl, You'll Be a Woman Soon", artist: "Urge Overkill", year: 1994 },
        { title: "Jungle Boogie", artist: "Kool & the Gang", year: 1973 },
      ]},
      { connection: "Songs that heavily sample or interpolate Donna Summer recordings", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Hard Knock Life (Ghetto Anthem)", artist: "Jay-Z", year: 1998 },
        { title: "Love to Love You Baby", artist: "Donna Summer", year: 1975 },
        { title: "I Feel Love", artist: "Donna Summer", year: 1977 },
        { title: "Hot Stuff", artist: "Donna Summer", year: 1979 },
      ]},
      { connection: "Song titles that are a person's first name only, one word", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Roxanne", artist: "The Police", year: 1978 },
        { title: "Gloria", artist: "Laura Branigan", year: 1982 },
        { title: "Jolene", artist: "Dolly Parton", year: 1973 },
        { title: "Mandy", artist: "Barry Manilow", year: 1974 },
      ]},
    ],
  },
  // Puzzle 32
  {
    groups: [
      { connection: "Songs about Los Angeles or California", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Hotel California", artist: "Eagles", year: 1977 },
        { title: "California Girls", artist: "The Beach Boys", year: 1965 },
        { title: "Going to California", artist: "Led Zeppelin", year: 1971 },
        { title: "Californication", artist: "Red Hot Chili Peppers", year: 1999 },
      ]},
      { connection: "Songs from Schindler's List (1993) and other Steven Spielberg film scores", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Theme from Schindler's List", artist: "John Williams", year: 1993 },
        { title: "Theme from Jaws", artist: "John Williams", year: 1975 },
        { title: "Raiders March", artist: "John Williams", year: 1981 },
        { title: "Theme from E.T.", artist: "John Williams", year: 1982 },
      ]},
      { connection: "Famous cover versions of songs originally by The Bee Gees", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Islands in the Stream", artist: "Kenny Rogers & Dolly Parton", year: 1983 },
        { title: "How Deep Is Your Love", artist: "Take That", year: 1996 },
        { title: "Tragedy", artist: "Steps", year: 1998 },
        { title: "Words", artist: "Boyzone", year: 1993 },
      ]},
      { connection: "Song titles that consist of exactly one word with exactly seven letters", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Fantasy", artist: "Mariah Carey", year: 1995 },
        { title: "Creeper", artist: "Twenty One Pilots", year: 2018 },
        { title: "Beatles", artist: "The Beatles", year: 1968 },
        { title: "Wannabe", artist: "Spice Girls", year: 1996 },
      ]},
    ],
  },
  // Puzzle 33
  {
    groups: [
      { connection: "Songs about time and growing older", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Time After Time", artist: "Cyndi Lauper", year: 1983 },
        { title: "The Times They Are a-Changin'", artist: "Bob Dylan", year: 1964 },
        { title: "As Time Goes By", artist: "Dooley Wilson", year: 1942 },
        { title: "Cats in the Cradle", artist: "Harry Chapin", year: 1974 },
      ]},
      { connection: "Songs from the La La Land (2016) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "City of Stars", artist: "Ryan Gosling & Emma Stone", year: 2016 },
        { title: "Another Day of Sun", artist: "Cast of La La Land", year: 2016 },
        { title: "A Lovely Night", artist: "Ryan Gosling & Emma Stone", year: 2016 },
        { title: "Audition (The Fools Who Dream)", artist: "Emma Stone", year: 2016 },
      ]},
      { connection: "Songs that interpolate a well-known nursery rhyme or children's song", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Ice Ice Baby", artist: "Vanilla Ice", year: 1990 },
        { title: "Baa Baa Black Sheep", artist: "Eminem", year: 2009 },
        { title: "I'm Like a Bird", artist: "Nelly Furtado", year: 2000 },
        { title: "A-Tisket, A-Tasket", artist: "Ella Fitzgerald", year: 1938 },
      ]},
      { connection: "Song titles that are a proper name followed by a common noun (format: Name + Noun)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Roxanne", artist: "The Police", year: 1978 },
        { title: "Jolene", artist: "Dolly Parton", year: 1973 },
        { title: "Elvis Presley Blues", artist: "Gillian Welch", year: 2001 },
        { title: "Billie Jean", artist: "Michael Jackson", year: 1982 },
      ]},
    ],
  },
  // Puzzle 34
  {
    groups: [
      { connection: "Songs about being lonely or alone", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "All by Myself", artist: "Eric Carmen", year: 1975 },
        { title: "One", artist: "Metallica", year: 1989 },
        { title: "Eleanor Rigby", artist: "The Beatles", year: 1966 },
        { title: "Mr. Lonely", artist: "Bobby Vinton", year: 1964 },
      ]},
      { connection: "Songs from the Whiplash (2014) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Whiplash", artist: "Hank Levy", year: 1974 },
        { title: "Caravan", artist: "Duke Ellington & Juan Tizol", year: 1937 },
        { title: "Overture", artist: "Justin Hurwitz", year: 2014 },
        { title: "Fletcher's Song in Club", artist: "Justin Hurwitz", year: 2014 },
      ]},
      { connection: "Songs that sample or interpolate Stevie Wonder's recordings", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "That's the Way Love Goes", artist: "Janet Jackson", year: 1993 },
        { title: "Pastime Paradise", artist: "Coolio", year: 1995 },
        { title: "Gangsta's Paradise", artist: "Coolio ft. L.V.", year: 1995 },
        { title: "Higher Ground", artist: "Red Hot Chili Peppers", year: 1989 },
      ]},
      { connection: "Song titles that are three-letter words", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Run", artist: "Snow Patrol", year: 2003 },
        { title: "Bad", artist: "Michael Jackson", year: 1987 },
        { title: "War", artist: "Edwin Starr", year: 1970 },
        { title: "Cry", artist: "Faith Hill", year: 2001 },
      ]},
    ],
  },
  // Puzzle 35
  {
    groups: [
      { connection: "Songs about New Orleans", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "House of the Rising Sun", artist: "The Animals", year: 1964 },
        { title: "Do You Know What It Means to Miss New Orleans", artist: "Louis Armstrong", year: 1947 },
        { title: "When the Saints Go Marching In", artist: "Louis Armstrong", year: 1938 },
        { title: "New Orleans Is Sinking", artist: "The Tragically Hip", year: 1989 },
      ]},
      { connection: "Songs from the O Brother, Where Art Thou? (2000) soundtrack", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Man of Constant Sorrow", artist: "The Soggy Bottom Boys", year: 2000 },
        { title: "I Am a Man of Constant Sorrow", artist: "The Soggy Bottom Boys", year: 2000 },
        { title: "Po' Lazarus", artist: "James Carter and the Prisoners", year: 2000 },
        { title: "I'll Fly Away", artist: "Alison Krauss & Gillian Welch", year: 2000 },
      ]},
      { connection: "Songs that sample or interpolate recordings by Marvin Gaye", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Blurred Lines", artist: "Robin Thicke ft. T.I. & Pharrell", year: 2013 },
        { title: "Got to Give It Up", artist: "Marvin Gaye", year: 1977 },
        { title: "Let's Get It On", artist: "Marvin Gaye", year: 1973 },
        { title: "Crazy in Love", artist: "Beyoncé ft. Jay-Z", year: 2003 },
      ]},
      { connection: "Song titles that are exactly two words, both of which are body parts", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Head Shoulders Knees and Toes", artist: "Various", year: 1990 },
        { title: "Elbow Room", artist: "Schoolhouse Rock", year: 1976 },
        { title: "Knee Deep", artist: "Zac Brown Band ft. Jimmy Buffett", year: 2010 },
        { title: "Shoulder to Lean On", artist: "Nat King Cole", year: 1950 },
      ]},
    ],
  },
  // Puzzle 36
  {
    groups: [
      { connection: "Songs about missing or mourning someone who has died", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Tears in Heaven", artist: "Eric Clapton", year: 1992 },
        { title: "See You Again", artist: "Wiz Khalifa ft. Charlie Puth", year: 2015 },
        { title: "Angels", artist: "Robbie Williams", year: 1997 },
        { title: "Candle in the Wind", artist: "Elton John", year: 1973 },
      ]},
      { connection: "Bond theme songs from the Roger Moore era (1973-1985)", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Live and Let Die", artist: "Wings", year: 1973 },
        { title: "Nobody Does It Better", artist: "Carly Simon", year: 1977 },
        { title: "A View to a Kill", artist: "Duran Duran", year: 1985 },
        { title: "For Your Eyes Only", artist: "Sheena Easton", year: 1981 },
      ]},
      { connection: "Songs that sample or interpolate tracks by The Jackson 5", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Maria Maria", artist: "Carlos Santana ft. The Product G&B", year: 1999 },
        { title: "Remember the Time", artist: "Michael Jackson", year: 1992 },
        { title: "Rockin' Robin", artist: "Michael Jackson", year: 1972 },
        { title: "Never Can Say Goodbye", artist: "Gloria Gaynor", year: 1974 },
      ]},
      { connection: "Song titles that contain the word 'love' as the only word", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Love", artist: "John Lennon", year: 1971 },
        { title: "L-O-V-E", artist: "Nat King Cole", year: 1965 },
        { title: "Lovefool", artist: "The Cardigans", year: 1996 },
        { title: "Lovelight", artist: "Robbie Williams", year: 2009 },
      ]},
    ],
  },
  // Puzzle 37
  {
    groups: [
      { connection: "Songs about being on the road or traveling", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Take It Easy", artist: "Eagles", year: 1972 },
        { title: "On the Road Again", artist: "Willie Nelson", year: 1980 },
        { title: "King of the Road", artist: "Roger Miller", year: 1965 },
        { title: "Route 66", artist: "Nat King Cole", year: 1946 },
      ]},
      { connection: "Songs from A Star Is Born (2018) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Shallow", artist: "Lady Gaga & Bradley Cooper", year: 2018 },
        { title: "Always Remember Us This Way", artist: "Lady Gaga", year: 2018 },
        { title: "I'll Never Love Again", artist: "Lady Gaga & Bradley Cooper", year: 2018 },
        { title: "Hair Body Face", artist: "Lady Gaga", year: 2018 },
      ]},
      { connection: "Classic songs that were covered by punk bands and became punk anthems", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "My Way", artist: "Sid Vicious", year: 1978 },
        { title: "Anarchy in the U.K.", artist: "The Sex Pistols", year: 1976 },
        { title: "Chinese Rocks", artist: "The Heartbreakers", year: 1977 },
        { title: "I Fought the Law", artist: "The Clash", year: 1979 },
      ]},
      { connection: "Song titles that begin with the word 'Mr.' or 'Mrs.'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Mr. Brightside", artist: "The Killers", year: 2003 },
        { title: "Mrs. Robinson", artist: "Simon & Garfunkel", year: 1968 },
        { title: "Mr. Tambourine Man", artist: "Bob Dylan", year: 1965 },
        { title: "Mr. Jones", artist: "Counting Crows", year: 1993 },
      ]},
    ],
  },
  // Puzzle 38
  {
    groups: [
      { connection: "Songs about the ocean or sea", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Rock Around the Clock", artist: "Bill Haley & His Comets", year: 1954 },
        { title: "Sailing", artist: "Rod Stewart", year: 1975 },
        { title: "Beyond the Sea", artist: "Bobby Darin", year: 1959 },
        { title: "Brandy (You're a Fine Girl)", artist: "Looking Glass", year: 1972 },
      ]},
      { connection: "Songs from the Trainspotting (1996) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Lust for Life", artist: "Iggy Pop", year: 1977 },
        { title: "Born Slippy .NUXX", artist: "Underworld", year: 1995 },
        { title: "Perfect Day", artist: "Lou Reed", year: 1972 },
        { title: "Nightclubbing", artist: "Iggy Pop", year: 1977 },
      ]},
      { connection: "Iconic interpolations of Joni Mitchell's songs in other recordings", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Big Yellow Taxi", artist: "Amy Grant", year: 1995 },
        { title: "Both Sides Now", artist: "Judy Collins", year: 1968 },
        { title: "Woodstock", artist: "Crosby, Stills, Nash & Young", year: 1970 },
        { title: "Help Me", artist: "Joni Mitchell", year: 1974 },
      ]},
      { connection: "Song titles that are a two-word phrase where the words are opposites or antonyms", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Hot Cold", artist: "Katy Perry", year: 2008 },
        { title: "Push and Pull", artist: "Nikka Costa", year: 2001 },
        { title: "Stop and Go", artist: "Dave Matthews Band", year: 1994 },
        { title: "Loud Silence", artist: "Garth Brooks", year: 1991 },
      ]},
    ],
  },
  // Puzzle 39
  {
    groups: [
      { connection: "Songs about nostalgia and missing the past", connection_type: "theme", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Glory Days", artist: "Bruce Springsteen", year: 1984 },
        { title: "The Way We Were", artist: "Barbra Streisand", year: 1973 },
        { title: "Yesterday", artist: "The Beatles", year: 1965 },
        { title: "Good Old Days", artist: "Macklemore ft. Kesha", year: 2017 },
      ]},
      { connection: "Songs from the Shrek (2001) film", connection_type: "soundtrack", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "All Star", artist: "Smash Mouth", year: 1999 },
        { title: "Hallelujah", artist: "Rufus Wainwright", year: 2001 },
        { title: "I'm a Believer", artist: "Smash Mouth", year: 2001 },
        { title: "Stay Home", artist: "Self", year: 2001 },
      ]},
      { connection: "Songs that use the 'Funky Drummer' break by James Brown", connection_type: "covers", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "It Takes Two", artist: "Rob Base & DJ E-Z Rock", year: 1988 },
        { title: "Talkin' All That Jazz", artist: "Stetsasonic", year: 1988 },
        { title: "Public Enemy No. 1", artist: "Public Enemy", year: 1987 },
        { title: "Mama Said Knock You Out", artist: "LL Cool J", year: 1990 },
      ]},
      { connection: "Song titles that are a single hyphenated compound word", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Over-Joyed", artist: "Stevie Wonder", year: 1985 },
        { title: "Semi-Charmed Life", artist: "Third Eye Blind", year: 1997 },
        { title: "Half-Breed", artist: "Cher", year: 1973 },
        { title: "Self-Control", artist: "Laura Branigan", year: 1984 },
      ]},
    ],
  },
  // Puzzle 40
  {
    groups: [
      { connection: "Songs that defined the UK garage scene", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Re-Rewind (The Crowd Say Bo Selecta)", artist: "Artful Dodger ft. Craig David", year: 2000 },
        { title: "Fill Me In", artist: "Craig David", year: 2000 },
        { title: "Bound 4 Da Reload (Casualty)", artist: "Oxide & Neutrino", year: 2000 },
        { title: "21 Seconds", artist: "So Solid Crew", year: 2001 },
      ]},
      { connection: "Songs produced by Timbaland featuring his signature stuttering beat style", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Are You That Somebody", artist: "Aaliyah", year: 1998 },
        { title: "The Way I Are", artist: "Timbaland", year: 2007 },
        { title: "Dirt Off Your Shoulder", artist: "Jay-Z", year: 2004 },
        { title: "Crazy in Love", artist: "Beyoncé ft. Jay-Z", year: 2003 },
      ]},
      { connection: "Songs featuring a guest verse by Nicki Minaj", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Monster", artist: "Kanye West ft. Jay-Z, Rick Ross, Nicki Minaj & Bon Iver", year: 2010 },
        { title: "Super Bass", artist: "Nicki Minaj", year: 2011 },
        { title: "Bang Bang", artist: "Jessie J, Ariana Grande & Nicki Minaj", year: 2014 },
        { title: "Feeling Myself", artist: "Nicki Minaj ft. Beyoncé", year: 2014 },
      ]},
      { connection: "Song titles that are also verbs meaning 'to leave'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Bounce", artist: "Iggy Azalea ft. T.I.", year: 2013 },
        { title: "Bolt", artist: "Usher", year: 2012 },
        { title: "Split", artist: "The Cranberries", year: 1994 },
        { title: "Jet", artist: "Paul McCartney & Wings", year: 1974 },
      ]},
    ],
  },
  // Puzzle 41
  {
    groups: [
      { connection: "Foundational tracks of the afrobeats genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Ye", artist: "Burna Boy", year: 2018 },
        { title: "One Dance", artist: "Drake ft. WizKid & Kyla", year: 2016 },
        { title: "Essence", artist: "WizKid ft. Tems", year: 2020 },
        { title: "Lover Boy", artist: "Phyno", year: 2018 },
      ]},
      { connection: "Songs featuring an iconic saxophone solo", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Baker Street", artist: "Gerry Rafferty", year: 1978 },
        { title: "Careless Whisper", artist: "George Michael", year: 1984 },
        { title: "Born to Run", artist: "Bruce Springsteen", year: 1975 },
        { title: "The Lost Boys", artist: "Echo & the Bunnymen", year: 1987 },
      ]},
      { connection: "Songs that are famous duets between a rock and a pop star", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Ebony and Ivory", artist: "Paul McCartney & Stevie Wonder", year: 1982 },
        { title: "Don't You Want Me", artist: "The Human League", year: 1981 },
        { title: "It's My Life", artist: "Bon Jovi", year: 2000 },
        { title: "Under Pressure", artist: "Queen & David Bowie", year: 1981 },
      ]},
      { connection: "Song titles that are also professions or job titles", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Doctor Jones", artist: "Aqua", year: 1997 },
        { title: "Soldier", artist: "Destiny's Child", year: 2004 },
        { title: "The Joker", artist: "Steve Miller Band", year: 1973 },
        { title: "Lady Marmalade", artist: "LaBelle", year: 1975 },
      ]},
    ],
  },
  // Puzzle 42
  {
    groups: [
      { connection: "Classic bossa nova tracks that crossed over to international charts", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "The Girl from Ipanema", artist: "Astrud Gilberto & João Gilberto", year: 1964 },
        { title: "Corcovado (Quiet Nights of Quiet Stars)", artist: "Stan Getz & João Gilberto", year: 1964 },
        { title: "Desafinado", artist: "Stan Getz & João Gilberto", year: 1963 },
        { title: "Mas Que Nada", artist: "Sérgio Mendes & Brasil '66", year: 1966 },
      ]},
      { connection: "Songs built around a Roland TR-808 drum machine beat", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Planet Rock", artist: "Afrika Bambaataa & Soulsonic Force", year: 1982 },
        { title: "Sexual Healing", artist: "Marvin Gaye", year: 1982 },
        { title: "When Doves Cry", artist: "Prince", year: 1984 },
        { title: "99 Problems", artist: "Jay-Z", year: 2004 },
      ]},
      { connection: "Songs that are official collaborations between Eminem and Dr. Dre", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Forgot About Dre", artist: "Dr. Dre ft. Eminem", year: 1999 },
        { title: "I Need a Doctor", artist: "Dr. Dre ft. Eminem & Skylar Grey", year: 2011 },
        { title: "Guilty Conscience", artist: "Eminem ft. Dr. Dre", year: 1999 },
        { title: "Old Time's Sake", artist: "Eminem ft. Dr. Dre", year: 2009 },
      ]},
      { connection: "Song titles that are also types of weather", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Hail to the Thief", artist: "Radiohead", year: 2003 },
        { title: "Sleet", artist: "The National", year: 2005 },
        { title: "Fog", artist: "Radiohead", year: 2001 },
        { title: "Haze", artist: "Bloc Party", year: 2008 },
      ]},
    ],
  },
  // Puzzle 43
  {
    groups: [
      { connection: "Defining tracks of the synthpop genre's golden age", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Just Can't Get Enough", artist: "Depeche Mode", year: 1981 },
        { title: "Tainted Love", artist: "Soft Cell", year: 1981 },
        { title: "Don't You Want Me", artist: "The Human League", year: 1981 },
        { title: "Cars", artist: "Gary Numan", year: 1979 },
      ]},
      { connection: "Songs produced by Quincy Jones for Michael Jackson", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Billie Jean", artist: "Michael Jackson", year: 1982 },
        { title: "Thriller", artist: "Michael Jackson", year: 1982 },
        { title: "Don't Stop 'Til You Get Enough", artist: "Michael Jackson", year: 1979 },
        { title: "Beat It", artist: "Michael Jackson", year: 1982 },
      ]},
      { connection: "Songs where Kendrick Lamar delivered a guest verse that overshadowed the main artist", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Fuckin' Problems", artist: "A$AP Rocky ft. Drake, 2 Chainz & Kendrick Lamar", year: 2012 },
        { title: "Poetic Justice", artist: "Kendrick Lamar ft. Drake", year: 2012 },
        { title: "Bad Blood", artist: "Taylor Swift ft. Kendrick Lamar", year: 2015 },
        { title: "Pray for Me", artist: "The Weeknd & Kendrick Lamar", year: 2018 },
      ]},
      { connection: "Song titles that are also commonly used exclamations or interjections (not in avoid-list)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Dang!", artist: "Mac Miller ft. Anderson .Paak", year: 2016 },
        { title: "Wow", artist: "Post Malone", year: 2019 },
        { title: "Ugh!", artist: "The 1975", year: 2016 },
        { title: "Blah Blah Blah", artist: "Kesha", year: 2009 },
      ]},
    ],
  },
  // Puzzle 44
  {
    groups: [
      { connection: "Songs from the Chicago house music scene of the 1980s", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Your Love", artist: "Frankie Knuckles", year: 1987 },
        { title: "Move Your Body", artist: "Marshall Jefferson", year: 1986 },
        { title: "Jack Your Body", artist: "Steve 'Silk' Hurley", year: 1986 },
        { title: "Love Can't Turn Around", artist: "Farley 'Jackmaster' Funk", year: 1986 },
      ]},
      { connection: "Songs featuring a prominent harmonica solo", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Piano Man", artist: "Billy Joel", year: 1973 },
        { title: "Heart of Gold", artist: "Neil Young", year: 1972 },
        { title: "Thunder Road", artist: "Bruce Springsteen", year: 1975 },
        { title: "Love Me Do", artist: "The Beatles", year: 1962 },
      ]},
      { connection: "Songs that are famous collaborations between rappers and rock bands", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Walk This Way", artist: "Run-DMC ft. Aerosmith", year: 1986 },
        { title: "Numb/Encore", artist: "Jay-Z & Linkin Park", year: 2004 },
        { title: "Judgment Night", artist: "Biohazard ft. Onyx", year: 1993 },
        { title: "It's Like That", artist: "Mariah Carey ft. Run-DMC", year: 1997 },
      ]},
      { connection: "Song titles that are spelled-out acronyms (the title is what each letter stands for)", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "R.E.S.P.E.C.T.", artist: "Aretha Franklin", year: 1967 },
        { title: "B.M.F. (Blowin' Money Fast)", artist: "Rick Ross ft. Styles P", year: 2010 },
        { title: "D.A.N.C.E.", artist: "Justice", year: 2007 },
        { title: "W.A.P.", artist: "Cardi B ft. Megan Thee Stallion", year: 2020 },
      ]},
    ],
  },
  // Puzzle 45
  {
    groups: [
      { connection: "Songs from the shoegaze movement of the early 1990s", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Only Shallow", artist: "My Bloody Valentine", year: 1991 },
        { title: "When the Sun Hits", artist: "Slowdive", year: 1993 },
        { title: "Alison", artist: "Slowdive", year: 1993 },
        { title: "Vapour Trail", artist: "Ride", year: 1990 },
      ]},
      { connection: "Songs produced by Rick Rubin that revived a veteran artist's career", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Hurt", artist: "Johnny Cash", year: 2002 },
        { title: "99 Problems", artist: "Jay-Z", year: 2004 },
        { title: "Give It Away", artist: "Red Hot Chili Peppers", year: 1991 },
        { title: "Black", artist: "Dierks Bentley", year: 2016 },
      ]},
      { connection: "Songs credited as collaborations between two solo superstars under one joint project name", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Everything Is Everything", artist: "Lauryn Hill", year: 1998 },
        { title: "The Girl Is Mine", artist: "Michael Jackson & Paul McCartney", year: 1982 },
        { title: "That's What Friends Are For", artist: "Dionne Warwick & Friends", year: 1985 },
        { title: "Say Say Say", artist: "Paul McCartney & Michael Jackson", year: 1983 },
      ]},
      { connection: "Song titles that contain a punctuation mark as part of the official title", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "…Ready for It?", artist: "Taylor Swift", year: 2017 },
        { title: "& I Am Telling You I'm Not Going", artist: "Jennifer Holliday", year: 1982 },
        { title: "U + Ur Hand", artist: "Pink", year: 2006 },
        { title: "4 Minutes", artist: "Madonna ft. Justin Timberlake & Timbaland", year: 2008 },
      ]},
    ],
  },
  // Puzzle 46
  {
    groups: [
      { connection: "Essential tracks from the drum and bass genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Inner City Life", artist: "Goldie", year: 1994 },
        { title: "Brown Paper Bag", artist: "Roni Size & Reprazent", year: 1997 },
        { title: "LK (Carolina Carol Bela)", artist: "DJ Marky & XRS", year: 2002 },
        { title: "No Good (Start the Dance)", artist: "The Prodigy", year: 1994 },
      ]},
      { connection: "Songs built around a prominent cello arrangement", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Eleanor Rigby", artist: "The Beatles", year: 1966 },
        { title: "Bittersweet Symphony", artist: "The Verve", year: 1997 },
        { title: "Welcome to the Black Parade", artist: "My Chemical Romance", year: 2006 },
        { title: "Apocalypse Please", artist: "Muse", year: 2003 },
      ]},
      { connection: "Famous duets pairing a living legend with a deceased artist via studio technology", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Unforgettable", artist: "Natalie Cole & Nat King Cole", year: 1991 },
        { title: "In the Ghetto", artist: "Celine Dion & Elvis Presley", year: 2012 },
        { title: "The Gleam in the Night", artist: "Michael Bublé & Judy Garland", year: 2019 },
        { title: "Fever", artist: "Kylie Minogue & Frank Sinatra", year: 2002 },
      ]},
      { connection: "Song titles that are also types of knots or ties", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Slip", artist: "Elliot Smith", year: 1995 },
        { title: "Tangle", artist: "Crowded House", year: 1994 },
        { title: "Knots", artist: "The National", year: 2010 },
        { title: "Braid", artist: "Alanis Morissette", year: 1995 },
      ]},
    ],
  },
  // Puzzle 47
  {
    groups: [
      { connection: "Hits from the Britpop scene of the mid-1990s that weren't Oasis or Blur", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Common People", artist: "Pulp", year: 1995 },
        { title: "Alright", artist: "Supergrass", year: 1995 },
        { title: "Disco 2000", artist: "Pulp", year: 1995 },
        { title: "Animal Nitrate", artist: "Suede", year: 1993 },
      ]},
      { connection: "Songs featuring a notable guest production credit from DJ Premier", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "C.R.E.A.M.", artist: "Wu-Tang Clan", year: 1993 },
        { title: "Mass Appeal", artist: "Gang Starr", year: 1994 },
        { title: "NY State of Mind", artist: "Nas", year: 1994 },
        { title: "Moment of Truth", artist: "Gang Starr", year: 1998 },
      ]},
      { connection: "Songs that feature both a male and female lead vocal sharing verses", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Shallow", artist: "Lady Gaga & Bradley Cooper", year: 2018 },
        { title: "Don't Go Breaking My Heart", artist: "Elton John & Kiki Dee", year: 1976 },
        { title: "Up Where We Belong", artist: "Joe Cocker & Jennifer Warnes", year: 1982 },
        { title: "Somethin' Stupid", artist: "Frank Sinatra & Nancy Sinatra", year: 1967 },
      ]},
      { connection: "Song titles that are also names of currencies or units of money", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Dollar Days", artist: "David Bowie", year: 2016 },
        { title: "Nickel and Dime", artist: "Willie Nelson", year: 1982 },
        { title: "Penny Lane", artist: "The Beatles", year: 1967 },
        { title: "Dime Piece", artist: "Too $hort", year: 2006 },
      ]},
    ],
  },
  // Puzzle 48
  {
    groups: [
      { connection: "Formative tracks of the lo-fi hip-hop and chillhop genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Thinking About You", artist: "Kaytranada ft. Shay Lia", year: 2016 },
        { title: "Coffee for Your Head", artist: "Powfu ft. beabadoobee", year: 2019 },
        { title: "Breathe", artist: "Télépopmusik", year: 2002 },
        { title: "We Are Here", artist: "Oddisee", year: 2014 },
      ]},
      { connection: "Songs featuring a signature Theremin arrangement", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Good Vibrations", artist: "The Beach Boys", year: 1966 },
        { title: "Whole Lotta Love", artist: "Led Zeppelin", year: 1969 },
        { title: "Porpoise Song", artist: "The Monkees", year: 1968 },
        { title: "The Day the Earth Stood Still", artist: "Bernard Herrmann", year: 1951 },
      ]},
      { connection: "Songs that united two artists from different countries for cross-cultural duets", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "I've Had the Time of My Life", artist: "Bill Medley & Jennifer Warnes", year: 1987 },
        { title: "China Girl", artist: "David Bowie ft. Iggy Pop", year: 1983 },
        { title: "99 Luftballons", artist: "Nena", year: 1983 },
        { title: "Volare", artist: "Dean Martin", year: 1958 },
      ]},
      { connection: "Song titles that are commands telling the listener where to look", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Look at Me", artist: "XXXTentacion", year: 2016 },
        { title: "Watch Me (Whip/Nae Nae)", artist: "Silentó", year: 2015 },
        { title: "See You Again", artist: "Wiz Khalifa ft. Charlie Puth", year: 2015 },
        { title: "Look What You Made Me Do", artist: "Taylor Swift", year: 2017 },
      ]},
    ],
  },
  // Puzzle 49
  {
    groups: [
      { connection: "Key tracks of the dancehall reggae genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Murder She Wrote", artist: "Chaka Demus & Pliers", year: 1992 },
        { title: "Informer", artist: "Snow", year: 1992 },
        { title: "Shaggy", artist: "Boombastic", year: 1994 },
        { title: "Temperature", artist: "Sean Paul", year: 2005 },
      ]},
      { connection: "Songs built around a sample of James Brown's 'Funky Drummer'", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Fight the Power", artist: "Public Enemy", year: 1989 },
        { title: "Rockit", artist: "Herbie Hancock", year: 1983 },
        { title: "Straight Outta Compton", artist: "N.W.A", year: 1988 },
        { title: "Bring the Noise", artist: "Public Enemy", year: 1988 },
      ]},
      { connection: "Superstar collaborations between Elton John and another major solo artist", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Don't Let the Sun Go Down on Me", artist: "Elton John & George Michael", year: 1991 },
        { title: "Ghetto Gospel", artist: "2Pac ft. Elton John", year: 2005 },
        { title: "Are You Ready for Love", artist: "Elton John", year: 1979 },
        { title: "True Colors", artist: "Cyndi Lauper & Elton John", year: 2021 },
      ]},
      { connection: "Song titles that contain the name of a tree", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Lemon Tree", artist: "Fool's Garden", year: 1995 },
        { title: "Under the Willow", artist: "Dolly Parton", year: 1971 },
        { title: "Maple Leaves", artist: "Jens Lekman", year: 2004 },
        { title: "Tupelo Honey", artist: "Van Morrison", year: 1971 },
      ]},
    ],
  },
  // Puzzle 50
  {
    groups: [
      { connection: "Iconic tracks from the New York no wave scene", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Psycho Killer", artist: "Talking Heads", year: 1977 },
        { title: "Teenage Kicks", artist: "The Undertones", year: 1978 },
        { title: "Chinese Rocks", artist: "The Heartbreakers", year: 1977 },
        { title: "Contort Yourself", artist: "James Chance & the Contortions", year: 1979 },
      ]},
      { connection: "Songs that feature prominent vibraphone or marimba in the arrangement", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "My Girl", artist: "The Temptations", year: 1964 },
        { title: "Simmer", artist: "Jhené Aiko", year: 2020 },
        { title: "Boy with Luv", artist: "BTS ft. Halsey", year: 2019 },
        { title: "Lush Life", artist: "Zara Larsson", year: 2015 },
      ]},
      { connection: "Songs that emerged from producer-artist partnerships lasting over a decade", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Super Freak", artist: "Rick James", year: 1981 },
        { title: "Purple Rain", artist: "Prince & The Revolution", year: 1984 },
        { title: "Private Dancer", artist: "Tina Turner", year: 1984 },
        { title: "It's Raining Men", artist: "The Weather Girls", year: 1982 },
      ]},
      { connection: "Song titles that are also verbs meaning 'to shine or glow'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Gleam", artist: "Chance the Rapper", year: 2019 },
        { title: "Glitter", artist: "Mariah Carey", year: 2001 },
        { title: "Shimmer", artist: "Fuel", year: 1999 },
        { title: "Glow", artist: "Rick Ross ft. Future", year: 2017 },
      ]},
    ],
  },
  // Puzzle 51
  {
    groups: [
      { connection: "Defining songs of the Minneapolis sound or funk-rock fusion genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Let's Go Crazy", artist: "Prince & The Revolution", year: 1984 },
        { title: "When Doves Cry", artist: "Prince", year: 1984 },
        { title: "Jungle Love", artist: "The Time", year: 1984 },
        { title: "Raspberry Beret", artist: "Prince & The Revolution", year: 1985 },
      ]},
      { connection: "Songs produced by Max Martin that defined the late 1990s teen pop era", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "...Baby One More Time", artist: "Britney Spears", year: 1999 },
        { title: "I Want It That Way", artist: "Backstreet Boys", year: 1999 },
        { title: "It's Gonna Be Me", artist: "*NSYNC", year: 2000 },
        { title: "Since U Been Gone", artist: "Kelly Clarkson", year: 2004 },
      ]},
      { connection: "Songs that feature both the original artist and a hip-hop artist in the same released track", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Young, Wild & Free", artist: "Snoop Dogg & Wiz Khalifa ft. Bruno Mars", year: 2011 },
        { title: "Remember the Time", artist: "Michael Jackson", year: 1992 },
        { title: "That Power", artist: "will.i.am ft. Justin Bieber", year: 2013 },
        { title: "Lighters", artist: "Bad Meets Evil ft. Bruno Mars", year: 2011 },
      ]},
      { connection: "Song titles where the first word is also the last word", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Rock and Roll Rock", artist: "Led Zeppelin", year: 1971 },
        { title: "Love Will Keep Us Together", artist: "Captain & Tennille", year: 1975 },
        { title: "Forever and Ever, Amen", artist: "Randy Travis", year: 1987 },
        { title: "All You Need Is Love", artist: "The Beatles", year: 1967 },
      ]},
    ],
  },
  // Puzzle 52
  {
    groups: [
      { connection: "Foundational songs of the grime genre from East London", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Pow! (Forward)", artist: "Lethal Bizzle", year: 2004 },
        { title: "I Luv U", artist: "Dizzee Rascal", year: 2003 },
        { title: "Wile Out", artist: "Wiley", year: 2012 },
        { title: "Shut Up", artist: "Stormzy", year: 2015 },
      ]},
      { connection: "Songs where the bass line was played on a Moog synthesizer instead of a bass guitar", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Lucky Man", artist: "Emerson, Lake & Palmer", year: 1970 },
        { title: "Fly Like an Eagle", artist: "Steve Miller Band", year: 1976 },
        { title: "Pop Muzik", artist: "M", year: 1979 },
        { title: "Trans-Europe Express", artist: "Kraftwerk", year: 1977 },
      ]},
      { connection: "Songs that are credited collaborations between two genre-crossing legends from different continents", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Get It Together", artist: "Beastie Boys ft. Q-Tip", year: 1994 },
        { title: "You'll Never Walk Alone", artist: "Gerry & the Pacemakers", year: 1963 },
        { title: "La Isla Bonita", artist: "Madonna", year: 1987 },
        { title: "Golden Years", artist: "David Bowie", year: 1975 },
      ]},
      { connection: "Song titles that are two-syllable words where both syllables are the same", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Bye Bye", artist: "Mariah Carey", year: 2008 },
        { title: "So So", artist: "Jhené Aiko", year: 2014 },
        { title: "Mahi Mahi", artist: "Paramore", year: 2017 },
        { title: "Dum Dum", artist: "Robyn", year: 2010 },
      ]},
    ],
  },
  // Puzzle 53
  {
    groups: [
      { connection: "Landmark tracks from the twee pop or jangle pop genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "There She Goes", artist: "The La's", year: 1988 },
        { title: "Just Like Heaven", artist: "The Cure", year: 1987 },
        { title: "Love My Way", artist: "The Psychedelic Furs", year: 1982 },
        { title: "Vapour Trail", artist: "Ride", year: 1990 },
      ]},
      { connection: "Songs featuring a prominent pedal steel guitar", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Jolene", artist: "Dolly Parton", year: 1973 },
        { title: "Help Me Make It Through the Night", artist: "Kris Kristofferson", year: 1970 },
        { title: "The Maker", artist: "Daniel Lanois", year: 1989 },
        { title: "Crazy Arms", artist: "Ray Price", year: 1956 },
      ]},
      { connection: "Songs that are studio team-ups between two solo artists who never formed an official duo", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Well I Do", artist: "Rag'n'Bone Man & P!nk", year: 2019 },
        { title: "River", artist: "Eminem ft. Ed Sheeran", year: 2017 },
        { title: "I'm So Excited", artist: "Pointer Sisters", year: 1982 },
        { title: "A Bar Song (Tipsy)", artist: "Shaboozey ft. Lainey Wilson", year: 2024 },
      ]},
      { connection: "Song titles that are also names of planets in our solar system", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Venus", artist: "Shocking Blue", year: 1969 },
        { title: "Mars", artist: "Yemi Alade", year: 2019 },
        { title: "Saturn", artist: "Stevie Wonder", year: 1976 },
        { title: "Jupiter", artist: "Ayumi Hamasaki", year: 2008 },
      ]},
    ],
  },
  // Puzzle 54
  {
    groups: [
      { connection: "Key tracks from the Tropicália movement in Brazilian music", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Tropicália", artist: "Caetano Veloso", year: 1968 },
        { title: "Baby", artist: "Caetano Veloso", year: 1968 },
        { title: "Miserere Nobis", artist: "Gilberto Gil & Caetano Veloso", year: 1968 },
        { title: "Panis et Circenses", artist: "Os Mutantes", year: 1968 },
      ]},
      { connection: "Songs featuring a prominent accordion in the production", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "La Vie en Rose", artist: "Édith Piaf", year: 1946 },
        { title: "Chanson d'Amour", artist: "Manhattan Transfer", year: 1977 },
        { title: "Ya Ya", artist: "Lee Dorsey", year: 1961 },
        { title: "Pumped Up Kicks", artist: "Foster the People", year: 2010 },
      ]},
      { connection: "Songs that feature a credited guest vocalist who is primarily known as an actor", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Old MacDonald Had a Farm", artist: "Will Smith ft. La La", year: 1999 },
        { title: "The Greatest Love of All", artist: "George Benson", year: 1977 },
        { title: "Beauty School Dropout", artist: "Frankie Avalon", year: 1978 },
        { title: "Shallow", artist: "Lady Gaga & Bradley Cooper", year: 2018 },
      ]},
      { connection: "Song titles that are also common kitchen verbs or cooking instructions", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Stir It Up", artist: "Bob Marley & the Wailers", year: 1973 },
        { title: "Simmer", artist: "Jhené Aiko", year: 2020 },
        { title: "Grind", artist: "Ciara", year: 2004 },
        { title: "Whip It", artist: "Devo", year: 1980 },
      ]},
    ],
  },
  // Puzzle 55
  {
    groups: [
      { connection: "Defining tracks from the 2-step garage and speed garage era", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Flowers", artist: "Sweet Female Attitude", year: 2000 },
        { title: "What You Need", artist: "Oxide & Neutrino", year: 2001 },
        { title: "Bootleg Fireworks (The Coming)", artist: "Oxide & Neutrino", year: 2001 },
        { title: "7 Days", artist: "Craig David", year: 2000 },
      ]},
      { connection: "Songs featuring a prominent lap steel or slide guitar", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Little Martha", artist: "The Allman Brothers Band", year: 1972 },
        { title: "Slide", artist: "Goo Goo Dolls", year: 1998 },
        { title: "She Talks to Angels", artist: "The Black Crowes", year: 1991 },
        { title: "In My Time of Dying", artist: "Led Zeppelin", year: 1975 },
      ]},
      { connection: "Songs that pair a country legend with a hip-hop star in an official collaboration", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Old Town Road", artist: "Lil Nas X ft. Billy Ray Cyrus", year: 2019 },
        { title: "Fancy", artist: "Iggy Azalea ft. Charli XCX", year: 2014 },
        { title: "Big Energy", artist: "Latto", year: 2021 },
        { title: "HUMBLE.", artist: "Kendrick Lamar", year: 2017 },
      ]},
      { connection: "Song titles that are also names of card or board games", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Solitaire", artist: "Andy Williams", year: 1973 },
        { title: "Chess", artist: "Backstreet Boys", year: 2022 },
        { title: "Clue", artist: "Taylor Swift", year: 2023 },
        { title: "Dominoes", artist: "The Big Pink", year: 2009 },
      ]},
    ],
  },
  // Puzzle 56
  {
    groups: [
      { connection: "Pivotal songs from the Memphis rap scene of the early 2000s", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Stay Fly", artist: "Three 6 Mafia", year: 2005 },
        { title: "It's Hard Out Here for a Pimp", artist: "Three 6 Mafia", year: 2005 },
        { title: "Like a Pimp", artist: "David Banner ft. Lil Flip", year: 2003 },
        { title: "In da Club", artist: "50 Cent", year: 2003 },
      ]},
      { connection: "Songs featuring a prominent banjo in the recording", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Wagon Wheel", artist: "Old Crow Medicine Show", year: 2004 },
        { title: "The House of the Rising Sun", artist: "The Animals", year: 1964 },
        { title: "Man of Constant Sorrow", artist: "The Stanley Brothers", year: 1950 },
        { title: "Little Boxes", artist: "Malvina Reynolds", year: 1962 },
      ]},
      { connection: "Songs credited to unexpected pairings of a veteran icon and a newer artist", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee & Justin Bieber", year: 2017 },
        { title: "Forever Young", artist: "Jay-Z ft. Mr. Hudson", year: 2009 },
        { title: "Nothin' on You", artist: "B.o.B ft. Bruno Mars", year: 2010 },
        { title: "Love Story (Taylor's Version)", artist: "Taylor Swift", year: 2021 },
      ]},
      { connection: "Song titles that are also parts of the human face", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Lips Are Movin", artist: "Meghan Trainor", year: 2014 },
        { title: "Cheek to Cheek", artist: "Fred Astaire", year: 1935 },
        { title: "Chin Up", artist: "Lily Allen", year: 2009 },
        { title: "Brow", artist: "Yeat", year: 2022 },
      ]},
    ],
  },
  // Puzzle 57
  {
    groups: [
      { connection: "Pioneering tracks of the cloud rap subgenre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Hell", artist: "A$AP Mob ft. A$AP Rocky", year: 2012 },
        { title: "Peso", artist: "A$AP Rocky", year: 2011 },
        { title: "Gold", artist: "Spooky Black", year: 2014 },
        { title: "Shlohmo", artist: "Don't Say No", year: 2011 },
      ]},
      { connection: "Songs featuring an orchestral string section arranged by a famous non-rock arranger", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Day in the Life", artist: "The Beatles", year: 1967 },
        { title: "Golden Years", artist: "David Bowie", year: 1975 },
        { title: "Walk on the Wild Side", artist: "Lou Reed", year: 1972 },
        { title: "Nights in White Satin", artist: "The Moody Blues", year: 1967 },
      ]},
      { connection: "Songs that feature a one-time collaboration between two artists who have publicly feuded", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Eazy", artist: "The Game ft. Kanye West", year: 2022 },
        { title: "Give It to Me", artist: "Timbaland ft. Nelly Furtado & Justin Timberlake", year: 2007 },
        { title: "Party & Bullshit", artist: "The Notorious B.I.G.", year: 1993 },
        { title: "No Church in the Wild", artist: "Jay-Z & Kanye West ft. Frank Ocean", year: 2011 },
      ]},
      { connection: "Song titles that spell out a word using just the first letters of each word in the title", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", year: 1983 },
        { title: "Dance All Night", artist: "Carly Rae Jepsen", year: 2019 },
        { title: "Born in the U.S.A.", artist: "Bruce Springsteen", year: 1984 },
        { title: "Feeling Whitney", artist: "Post Malone", year: 2016 },
      ]},
    ],
  },
  // Puzzle 58
  {
    groups: [
      { connection: "Essential recordings from the Detroit techno genre", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Strings of Life", artist: "Derrick May", year: 1987 },
        { title: "Big Fun", artist: "Inner City", year: 1988 },
        { title: "Nude Photo", artist: "Rhythim Is Rhythim", year: 1987 },
        { title: "Clear", artist: "Cybotron", year: 1983 },
      ]},
      { connection: "Songs where the drum pattern was programmed on a Linn LM-1 or LinnDrum machine", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Little Red Corvette", artist: "Prince", year: 1982 },
        { title: "1999", artist: "Prince", year: 1982 },
        { title: "Thriller", artist: "Michael Jackson", year: 1982 },
        { title: "Take Me to the River", artist: "Talking Heads", year: 1978 },
      ]},
      { connection: "Songs that pair a gospel or soul legend with a secular pop or rock artist", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "You Are Not Alone", artist: "Michael Jackson", year: 1995 },
        { title: "Oh Happy Day", artist: "Edwin Hawkins Singers", year: 1969 },
        { title: "People Get Ready", artist: "Jeff Beck & Rod Stewart", year: 1985 },
        { title: "Amazing Grace", artist: "Aretha Franklin", year: 1972 },
      ]},
      { connection: "Song titles that are also words meaning 'to look at intently or stare'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Stare", artist: "Solange", year: 2019 },
        { title: "Gaze", artist: "Steve Lacy", year: 2023 },
        { title: "Watch", artist: "Travis Scott", year: 2018 },
        { title: "Leer", artist: "Calle 13", year: 2007 },
      ]},
    ],
  },
  // Puzzle 59
  {
    groups: [
      { connection: "Foundational tracks of the neo-soul genre of the late 1990s", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "On & On", artist: "Erykah Badu", year: 1997 },
        { title: "The Sweetest Thing", artist: "Lauryn Hill", year: 1997 },
        { title: "You Got Me", artist: "The Roots ft. Erykah Badu", year: 1999 },
        { title: "Brown Sugar", artist: "D'Angelo", year: 1995 },
      ]},
      { connection: "Songs featuring a prominent upright or double bass", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Walk the Line", artist: "Johnny Cash", year: 1956 },
        { title: "Rockabilly Rebel", artist: "Matchbox", year: 1979 },
        { title: "Stand by Me", artist: "Ben E. King", year: 1961 },
        { title: "Summertime Blues", artist: "Eddie Cochran", year: 1958 },
      ]},
      { connection: "Songs that are part of a widely recognized charity supergroup recording", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Do They Know It's Christmas?", artist: "Band Aid", year: 1984 },
        { title: "We Are the World", artist: "USA for Africa", year: 1985 },
        { title: "That's What Friends Are For", artist: "Dionne & Friends", year: 1985 },
        { title: "Heal the World", artist: "Michael Jackson", year: 1991 },
      ]},
      { connection: "Song titles where the title is a single letter of the alphabet", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "U", artist: "Kendrick Lamar", year: 2015 },
        { title: "V", artist: "BTS", year: 2014 },
        { title: "Q", artist: "Stormzy", year: 2024 },
        { title: "E", artist: "Kodaline", year: 2021 },
      ]},
    ],
  },
  // Puzzle 60
  {
    groups: [
      { connection: "Iconic tracks from the Madchester scene of the late 1980s", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Step On", artist: "Happy Mondays", year: 1990 },
        { title: "Fools Gold", artist: "The Stone Roses", year: 1989 },
        { title: "I Wanna Be Adored", artist: "The Stone Roses", year: 1989 },
        { title: "Hallelujah", artist: "Happy Mondays", year: 1989 },
      ]},
      { connection: "Songs famously featuring a guest guitar solo from a musician not in the original band", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Beat It", artist: "Michael Jackson", year: 1982 },
        { title: "We Are the Champions", artist: "Queen", year: 1977 },
        { title: "While My Guitar Gently Weeps", artist: "The Beatles", year: 1968 },
        { title: "Hotel California", artist: "Eagles", year: 1977 },
      ]},
      { connection: "Songs that are joint official releases between a DJ and a vocalist as equal co-billed credits", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Sweet Harmony", artist: "Beloved", year: 1993 },
        { title: "Insomnia", artist: "Faithless", year: 1995 },
        { title: "The Journey", artist: "DJ Tiësto & Antillas ft. BT", year: 2008 },
        { title: "Silence", artist: "Delerium ft. Sarah McLachlan", year: 1999 },
      ]},
      { connection: "Song titles that are also names of dances", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Tango in the Night", artist: "Fleetwood Mac", year: 1987 },
        { title: "Mambo No. 5", artist: "Lou Bega", year: 1999 },
        { title: "Jump (for My Love)", artist: "The Pointer Sisters", year: 1984 },
        { title: "Rhumba", artist: "Bobby McFerrin", year: 1988 },
      ]},
    ],
  },
  // Puzzle 61
  {
    groups: [
      { connection: "Defining tracks from the baile funk genre originating in Rio de Janeiro favelas", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Baile de Favela", artist: "MC João", year: 2016 },
        { title: "Vai Malandra", artist: "Anitta ft. MC Zaac & Maejor", year: 2017 },
        { title: "Então Vai", artist: "Anitta ft. MC Zaac", year: 2016 },
        { title: "Swish Swish", artist: "Anitta ft. Pabllo Vittar", year: 2019 },
      ]},
      { connection: "Songs featuring a prominent brass horn riff played by a non-rock session musician", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "Higher Ground", artist: "Stevie Wonder", year: 1973 },
        { title: "Land of 1000 Dances", artist: "Wilson Pickett", year: 1966 },
        { title: "Green Onions", artist: "Booker T. & the M.G.'s", year: 1962 },
        { title: "Soul Man", artist: "Sam & Dave", year: 1967 },
      ]},
      { connection: "Songs that are official collaboration tracks between two female pop superstars", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Phone", artist: "Lizzo ft. Cardi B", year: 2022 },
        { title: "Best Friend", artist: "Saweetie ft. Doja Cat", year: 2021 },
        { title: "Side to Side", artist: "Ariana Grande ft. Nicki Minaj", year: 2016 },
        { title: "Lady Marmalade", artist: "Christina Aguilera, Lil' Kim, Mýa & Pink", year: 2001 },
      ]},
      { connection: "Song titles that are also words for types of containers or vessels", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Basket Case", artist: "Green Day", year: 1994 },
        { title: "Kettle", artist: "The Wombats", year: 2011 },
        { title: "Jar of Hearts", artist: "Christina Perri", year: 2010 },
        { title: "Bucket", artist: "KMD", year: 1993 },
      ]},
    ],
  },
  // Puzzle 62
  {
    groups: [
      { connection: "Songs that launched the indie folk revival of the mid-2000s", connection_type: "genre_link", color: "yellow", difficulty: "easy", difficulty_score: 2, items: [
        { title: "Skinny Love", artist: "Bon Iver", year: 2007 },
        { title: "Flightless Bird, American Mouth", artist: "Iron & Wine", year: 2004 },
        { title: "The Wolves (Act I and II)", artist: "Bon Iver", year: 2008 },
        { title: "Naked as We Came", artist: "Iron & Wine", year: 2004 },
      ]},
      { connection: "Songs whose iconic opening riff was played on a twelve-string guitar", connection_type: "production", color: "green", difficulty: "medium", difficulty_score: 5, items: [
        { title: "A Hard Day's Night", artist: "The Beatles", year: 1964 },
        { title: "Mr. Tambourine Man", artist: "The Byrds", year: 1965 },
        { title: "Wish You Were Here", artist: "Pink Floyd", year: 1975 },
        { title: "Over the Hills and Far Away", artist: "Led Zeppelin", year: 1973 },
      ]},
      { connection: "Songs that are official team-ups between a classical musician and a pop or rock artist", connection_type: "collaboration", color: "blue", difficulty: "hard", difficulty_score: 7, items: [
        { title: "Nessun Dorma", artist: "Luciano Pavarotti & U2", year: 1993 },
        { title: "Time to Say Goodbye", artist: "Andrea Bocelli & Sarah Brightman", year: 1995 },
        { title: "The Prayer", artist: "Celine Dion & Andrea Bocelli", year: 1998 },
        { title: "Paparazzi", artist: "Lady Gaga & Elton John", year: 2010 },
      ]},
      { connection: "Song titles that are also words meaning 'to break or smash'", connection_type: "wordplay", color: "purple", difficulty: "hardest", difficulty_score: 9, items: [
        { title: "Shatter", artist: "Aimee Mann", year: 1993 },
        { title: "Smash", artist: "The Offspring", year: 1994 },
        { title: "Crack", artist: "Badly Drawn Boy", year: 2000 },
        { title: "Splinter", artist: "Sneaker Pimps", year: 1999 },
      ]},
    ],
  },
];
