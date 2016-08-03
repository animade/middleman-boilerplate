import THREE from 'three';
import Toy from './components/Toy';

export class App extends React.Component{

  render() {
    return <Toy />;
  }

};

ReactDOM.render(<App />, document.getElementById('content'));