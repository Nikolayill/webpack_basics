### Настройка JSON-server
Сервер можно запустить из командной строки добавив в package.json скрипт
вида:
```json
"scripts": {
    ...
    "start-json-server": "json-server --watch ./json/db.json --port 3030"
    ...
}
```
Либо сервер можно более тонко сконфигурировать из js-модуля см. [server.js](./server.js)\

#### Запуск webpack dev server + json-server
Для параллельного запуска одним скриптом можно использовать пакет `concurrently`:
```json
"scripts": {
    "start": "concurrently --kill-others \"yarn start-json-server\" \"yarn start-wds\"",
    "start-wds": "webpack-dev-server",
    "start-json-server": "node ./server.js",
    ...
}
```
Подробнее см. 
- https://github.com/typicode/json-server
- https://spin.atomicobject.com/2018/10/08/mock-api-json-server/
- https://stackoverflow.com/questions/57926892/how-to-start-json-server-with-webpack

#### Проксирование запросов из WDS в json-server
Что бы упростить запросы к api, нужно проксировать запросы к json-server который выступает
в качестве имитации бэкэнда, но запущен на другом порту.
Для этого в [webpack.config.js](./webpack.config.js) нужно добавить настройки прокси:
```javascript
...
    devServer: {
        proxy: {
            '/api': {
                target: json_server_url,    //перенаправление запросов начинающихся со /api на json-server
                pathRewrite: {
                    '^/api': '',            //удаление префикса из исходного url
                },
            },
        },
    },
...
```
Здесь в переменной `json_server_url` определен url на который обслуживает json-server (см. [server.js](./server.js)) 