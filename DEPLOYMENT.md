# Инструкция по развертыванию MARMELAT на www.emilee.kz

## Подготовка

### 1. Убедитесь, что DNS настроен
Перед развертыванием убедитесь, что A-записи вашего домена указывают на IP адрес VPS:
- `www.emilee.kz` → IP вашего VPS
- `emilee.kz` → IP вашего VPS

Проверить можно командой:
```bash
nslookup www.emilee.kz
nslookup emilee.kz
```

### 2. Локально собран production build
✅ Production build уже собран в папке `dist/`

## Вариант 1: Автоматическое развертывание (рекомендуется)

### Шаг 1: Загрузите файлы на сервер
Используйте `scp` или `rsync` для загрузки файлов на сервер:

```bash
# Замените USER на ваше имя пользователя и SERVER_IP на IP адрес VPS
scp -r dist/ nginx.conf deploy.sh USER@SERVER_IP:/tmp/marmelad/
```

Или с помощью rsync:
```bash
rsync -avz dist/ nginx.conf deploy.sh USER@SERVER_IP:/tmp/marmelad/
```

### Шаг 2: Подключитесь к серверу по SSH
```bash
ssh USER@SERVER_IP
```

### Шаг 3: Запустите скрипт развертывания
```bash
cd /tmp/marmelad
sudo chmod +x deploy.sh
sudo ./deploy.sh
```

Скрипт автоматически:
- ✅ Установит nginx (если не установлен)
- ✅ Установит certbot для SSL
- ✅ Создаст директорию `/var/www/emilee.kz`
- ✅ Скопирует конфигурацию nginx
- ✅ Скопирует файлы сайта
- ✅ Настроит firewall
- ✅ Предложит настроить SSL сертификат

## Вариант 2: Ручное развертывание

### Шаг 1: Подключитесь к серверу
```bash
ssh USER@SERVER_IP
```

### Шаг 2: Установите nginx (если не установлен)
```bash
sudo apt update
sudo apt install -y nginx
```

### Шаг 3: Создайте директорию для сайта
```bash
sudo mkdir -p /var/www/emilee.kz
sudo chown -R www-data:www-data /var/www/emilee.kz
sudo chmod -R 755 /var/www/emilee.kz
```

### Шаг 4: Загрузите файлы сайта
С вашего локального компьютера:
```bash
scp -r dist/* USER@SERVER_IP:/tmp/
```

На сервере:
```bash
sudo mv /tmp/assets /tmp/fonts /tmp/images /tmp/index.html /tmp/favicon.svg /var/www/emilee.kz/
```

### Шаг 5: Создайте конфигурацию nginx
```bash
sudo nano /etc/nginx/sites-available/emilee.kz
```

Скопируйте содержимое файла `nginx.conf` в этот файл, затем сохраните (Ctrl+X, Y, Enter).

### Шаг 6: Активируйте конфигурацию
```bash
sudo ln -s /etc/nginx/sites-available/emilee.kz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx
```

### Шаг 7: Настройте firewall
```bash
sudo ufw allow 'Nginx Full'
```

### Шаг 8: Установите SSL сертификат
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d www.emilee.kz -d emilee.kz
```

Certbot автоматически:
- Получит SSL сертификат от Let's Encrypt
- Настроит nginx для HTTPS
- Настроит автоматическое продление сертификата

## Проверка

### Проверьте работу nginx
```bash
sudo systemctl status nginx
```

### Проверьте сайт
Откройте в браузере:
- http://www.emilee.kz
- http://emilee.kz
- https://www.emilee.kz (если SSL настроен)
- https://emilee.kz (если SSL настроен)

### Проверьте логи (если что-то не работает)
```bash
# Логи nginx
sudo tail -f /var/log/nginx/error.log

# Логи доступа
sudo tail -f /var/log/nginx/access.log
```

## Обновление сайта

Когда нужно обновить сайт:

1. Локально внесите изменения
2. Соберите новый build: `npm run build`
3. Загрузите на сервер:
   ```bash
   rsync -avz --delete dist/ USER@SERVER_IP:/var/www/emilee.kz/
   ```

## Полезные команды

### Перезапуск nginx
```bash
sudo systemctl restart nginx
```

### Проверка конфигурации nginx
```bash
sudo nginx -t
```

### Просмотр статуса SSL сертификата
```bash
sudo certbot certificates
```

### Ручное продление SSL (автоматически продлевается)
```bash
sudo certbot renew
```

## Устранение неполадок

### Сайт не открывается
1. Проверьте статус nginx: `sudo systemctl status nginx`
2. Проверьте firewall: `sudo ufw status`
3. Проверьте DNS: `nslookup www.emilee.kz`
4. Проверьте логи: `sudo tail -f /var/log/nginx/error.log`

### SSL не работает
1. Убедитесь, что DNS настроен и домен резолвится на ваш сервер
2. Запустите certbot снова: `sudo certbot --nginx -d www.emilee.kz -d emilee.kz`
3. Проверьте логи: `sudo tail -f /var/log/letsencrypt/letsencrypt.log`

### Роутинг React не работает (404 на /pitch)
- Убедитесь, что в конфигурации nginx есть `try_files $uri $uri/ /index.html;`
- Это уже настроено в `nginx.conf`

## Структура на сервере

```
/var/www/emilee.kz/          # Корневая директория сайта
├── index.html                # Главная страница
├── favicon.svg               # Иконка
├── assets/                   # JS и CSS файлы
│   ├── index-*.css
│   └── index-*.js
├── fonts/                    # Шрифты (включая Horizon)
└── images/                   # Изображения продуктов
```

## Контакты

Если возникли вопросы или проблемы при развертывании, проверьте:
- Логи nginx
- DNS настройки
- Firewall настройки
- Права доступа к файлам
