import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  message?: string;
};

export class ErrorBoundary extends Component<any, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Need to add logger service to  lof errors.
    console.log(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="text-center jumbotron">
          <h1>Something went wrong :(</h1>
          <p>{this.state.message}</p>
          <h5 className="m-3 ">Please refresh the page to Continue Working.</h5>
        </div>
      );
    }

    return this.props.children;
  }
}
