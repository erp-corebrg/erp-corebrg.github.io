;"use strict";
{
    function Select() {
        this._input = arguments[0];
        this.input = document.createElement("input");
        this.list = document.createElement("ul");
        this.listener = {};
        this.map = {};
        this.initialize();
    }

    Select.prototype = {
        initialize: function () {
            const
                container = document.createElement("div"),
                details = document.createElement("details"),
                nav = document.createElement("nav"),
                form = document.createElement("form"),
                keyword = document.createElement("input"),
                submit = document.createElement("input");

            container.classList.add("select");

            keyword.type="text";
            keyword.name = "keyword";

            submit.type="submit";
            submit.value = "\uf002";

            form.onsubmit = e => {
                e.preventDefault();
    
                const value = keyword.value;
    
                [].forEach.call(this.list.children,
                    li => li.classList[li.textContent.indexOf(value) === -1? "remove": "add"]("match"));
            };
    
            this.list.onclick = e => {
                const li = e.target;
    
                details.removeAttribute("open");
    
                this._input.value = li.dataset.key;
                this.input.value = li.textContent;

                this.fireEvent("change");
            };

            form.appendChild(keyword);
            form.appendChild(submit);

            nav.appendChild(form);
            nav.appendChild(this.list);

            details.appendChild(document.createElement("summary"));
            details.appendChild(nav);

            this._input.classList.add("value");
            this._input.parentNode.appendChild(container);

            container.appendChild(this._input);
            container.appendChild(this.input);
            container.appendChild(details);
        },
        addEventListener: function (name, listener) {
            if (!(name in this.listener)) {
                this.listener[name] = [];
            }

            this.listener[name].push(listener);
        },
        fireEvent: function (name, ...args) {
            if (name in this.listener) {
                this.listener[name].forEach(listener => listener(args));
            }
        },
        add: function (key, value) {
            const li = document.createElement("li");
                    
            li.textContent = value;
        
            li.dataset.key = key;

            li.classList.add("match");

            this.map[key] = value;

            this.list.appendChild(li);
        },
        set value (value = "") {
            this._input.value = value;

            this.input.value = value && this.map[value] || value;
    
            this.fireEvent("change");
        },
        get value () {
            return this._input.value;
        }
    };
}