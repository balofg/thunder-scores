import * as React from "react";

export interface INumberInputProps {
  onChange: (value?: number) => void;
  onEnter?: () => void;
  onRegisterFocusHandler?: (
    arg: { focus: () => void; blur: () => void }
  ) => void;
  onUnregisterFocusHandler?: () => void;
  value?: string | number;
  placeholder?: string;
  isDanger?: boolean;
}

export interface INumberInputState {
  value: number | string;
}

class NumberInput extends React.Component<
  INumberInputProps,
  INumberInputState
> {
  private element?: HTMLInputElement;

  constructor(props: INumberInputProps) {
    super(props);

    this.state = { value: props.value || "" };

    this.handleRef = this.handleRef.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  public componentWillReceiveProps({ value }: INumberInputProps) {
    this.setState({ value: value === undefined ? "" : value });
  }

  public componentWillUnmount() {
    if (typeof this.props.onUnregisterFocusHandler === "function") {
      this.props.onUnregisterFocusHandler();
    }
  }

  public render() {
    const { value } = this.state;
    const { placeholder, isDanger } = this.props;

    return (
      <input
        ref={this.handleRef}
        className={`input ${isDanger ? "is-danger" : ""}`}
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
    );
  }

  private handleRef(element: HTMLInputElement) {
    if (typeof this.props.onRegisterFocusHandler === "function") {
      if (!this.element) {
        this.element = element;

        this.props.onRegisterFocusHandler({
          blur: () => element.blur(),
          focus: () => element.focus()
        });
      }
    }
  }

  private onChange({
    currentTarget: { value }
  }: React.SyntheticEvent<HTMLInputElement>) {
    const { onChange } = this.props;

    if (/^\d*$/gi.test(value)) {
      onChange(value === "" ? undefined : parseFloat(value));
    }
  }

  private onKeyPress({ key }: React.KeyboardEvent<HTMLInputElement>) {
    if (key === "Enter") {
      if (typeof this.props.onEnter === "function") {
        this.props.onEnter();
      }
    }
  }
}

export default NumberInput;
