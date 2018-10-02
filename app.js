var app = require('./config/server');
var middleware = require('./config/middleware');
var axios = require('axios');
var token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE4OWE2NDhkOGIyNjIwMzc1ZDUxZDZiNTVlYTI0YzJkM2ExYTBiYmU5N2FjOTZhNGNjNmFmMDYzMDE3Y2VjZDZiOTZkZTAyYjNkNGVlOTliIn0.eyJhdWQiOiI0OSIsImp0aSI6ImE4OWE2NDhkOGIyNjIwMzc1ZDUxZDZiNTVlYTI0YzJkM2ExYTBiYmU5N2FjOTZhNGNjNmFmMDYzMDE3Y2VjZDZiOTZkZTAyYjNkNGVlOTliIiwiaWF0IjoxNTM2OTMxMjg2LCJuYmYiOjE1MzY5MzEyODYsImV4cCI6MTYwMDA4OTY4Niwic3ViIjoiIiwic2NvcGVzIjpbXX0.sNozNKt9HaUCIpk2kF6JlvMQALwPOAtFuJJqS6tkfADUGsRXDUT5cgnbyxYC-RuQMx4Oscr-oB5UjEa2iGk4vQpnJ9TLGS77SNl6ngZ36OzkvIvXnSvDvwTuUx75cPG9NBVGImAPpWlIXNX9KYwsApuHuXigr-CR0c6RVk_J7QONnFbd_NTqh-GeQuA6DUD9cIoPYsg-kGnFo1T5j1edwyxUzhi3W6Ybzf_yI3KKWTVQZSUoE3DCUnKqy75IKWqhaYKXtvHvVXB4GFB6WfSwFlC_jBavecgAe-JMWUwYAd-xwEkAxk-3WiU2R_U7FGmMyZvqradRHgFBw1Rk4_mV08LuSAe3HbryLJjXrfe9QX8Z5nytu5BYE8TWT-H6EhuORMY-T4r4ylQUS37GzsErr0ifLapaF5geLjiCptxkwGJBatC63JtRfG4mRCIufgtE55eSOyYUaP_u0z8MZVZRhNW56t12vQS4RriWZefGMZXk3iaWiA-mF4sOfVbDkZIG6U-2djtpSMY5gGrrjgDi7jCXAEv-WZWWMfm_y5nneUaCwnpsMxs6c5TXOoeqJ0U0hGflzWAHVoKAtkrpH2auPl0-CC7tpSl3ubK8Tp0nOAco4yJp8BoARxOoBzSQB8S4v4ob32r7xsakXqswDP5nwlFdOC8Xaig4oMxNTzByQVI";
var client = axios.create()

// client.defaults.headers.common["Authorization"] = token
var rotaNoticias = require('./app/routes/noticias')(app)
var rotaHome = require('./app/routes/home')(app)
var rotaContas = require('./app/routes/contas')(app)
var rotaForm = require('./app/routes/formulario_inclusao_noticia')(app)
var rotaPlanilhas = require('./app/routes/planilhas')(app)
app.use(middleware)
app.listen(3000, function() {
    console.log('Servidor ON')
})