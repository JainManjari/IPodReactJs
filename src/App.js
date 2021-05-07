import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';
import Games from './Games';
import Music from './Music';
import Settings from './Settings';
import Coverflow from './Coverflow';
import Songs from './Songs';
import PlayMusic from './PlayMusic';
import Artists from './Artists';
import Covers from './Covers';

class App extends React.Component {

  constructor()
  {
    super();
    this.temp_change_in_angle=0;
    this.temp_selected=0;
    this.state={
      menuDisplay:false,
      options:['Games','Music','Settings','Coverflow'],
      general_menu:['Games','Music','Settings','Coverflow'],
      sub_menu:['All Songs','Artists','Cover'],
      selected:0,
      showPage:-1,
      musicOptionSelected:false,
      allSongsSelection:false,
      current_music_select:0,
      songs:["Little Mix : Black Magic",
             "Demi Lovato : This is Me",
             "Miley Cyrus : The Climb",
             "Good Girls",
             "Rachel Flatten : Fight Song"],
      songs_url:["https://docs.google.com/uc?export=download&id=16F3VfAqt5x1WvKmRXcHyRraYk4rcn1Wy",
                 "https://docs.google.com/uc?export=download&id=11KDGUP4tshk9wuMyoiKylwMBvhRfVWCV",
                 "https://docs.google.com/uc?export=download&id=17-kJik5nAKXeCntBeyhKGmYnO_4GHzRD",
                 "https://docs.google.com/uc?export=download&id=1NBZcWrxCfGCPMc46rGM0QI0kkNOq88LK",
                 "https://docs.google.com/uc?export=download&id=1Ux29vmppjUEUmeXgnnmj5HxWf0EH112S"],
      onPlayMusicPage:false,
      song_index:-1,
      current_playing_music:false,
      sub_menu_selection:false
    }
  }
  
  componentDidMount()
  {
      var zt = new ZingTouch.Region(document.getElementsByClassName('button-set')[0]);
      zt.bind(document.getElementsByClassName('button-set')[0], 'rotate', (event) =>
      {
          if (document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle'))//this rotating facility will only be available when the side bar is shown to the user.
          {
              let dist = event.detail.distanceFromLast;
              this.temp_change_in_angle += dist;
              if (this.temp_change_in_angle > 60)
              {
                  this.temp_selected++;
                  this.temp_selected = this.temp_selected % this.state.options.length;
                  this.setState({
                      selected: this.temp_selected,
                  });

                  this.temp_change_in_angle = 0;
              }
              else if (this.temp_change_in_angle < -60)
              {
                  this.temp_selected--;
                  if (this.temp_selected === -1)
                      this.temp_selected = this.state.options.length-1;

                  this.temp_selected = this.temp_selected % this.state.options.length;
                  this.setState({
                      selected: this.temp_selected,
                  });
                  this.temp_change_in_angle = 0;
              }
          }

      });

      
  }

  menuClicked=()=>{
    const {menuDisplay}=this.state;
    if(!menuDisplay)
    {
      $(".small-screen").addClass('menuToggle');
      $(".small-screen").removeClass('menuToggle2');
      $(".small-screen").css({"left":-145});
      this.setState({
          menuDisplay:true
      });
    }
    else
    {
      $(".small-screen").removeClass('menuToggle');
      $(".small-screen").addClass('menuToggle2');
      $(".small-screen").css({"left":-0.5});
      this.setState({
        menuDisplay:false
      });
    }
  }

  selectedClickedButton = () => {
    const {selected,
      options,
      allSongsSelection,
      sub_menu,
      musicOptionSelected,
      current_music_select}=this.state;
    if(document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle'))
    {
        if(options.length===4)
        {
            if(selected!==1)
            {
              this.setState({
                showPage:selected,
                musicOptionSelected:false,
                onPlayMusicPage:false,
                song_index:-1,
                sub_menu_selection:false,
                current_playing_music:false
              });
            }
            else
            {
              this.setState({
                selected:0,
                options:sub_menu,
                showPage:-1,
                musicOptionSelected:true,
                current_music_select:0,
                onPlayMusicPage:false,
                song_index:-1,
                sub_menu_selection:false,
                current_playing_music:false
              })
            }
        }
        else if(options.length===3 && musicOptionSelected)
        {
          if(selected===0)
          {
            this.setState({
              showPage:selected,
              allSongsSelection:true,
              current_music_select:0,
              onPlayMusicPage:false,
              song_index:-1,
              sub_menu_selection:true,
              current_playing_music:false
            })
          }
          else
          {
            this.setState({
              showPage:selected,
              allSongsSelection:false,
              current_music_select:0,
              onPlayMusicPage:false,
              song_index:-1,
              sub_menu_selection:true,
              current_playing_music:false
            })
          }
          
        }
        
    }
    else if(options.length===3 && musicOptionSelected && allSongsSelection)
    {
          
            this.setState({
                onPlayMusicPage:true,
                song_index:current_music_select,
                current_playing_music:false
            })
          
      }
  }

  homeClicked = () => {
      this.setState({
        options:this.state.general_menu,
        showPage:-1,
        selected:0,
        musicOptionSelected:false,
        current_music_select:0,
        onPlayMusicPage:false,
        song_index:-1,
        allSongsSelection:false,
        sub_menu_selection:false,
        current_playing_music:false
      })
  }


  leftClicked = () =>
  {
     const {musicOptionSelected,
      //sub_menu_selection,
      allSongsSelection,
      options,
      current_music_select,
      //onPlayMusicPage,
      songs}=this.state;

     if(document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle'))
     {
          
          if(musicOptionSelected)
          {
              this.setState({
                options:this.state.general_menu,
                showPage:-1,
                selected:0,
                musicOptionSelected:false,
                current_music_select:0,
                onPlayMusicPage:false,
                song_index:-1,
                allSongsSelection:false,
                sub_menu_selection:false,
                current_playing_music:false
              })
            
          }
      }
      // if(onPlayMusicPage)
      // {
      //         console.log("on play music")
      //         this.setState({
      //           options:this.state.general_menu,
      //           showPage:-1,
      //           selected:0,
      //           musicOptionSelected:false,
      //           current_music_select:0,
      //           onPlayMusicPage:false,
      //           song_index:-1,
      //           allSongsSelection:false,
      //           sub_menu_selection:false
      //         })
      // }
      else if(musicOptionSelected && options.length===3 && allSongsSelection)
      {
        if(current_music_select===0)
        {
           this.setState({
             current_music_select:songs.length-1,
           });
        }
        else
        {
            this.setState({
              current_music_select:current_music_select-1
            })
        }
        
      }
  }


  rightClick = () => {
    const {options,
          allSongsSelection,
          songs,
          current_music_select}=this.state;

    if(options.length===3 && allSongsSelection && !document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle'))
    {
        if(current_music_select===songs.length-1)
        {
           this.setState({
             current_music_select:0
           })
        }
        else
        {
          this.setState({
            current_music_select:current_music_select+1
          })
        }
    }
  }
  

  currentPlayingMusic = () => {
      
      const {current_playing_music} = this.state;

      if(current_playing_music)
      {
        $("#buttonSets").addClass('multicolor');

        this.setState({
          current_playing_music:false
        });
      }
      else
      {
        $("#buttonSets").removeClass('multicolor');

        this.setState({
          current_playing_music:true
        })
      }
  }


  playPauseClick = () => {

    const {song_index,onPlayMusicPage}=this.state;

    if(song_index!==-1 && onPlayMusicPage)
    {
        if($("#audio")[0].paused)
        {
            $("#buttonSets").addClass('multicolor');
            $("#audio")[0].play();

            this.setState({
              current_playing_music:true
            })
        }
        else
        {
          $("#buttonSets").removeClass('multicolor');
          $("#audio")[0].pause();

          this.setState({
            current_playing_music:false
          })
        }
    }
    
  }


  render()
  {
    const {options,
           selected,
           showPage,
           musicOptionSelected,
           allSongsSelection,
           songs,
           current_music_select,
           onPlayMusicPage,
           song_index,
           songs_url,
           current_playing_music,
           sub_menu_selection
          }=this.state;
    
    const music_name=songs[song_index];
    const music_url=songs_url[song_index];

    return (
      <div className="App">
          <div className="I-Pod">
              <div className="screen">
                <button className="home-button" onClick={this.homeClicked}>
                   <i className="fas fa-home"></i>
                </button>
                <div className="small-screen">
                    <span className="title">MadJerry's IPod!</span> 
                    
                    <div className="list-items">

                        {options.map((item,index)=>{
                            return (
                            <button 
                            className={selected===index ? 'selected' : ''} 
                            key={index}>
                              {item}
                            </button>); 
                        })}

                    </div>

                    {
                      (options.length===3) && 
                      <div className="instruct">
                         Press <q>
                                <i className="fas fa-backward"></i>
                              </q> 
                         to go to previous menu! 
                       </div>
                      
                    }
                </div>
                
                
                
                {options.length===4 && showPage===0 && <Games/>}
                {musicOptionSelected && !sub_menu_selection && <Music/>}
                {options.length===4 && showPage===2 && <Settings/>}
                {options.length===4 && showPage===3 && <Coverflow/>}

                {!onPlayMusicPage && options.length===3 && showPage===0 && <Songs songs={songs} currentSongsListInd={current_music_select}/>}

                {!onPlayMusicPage && options.length===3 && showPage===1 && <Artists/>}
                {!onPlayMusicPage && options.length===3 && showPage===2 && <Covers/>}

                {onPlayMusicPage && musicOptionSelected && allSongsSelection && <PlayMusic musicName={music_name} musicURL={music_url} currentPlayingMusic={this.currentPlayingMusic}/>}
  
              </div>




              <div className={onPlayMusicPage && current_playing_music ? "button-set multicolor" : "button-set"} id="buttonSets">
                  <button className="button-set-text menu" onClick={this.menuClicked}>Menu</button>
                  <button className={allSongsSelection && !onPlayMusicPage && !document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle') ? "button-set-text forward spkl1" : "button-set-text forward"}
                   onClick={this.rightClick}
                  > 
                      <i className="fas fa-forward"></i> 
                  </button>
                  <button className={allSongsSelection && !onPlayMusicPage && !document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle') ? "button-set-text backward spkl1" : "button-set-text backward"}
                  onClick={this.leftClicked}
                  >
                     <i className="fas fa-backward"></i>
                  </button>
                  <button className="inner-circle" onClick={this.selectedClickedButton}>

                  </button>
                  <button className={onPlayMusicPage ? "button-set-text play spkl1" : "button-set-text play"} onClick={this.playPauseClick}>
                    <i className="fas fa-play"></i>
                    <i className="fas fa-pause"></i>
                  </button>
  
              </div>
          </div>
      </div>
    );
  }
}

export default App;
