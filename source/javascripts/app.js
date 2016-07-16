import THREE from 'three';
import Balloon from './components/Balloon';

export class App extends React.Component{

  render() {
    return <Balloon />;
  }

};

ReactDOM.render(<App />, document.getElementById('content'));