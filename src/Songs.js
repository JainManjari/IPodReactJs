
const Songs=(props)=>{
    const {songs,currentSongsListInd}=props;
    return(
        <div className="songs-screen">

            <h1 className="songs-title">Songs</h1>

            <div className="songs-list">

                {songs.map((item,index)=>{
                    return (
                        <li className={currentSongsListInd===index ? "songs-highlight":""} 
                           key={index}>
                            {item}
                        </li>
                    );
                })}

            </div>

        </div>
    );
}

export default Songs;