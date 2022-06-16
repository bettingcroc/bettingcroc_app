import React from "react";

class Classement extends React.Component {
  constructor(props){
    super(props)
    this.state={
      data:null,
      dataPerso:null,
      loaded:false,
      address:null
    }
    fetch("http://localhost:4000/classementApi/", { method: "GET" }).then((res) => {
        res.json().then((data) => {
          console.log(data)
          this.setState({data:data})
        });
    });
    
  }
  componentDidMount(){
    if(this.props.address!==""){
      this.setState({address:this.props.address.toLowerCase()})
      let link="http://localhost:4000/scoreapi/"+this.props.address
      console.log(link)
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          console.log(data[0].position)
          this.setState({loaded:true,dataPerso:data}) // todo mettre le claseement de laddresse connectée
        });
      });
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps!==this.props && this.state.loaded===false){
      if(this.props.address!==""){
        this.setState({address:this.props.address.toLowerCase()})
        let link="http://localhost:4000/scoreapi/"+this.props.address
        console.log(link)
        fetch(link, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            console.log(data[0].position)
            this.setState({loaded:true,dataPerso:data}) // todo mettre le claseement de laddresse connectée
          });
        });
      }
    }
  }
  render() {
    return <div>
      
        <table className="blueTable">
          <thead>
          <tr>
          <th>address</th>
          <th>pseudo</th>
          <th>score</th>
          <th>rang</th>
          </tr>
          </thead>
          <tbody>
          {this.state.data==null?null:this.state.data.map((item,index)=>{
            return <tr key={index}>
              <td>{item.address}</td>
              <td>{item.pseudo}</td>
              <td>{item.score}</td>
              <td>{index+1}</td>
            </tr>
            })}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{this.state.address}</td>
              <td>{this.state.loaded ? this.state.dataPerso[0].pseudo: ""}</td>
              <td>{this.state.loaded ? this.state.dataPerso[0].score: ""}</td>
              <td>{this.state.loaded ? this.state.dataPerso[0].position: ""}</td>
            </tr>
            </tbody>
        </table>
    </div>;
  }
}

export default Classement;
