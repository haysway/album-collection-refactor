import { useState } from 'react'
import NewAlbum from './components/NewAlbum'
import AlbumList from './components/AlbumList';
import './App.css'

function App() {
  //const [albums, setAlbums] = useState([]);
  // ai generated seed data, as I ain't typing all that out
  const [albums, setAlbums] = useState([
    {
        id: 1,
        name: 'Distressor',
        artist: 'Whirr',
        date: '2010-05-30',
        genres: ['Shoegaze', 'Alternative'],
        label: 'Free Whirl',
        owned: true,
        formats: ['Vinyl', 'Cassette'],
        favorite: true
    },
    {
        id: 2,
        name: 'Peripheral Vision',
        artist: 'Turnover',
        date: '2015-05-04',
        genres: ['Indie', 'Shoegaze', 'Alternative'],
        label: 'Run For Cover Records',
        owned: true,
        formats: ['Vinyl', 'CD'],
        favorite: true
    },
    {
        id: 3,
        name: 'Floral Green',
        artist: 'Title Fight',
        date: '2012-09-18',
        genres: ['Punk', 'Alternative', 'Indie'],
        label: 'SideOneDummy Records',
        owned: true,
        formats: ['Vinyl'],
        favorite: false
    },
    {
        id: 4,
        name: 'Goodness',
        artist: 'The Hotelier',
        date: '2016-05-27',
        genres: ['Indie', 'Alternative', 'Punk'],
        label: 'Tiny Engines',
        owned: true,
        formats: ['CD'],
        favorite: false
    },
    {
        id: 5,
        name: 'Hyperview',
        artist: 'Title Fight',
        date: '2015-02-03',
        genres: ['Alternative', 'Indie', 'Shoegaze'],
        label: 'SideOneDummy Records',
        owned: false,
        formats: [],
        favorite: true
    },
    {
        id: 6,
        name: 'The Greatest Generation',
        artist: 'The Wonder Years',
        date: '2013-05-14',
        genres: ['Punk', 'Indie'],
        label: 'Hopeless Records',
        owned: true,
        formats: ['Vinyl', 'CD'],
        favorite: false
    },
    {
        id: 7,
        name: 'The Novel Ideas',
        artist: 'The Novel Ideas',
        date: '2012-01-01',
        genres: ['Indie', 'Folk'],
        label: 'Self-Released',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 8,
        name: 'Feast of Love',
        artist: 'Pity Sex',
        date: '2013-07-23',
        genres: ['Shoegaze', 'Indie', 'Punk'],
        label: 'Run For Cover Records',
        owned: false,
        formats: [],
        favorite: true
    },
    {
        id: 9,
        name: 'Moving Away',
        artist: 'Gleemer',
        date: '2018-01-01',
        genres: ['Shoegaze', 'Alternative', 'Indie'],
        label: 'Other People Records',
        owned: false,
        formats: [],
        favorite: true
    },
    {
        id: 10,
        name: 'Self Help',
        artist: 'Future Teens',
        date: '2017-10-13',
        genres: ['Indie', 'Emo', 'Pop Punk'],
        label: 'Epitaph Records',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 11,
        name: "There's a Whole World Out There",
        artist: 'Arms Length',
        date: '2022-01-01',
        genres: ['Emo', 'Indie', 'Punk'],
        label: 'Wax Bodega',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 12,
        name: "We Don't Have Each Other",
        artist: 'Aaron West and the Roaring Twenties',
        date: '2014-07-08',
        genres: ['Indie', 'Emo', 'Punk'],
        label: 'Hopeless Records',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 13,
        name: 'Easier Said Than Done',
        artist: 'Pool Kids',
        date: '2018-07-20',
        genres: ['Indie', 'Emo', 'Math Rock'],
        label: 'Triple Crown Records',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 14,
        name: 'Mourning Star',
        artist: 'Rehash',
        date: '2023-01-01',
        genres: ['Shoegaze', 'Alternative', 'Indie'],
        label: 'Self-Released',
        owned: false,
        formats: [],
        favorite: true
    },
    {
        id: 15,
        name: 'Schmaltz',
        artist: 'Spanish Love Songs',
        date: '2018-03-30',
        genres: ['Punk', 'Indie', 'Emo'],
        label: 'Pure Noise Records',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 16,
        name: 'The Upsides',
        artist: 'The Wonder Years',
        date: '2010-06-15',
        genres: ['Punk', 'Pop Punk', 'Indie'],
        label: 'No Sleep Records',
        owned: false,
        formats: [],
        favorite: false
    },
    {
        id: 17,
        name: 'Better Luck Next Time',
        artist: "World's Greatest Dad",
        date: '2020-01-01',
        genres: ['Indie', 'Emo', 'Alternative'],
        label: 'Self-Released',
        owned: false,
        formats: [],
        favorite: false
    }
  ]);

  const [artistFilter, setArtistFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('All');
  const [ownedFilter, setOwnedFilter] = useState(false);
  const [formatFilter, setFormatFilter] = useState('All');
  const [favoriteFilter, setFavoriteFilter] = useState(false);

  const filteredAlbums = albums.filter((album) => {
    if (artistFilter && !album.artist.toLowerCase().includes(artistFilter.toLowerCase()))
      return false;

    if (genreFilter !== 'All' && !album.genres.includes(genreFilter))
      return false;

    if (ownedFilter && !album.owned)
      return false;
    
    if (formatFilter !== 'All' && !album.formats.includes(formatFilter))
      return false;

    if (favoriteFilter && !album.favorite)
      return false;

    return true;
  })

  const addAlbumHandler = (album) => {
    setAlbums((prevAlbums) => [album, ...prevAlbums]);
  }

  const deleteAlbumHandler = (id) => {
    setAlbums((prevAlbums) =>
      prevAlbums.filter((album) => album.id !== id)
    );
  };

  const favoriteAlbumHandler = (id) => {
    setAlbums((prevAlbums) =>
        prevAlbums.map((album) =>
            album.id === id
              ? { ...album, favorite: !album.favorite }
              : album
        )
    );
  };

  return (
    <div>
      <h1>Album Collection</h1>

      <NewAlbum onAddAlbum={addAlbumHandler}/>
      <AlbumList
        items={filteredAlbums}
        artistFilter={artistFilter}
        onArtistChange={setArtistFilter}
        genreFilter={genreFilter}
        onGenreChange={setGenreFilter}
        ownedFilter={ownedFilter}
        onOwnedChange={setOwnedFilter}
        formatFilter={formatFilter}
        onFormatChange={setFormatFilter}
        favoriteFilter={favoriteFilter}
        onFavoriteChange={setFavoriteFilter}
        onDeleteAlbum={deleteAlbumHandler}
        onFavoriteAlbum={favoriteAlbumHandler}
      />

    </div>
  )
}

export default App;
