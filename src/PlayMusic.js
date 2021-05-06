
const PlayMusic=(props)=>{
    const {musicName}=props;
    return(
        <div className="play-song">

            <h1 className="play-song-title">Music!!</h1>

            <p className="play-song-name">
                {musicName}
            </p>

        </div>
    );
}

export default PlayMusic;