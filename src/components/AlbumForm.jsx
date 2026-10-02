import { useState } from 'react';

function AlbumForm(props) {
    // album name
    // artist name
    // release date
    // genres (multi select?)
    // record label
    // owned selector (yes/no)
    // if yes, which format (vinyl, cd, cassette)

    // I had to research to see if a list can be used here
    const [enteredName, setEnteredName] = useState('');
    const [enteredArtist, setEnteredArtist] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredGenres, setEnteredGenres] = useState([]);
    const [enteredLabel, setEnteredLabel] = useState('');
    const [enteredOwned, setEnteredOwned] = useState(false);
    const [enteredFormat, setEnteredFormat] = useState([]);

    const [error, setError] = useState('');

    const genres = [
        'Rock',
        'Alternative',
        'Shoegaze',
        'Indie',
        'Punk',
        'Metal',
        'Pop',
        'Jazz',
        'Hip-Hop',
    ];

    const mediaFormats = [
        'Vinyl',
        'CD',
        'Cassette',
    ];

    const submitHandler = (event) => {
        event.preventDefault();
        
        // check for standard error
        if (
            enteredName.trim() === '' ||
            enteredArtist.trim() === '' ||
            enteredDate === '' ||
            enteredGenres.length === 0 ||
            enteredLabel.trim() === ''
        ) {
            setError('Please fill out all required fields.');
            return;
        }
        
        // check for missing format selection if owned is true
        if (enteredOwned && enteredFormat.length === 0) {
            setError('Please select at least one format for an owned album.');
            return;
        }

        setError('');

        const albumData = {
            name: enteredName,
            artist: enteredArtist,
            date: enteredDate,
            genres: enteredGenres,
            label: enteredLabel,
            owned: enteredOwned,
            formats: enteredFormat
        };

        props.onAddAlbum(albumData);

        setEnteredName('');
        setEnteredArtist('');
        setEnteredDate('');
        setEnteredGenres([]);
        setEnteredLabel('');
        setEnteredOwned(false);
        setEnteredFormat([]);
    };

    return (
        <form className="card" onSubmit={submitHandler}>
            <div className="form-control">
                <label>Name:</label>

                <input
                    type="text"
                    value={enteredName}
                    onChange={(e) => setEnteredName(e.target.value)}
                />
            </div>


            <div className="form-control">
                <label>Artist:</label>

                <input
                    type="text"
                    value={enteredArtist}
                    onChange={(e) => setEnteredArtist(e.target.value)}
                />
            </div>

            <div className="form-control">
                <label>Release Date:</label>   

                <input
                    type="date"
                    value={enteredDate}
                    onChange={(e) => setEnteredDate(e.target.value)}
                />
            </div>

            <div className="form-control">
                <label>Genres:</label>

                {/* I researched a bit on how checkboxes work, as the last time
                I used them was in C#*/}
                {genres.map((genre) => (
                    <label key={genre}>
                        <input
                            type="checkbox"
                            value={genre}
                            checked={enteredGenres.includes(genre)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setEnteredGenres([...enteredGenres, genre]);
                                } else {
                                    setEnteredGenres(
                                        enteredGenres.filter((g) => g !== genre)
                                    );
                                }
                            }}  
                        />
                        {genre}
                    </label>
                ))}
            </div>


            <div className="form-control">
                <label>Record Label:</label>  

                <input
                    type="text"
                    value={enteredLabel}
                    onChange={(e) => setEnteredLabel(e.target.value)}
                />              
            </div>


            <div className="form-control">
                <label>Owned:</label>

                <label>
                    <input type="radio" name="owned" value="yes" checked={enteredOwned === true}
                        onChange={(e) => setEnteredOwned(true)}  
                    />
                    Yes 
                </label>   

                <label>
                    <input type="radio" name="owned" value="no" checked={enteredOwned === false}
                        onChange={(e) => {
                            setEnteredOwned(false);
                            setEnteredFormat([]);
                        }}  
                    />
                    No   
                </label>    
            </div>

            {enteredOwned && (
                <div className="form-control">
                    <label>Format:</label>
                    
                    {mediaFormats.map((format) => (
                        <label key={format}>
                            <input
                                type="checkbox"
                                value={format}
                                checked={enteredFormat.includes(format)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setEnteredFormat([...enteredFormat, format]);
                                    } else {
                                        setEnteredFormat(
                                            enteredFormat.filter((m) => m !== format)
                                        );
                                    }
                                }}
                            />
                            {format}
                        </label>
                    ))}           
                </div>
            )}

            {error && <p className="form-error">{error}</p>}

            <button type="submit">Add Album</button>
        </form>
    );
}

export default AlbumForm;