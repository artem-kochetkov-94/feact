const TopLevelWrapper = function(props) {
    this.props = props;
}

TopLevelWrapper.prototype.render = function () {
    return this.props;
}

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
        const wrapperElement = this.createElement(TopLevelWrapper, element);
        const componentInstance = new FeactCompositeComponentWrapper(element);
        return componentInstance.mountComponent(container);
    }
};

class FeactDOMComponent {
    constructor(element) {
        this._currentElement = element;
    }

    mountComponent(container) {
        const domElement = document.createElement(this._currentElement.type);
        const text = this._currentElement.props.children;
        const textNode = document.createTextNode(text);
        domElement.appendChild(textNode);

        container.appendChild(domElement);

        this._hostNode = domElement;
        return domElement;
    }
}

class FeactCompositeComponentWrapper {
    constructor(element) {
        this._currentElement = element;
    }

    mountComponent(container) {
        const Component = this._currentElement.type;
        const componentInstance = new Component(this._currentElement.props);
        let element = componentInstance.render();

        while (typeof element.type === 'function') {
            element = (new element.type(element.props)).render();
        }

        const domComponentInstance = new FeactDOMComponent(element);
        return domComponentInstance.mountComponent(container);
    }
}

const MyMessage = Feact.createClass({
    render() {
        if (this.props.asTitle) {
            return Feact.createElement(MyTitle, {
                message: this.props.message
            });
        } else {
            return Feact.createElement('p', null, this.props.message);
        }
    }
}