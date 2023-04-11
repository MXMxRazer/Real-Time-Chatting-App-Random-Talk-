import Home from './ChatComponents/homePage';

function App({ socket }) {

  return (
    <div className="App">
      <Home
        socket={socket}
      />
    </div>
  )
}

export default App;
