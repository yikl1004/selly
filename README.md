# LotteCard Selly 1.0 Vue Boilerplate 가이드

## Getting Started

### Dependencies

*__Note:__ nodejs 14버전에서만 정상 동작하기 때문에 사전에 설치 부탁드립니다.

- [Node.js](https://nodejs.org/) (V14 LTS)
- [Yarn](https://classic.yarnpkg.com/en/)

### Libraries

- [Typescript@4.1.x](https://www.typescriptlang.org/)
- [Vue.js@v2](https://vuejs.org/)
- [vuex@v3](https://vuex.vuejs.org/)
- [Vue Class Component](https://class-component.vuejs.org/)
- [Vue Property Decorator](https://github.com/kaorun343/vue-property-decorator)
- [Vuex Module Decorators](https://github.com/championswimmer/vuex-module-decorators)

### Concept

- Typescript 도입을 통해 코드 안정성 및 생상성 증대
- 엄격한 타입 Rule 도입으로 안정성 확보
  - strictNullChecks
  - noImplicitAny
- Typescript 주요 Feature 적극 사용 권장
  - Optional Chaining
  - Nullish Coalescing
  - Non Null Assertion Operator
  - Promise.all
  - ...
- 클래스 기반 컴포넌트 (Vue Class Component) 를 활용해 Typescript의 많은 기능을 적극 도입
- Typescript Decorator Pattern 을 통해 읽기 쉬운 코드를 작성하고 코드의 재사용성을 높임
- async & await 적극적인 사용으로 읽기 쉬운 코드와 기존의 비동기 처리방식 개선
- Husky 도입을 통해 즉시 배포가 가능한 코드 유지

### Installation

#### Clone this repo

```sh
git clone https://github.com/LOTTECARD/vue.ts-boilerplate.git
cd vue.ts-boilerplate
```

##### Install the dependencies

```sh
npm install
```

##### Development

```sh
npm run serve
```

### Project Structure

```txt
📦selly  
┣ 📂.storybook             # 스토리북 설정 파일  
┣ 📂.vscode                # VSCode 설정  
┃ ┗ 📜settings.json        # VSCode 설정 JSON  
┣ 📂cli  
┃ ┣ 📜tsc-staged.ts        # husky typescript 체크(tsc)  
┃ ┗ 📜vue-staged.ts        # husky Vetur 체크(vtc)  
┣ 📂dist                   # build 된 파일  
┣ 📂public                 # build 전 dev server root 폴더  
┣ 📂src                    # 개발 소스  
┃ ┣ 📂assets               # 정적자원(이미지, icon 등)  
┃ ┃ ┣ 📂icon  
┃ ┃ ┗ 📂images  
┃ ┣ 📂components           # 공통 컴포넌트  
┃ ┃ ┣ 📂common             # 분류가 따로 없는 컴포넌트  
┃ ┃ ┗ 📂form               # 분류가 되는 컴포넌트는 폴더별로 구분  
┃ ┣ 📂fonts                # 폰트  
┃ ┣ 📂layout               # 레이아웃을 구성하는 컴포넌트(디자인 별로 구분)  
┃ ┣ 📂pages                # 페이지가 되는 컴포넌트  
┃ ┣ 📂services             # service 컴포넌트 (사용할지 말지 고민중)  
┃ ┃ ┣ 📂core  
┃ ┃ ┃ ┣ 📜decorators.ts    # 기능 단위 데코레이터  
┃ ┃ ┃ ┣ 📜http.ts          # axios wrapping class  
┃ ┃ ┃ ┗ 📜index.ts  
┃ ┃ ┗ 📜card.ts            # service class 예시  
┃ ┣ 📂stores               # store  
┃ ┃ ┗ 📂modules            # 하위 모듈  
┃ ┣ 📂stories              # 스토리북 작성 파일  
┃ ┣ 📂styles               # style(CSS, SCSS)  
┃ ┣ 📂types                # 기본 타입 정의(프로젝트 내)  
┃ ┣ 📂utils                # 유틸성 모듈  
┃ ┃ ┣ 📂mixins             # mixin class  
┃ ┃ ┣ 📂plugins            # plugin functions  
┃ ┃ ┗ 📜registerCommonComponent.ts  
┃ ┣ 📜App.vue              # Root component  
┃ ┣ 📜main.ts              # runnin Vue  
┃ ┣ 📜router.ts            # router object  
┃ ┣ 📜shims-tsx.d.ts       # tsx file definition  
┃ ┗ 📜shims-vue.d.ts       # vue file definition  
┣ 📜.env.development       # 개발용 환경변수  
┣ 📜.eslintrc.js           # eslint 설정 파일  
┣ 📜.gitignore             # git 무시 목록  
┣ 📜.myeditorconfig        # 에디터 설정 백업  
┣ 📜.npmrc                 # config npm repository server  
┣ 📜.nvmrc                 # node version set  
┣ 📜.prettierrc            # prettier 설정  
┣ 📜README.md              # 프로젝트 설명  
┣ 📜package-lock.json      # node package dependency 관리  
┣ 📜package.json           # node package, script, etc config 관리  
┣ 📜tsconfig.base.json     # 타입스크립트 설정 파일 (base)  
┣ 📜tsconfig.json          # 타입스크립트 설정 파일 (extends base)  
┣ 📜vetur.config.js        # vetur 설정 파일  
┣ 📜vue.config.js          # vue 설정 파일  
┗ 📜yarn.lock              # yarn lock 파일(yarn 사용)  
```

### 가이드 외에 추가된 모듈 목록

dependency
> lodash  

devDependency
> tsconfig-paths-webpack-plugin

### TODO List

[ ] 삭제 예정 dependency(테스트성, 또는 깜박하고 안지운 것들)정리 하기  
[ ] 소스 상에 TODO 해결 하기
[ ] bundle 사이즈 줄이기
[ ] 코드 스플리팅 하기


### common module

vue-portal
toast (include animation, bottom to top)
tooltip
custom select
tab(each other case)

### Open API Generator

```sh
openapi-generator generate -i http://10.25.19.42:8080/v2/api-docs -g typescript-axios -o test-gen --skip-validate-spec
```

### PropSync

child component

```ts
@Component
class Component extends Vue {

    // case 1
    @PropSync('defaultValue', { type: Boolean })
    protected value!: boolean

    // case 2
    @Prop({ type: Boolean })
    readonly defaultValue!: boolean

    get value(): boolean {
        return this.defaultValue
    }
    set value(inputValue: boolean) {
        this.$emit('update:defaultValue', inputValue)
    }

}
```

parent component

```html
<!-- ParentComponent - template -->
<template>
    <ChildComponent :default-value.sync="defaultValue">
</template>
```

```ts
// ParentComponent - script
@Component
class ParentComponent extends Vue {
    private defaultValue: boolean = false
}
```

### Class Component

```ts
@Component
class Component extends Vue {
    /**
     * 1. Props
     * 2. Data
     * 3. Computed
     * 4. Watch
     * 5. Etc(Other decorator)
     * 6. Methods
     *      6-1. cumtom method
     *      6-2. lifcycle method(순서는 실행 순서)
     */


}
```

### 정규식 모음

> [정규식 참고][RegExpReference]

```ts
// 특수문자/문자/숫자포함 8~15자리 이내의 암호
/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/

// 핸드폰번호 정규식
/^\d{3}-\d{3,4}-\d{4}$/;


// 일반 전화번호 정규식
/^\d{2,3}-\d{3,4}-\d{4}$/;

// 이메일
/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i

// 숫자만
/^[0-9]*$/g

// 문자열(특수문자 제외)
/^[ㄱ-힇a-zA-Z]*$/g

// 키보드에서 입력 가능한 특수문자
/^[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]*$/g

// 주민등록번호
/\d{6} \- [1-4]\d{6}/

// 모든 공백 체크 정규식
/\s/g

```

### Commit Message

> 추가: [add]  
> 수정 중: [fix]  
> 수정 완료: [fixed]
> 완료: [complete]  
> 테스트: [test]
> 이슈 해결/수정/재수정/완료: [resolve]

### 기타 인증/계정 정보

#### 카카오 로그인 CI  

0U4k05hAwCYT0IwN5kvW5leCyQ6QSZFyV2dH6gaNARlMwUUgHodI4jCOWIaU8ySUbfHpJyEAUP7AXj0w9yU40w==  
0U4k05hAwCYT0IwN5kvW5leCyQ6QSZFyV2dH6gaNARlMwUUgHodI4jCOWIaU8ySUbfHpJyEAUP7AXj0w9yU40w====  

#### 카드번호 인증  

카드번호: 5137-9297-0057-7328  
비밀번호: 12  

[RegExpReference]: https://m.blog.naver.com/PostView.nhn?blogId=jwjung0723&logNo=221721325323&categoryNo=10&proxyReferer=&proxyReferer=https:%2F%2Fwww.google.com%2F