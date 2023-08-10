const url = process.env.URL;
const data = process.env.DATA;
const queue_name = process.env.QUEUE.split(' ');

export {
    url,
    data,
    queue_name,
}
