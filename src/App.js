import React , { useEffect , useState } from 'react';
import Card, { CardTitle, CardText } from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Columns from 'react-columns'
import Form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import CardColumns from "react-bootstrap/CardColumns";
import axios from "axios";


function App() {
  const [latest, setLatest] = useState([]);
  const [results, SetResults] = useState([]);
  const [searchCountries, SetSearchCountries] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        SetResults(responseArr[1].data);
    })
      .catch(err => {
        console.log(err);
    });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter(item => {
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  });

  const countries = filterCountries.map((data, i) => {
    return (
      <Card
      key={i}
      bg="light"
      text="dark"
      className="text-center"
      style={{ margin : "10px"}}
      >
    <Card.Img variant="top" src={data.countryInfo.flag} />
      <Card.Body>
    <Card.Title>{data.country}</Card.Title>
    <Card.Text>Cases {data.cases}</Card.Text>
    <Card.Text>Deaths {data.deaths}</Card.Text>
    <Card.Text>Recoverd {data.recovered}</Card.Text>
    <Card.Text>Today Cases {data.todayCases}</Card.Text>
    <Card.Text>Today Deaths {data.todayDeaths}</Card.Text>
        </Card.Body>
      </Card>
    );
  });



  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div>
    <CardDeck>
    <Card bg="secondary" text="white" className="text-center" style={{margin: "10px"}}>
      <Card.Body>
        <Card.Title>Cases</Card.Title>
        <Card.Text>
          {latest.cases}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <small>Last updated {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card bg="danger" text={"white"} className="text-center" style={{margin: "10px"}}>
      <Card.Body>
        <Card.Title>Deaths</Card.Title>
        <Card.Text>
        {latest.deaths}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>Last updated {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card bg="success" text={"white"} className="text-center" style={{margin: "10px"}}>
      <Card.Body>
        <Card.Title>Recoverd</Card.Title>
        <Card.Text>
        {latest.recovered}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small>Last updated {lastUpdated}</small>
      </Card.Footer>
    </Card>
  </CardDeck>

  <Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control
    type="text"
    placeholder="Type Name a Country"
    onChange= {e => SetSearchCountries(e.target.value)}
    />
  </Form.Group>
</Form>

  <Columns queries={queries}> 
    {countries}
  </Columns>
  </div>
  );
}

export default App;
