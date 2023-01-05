import React, { Fragment } from 'react';

export default class UnderlineButton {
    static saveButton() {
        return <Fragment><u>S</u>ave</Fragment>;
    }

    static submitButton() {
        return <Fragment><u>S</u>ubmit</Fragment>;
    }

    static searchButton() {
        return <Fragment><u>S</u>earch</Fragment>;
    }

    static insertButton() {
        return <Fragment><u>I</u>nsert</Fragment>;
    }

    static insertCaseButton() {
        return <Fragment><u>I</u>nsert Case</Fragment>;
    }

    static updateButton() {
        return <Fragment><u>U</u>pdate</Fragment>;
    }

    static verifyButton() {
        return <Fragment>V<u>e</u>rify</Fragment>;
    }
}