import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';

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
      selected:0,
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
        this.setState({
          menuDisplay:true
        });
    }
    else
    {
      $(".small-screen").removeClass('menuToggle');
      this.setState({
        menuDisplay:false
      });
    }
  }


  render()
  {
    const {general_menu,selected}=this.state;
    return (
      <div className="App">
          <div className="I-Pod">
              <div className="screen">

                <div className="small-screen">
                    <span className="title">MadJerry's IPod!</span> 
                    
                    <div className="list-items">

                        {general_menu.map((item,index)=>{
                            return (
                            <button 
                            className={selected===index ? 'selected' : ''} 
                            key={index}>
                              {item}
                            </button>); 
                        })}

                    </div>

                </div>
  
              </div>
              <div className="button-set">
                  <button className="button-set-text menu" onClick={this.menuClicked}>Menu</button>
                  <button className="button-set-text forward"> <i className="fas fa-forward"></i> </button>
                  <button className="button-set-text backward"><i className="fas fa-backward"></i></button>
                  <button className="inner-circle">

                  </button>
                  <button className="button-set-text play"><i className="fas fa-play"></i><i className="fas fa-pause"></i></button>
  
              </div>
          </div>
      </div>
    );
  }
}

export default App;
