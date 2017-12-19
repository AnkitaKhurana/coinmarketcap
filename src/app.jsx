/**
 * Created by jainaman224 on 10/9/17.
 */

import React from "react";
import ReactDOM from "react-dom";

class Footer extends React.Component{
    render(){
        return (
            <div>
                Footer
            </div>
        );
    }
}

class App extends React.Component{
    render(){
        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <a className="navbar-brand" href="#">CryptoSimulator</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                        </ul>
                        <a className="btn btn-outline-success my-2 my-sm-0" href="/login">Login</a>
                    </div>
                </nav>

                <Footer/>
            </div>
        );
    }
}

var elem = <App/>;
var node = document.getElementById("app");

ReactDOM.render(elem, node);