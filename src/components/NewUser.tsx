import * as React from 'react';
import './NewUser.scss';
import * as AWS from 'aws-sdk';
import { CognitoUserPool, CognitoUserAttribute, ISignUpResult } from 'amazon-cognito-identity-js';
// import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PasswordField from 'material-ui-password-field';

interface NewUserProps {
    defaultEmail?: string;
}

interface NewUserState {
    email: string;
    password: string;
    passwordConfirmation: string;
    confirmationCode: string;
    userId?: string;
}

export default class NewUser extends React.Component<NewUserProps, NewUserState> {
    
    constructor(props: NewUserProps) {
        super(props);
        this.state = { 
            email: '',
            password: '',
            passwordConfirmation: '',
            confirmationCode: '' 
        };
    }

    render() {
      return (
        <div className="new-user-form">
            <MultiThemeProvider>
            <TextField
                hintText="email@address.com"
                floatingLabelText="Email"
                onChange={(event, newValue) => this.setState({email: newValue})}
            />
            </MultiThemeProvider>
            <br/>
            <MultiThemeProvider>
                <PasswordField
                    hintText="At least 8 characters"
                    floatingLabelText="Enter your password"
                    errorText="Your password is too short"
                    onChange={this.handlePasswordChange}
                />
            </MultiThemeProvider>
            <br/>
            <MultiThemeProvider>
            <TextField
                    hintText="Repeat your Password"
                    floatingLabelText="Enter your password"
                    errorText="Your password is too short"
                    onChange={(event, newValue) => this.setState({passwordConfirmation: newValue})}
            />
            </MultiThemeProvider>
            <br/>
            <button 
                onClick={this.signUp}
            >
            Sign Up
            </button>
        </div>
      );
    }
    
    handlePasswordChange = (e: Event, newValue: string): void => {
        this.setState({password: newValue});
    }

    handleEmailChange = (e: Event, newValue: string): void => {
        this.setState({email: newValue});
    }

    handlePasswordConfirmationChange = (e: Event, newValue: string): void => {
        this.setState({passwordConfirmation: newValue});
    }

    signUp = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        this.createUser();
    }

    createUser = () => {
    
        AWS.config.region = 'us-west-2'; // This is required to derive the endpoint
      
        const poolData = {
          UserPoolId : 'us-west-2_zGOIdeGqL',
          ClientId : '4nb16gdcsq2riflaumu6vk2q3s'
        };
        
        const userPool = new CognitoUserPool(poolData);
    
        const attributeList = [];
        
        const dataEmail = {
            Name : 'email',
            Value : this.state.email
        };
    
        const attributeEmail = new CognitoUserAttribute(dataEmail);
    
        attributeList.push(attributeEmail);
    
        userPool.signUp(this.state.email, 
                        this.state.password,
                        attributeList, 
                        [], 
                        (err: Error, result: ISignUpResult): void => {
            if (err) {
                console.log(err);
                return;
            }
    
            if (result) {
              // TODO - change form to accept email confirmation number
              console.log(result);
            } else {
                console.log('result was null');
            }
        });
    }
}
