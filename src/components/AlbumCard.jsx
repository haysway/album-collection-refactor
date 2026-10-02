function AlbumCard(props) {
    return(
        <div className="card album-card"
        onClick={() => props.onDelete(props.id)}
        >
            <h3>{props.name}</h3>
            <p>Artist: {props.artist}</p>
            <p>Release Date: {props.date}</p>
            <p>Genres: {props.genres.join(', ')}</p>
            <p>Record Label: {props.label}</p>
            <p>Owned: {props.owned ? 'Yes' : 'No'}</p>
            {props.owned && (
                <p>Formats: {props.formats.join(', ')}</p>
            )}

            New
            <button onClick={(e) => {
                // I had to research to find out how to not also delete
                // the album by clicking on the favorite button
                // stop propogation prevents the click from reaching the card
                 e.stopPropagation();
                 props.onFavorite(props.id)}}>
                {props.favorite ? '★ Favorited' : '☆ Favorite'}
            </button>
        </div>
    );
}

export default AlbumCard;