const axios = nodeRequire('axios')

const GptAnswerCross = "<span class='fui-cross' onclick=\"hideMessageLocked(500);document.getElementById('nlp').value='';\" style=' font-size: 13px;z-index: 100;position: absolute;padding:5px;right: 0px;top:0px' ></span>"

talkHistory = []

async function gptrun(sentense, answerDiv) {
    // document.getElementById(answerDiv).style.padding='10px';
    // document.getElementById(answerDiv).style.overflowY='auto';
    // document.getElementById(answerDiv).innerHTML='正在请求中...';
    // TODO:如果Talkhistory过长的话会导致传输时间过长。之后看情况增加截取动画的功能。
    if (talkHistory.length == 0) {
        talkHistory.push({ "role": "system", "content": localStorage.getItem("prompt") });
    }
    showMessageLocked('正在请求中...', undefined);
    var data = {
        role: 'user',
        content: sentense,
    };
    talkHistory.push(data);
    const response = await axios({
        method: 'POST',
        responseType: 'json',
        url: (localStorage.getItem("openURL") ? localStorage.getItem("openURL") : "https://api.openai.com")+ '/v1/chat/completions',
        proxy: { protocol: 'http', host: '127.0.0.1', port: 7890, },
        validateStatus(status) { return true },
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ` + localStorage.getItem("ChatgptKey"),
        },
        data: {
            model: localStorage.getItem("AImodel") ? localStorage.getItem("AImodel") : "gpt-3.5-turbo",
            messages: talkHistory,
            stream: false,
        },
    })
    if (response.status >= 200 && response.status < 300) {
        showMessageLocked(GptAnswerCross + response.data.choices[0].message.content);
        console.log('[response]', response.data)
        talkHistory.push({
            "role": "assistant",
            "content": response.data.choices[0].message.content
        });
        // document.getElementById(answerDiv).innerHTML=(response.data.choices[0].message.content);
    }
    else {
        showMessageLocked(GptAnswerCross + response.data.error.message);
        // document.getElementById(answerDiv).innerHTML=(response.data.error.message);
        console.log('[response]', {
            data: {
                message: response.data.error.message,
                type: response.data.error.type,
                code: response.data.error.code,
            },
            status: response.status,
        })
    }
}

async function OpenRouterRun(sentense, answerDiv) {
    showMessageLocked('正在请求中...', undefined);
    const response = await axios({
        method: 'POST',
        responseType: 'json',
        url: 'https://openrouter.ai/api/v1/chat/completions',
        validateStatus(status) { return true },
        headers: {
            "Authorization": `Bearer ` + localStorage.getItem("OpenRouterKey"),
            "HTTP-Referer": `https://github.com/JimHans/live2d-kanban-desktop`, // To identify your app. Can be set to localhost for testing
            "X-Title": `kanban-desktop`, // Optional. Shows on openrouter.ai
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
            "messages": [
                { "role": "user", "content": sentense }
            ],
            stream: false,
        }),
    })
    if (response.status >= 200 && response.status < 300) {
        showMessageLocked(GptAnswerCross + response.data.choices[0].message.content);
        console.log('[response]', response.data)
        // document.getElementById(answerDiv).innerHTML=(response.data.choices[0].message.content);
    }
    else {
        showMessageLocked(GptAnswerCross + response.data.error.message);
        // document.getElementById(answerDiv).innerHTML=(response.data.error.message);
        console.log('[response]', {
            data: {
                message: response.data.error.message,
                type: response.data.error.type,
                code: response.data.error.code,
            },
            status: response.status,
        })
    }
}