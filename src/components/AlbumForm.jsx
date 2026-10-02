import { useState, useReducer, useEffect } from 'react';
import ErrorModal from './ErrorModal';

const initialFormState = {
    name: '',
    artist: '',
    date: '',
    genres: [],
    label: '',
    owned: false,
    formats: []
}

// this reducer is especially useful for the relationship between owned and formats,
// but I consolidated the whole form into the reducer for simplicity
function formReducer(state, action) {
    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.value
            };
        case 'SET_ARTIST':
            return {
                ...state,
                artist: action.value
            };
        case 'SET_DATE':
            return {
                ...state,
                date: action.value
            };
        case 'SET_GENRES':
            return {
                ...state,
                genres: action.value
            };
        case 'SET_LABEL':
            return {
                ...state,
                label: action.value
            };
        case 'SET_OWNED':
            return {
                ...state,
                owned: action.value,
                formats: action.value ? state.formats : []
            };
        case 'SET_FORMATS':
            return {
                ...state,
                formats: action.value
            };
        case 'RESET':
            return initialFormState;
        
        default:
            return state;
    }
}

function AlbumForm(props) {
    // album name
    // artist name
    // release date
    // genres (multi select?)
    // record label
    // owned selector (yes/no)
    // if yes, which format (vinyl, cd, cassette)

    const [formState, dispatch] = useReducer(formReducer, initialFormState);
    const [error, setError] = useState('');

    // local storage seemed interesting, and it is used in my capstone group project, so I researched it
    // after 2 seconds of no changes, it writes the latest formState to localStorage
    useEffect(() => {
        const timerId = setTimeout(() => {
            localStorage.setItem('albumForm', JSON.stringify(formState));
        }, 2000);

        return () => {
            clearTimeout(timerId);
        }
    }, [formState]);

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
            formState.name.trim() === '' ||
            formState.artist.trim() === '' ||
            formState.date === '' ||
            formState.genres.length === 0 ||
            formState.label.trim() === ''
        ) {
            setError({
                title: 'Missing fields',
                message: 'Please fill out all required fields.'
            });
            return;
        }
        
        // check for missing format selection if owned is true
        if (formState.owned && formState.formats.length === 0) {
            setError({
                title: 'No format',
                message: 'Please select at least one format for an owned album.'
            });
            return;
        }

        setError(null);

        const albumData = {
            name: formState.name,
            artist: formState.artist,
            date: formState.date,
            genres: formState.genres,
            label: formState.label,
            owned: formState.owned,
            formats: formState.formats
        };

        props.onAddAlbum(albumData);

        dispatch({ type: 'RESET' });
    };

    return (
        <>
            {error && (
                <ErrorModal 
                    title={error.title}
                    message={error.message}
                    onConfirm={() => setError(null)}
                />
            )}
            <form className="card" onSubmit={submitHandler}>
                <div className="form-control">
                    <label>Name:</label>

                    <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => 
                            dispatch({
                                type: 'SET_NAME',
                                value: e.target.value
                            })
                        }
                    />
                </div>


                <div className="form-control">
                    <label>Artist:</label>

                    <input
                        type="text"
                        value={formState.artist}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_ARTIST',
                                value: e.target.value
                            })
                        }
                    />
                </div>

                <div className="form-control">
                    <label>Release Date:</label>   

                    <input
                        type="date"
                        value={formState.date}
                        onChange={(e) => 
                            dispatch({
                                type: 'SET_DATE',
                                value: e.target.value
                            })
                        }
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
                                checked={formState.genres.includes(genre)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        dispatch({
                                            type: 'SET_GENRES',
                                            value: [...formState.genres, genre]
                                        })
                                    } else {
                                        dispatch({
                                            type: 'SET_GENRES',
                                            value: formState.genres.filter((g) => g !== genre)
                                        })
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
                        value={formState.label}
                        onChange={(e) =>
                            dispatch({
                                type: 'SET_LABEL',
                                value: e.target.value
                            })
                        }
                    />              
                </div>


                <div className="form-control">
                    <label>Owned:</label>

                    <label>
                        <input type="radio" name="owned" value="yes" checked={formState.owned === true}
                            onChange={() =>
                                dispatch({
                                    type: 'SET_OWNED',
                                    value: true
                                })
                            }  
                        />
                        Yes 
                    </label>   

                    <label>
                        <input type="radio" name="owned" value="no" checked={formState.owned === false}
                            onChange={() =>
                                dispatch({
                                    type: 'SET_OWNED',
                                    value: false
                                })
                            }  
                        />
                        No   
                    </label>    
                </div>

                {formState.owned && (
                    <div className="form-control">
                        <label>Format:</label>
                        
                        {mediaFormats.map((format) => (
                            <label key={format}>
                                <input
                                    type="checkbox"
                                    value={format}
                                    checked={formState.formats.includes(format)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch({
                                                type: 'SET_FORMATS',
                                                value: [...formState.formats, format]
                                            });
                                        } else {
                                            dispatch({
                                                type: 'SET_FORMATS',
                                                value: formState.formats.filter((m) => m !== format)
                                            });
                                        }
                                    }}
                                />
                                {format}
                            </label>
                        ))}           
                    </div>
                )}

                <button type="submit">Add Album</button>
            </form>
        </>
    );
}

export default AlbumForm;