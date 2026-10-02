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
        <>
            <AlbumForm onAddAlbum={saveAlbumHandler}/>
        </>
    );
}

export default NewAlbum;