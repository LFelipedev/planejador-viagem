const formatDate = (date) =>{
    return {
        day: {
            numeric: dayjs(date).format('DD'),
            week: {
                short: dayjs(date).format('ddd'),
                long: dayjs(date).format('dddd'),
            }
        },
        month: dayjs(date).format('MMMM'),
        hour: dayjs(date).format('HH:mm')
    }
}

//object {...}
const activity = {
    name: 'Almoço', //atributo
    date: new Date('2024-07-08 11:00'),
    endActivity: false
}

//lista
let activityArray = [
    activity,
    {
        name: 'Academia', //atributo
        date: new Date('2024-07-08 13:00'),
        endActivity: false
    },
]

//arrow function 
const createActivityItem = (activity) => {
    let input = `<input type="checkbox" onchange="concludeActivity(event)" value="${activity.date}"`
    
    if(activity.endActivity) {
        input += 'checked'
    }
    input += '>'

    const datePtBr = formatDate(activity.date);

    return `
        <div class="card-bg">
            ${input}
            <span>${activity.name}</span>
            <time>
            ${datePtBr.day.week.long}, dia ${datePtBr.day.numeric} de ${datePtBr.month} às ${datePtBr.hour}
            </time>
        </div>
    `
}

const attActivityList = () => {
    const activityPrint = document.querySelector('#activity-container')
    activityPrint.innerHTML = ''
    //verifica se a lista de atividades esta vazia
    if(activityArray.length == 0) {
        activityPrint.innerHTML = `<p>Nenhuma atividade cadastrada!</p>`
        return
    }
    for(let activity of activityArray) {
        activityPrint.innerHTML += createActivityItem(activity)
    }
}
attActivityList()

saveActivity = (event) => {
    event.preventDefault() //nao envia
    const dataForm = new FormData(event.target)
    const name = dataForm.get('activity-input')
    const day = dataForm.get('day-select')
    const hour = dataForm.get('hour-select')
    const date = `${day} ${hour}`

    const newActivity = {
        name, //atributo
        date,
        endActivity: false
    }

    const activityExist = activityArray.find((activity) => {
        return activity.date == newActivity.date
    })

    if(activityExist) {
        return alert('dia/hora não disponível')
    }

    activityArray = [newActivity, ...activityArray]
    attActivityList()
}

const createDates = () => {
    const days = [
        '2024-02-28',
        '2024-02-29',
        '2024-03-01',
        '2024-03-02',
        '2024-03-03',
    ]
    let daysSelect = ''
    for(let day of days) {
        const datePtBr = formatDate(day);
        const formatDay = `${datePtBr.day.numeric} de ${datePtBr.month}`
        daysSelect += `
        <option value="${day}">${formatDay}</option>
        `
    }
    document
    .querySelector('select[name="day-select"]')
    .innerHTML = daysSelect
}
createDates()

const createHour = () => {
    let availableHour = ''
    for(let i = 6; i < 23; i++) {
        const  hour = String(i).padStart(2, '0')
        availableHour += `<option value="${hour}:00">${hour}:00</option>`
        availableHour += `<option value="${hour}:30">${hour}:30</option>`
    }
    document
    .querySelector('select[name="hour-select"]')
    .innerHTML = availableHour
}
createHour()

const concludeActivity = (event) => {
    const input = event.target
    const atualDateInput = input.value
    
    const activity = activityArray.find((activity) => {
        return activity.date == atualDateInput
    })

    if(!activity) {
        return 
    }

    activity.endActivity = !activity.endActivity
}