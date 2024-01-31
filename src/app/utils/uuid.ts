export default function uuid(digits: number): string {
    const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
    const id = [];
    for (let i = 0; i < digits; i += 1) {
        id.push(str[Math.floor(Math.random() * str.length)]);
    }
    return id.join('');
}
