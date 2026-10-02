import AlbumForm from './AlbumForm';

function NewAlbum(props) {
    const saveAlbumHandler = (enteredAlbum) => {
        const album = {
            ...enteredAlbum,
            id: Math.random().toString()
        };

        props.onAddAlbum(album);
    };

    return (
        <div>
            <AlbumForm onAddAlbum={saveAlbumHandler}/>
        </div>
    );
}

export default NewAlbum;