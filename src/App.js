import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';
import Games from './Games';
import Music from './Music';
import Settings from './Settings';
import Coverflow from './Coverflow';
import Songs from './Songs';

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
      sub_menu:['All Songs','Artists','Covers'],
      selected:0,
      showPage:-1,
      musicOptionSelected:false,
      subMenuSelection:false,
      current_music_select:0,
      songs:["Little Mix : Black Magic",
             "Demi Lovato : This is Me",
             "Miley Cyrus : The Climb",
             "Good Girls",
             "Rachel Flatten : Fight Song"],
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
    if(document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle'))
    {
        $(".small-screen").removeClass('menuToggle');
        $(".small-screen").addClass('menuToggle2');
        $(".small-screen").css({"left":-0.5});
        const {selected,options,sub_menu,musicOptionSelected}=this.state;
        if(options.length===4)
        {
            if(selected!==1)
            {
              this.setState({
                showPage:selected,
                musicOptionSelected:false
              });
            }
            else
            {
              this.setState({
                selected:0,
                options:sub_menu,
                showPage:-1,
                musicOptionSelected:true,
                current_music_select:0
              })
            }
        }
        else
        {
          
          if(musicOptionSelected)
          {
            
            this.setState({
              showPage:selected,
              subMenuSelection:true,
              current_music_select:0
            })
            
          }
        }
    }
    this.menuClicked();
  }

  homeClicked = () => {
      this.setState({
        options:this.state.general_menu,
        showPage:-1,
        selected:0,
        musicOptionSelected:false,
        current_music_select:0
      })
  }


  leftClicked = () =>
  {
     const {musicOptionSelected,
      subMenuSelection,
      options,
      current_music_select,
      songs}=this.state;

     if(document.getElementsByClassName('small-screen')[0].classList.contains('menuToggle'))
     {
          if(musicOptionSelected && !subMenuSelection)
          {
              this.setState({
              options:this.state.general_menu,
              selected:0,
              musicOptionSelected:false,
              current_music_select:0
              })
          }
          else if(musicOptionSelected && subMenuSelection)
          {
              this.setState({
                subMenuSelection:false,
                showPage:-1,
                selected:0,
                musicOptionSelected:false,
                options:this.state.general_menu,
                current_music_select:0
              })
            
          }
      }
      if(options.length===3 && subMenuSelection)
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
          subMenuSelection,
          songs,
          current_music_select}=this.state;

    if(options.length===3 && subMenuSelection)
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


  render()
  {
    const {options,
           selected,
           showPage,
           musicOptionSelected,
           subMenuSelection,
           songs,
           current_music_select}=this.state;
    
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
                {musicOptionSelected && !subMenuSelection && <Music/>}
                {options.length===4 && showPage===2 && <Settings/>}
                {options.length===4 && showPage===3 && <Coverflow/>}

                {options.length===3 && showPage===0 && <Songs songs={songs} currentSongsListInd={current_music_select}/>}
  
              </div>




              <div className="button-set">
                  <button className="button-set-text menu" onClick={this.menuClicked}>Menu</button>
                  <button className={subMenuSelection ? "button-set-text forward spkl" : "button-set-text forward"}
                   onClick={this.rightClick}
                  > 
                      <i className="fas fa-forward"></i> 
                  </button>
                  <button className={subMenuSelection ? "button-set-text backward spkl" : "button-set-text backward"}
                  onClick={this.leftClicked}
                  >
                    <i className="fas fa-backward"></i>
                  </button>
                  <button className="inner-circle" onClick={this.selectedClickedButton}>

                  </button>
                  <button className="button-set-text play"><i className="fas fa-play"></i><i className="fas fa-pause"></i></button>
  
              </div>
          </div>
      </div>
    );
  }
}

export default App;
