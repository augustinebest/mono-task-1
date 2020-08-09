const store = JSON.parse(localStorage.getItem('_details'))
const secret = 'test_sk_S43CWsa6isv4UiWbYv84';
const baseURL = 'https://api.withmono.com'
const amountdiv = document.getElementById('amount');
const accountID = document.getElementById('accountID');
const name = document.getElementById('name');
const balance = document.getElementById('balance');
const ba = document.getElementById('ba');
const list_d = document.getElementById('list_d');
const list_c = document.getElementById('list_c');


window.onload = function () {
    const code = store.code;
    const payload = {
        code
    }
    amountdiv.innerHTML = store.amount
    // const type = 'debits'
    const options = {
        method: 'POST',
        headers: {
            'mono-sec-key': `${secret}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    const getRequest = () => {
        fetch(`${baseURL}/account/auth`, options)
            .then(res => res.json())
            .then(res => {
                console.log('RES: ', res)
                getProfile(res.id)
                getDebits(res.id)
                getCredits(res.id)
            })
    }
    getRequest();

    const getProfile = (id) => {
        const options = {
            method: 'GET',
            headers: {
                'mono-sec-key': `${secret}`,
                'Content-Type': 'application/json'
            },
        }
        fetch(`${baseURL}/accounts/${id}`, options)
            .then(res => res.json())
            .then(res => {
                console.log('res2: ', res)
                accountID.textContent = res.accountNumber;
                name.textContent = res.name;
                balance.textContent = res.balance
                ba.textContent = res.balance - store.amount
            })
    }

    const getDebits = (id) => {
        const options = {
            method: 'GET',
            headers: {
                'mono-sec-key': `${secret}`,
                'Content-Type': 'application/json'
            },
        }
        fetch(`${baseURL}/accounts/${id}/debits`, options)
            .then(res => res.json())
            .then(res => {
                if (res.history.length === 0) {
                    const div0 = document.createElement('div');
                    div0.classList.add('__list');
                    div0.innerHTML = 'There is no debit history yet';
                    list_d.appendChild(div0)
                } else {
                    res.history.forEach(function (element, index) {
                        const div0 = document.createElement('div');
                        div0.classList.add('__list');
                        const div1 = document.createElement('div');
                        const div2 = document.createElement('div');
                        div1.innerHTML = element.period
                        div2.innerHTML = 'NGN '+element.amount
                        div0.appendChild(div1)
                        div0.appendChild(div2)
                        list_d.appendChild(div0)
                    })
                }
            })
    }

    const getCredits = (id) => {
        const options = {
            method: 'GET',
            headers: {
                'mono-sec-key': `${secret}`,
                'Content-Type': 'application/json'
            },
        }
        fetch(`${baseURL}/accounts/${id}/credits`, options)
            .then(res => res.json())
            .then(res => {
                if (res.history.length === 0) {
                    const div0 = document.createElement('div');
                    div0.classList.add('__list');
                    div0.innerHTML = 'There is no credit history yet';
                    list_c.appendChild(div0)
                } else {
                    res.history.forEach(function (element, index) {
                        const div0 = document.createElement('div');
                        div0.classList.add('__list');
                        const div1 = document.createElement('div');
                        const div2 = document.createElement('div');
                        div1.innerHTML = element.period
                        div2.innerHTML = 'NGN '+element.amount
                        div0.appendChild(div1)
                        div0.appendChild(div2)
                        list_c.appendChild(div0)
                    })
                }
            })
    }

}