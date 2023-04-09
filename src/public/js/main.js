const socket = io()
socket.on('ping', (resp)=>{
    console.log('listen')
    console.log(resp)
})

const formValues = document.querySelector("#form-main")

formValues.addEventListener('submit', e =>{
    e.preventDefault()
    socket.emit('client:newUser', {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    })
    console.log("Message sent")
})

socket.on('server:userList', data =>{
    render(data)
})
socket.on('server:sessionValidation', data =>{
    renderMessageValidation(data)
})

socket.on('server:systemsList', data =>{
    console.log(data)
    renderSystems(data)
})

function render(data){
        var html = data.map(function(data, index){
            return (`<div style="color:white;z-index:9999;">
            <strong>${data.email}</strong>: 
            <em>${data.password}</em>
            </div>`)
        }).join(" ")
        document.getElementById('users').innerHTML = html
    
}

function renderSystems(data){
    var html = data.map(function(data, index){
        return (`<div style="color:white;z-index:9999;">
        <strong>${data.system}</strong>: 
        <em>${data.description}</em>
        </div>`)
    }).join(" ")
    document.getElementById('systems').innerHTML = html

}

function renderMessageValidation(data){
    var html = data.map(function(data, index){
        return (`<div style="color:white;z-index:9999;">
        <strong>${data.message}</strong>: 
        </div>`)
    }).join(" ")
    document.getElementById('alert').innerHTML = html

}
function addMessage(e){
    var payload = {}
    socket.emit('client:newUser', payload)
    return false
}

socket.emit('client:authentication', 
'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxMDAwMDAwMDAxLCJlbWFpbCI6InJhcmVsbGFubzg4ODhAZ21haWwuY29tIiwic3lzdGVtIjoiUkEtQVVUSC1BUFAiLCJyb2xlcyI6W3sicm9sZSI6IkdvZCJ9LHsicm9sZSI6IlN1cGVyIHVzZXIifV0sImlhdCI6MTY3MDIwOTAwMywiZXhwIjoxNjcwMjEyNjAzfQ.DJMQGLOdw3bL7yTpOljqPUAXU8Iwxrrv9jg6z5YsMhw'
)
