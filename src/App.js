import React from 'react';
import ZingTouch from 'zingtouch';
import $ from 'jquery';

class App extends React.Component {

  constructor()
  {
    super();
    this.state={
      menuDisplay:false,
    }
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
    return (
      <div className="App">
          <div className="I-Pod">
              <div className="screen">

                <div className="small-screen">

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
