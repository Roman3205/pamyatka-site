let container = document.querySelector(`.feedbacks-container`)

axios.defaults.headers.post['Content-Type'] = 'application/json';

let Feedbacks = []

loadfeedbacks()
activateForm()

async function loadfeedbacks() {
    let response = await axios.get(`/pamyatkaplus/feedback/all`)
    let feedbacks = response.data;
    Feedbacks = feedbacks;

    renderFeedbacks()
}

function renderFeedbacks() {
    container.innerHTML = ``;

    for(let i = 0; i < Feedbacks.length; i++) {
        let feedback = Feedbacks[i]

        container.innerHTML += `
            <div class="card mb-4">
                <div class="card-header">
                    <h5 class="card-title mt-2">
                            ${feedback.title}
                    </h5>
                    <div class="profile_image"><img src="/assets/no-profile-image.png" alt="" width="40px"></div>
                </div>
                <div class="card-body">
                    <p class="card-text mb-4">
                        ${feedback.description}
                    </p>
                    <div class="d-flex justify-content-between">
                        <div>
                            <button type="button" class="feedback-positive btn btn-outline-success">
                            Like
                                <span class="badge rounded-pill text-bg-success">
                                    ${feedback.positive}
                                </span>
                            </button>
                            <button type="button" class="feedback-negative btn btn-outline-danger">
                            Disslike
                                <span class="badge rounded-pill text-bg-danger">
                                    ${feedback.negative}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    positiveClicks()
    negativeClicks()
}

function activateForm() {
    let form = document.querySelector(`#send-data`);
    form.addEventListener(`submit`, async function(event) {
        event.preventDefault();
        
        let alert1 = document.querySelector(`.alert1`);
        let alert2 = document.querySelector(`.alert2`);
        let title = form.querySelector(`[name='title']`).value;
        let description = form.querySelector(`[name='description']`).value;
        let isRussian = /^[А-Яа-я\s,'-.!" "?]+$/.test(title) && /^[А-Яа-я\s,'-.!" "?]+$/.test(description);
        let isFilled = title.trim() !== '' && description.trim() !== '';
        let filter = /([a-zA-Zа-яА-Я])\1{1}/;
        let lengthFeedback = title.length>=5 && description.length>=10;

        if (!title || !description || !isRussian || !isFilled || filter.test(title + description) || !lengthFeedback) {
            alert1.classList.remove(`d-none`);
            alert2.classList.add(`d-none`);
            return;
        } else {
            alert1.classList.add(`d-none`);
            alert2.classList.remove(`d-none`);
            let response = await axios.post(`/pamyatkaplus/feedback/create`, form);
            let feedback = response.data;
            let control = document.querySelectorAll(`.form-control`);
            Feedbacks.push(feedback);
            renderFeedbacks();
            form.reset();
        }
    });
}

function positiveClicks() {
    let positiveButtons = document.querySelectorAll(`.feedback-positive`)
    
    for(let i = 0; i < positiveButtons.length; i++){
        let button = positiveButtons[i]
        let feedback = Feedbacks[i]

        button.addEventListener(`click`, async function() {
            let response = await axios.post(`/pamyatkaplus/feedback/positive`, {
                id: feedback._id
            })
            let positiveBadge = button.querySelector(`.text-bg-success`)
            positiveBadge.innerText = response.data.positive
        })
}}

function negativeClicks() {
    let negativeButtons = document.querySelectorAll(`.feedback-negative`)

    for(let i = 0; i < negativeButtons.length; i++){
        let button = negativeButtons[i]
        let feedback = Feedbacks[i]
    
        button.addEventListener(`click`, async function() {
            let response = await axios.post(`/pamyatkaplus/feedback/negative`, {
                id: feedback._id
            })
            let negativeBadge = button.querySelector(`.text-bg-danger`)
            negativeBadge.innerText = response.data.negative
        })
}}