/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = require('./languageStrings');




const DOCUMENT_ID = "bienvenida";
const bienvenidadatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://th.bing.com/th/id/OIP.iN_uMk89-ECW6Zql80kN4gHaHa?w=732&h=732&rs=1&pid=ImgDetMain",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Bienvenido a Guanajuato"
                }
            },
            "logoUrl": "",
            "hintText": "Try, \"Alexa, Háblame de Guanajuato\""
        }
    }
};

const DOCUMENT_ID_Des = "descripcionAPL";
const descripciondatasource = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://ih1.redbubble.net/image.2145964088.1553/st,small,507x507-pad,900x500,f8f8f8.jpg",
            "displayFullscreen": true,
            "headerTitle": "",
            "headerSubtitle": "",
            "logoUrl": "",
            "videoControlType": "jump30",
            "videoSources": [
                "https://bucketguanajuato.s3.us-east-2.amazonaws.com/video.mp4"
            ],
            "sliderType": "determinate"
        }
    }
};

const DOCUMENT_ID_lugares = "lugaresAPL";
const lugaresdatasource = {
    "cardsLayoutTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
            "headerTitle": "Lugares turísticos de Guanajuato",
            "headerSubtitle": "",
            "headerAttributionImage": "",
            "primaryText": "Descubre los lugares más bonitos y emblemáticos de Guanajuato",
            "listItems": [
                {
                    "primaryText": "Callejon del Beso",
                    "thumbnailImage": "https://th.bing.com/th/id/R.1f242d7f5295cb3b724f84e3061d76d6?rik=ymZgTXjDTG66eA&riu=http%3a%2f%2fhablemosdemitologias.com%2fwp-content%2fuploads%2f2018%2f11%2fcallejon-beso.jpg&ehk=6W74Q2rCpMXXX%2fOUp2HjKkD88PuThmNfrDvXeHTTLdk%3d&risl=&pid=ImgRaw&r=0"
                },
                {
                    "primaryText": "Alhóndiga",
                    "secondaryText": "de Granaditas",
                    "thumbnailImage": "https://www.viajabonito.mx/wp-content/uploads/2022/01/lugares-turisticos-de-guanajuato-alhondiga-.jpg"
                },
                {
                    "primaryText": "Presa de la Olla",
                    "thumbnailImage": "https://www.viajabonito.mx/wp-content/uploads/2022/01/lugares-turisticos-de-guanajuato-1.jpg"
                },
                {
                    "primaryText": "Museo de las Momias",
                    "thumbnailImage": "https://th.bing.com/th/id/OIP.KrfQbh0r9frwAekgA0UmPQHaE8?rs=1&pid=ImgDetMain"
                },
                {
                    "primaryText": "Plaza de la Paz",
                    "thumbnailImage": "https://th.bing.com/th/id/R.a8257432dce87d23542094e1e33c8216?rik=unnbHDmwV5f9NQ&pid=ImgRaw&r=0"
                },
                {
                    "primaryText": "Teatro Cervantes",
                    "thumbnailImage": "https://th.bing.com/th/id/OIP.answQrmNfEdCjQ3HgRgSeQHaFj?rs=1&pid=ImgDetMain"
                }
            ]
        }
    }
};

const DOCUMENT_ID_comida = "comidaAPL";
const comidadatasource = {
    "gridListData": {
        "type": "object",
        "objectId": "gridListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
                    "size": "small",
                    "widthPixels": 0,
                    "heightPixels": 0
                },
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/gridlist/GridListBackground_Dark.png",
                    "size": "large",
                    "widthPixels": 0,
                    "heightPixels": 0
                }
            ]
        },
        "title": "Comida típica de Guanajuato",
        "listItems": [
            {
                "primaryText": "Enchiladas Mineras",
                "imageSource": "https://www.travelreport.mx/wp-content/uploads/2018/01/gastronom%C3%ADa-de-Guanajuato-2.jpg"
            },
            {
                "primaryText": "Patitas de puerco",
                "imageSource": "https://www.travelreport.mx/wp-content/uploads/2018/01/gastronom%C3%ADa-de-Guanajuato-patas-de-puerco.jpg"
            },
            {
                "primaryText": "Caldo de Oso",
                "imageSource": "https://www.travelreport.mx/wp-content/uploads/2019/05/gastronom%C3%ADa-de-Guanajuato-9.jpg"
            },
            {
                "primaryText": "Capone de nopales con xoconoxtle",
                "imageSource": "https://tipsparatuviaje.com/wp-content/uploads/2019/08/capone-de-nopales-con-xoconoxtle.jpg"
            },
            {
                "primaryText": "Tumbagón",
                "imageSource": "https://tipsparatuviaje.com/wp-content/uploads/2019/08/tumbagon-comida.jpg"
            },
            {
                "primaryText": "Fiambre",
                "imageSource": "https://tipsparatuviaje.com/wp-content/uploads/2019/08/fiambre-estilo-san-miguel-de-allende.jpg"
            }
        ],
        "logoUrl": ""
    }
};

const DOCUMENT_ID_traje = "TrajeAPL";
const trajesdatasource = {
    "simpleTextTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
            "foregroundImageLocation": "left",
            "foregroundImageSource": "https://th.bing.com/th/id/R.dde5847ca7b4f433b4a73996f25432c0?rik=naV1UjdtLc04Jg&riu=http%3a%2f%2fwww.ugto.mx%2fnoticias%2fimages%2fnoticias%2f07-01-15%2ftrajes-tradicionales-mexico-universidad-guanajuato-ug.jpg&ehk=lOMtnhrCM1ICxUGNjukIvVJhPZZnZEtQvs%2fnZYGcWww%3d&risl=&pid=ImgRaw&r=0",
            "headerTitle": "Traje Típico Mujeres",
            "headerSubtitle": "",
            "hintText": "Try, \"Alexa, personajes destacados\"",
            "headerAttributionImage": "",
            "primaryText": "La vestimenta tradicional de las mujeres está conformada por una  falda de manta llamada Zagalejo y a esta se le añade otra  falda de franela color rojo. A diferencia de muchas otras, esta no va con ningún tipo de bordado, pero si la decoran con triángulos verdes en la cintura y en el área de la bastilla.",
            "textAlignment": "start",
            "titleText": "Galereña"
        }
    }
};

const DOCUMENT_ID_personajes= "personajesAPL";
const personajesdatasource = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "",
        "listItems": [
            {
                "primaryText": "El Pípila",
                "imageSource": "https://th.bing.com/th/id/R.13098c8cad1a97dd46e5df9f0e6de5a2?rik=Gn8zo4DaK86oPQ&riu=http%3a%2f%2fguanajuatomexicocity.com%2fIm%2f600x300%2fGuanajuato-El-Pipila-Statue.jpg&ehk=%2fGowmUEx2KSbYfMK2tsrLsMcLaTK4zNsMTnE9fZJI2Y%3d&risl=&pid=ImgRaw&r=0"
            },
            {
                "primaryText": " Ignacio Allende",
                "imageSource": "https://th.bing.com/th/id/OIP.cZX8Q7ffv6XhAJh22BKZtAHaLg?rs=1&pid=ImgDetMain"
            },
            {
                "primaryText": "José Alfredo Jiménez",
                "imageSource": "https://www.elsiglodetorreon.com.mx/m/i/2016/11/885517.jpeg"
            },
            {
                "primaryText": "Margarita Paz Paredes",
                "imageSource": "https://escritorespotosinos.com.mx/assets/fotos/078.webp"
            },
            {
                "primaryText": "Jorge Negrete",
                "imageSource": "https://th.bing.com/th/id/R.a5f42579c30521fdbe52b25282811456?rik=U3XjkQvZFRBBDw&pid=ImgRaw&r=0"
            }
        ],
        "logoUrl": "",
        "hintText": ""
    }
};

const DOCUMENT_ID_musica = "musicaAPL";
const musicadatasource = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "jump30",
            "audioSources": [
                "https://bucketguanajuato.s3.us-east-2.amazonaws.com/musica.mp3"
            ],
            "backgroundImage": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
            "coverImageSource": "https://i2.wp.com/boletines.guanajuato.gob.mx/wp-content/uploads/2020/03/FolcloricoTBicentenario_091-1.jpg?fit=1024%2C683&ssl=1",
            "headerTitle": "Musica Favorita de Guanajuato",
            "logoUrl": "",
            "primaryText": "Tierra de mis Amores",
            "secondaryText": "Álbum : Ponte mi capa",
            "sliderType": "determinate"
        }
    }
};

const DOCUMENT_ID_ayuda = "AyudaAPL";
const ayudadatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "¿En que puedo Ayudarte? Aqui Hay algunas frases que puedes decirme: Háblame de Guanajuato,lugares turísticos,traje típico,música típica."
                }
            },
            "logoUrl": "",
            "hintText": "Try, \"Alexa, traje tipico?\""
        }
    }
};

const DOCUMENT_ID_error = "ErrorAPL";
const errordatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "¡Error! Tuvimos un problema"
                }
            },
            "logoUrl": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/logo/logo-modern-botanical-white.png",
            "hintText": "Try, \"Alexa, cancelar\""
        }
    }
};

const DOCUMENT_ID_cancelar = "CancelarAPL";
const cancelardatasource = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://bucketguanajuato.s3.us-east-2.amazonaws.com/luxa.org-opacity-changed-Guanajuato.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Adios, Vuelve Pronto"
                }
            },
            "logoUrl": "",
            "hintText": ""
        }
    }
};






const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};
exports.handler = Alexa.SkillBuilders.custom()






const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
       if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID, bienvenidadatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const DescripcionIntent= {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'descripcionintent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('DESCRIPCION');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_Des, descripciondatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const LugaresIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'lugaresturisticosintent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('LUGARES_TURISTICOS');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_lugares, lugaresdatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ComidaIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'comidatipicaintent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('COMIDA');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_comida, comidadatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const TrajeIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'trajetipicointent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('TRAJE_TIPICO');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_traje, trajesdatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const PersonajeIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'personajesintent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('PERSONAJES_SOBRESALIENTES');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_personajes, personajesdatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const MusicaIntent = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'musicaintent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('MUSICA');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_musica, musicadatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELP_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_ayuda, ayudadatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('GOODBYE_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_cancelar, cancelardatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_error, errordatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

const LocalizationInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: Alexa.getLocale(handlerInput.requestEnvelope),
            resources: languageStrings,
            returnObjects: true
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args) {
            return localizationClient.t(...args);
        };
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.message}`);
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            const aplDirective = createDirectivePayload(DOCUMENT_ID_error, errordatasource);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        DescripcionIntent,
        LugaresIntent,
        ComidaIntent,
        TrajeIntent,
        PersonajeIntent,
        MusicaIntent,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addRequestInterceptors(LocalizationInterceptor)
    .addErrorHandlers(ErrorHandler)
    .lambda();
