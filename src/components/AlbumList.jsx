import AlbumCard from "./AlbumCard";
import AlbumFilter from "./AlbumFilter";

function AlbumList(props) {
    return (
        <div className="card">
            <h2>Albums</h2>

            <AlbumFilter
                artistFilter={props.artistFilter}
                onArtistChange={props.onArtistChange}
                genreFilter={props.genreFilter}
                onGenreChange={props.onGenreChange}
                ownedFilter={props.ownedFilter}
                onOwnedChange={props.onOwnedChange}
                formatFilter={props.formatFilter}
                onFormatChange={props.onFormatChange}
                favoriteFilter={props.favoriteFilter}
                onFavoriteChange={props.onFavoriteChange}
            />

            {
                props.items.length === 0 ? (
                    <p>No albums entered</p>
                ) : (
                    props.items.map((album) => (
                        <AlbumCard
                            key={album.id}
                            id={album.id}
                            name={album.name}
                            artist={album.artist}
                            date={album.date}
                            genres={album.genres}
                            label={album.label}
                            owned={album.owned}
                            formats={album.formats}
                            favorite={album.favorite}
                            onDelete={props.onDeleteAlbum}
                            onFavorite={props.onFavoriteAlbum}
                        />
                    ))
                )
            }
        </div>
    );
}

export default AlbumList;