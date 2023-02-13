import React from 'react';
import { Link } from "react-router-dom";
import "./AddForm.css"

export const AddForm = () => {
    return (
        <div className="form-container">
            <div className="form">
                <h1 className="title">Formularz</h1>
                <Link className="form" to="/">anuluj</Link>
                <Link className="save" to="/">zapisz</Link>
            </div>
        </div>

    );
};

