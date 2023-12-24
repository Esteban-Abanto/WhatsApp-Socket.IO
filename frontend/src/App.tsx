import io from 'socket.io-client'

const socket = io("http://localhost:4000");

function App() {
    return (
        <div className="w-100" style={{ height: "100vh", backgroundColor: "#0c1317" }}>
            <div className="bg-secondary h-100 m-auto d-flex flex-row" style={{ width: "1600px" }}>

                <div className="" style={{ width: "480px" }}>
                    <div className="d-flex flex-column w-100 h-100" style={{ width: "480px" }}>

                        <div className="d-flex align-items-center flex-row" style={{ height: "50px", padding: "10px 16px" }}>
                            <div style={{ height: "50px" }}> Busqueda </div>
                        </div>

                        <div className="flex-fill overflow-auto">
                            <div id='ChatList' className="" style={{ minHeight: "100%" }}>
                                
                            </div>
                        </div>

                    </div>
                </div>

                <div className="flex-fill border-start">
                    <div className="d-flex flex-column w-100 h-100">
                        
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App