function AlbumFilter(props) {
    const genres = [
        'All',
        'Rock',
        'Alternative',
        'Shoegaze',
        'Indie',
        'Punk',
        'Metal',
        'Pop',
        'Jazz',
        'Hip-Hop'
    ];

    const mediaFormats = [
        'All',
        'Vinyl',
        'CD',
        'Cassette'
    ];

    return (
        <div className="album-filter">
            <label>
                Artist:
                <input
                    type="text"
                    value={props.artistFilter}
                    onChange={(e) => props.onArtistChange(e.target.value)}
                />
            </label>

            <label>
                Genre:
                <select
                    value={props.genreFilter}
                    onChange={(e) => props.onGenreChange(e.target.value)}
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Owned:
                <input
                    type="checkbox"
                    checked={props.ownedFilter}
                    onChange={(e) => props.onOwnedChange(e.target.checked)}
                />
            </label>

            <label>
                Format:
                <select
                    value={props.formatFilter}
                    onChange={(e) => props.onFormatChange(e.target.value)}
                >
                    {mediaFormats.map((format) => (
                        <option key={format} value={format}>
                            {format}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Favorited:
                <input
                    type="checkbox"
                    checked={props.favoriteFilter}
                    onChange={(e) => props.onFavoriteChange(e.target.checked)}
                />
            </label>
        </div>
    );
}

export default AlbumFilter;