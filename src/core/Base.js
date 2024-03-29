import React from "react"
import Menu from "./Menu"

const Base = ({
    title = "My Title",
    description = " My description",
    className = " text-white p-4",
    // if we use children thwen base class will act as enclosing parent for other components
    children
}) => (
    <div>
        <Menu/>
        <div className="container-fluid">
            <div className="jumbotron text-white text-center"> {/*bg-dark*/ }
                <h2 className="display-4">
                    {title}
                </h2>
                <p className="lead">
                    {description}
                </p>
            </div>
            {/* it will be the content to be displayed */}
            <div className={className}>{children}</div>
        </div>
        <footer className="footer bg-dark mt-4 py-3 ">
            <div className="container-fluid bg-success text-white text-center py-3">
                <h4>If you got any question, feel free to reach out</h4>
                <button className="btn-warning btn-lg">Contact Us!</button>
            </div>
            <div className="container">
                <span className=" text-white">Amazing place to buy tshirt</span> {/*text-muted*/}
            </div>
        </footer>
    </div>
)

export default Base
