import THREE from 'three';
import ComponentName from './components/ComponentName';

export class App extends React.Component{

  render() {
    return <ComponentName />;
  }

};

ReactDOM.render(<App />, document.getElementById('content'));