import React from "react";

class Classement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      dataPerso: null,
      loaded: false,
      address: null
    }
    fetch("http://localhost:4000/api/classement/", { method: "GET" }).then((res) => {
      res.json().then((data) => {
        console.log(data)
        this.setState({ data: data })
      });
    });
    this.props.vueSetter("rankings")
  }
  componentDidMount() {
    if (this.props.address !== undefined) {
      this.setState({ address: this.props.address.toLowerCase() })
      let link = "http://localhost:4000/api/score/" + this.state.address
      console.log(link)
      fetch(link, { method: "GET" }).then((res) => {
        res.json().then((data) => {
          console.log(data[0].position)
          this.setState({ loaded: true, dataPerso: data }) // todo mettre le claseement de laddresse connectée
        });
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props && this.state.loaded === false && this.props.address !== undefined) {
      if (this.props.address !== "") {
        this.setState({ address: this.props.address.toLowerCase() })
        let link = "http://localhost:4000/api/score/" + this.state.address
        console.log(link)
        fetch(link, { method: "GET" }).then((res) => {
          res.json().then((data) => {
            if (this.state.loaded === false && this.props.address !== undefined) {
              console.log(data[0].position)
              this.setState({ loaded: true, dataPerso: data }) // todo mettre le claseement de laddresse connectée
            }
          });
        });
      }
    }
  }
  render() {
    return <div className="mainContent">

      <table className="customTable">
        <thead>
          <tr>
            <th>Player's address</th>
            <th>Pseudo</th>
            <th>Score</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data == null ? null : this.state.data.map((item, index) => {
            console.log("item "+index)

            console.log(item)
            if(item===null){return null}
            return <tr key={index}>
              <td>{item.address}</td>
              <td>{item.pseudo}</td>
              <td>{item.score}</td>
              <td>{index + 1}</td>
            </tr>
          })}
          {this.state.loaded===false?null:<tr>
            <td>{this.state.address}</td>
            <td>{this.state.loaded ? this.state.dataPerso[0].pseudo : ""}</td>
            <td>{this.state.loaded ? this.state.dataPerso[0].score : ""}</td>
            <td>{this.state.loaded ? this.state.dataPerso[0].position : ""}</td>
          </tr>}
        </tbody>
      </table>
    </div>;
  }
}

export default Classement;
