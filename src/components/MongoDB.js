import React from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


var Component = React.Component;

//const CONNECTION_PORT = 'https://rustapi-cnre5ftlpq-uc.a.run.app/';
const CONNECTION_PORT = 'http://localhost:5000/'

var logsR = [];
var top3R = [];
var susR = [];

var updateInterval = 5000;
class RAM extends Component {
  mounted = 0;
  constructor() {
    super();
    this.updateChart = this.updateChart.bind(this);
    this.state = {
      logs: logsR,
      top3: top3R,
      sus: susR,

      indiceR: 0,
    }
    this.updateChart();
  }
  componentDidMount() {
    this.mounted = setInterval(this.updateChart, updateInterval);
  }
  componentWillUnmount() {
    clearInterval(this.mounted);
  }

  adelantarR() {
    var indiceR = this.state.indiceR;
    var logs = this.state.logs;
    if (indiceR + 10 <= logs.length) {
      this.setState({
        indiceR: indiceR + 10,
      })
    }
  }

  atrasarR() {
    var indiceR = this.state.indiceR;
    if (indiceR - 10 >= 0) {
      this.setState({
        indiceR: indiceR - 10,
      })
    }
  }

  render() {
    var indiceR = this.state.indiceR;
    var logs = this.state.logs;
    var top3 = this.state.top3;
    var sus = this.state.sus;

    const optionsTop = {
      axisX: {
        title: "Juego",
        titleFontFamily: "comic sans ms"
      },
      axisY: {
        title: "Partidas jugadas",
        titleFontFamily: "comic sans ms"
      },
      data: [
        {
          type: "column",
          indexLabel: "{y}",
          dataPoints: top3,
        }
      ]
    }

    const optionsSubscribers = {
      axisX: {
        title: "Subscriber",
        titleFontFamily: "comic sans ms"
      },
      axisY: {
        title: "Inserciones",
        titleFontFamily: "comic sans ms"
      },
      data: [
        {
          type: "column",
          indexLabel: "{y}",
          dataPoints: sus
        }
      ]
    }

    return (
      <>
        <div style={{ color: 'white', textAlign: 'center' }}>
          <br />
          <h2 style={{ color: 'white', textAlign: 'center' }}> Logs</h2>

          <div style={{ margin: '0 auto', width: '80%' }}>
            <div className="card-body d-flex justify-content-between align-items-center" style={{ marginLeft: '76%' }}>
              Grupo:
              <Button onClick={() => this.atrasarR()}>{'<'}</Button>
              {(indiceR / 10) + 1}
              <Button onClick={() => this.adelantarR()}>{'>'}</Button>
            </div>
            <div class="bg-dark" style={{ height: '450px', display: 'block' }}>

              <Table responsive variant="dark" >
                <thead>
                  <tr>
                    <th>Id Juego</th>
                    <th># Jugadores</th>
                    <th>Nombre del Juego</th>
                    <th>Ganador</th>
                    <th>Queue</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    logs.slice(indiceR, indiceR + 10).map((log) =>
                      <>
                        <tr key={log.id}>
                          <td>
                            {log['game_id']}
                          </td>
                          <td>
                            {log['players']}
                          </td>
                          <td>
                            {log['game_name']}
                          </td>
                          <td>
                            {log['winner']}
                          </td>
                          <td>
                            {log['queue']}
                          </td>
                        </tr>
                      </>
                    )}
                </tbody>
              </Table>
            </div>
          </div>


        </div>
        <br />

        <h2 style={{ color: 'white', textAlign: 'center' }}> Top 3 De Juegos</h2>
        <div style={{ alignItems: 'center', alignContent: 'center' }}>
          <br />
          <form class="bg-dark" style={{
            margin: "0 auto",
            padding: "2%",
            width: "80%",
            borderRadius: "2%",
            color: "white",
            fontSize: "large"
          }}>

          </form>
        </div>
        <br />

        <h2 style={{ color: 'white', textAlign: 'center' }}> Go Suscribers</h2>
        <div style={{ alignItems: 'center', alignContent: 'center' }}>
          <br />
          <form class="bg-dark" style={{
            margin: "0 auto",
            padding: "2%",
            width: "80%",
            borderRadius: "2%",
            color: "white",
            fontSize: "large"
          }}>
          </form>
        </div>
        <br />


      </>
    );
  }

  async updateChart() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    // CONSULTA 1
    var response1 = null;
    try {
      response1 = await fetch(CONNECTION_PORT + 'getLogs', requestOptions)
    }
    catch {
      return;
    }
    const json1 = await response1.json()
    //console.log(json1);

    this.setState({
      logs: json1
    })

    logsR = json1;

    // CONSULTA 2
    var response2 = null;
    try {
      response2 = await fetch(CONNECTION_PORT + 'getTop', requestOptions)
    }
    catch {
      return;
    }
    const json2 = await response2.json()
    //console.log(json2);

    this.setState({
      top3: json2
    })

    top3R = json2;

    // CONSULTA 3
    var response3 = null;
    try {
      response3 = await fetch(CONNECTION_PORT + 'getSus', requestOptions)
    }
    catch {
      return;
    }
    const json3 = await response3.json()
    //console.log(json3);

    this.setState({
      sus: json3
    })

    susR = json3;
  }
}
export default RAM;