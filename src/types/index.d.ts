declare module 'material-ui-password-field' {

    interface onChange {
        (event: Event, newValue: string): void;
    }

    interface PasswordFieldProps {
        visible?: boolean;
        hasFocus?: boolean;
        hintText?: string;
        floatingLabelText?: string;
        errorText?: string;
        onChange?: onChange;
    }

    interface PasswordFieldState {

    }

    class PasswordField extends React.Component<PasswordFieldProps, PasswordFieldState> {

    }

    export default PasswordField;
}