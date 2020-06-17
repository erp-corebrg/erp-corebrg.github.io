;"use strict";
{
    function Select(args) {
        this.text = document.createElement("input");
        this.input = document.createElement("input");
        this.details = document.createElement("details");
        this.map = {};
        this.listener = {};

        this.initialize(args);
    }

    Select.prototype = {
        initialize: function (args) {
            const
                select = document.getElementById(args.id),
                nav = document.createElement("nav"),
                form = document.createElement("form"),
                keyword = document.createElement("input"),
                submit = document.createElement("input"),
                list = document.createElement("ul");

            select.className = "select";

            this.input.name = args.id;
            this.input.setAttribute("required", true);

            this.text.type = "text";
            this.text.setAttribute("readonly", true);
            this.text.setAttribute("required", true);

            keyword.type="text";
            keyword.name = "keyword";

            submit.type="submit";
            submit.value = "\uf002";

            form.onsubmit = e => {
                e.preventDefault();
    
                const value = keyword.value;
    
                [].forEach.call(list.children,
                    li => li.classList[li.textContent.indexOf(value) === -1? "remove": "add"]("match"));
            };
    
            list.onclick = e => {
                const li = e.target;
    
                this.details.removeAttribute("open");
    
                this.text.value = li.textContent;
                this.input.value = li.dataset.key;

                this.fireEvent("change");
            };

            {
                const df = document.createDocumentFragment();
                var data, li;

                for (let key in args.data) {
                    data = args.data[key];

                    li = document.createElement("li");
                    
                    this.map[key] = li.textContent = li.title = data[args.attr];
                
                    li.dataset.key = key;
                    li.classList.add("match");

                    df.appendChild(li);
                }

                list.appendChild(df);
            }

            form.appendChild(keyword);
            form.appendChild(submit);

            nav.appendChild(form);
            nav.appendChild(list);

            this.details.appendChild(document.createElement("summary"));
            this.details.appendChild(nav);

            select.appendChild(this.text);
            select.appendChild(this.input);
            select.appendChild(this.details);
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
        set value (key) {
            this.text.value = this.map[key];
            this.input.value = key;
    
            this.fireEvent("change");
        },
        get value () {
            return this.input.value;
        }
    };
}