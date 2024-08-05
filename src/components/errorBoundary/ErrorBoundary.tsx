/* eslint-disable n/handle-callback-err */
import { Component, ErrorInfo, ReactNode } from "react";
import { ErrorBoundaryWapper } from "./errorBoundaryStyle";

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<{ children?: any }, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(_error: Error, errorInfo: ErrorInfo): void {
    this.setState({ errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorBoundaryWapper>
          <div className="error-content">
            <div className="error-title">Đã xảy ra lỗi</div>
            <div className="error-detail">
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </div>
          </div>
        </ErrorBoundaryWapper>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
