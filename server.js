const http = require('http');
const fs = require('fs');
const path = require('path');

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const APPLICATIONS_FILE = path.join(ROOT_DIR, 'applications.txt');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(payload));
}

function sanitizeLine(value) {
    return String(value || '').replace(/[\r\n]+/g, ' ').trim();
}

function buildEntry(body) {
    const now = new Date().toISOString();
    const name = sanitizeLine(body.name);
    const phone = sanitizeLine(body.phone);
    const email = sanitizeLine(body.email);
    const message = sanitizeLine(body.message);

    return [
        '--- Заявка ---',
        `Время: ${now}`,
        `Имя: ${name}`,
        `Телефон: ${phone}`,
        `Email: ${email}`,
        `Сообщение: ${message}`,
        ''
    ].join('\n');
}

function isValidPayload(body) {
    return body && body.name && body.phone && body.email && body.message;
}

function handleApplicationRequest(req, res) {
    let rawBody = '';

    req.on('data', (chunk) => {
        rawBody += chunk;
        if (rawBody.length > 1_000_000) {
            req.destroy();
        }
    });

    req.on('end', () => {
        let parsed;
        try {
            parsed = JSON.parse(rawBody || '{}');
        } catch (error) {
            sendJson(res, 400, { ok: false, error: 'Некорректный JSON' });
            return;
        }

        if (!isValidPayload(parsed)) {
            sendJson(res, 400, { ok: false, error: 'Не заполнены обязательные поля' });
            return;
        }

        const entry = buildEntry(parsed);
        fs.appendFile(APPLICATIONS_FILE, entry, 'utf8', (error) => {
            if (error) {
                sendJson(res, 500, { ok: false, error: 'Не удалось сохранить заявку' });
                return;
            }
            sendJson(res, 200, { ok: true });
        });
    });

    req.on('error', () => {
        sendJson(res, 500, { ok: false, error: 'Ошибка чтения запроса' });
    });
}

function resolveFilePath(urlPathname) {
    let safePath = decodeURIComponent(urlPathname.split('?')[0]);

    if (safePath === '/') safePath = '/index.html';
    if (safePath === '/b') safePath = '/b/index.html';

    const normalized = path.normalize(safePath).replace(/^([.][.][/\\])+/, '');
    return path.join(ROOT_DIR, normalized);
}

function serveStatic(req, res) {
    const filePath = resolveFilePath(req.url);
    if (!filePath.startsWith(ROOT_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('Not found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/api/applications') {
        handleApplicationRequest(req, res);
        return;
    }

    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Method Not Allowed');
        return;
    }

    serveStatic(req, res);
});

server.listen(PORT, HOST, () => {
    console.log(`Server started: http://localhost:${PORT}`);
    console.log(`Applications file: ${APPLICATIONS_FILE}`);
});
