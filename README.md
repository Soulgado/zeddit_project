# Zeddit Project

Копия веб-сайта [reddit](https://www.reddit.com) с базовым функционалом CRUD приложения, с использованием REST API.

Использованные технологии:
- React
- Redux
- React-router
- Node.js
- Express
- express-validator
- date-fns
- multer
- PostgreSQL

## Запуск

Для запуска приложения необходимо:
1) настроить переменные окружения в файле **.env**:
   - DB_HOST - хост-сервер базы данных
   - DB_PORT - порт, используемый для подключения к базе данных
   - DB_USERNAME - имя пользователя базы данных
   - DB_PASSWORD - пароль пользователя базы данных
   - DB_NAME - имя базы данных
2) В командной строке запустить следующую команду: ```node dbSetup.js```. Данная команда создаст необходимые для приложения таблицы в базе данных.
3) В командной строке запустить следующую команду: ```npm start && cd client && npm start```

## Функционал и представление 

Главная страница приложения:

<img src="https://user-images.githubusercontent.com/52062811/88539006-ad135180-d010-11ea-9a6d-c6f781613471.png">

Страница авторизации пользователя:

<img src="https://user-images.githubusercontent.com/52062811/88539024-ba304080-d010-11ea-81ea-25be207619d1.png">

Страница регистрации пользователя:

<img src="https://user-images.githubusercontent.com/52062811/88527834-16d63000-cffe-11ea-947a-28ae2d25a169.png">

Ошибки форм:

1. При создании форума:

<img src="https://user-images.githubusercontent.com/52062811/88528235-a4198480-cffe-11ea-9b4e-c81926484355.png">

2. При регистрации:

<img src="https://user-images.githubusercontent.com/52062811/88528535-05d9ee80-cfff-11ea-88f3-9f891ceec25d.png">

<img src="https://user-images.githubusercontent.com/52062811/88528687-3ae64100-cfff-11ea-9c98-afcae48bc727.png">

3. При авторизации:

<img src="https://user-images.githubusercontent.com/52062811/88539102-e64bc180-d010-11ea-96d0-349e1c982390.png">

Страница созданного форума:

<img src="https://user-images.githubusercontent.com/52062811/88539123-f368b080-d010-11ea-94f4-1b355686f19c.png">

Форма создания текстового поста:

<img src="https://user-images.githubusercontent.com/52062811/88527115-2143fa00-cffd-11ea-8f6b-a36c33c807af.png">

Страница поста для неавторизированных пользователей:

<img src="https://user-images.githubusercontent.com/52062811/88527308-5ea88780-cffd-11ea-8eaa-715c058a70dd.png">

Страница созданного поста (с опциями редактирования и удаления поста) для автора поста:

<img src="https://user-images.githubusercontent.com/52062811/88527419-84ce2780-cffd-11ea-874f-7a9bf1218a43.png">

Комменарии к посту (автор комментария имеет опции редактирования и удаления комментария):

<img src="https://user-images.githubusercontent.com/52062811/88539262-388ce280-d011-11ea-8cb0-c9174fd19f00.png">

Страница управления аккаунтом (с опциями смены имени пользователя, почты и пароля):

<img src="https://user-images.githubusercontent.com/52062811/88527972-46853800-cffe-11ea-9362-ded8ab4e51ca.png">

Страница во время REST запроса на сервер:

<img src="https://user-images.githubusercontent.com/52062811/88527702-ed1d0900-cffd-11ea-905c-1e522518826c.png">
