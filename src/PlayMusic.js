import React from 'react';


class PlayMusic extends React.Component{
    
    componentDidMount()
    {
        //this.props.currentPlayingMusic();
    }

    componentWillUnmount()
    {
        //this.props.currentPlayingMusic();
    }

    render(){
        const {musicName,musicURL}=this.props;

        return(
        
        <div className="play-song">

            <h1 className="play-song-title">Music!!</h1>

            <p className="play-song-name">
                {musicName}
            </p>
            
            <audio controls="seeking" src={musicURL} id="audio"
              type="audio/mpeg">
              
            </audio>

        </div>)
    }
}

export default PlayMusic;