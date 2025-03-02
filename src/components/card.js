import React from "react";

function Card() {
        return (
            <div className="card mb-3 mt-4 text-success">
                    <h3 className="card-header">{this.props.title}</h3>
                    <div className="card-body ">
                            {this.props.children}
                    </div>
            </div>
        )
}
export default Card;


