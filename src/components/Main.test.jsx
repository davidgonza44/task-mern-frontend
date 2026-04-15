import App from "../App";
import store from "../app/store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ToastContainer } from "react-toastify";

test('renders the root component correctly', () => {
    const {container } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    const rootComponent = container.firstChild;
    expect(rootComponent).toBeInTheDocument();
})