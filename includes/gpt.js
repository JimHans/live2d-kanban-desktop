const axios = nodeRequire('axios')

const GptAnswerCross = "<span class='fui-cross' onclick=\"hideMessageLocked(500);document.getElementById('nlp').value='';\" style=' font-size: 13px;z-index: 100;position: absolute;padding:5px;right: 0px;top:0px' ></span>"

async function gptrun(sentense,answerDiv) {
    // document.getElementById(answerDiv).style.padding='10px';
    // document.getElementById(answerDiv).style.overflowY='auto';
    // document.getElementById(answerDiv).innerHTML='正在请求中...';
    showMessageLocked('正在请求中...',undefined);
const response = await axios({
    method: 'POST',
    responseType: 'json',
    url: 'https://api.openai.com/v1/chat/completions',
    proxy: {protocol: 'http',host: '127.0.0.1',port: 7890,},
    validateStatus(status) {return true},
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer `+localStorage.getItem("ChatgptKey"),
    },
    data: {
        model: 'gpt-3.5-turbo',
        messages: [
            {
            role: 'user',
            content: sentense,
            },
        ],
        stream: false,
    },
})
    if (response.status >= 200 && response.status < 300) {
        showMessageLocked(GptAnswerCross+response.data.choices[0].message.content);
        console.log('[response]', response.data)
        // document.getElementById(answerDiv).innerHTML=(response.data.choices[0].message.content);
    } 
    else {
        showMessageLocked(GptAnswerCross+response.data.error.message);
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
