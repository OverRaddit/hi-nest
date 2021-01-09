import { Controller, Get } from '@nestjs/common';

// 작은따옴표안에 이름을 비웠더니 동작하는이유...?
// -> localhost:3000/app 으로 접근하면 동작하는 컨트롤러를 명시한 것임
// -> localhost:3000/ 으로 접근할때 동작하는 컨트롤러를 명시하기 위해 비운거임
@Controller('')
export class AppController {
    @Get()
    home(){
        return "Welcome to my Movie API";
    }
}
