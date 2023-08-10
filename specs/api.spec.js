import { data, queue_name } from "../framework/config";
import api from "../framework/services";

describe('На тестовом веб-сервисе', () => {

    describe('метод GET', () => {

        test('отвечает статусом 200, если в очереди есть сообщение', async () => {
            // отправляем данные в первую очередь
            await api.put(queue_name[1], data);

            // получаем данные из первой очереди
            const res = await api.get(queue_name[1]);

            // проверяем, что статус равен 200
            expect(res.status).toEqual(200);
            expect(res.status).not.toEqual(400);
        });

        test('отвечает ошибкой 404, если в очереди есть нет сообщений', async () => {
            // пытаемся получить данные из второй очереди
            const res = await api.get(queue_name[2]);

            // проверяем, что статус равен 404
            expect(res.status).toEqual(404);
            expect(res.status).not.toEqual(400);
        });

        test('отвечает в рамках таймаута, если сообщение было отправлено после запроса', async () => {
            // пытаемся получить данные из третьей очереди
            const res = api.getTimeout(queue_name[3], 10);

            // отправляем данные в очередь
            await api.put(queue_name[3], data);

            // ожидаем окончания таймаута
            await new Promise((r) => setTimeout(r, 10000));

            // проверяем, что статус равен 200
            expect(res.status).toEqual(200);
            expect(res.status).not.toEqual(400);
        });

    });

    describe('метод PUT', () => {

        test('отвечает статусом 200 и сохраняет полученное сообщение', async () => {
            // отправляем данные в первую очередь
            const resPUT = await api.put(queue_name[4], data);

            // проверяем, что статус равен 200
            expect(resPUT.status).toEqual(200);
            expect(resPUT.status).not.toEqual(400);

            // получаем данные из очереди
            const resGET = await api.get(queue_name[4]);
            const resGETjson = await resGET.json();

            // проверяем полученные данные
            expect(resGET.status).toEqual(200);
            expect(resGETjson).toEqual(data);
        });

        test('отвечает статусом 400, если тело не по формату', async () => {
            // отправляем данные в первую очередь
            const res = await api.put(queue_name[5], '');

            // проверяем, что статус равен 400
            expect(res.status).toEqual(400);
        });

    });

});