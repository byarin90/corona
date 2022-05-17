class Corona {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.country = _item.country;
        this.active = _item.active.toLocaleString();

        this.recovered = _item.recovered.toLocaleString();
        this.newCases = _item.todayCases.toLocaleString();
    }






    render() {
        let div = document.createElement('div');
        div.className = 'col';
        document.querySelector(this.parent).append(div)
        div.innerHTML = `
        <div class="box border border-3 shadow px-4 pt-2">
        <h3> ${this.country}</h3>
        <p>Active: ${this.active}</p>
        <p>Today Cases:${this.newCases}</p>
        <h4 class="pb-2">Recovered:${this.recovered}</h4>
        </div>

        `
    }

}