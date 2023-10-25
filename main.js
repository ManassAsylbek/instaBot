const OpenAI = require("openai")
require("dotenv").config()
const Insta = require('./insta.js');
const {Telegram} = require('telegraf')
const client = new Insta.Client();

//Регулярные вырожение

const regex = /#(курс java|курс frontend|курс project managment|курс прожект менеджер|курс cyber security|курс cybersecurity|курс кибер безопасность|курс кибербезопасность|пробный java|пробный frontend|пробный project managment|пробный прожект менеджер|пробный cyber security|пробный cybersecurity|пробный кибер безопасность|пробный кибербезопасностькурс java|курсfrontend|курсproject managment|курспрожект менеджер|курсcyber security|курсcybersecurity|курскибер безопасность|курскибербезопасность|пробныйjava|пробныйfrontend|пробныйproject managment|пробныйпрожект менеджер|пробныйcyber security|пробныйcybersecurity|пробныйкибер безопасность|пробныйкибербезопасность)/i;
const phoneRegex = /(\+?\d{0,4}\s?\d{3,4}\s?\d{3}\s?\d{3})/g;
const dateRegex = /(\d{2}.\d{2}.\d{4})/;
const fullNameRegex = /([А-Я][а-я]+)(?: ([А-Я][а-я]+))(?: ([А-Я][а-я]+))?/;

const openAiKey = process.env.OPENAI_API_KEY
const userName = process.env.INSTA_USERNAME
const password = process.env.INSTA_PASSWORD

const tokenTelegram = process.env.TELEGRAM_BOT

const chatId = process.env.TELEGRAM_CHAT
const eldiar = "5459597601"
const manas = "516481288"
const manas2 = "5049470276"

const chatIds = [manas, eldiar]; // Список чатов для отправки сообщений
let currentChatIndex = 0;


const telegram = new Telegram(tokenTelegram)


const openai = new OpenAI({
    apiKey: openAiKey, // defaults to process.env["OPENAI_API_KEY"]
});


const text = `Вы представляетесь как IT аутсорс-компания "Fortylines IO," обладающая тремя годами опыта в предоставлении высококачественных технологических решений для бизнеса. В рамках вашей деятельности вы предоставляете "40Devs" - авторские курсы в различных направлениях, таких как Java, Frontend, Project Management и Cyber Security. Эти курсы разработаны командой опытных специалистов, всегда находящихся в курсе последних технологических тенденций, что гарантирует студентам получение актуальных и востребованных знаний, применимых в реальной практике.

Ваши курсы проводятся три раза в неделю в формате вечерних занятий и доступны как оффлайн, так и онлайн. Важно отметить, что у студентов есть возможность записи уроков для удобства обучения. Каждому студенту предоставляются два ментора - один практик и один теоретик, что обеспечивает всестороннюю поддержку в процессе обучения.

Кроме того, ваши курсы предоставляют доступ ко всем направлениям и включают в себя "Talking Club" для изучения технического английского. После успешного завершения курсов, студенты имеют возможность пройти стажировку в "@devsfactorykg" с продолжительностью три месяца. Эта стажировка предоставляет участникам возможность работать в команде из 5-8 человек, включая проектного менеджера, разработчиков Frontend и Backend, и дизайнера.

Ваши коммерческие проекты охватывают области Fintech и HR-tech, и вы работаете в соответствии с Scrum методологией. Стажировка включает в себя технические собеседования каждую неделю, а также собеседования по Soft skills. Вы также предоставляете мастер-классы по разбору резюме, написанию Cover Letter и управлению профилем на LinkedIn. По завершению стажировки студенты имеют возможность представить свой проект на Demoday перед партнерами вашей компании.

Чтобы записаться на пробный урок, студенты могут использовать следующий формат:

#пробный
ФИО
Номер телефона
Дата пробного урока, на которую они хотели бы записаться.

Прошу не уточнять стоимость курса, а перенаправлять на сейлс менеджеров и сообщать, что они могут предоставить скидки, если студенты отправят свои контактные данные.

Спасибо за предоставленную информацию!

Конечно, уточним и расширим формат, чтобы пользователи могли более точно указать, интересуют ли их пробные уроки или запись на курсы в определенном направлении. Теперь для пробного урока пользователи могут использовать формат #пробный java ФИО номер телефона дата пробника, а для записи на курсы - #курс java ФИО номер телефона дата курса. Это будет более ясным и информативным способом для запросов по конкретным направлениям:

Пример для пробного урока:

#пробный java
Иван Иванов
0700112233
20.10.2023


Пример для записи на курсы:

#курс Frontend
Мария Петрова
0777333444
15.11.2023

Если пользователь/клиент написал не по шаблону, нужно вежливо попросить его отправить сообщение согласно шаблону указав на проблемы в его предыдущем сообщении

Необходимо обращаться к пользовтелям и клиентам исключительно на "Вы" в уважительной форме.`


client.on('connected', async () => {
    console.log(`${client.user.username} connected`);
});


client.on('messageCreate', async (message,) => {

    if (message.author.id === client.user.id) return;

    if (message.content.toLowerCase().match(regex) &&
        message.content.toLowerCase().match(phoneRegex) &&
        message.content.toLowerCase().match(dateRegex) ||
        message.content.toLowerCase().match(fullNameRegex)) {
        // Определяем следующий чат для отправки сообщения
        // const currentChatId = chatIds[currentChatIndex];
        // currentChatIndex = (currentChatIndex + 1) % chatIds.length; // Переход к следующему чату

        telegram.sendMessage(chatId, message.content);
    }

    await message.markSeen();
    console.log(`${client.user.username} Is Ready Now For Chats`);

    try {
        console.log(message.content)
        await message.chat.startTyping({duration: 500000, disableOnSend: true})
        const chatCompletion = await openai.chat.completions.create({
            messages: [{role: 'system', content: text}, {role: 'user', content: message.content}],
            model: 'gpt-3.5-turbo',
        });
        await message.chat.stopTyping()
        await message.chat.sendMessage(chatCompletion.choices[0]?.message?.content);
        await console.log(chatCompletion.choices[0]?.message?.content)
    } catch (error) {
        console.error('An error occurred:', error);
        await message.chat.sendMessage("Повторите ваш запрос");

    }
});

client.login(userName, password);



