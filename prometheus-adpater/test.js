import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '1m', target: 3 },
        { duration: '1m', target: 5 },
        { duration: '3m', target: 5 },
        { duration: '1m', target: 3 },
        { duration: '2m', target: 3 },
        { duration: '2m', target: 3 },
    ]
}

export default function () {
  const url = 'http://10.107.249.222/product/1';
  const response = http.get(url);
  check(response, {
    'status was 200': (r) => r.status == 200,
  })

  // check res
  if (response.status >= 500) {
    console.log('서버 오류 발생!');
    console.log('상태 코드:', response.status);
  } else {
    console.log('요청이 성공적으로 처리되었습니다.', response.status);
  }
  sleep(1);
}