const PasswordUpdatedEmail = {


    passUpdated(){
        return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <!-- CSS only -->
                <link 
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css" 
                rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx" 
                crossorigin="anonymous">
            </head>
            <style>
            .btn{
                padding:10px;
                background-color:red;
                color:white;
                font-weight:bold;
                font-size:16px;
                border-radius:6px;
            }
            a:hover{
                text-decoration:none;
            }
            </style>
            <body>
                <div style="text-align:center;">
                    <img src="https://rarellano-soft.com/assets/img/logoRarellano.png" alt="img-logo" width="100px"
                </div>
                <div style="text-align:center;">
                    Hello!! <br/>
                    Advice: yor password has changed <br/><br/>
                    <a class="btn btn-sm btn-danger" href="${process.env.URL_APP_AUTH_FRONT}" target="_blank">Sign in</a>
                </div>
                <!-- JavaScript Bundle with Popper -->
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-A3rJD856KowSb7dwlZdYEkO39Gagi7vIsF0jrRAoQmDKKtQBHUuLZ9AsSv4jD4Xa" crossorigin="anonymous"></script>
            </body>
        </html>
        `
    }

}

module.exports  =PasswordUpdatedEmail