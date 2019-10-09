import * as React from 'react';
import { RouteComponentProps } from "react-router";

export class Auth extends React.Component<any, any> {
  constructor(props: RouteComponentProps) {
    super(props);
    //this._onClickHandler = this._onClickHandler.bind(this);
  }
  public render(): JSX.Element {
    return (
      <div>
        <div className="area">
          <h3 className="header"> Acquire Bearer (id_token) Token for your AppId</h3>
          <div className="row">
            <div className="col">
                <div className="input-group mb-3">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" id="appIdTextBox" placeholder="App Id" value=""></input>
                  </div>
                  <input type="text" className="form-control" id="tenantNameTextBox" placeholder="Tenant Domain Name (leave blank for 'common') "></input>
                  <div className="input-group-append">
                    <span className="input-group-text">.onmicrosoft.com</span>
                  </div>
                </div>
                <p className="hint"> * Make sure <i id="replyUrl"></i> is added to your App's reply urls </p>
                <button type="button" id="loginBtn" className="btn btn-primary" disabled>Login</button>
                <button type="button" id="resetForm" className="btn btn-danger resetButtons" disabled>Reset</button>
            </div>
            <div className="col">
                <textarea className="form-control" id="bearerTokenTextArea" rows={3} disabled={true}></textarea>
                <button className="btn btn-link" id="copyToClipboardBtn" data-clipboard-target="#bearerTokenTextArea">Copy to clipboard</button>
            </div>
        </div>
        </div>
      </div>
    )
  }
}