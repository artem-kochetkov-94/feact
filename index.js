const Feact = {
    createElement(type, props, children) {
        const element = {
            type,
            props: props || {}
        };

        if (children) {
            element.props.children = children;
        }

        return element;
    },

    render(element, container) {
        const componentInstance = new FeactDOMComponent(element);
        return componentInstance.mountComponent(container);
    }
};