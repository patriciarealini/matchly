var React=require('react');
var Visitor=require('./Visitors.jsx');
var Match = React.createClass({
  match:function(){
    console.log(this.props,'props');
    var self=this;
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: '/match',
      success: function(data) {
        console.log("data", data);
        console.log(self, 'self');
        self.props.setMatchData(data);
      }
    });
  },

  exportToCSV:function(){
    console.log('export fires');
    console.log('data',this.props.matchData);
    console.log('export to csv',this.props.exportCSV);
    this.props.exportCSV(this.props.matchData);
  },

  render:function(){
    var data=[];
    if(this.props.matchData!==null){
      console.log('if statement fires');
      data=this.props.matchData.map(function(visitor){
        return (<div><Visitor visitor={visitor} /></div>);
      });
    }
    return(
        <div id='workBox'>
          <div id='tabs'>
            <ul>
              <li id="match" onClick={this.props.setWorkArea.bind(this,0)}>MATCH</li>
              <li id="available" onClick={this.props.setWorkArea.bind(this,1)}>AVAILABLE</li>
              <li id="upload" onClick={this.props.setWorkArea.bind(this,2)}>UPLOAD</li>
            </ul>
          </div>
          <div id='workArea'>
            <div id='list-of-visitors'>
              <h2>list of visitors</h2>
            </div>
            <div id='schedule'>
              <h2>schedule</h2>
            </div>
            <button id='matchButton' onClick={this.match}>MATCH</button>
            <button onClick={this.exportToCSV}>Export data to CSV file</button>
          </div>
          <div id='data'>
            {data}
          </div>
        </div>

    );
  }
});

module.exports=Match;
